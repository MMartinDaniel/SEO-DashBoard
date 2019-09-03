import React, { Component } from 'react';
import 'whatwg-fetch';
import {Link} from 'react-router-dom'
import openSocket from "socket.io-client";
import {getFromStorage, setInStorage} from "../utils/storage";
import { isThisQuarter } from 'date-fns';

class SiteMapGenerator extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading:false,
      percentage: 0,
      alreadyGenerated: false,
      uid: '',
      url: '',
    };
    this.createSiteMap = this.createSiteMap.bind(this);
    this.changeURL = this.changeURL.bind(this);

}
changeURL(){
    this.setState({url:event.target.value});
}

  createSiteMap(event){
    event.preventDefault();

     function validURL(str) {
       var pattern = new RegExp('^(https?:\\/\\/)?'+'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ '((\\d{1,3}\\.){3}\\d{1,3}))'+'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ '(\\?[;&a-z\\d%_.~+=-]*)?'+'(\\#[-a-z\\d_]*)?$','i'); 
       return !!pattern.test(str);
     }

     if(!validURL(this.state.url)){
       console.log("is not valid");
       return;
     }

     let pattern = /^((http|https|ftp):\/\/)/;
     let url = "";
     if(!pattern.test(this.state.url)) {
       url = "http://" + this.state.url;
     }else{
       url = this.state.url;
     }
     let uid = Date.now();
   this.setState({
     loading: true,
     percentage: '0',
     uid: uid

   });
   this.socket = openSocket('http://localhost:80');
   this.socket.on('percentage-'+uid, perce =>{
     this.setState({percentage:perce,loading:true});
     if( perce >= 100 ){this.setState({percentage:perce,loading:false,alreadyGenerated:true})};
   });
   fetch('/library/GenerateSitemap',{
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      web: url,
      uid: uid,
    })
  });

 }

  render() {
    let perce =(this.state.percentage >= 100) ? 100: this.state.percentage;
    let style = {
      bgfill:{
        width: perce+'%',
       height: '200px',
        position: 'absolute',
      }
    };
    let {percentage,alreadyGenerated,loading,uid} = this.state;
    const {bgfill} = style;
    return (<>
    <div className='main-tab'>
    <div className="row">
    <div className='col-lg-5'>

       
    <div className="card-deck m-b-30">
        <div className={"card "}  id="sitemap-widget-2" >
            <div style={bgfill} className={"bgfill"} >    </div>

            <div className="loading-card">
                { loading
                    ?   <form onSubmit={this.formPreventDefault}><input type="text" onChange={this.changeURL} value={this.state.url} placeholder="Insertar URL"></input><input type="submit" onClick={this.createSiteMap} value={"         "} readOnly disabled></input> </form>
                    :   <form onSubmit={this.formPreventDefault}><input type="text" onChange={this.changeURL} value={this.state.url} placeholder="Insertar URL"></input><input type="submit" onClick={this.createSiteMap}   value="Generar" readOnly></input> </form>
                }

                <div className={loading ? 'spinner-border float-right text-secondary spinner-white spinner-activated' : ' spinner-border float-right text-secondary  spinner-white spinner-deactivated' } id="spinner" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
            <h5 className="card-header">Generar SiteMap 
                <Link to={"library/sitemap/"+uid} target="_blank" >
                { alreadyGenerated && !loading ?  <i id="sitemap-download" className="fas fa-download"/> : "" }
              </Link>
            </h5>
            <div className="card-body" >
                <div className='subtext' >Un sitemap es una listado de las paginas mas importantes de un sitio web, de esta forma podemos dar por hecho que Google va a encontrar estas paginas, recorrerlas y visitarlas</div>
                <div className='subtext-icon'  >
                    { loading ?  <p>{percentage}%</p> :( alreadyGenerated ?  <i className="far fa-check-circle"/> : <i className="fas fa-ban"/> ) }

                </div>
            </div>
        </div>
    </div>


         
    </div>
    </div>
    </div>
      </>);
  }
};

export default SiteMapGenerator;