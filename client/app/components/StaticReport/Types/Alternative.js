import React, { Component } from 'react'
import RatingWidget from './../../SEO/block/RatingWidget'
import Slider from "react-slick"
import isAbsoluteUrl from 'is-absolute-url'

class Alternative extends Component {
    constructor(props) {
      super(props);

      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
    }
    next() {
      this.slider.slickNext();
    }
    previous() {
      this.slider.slickPrev();
    }
    
    render(){
        let {data} = this.props;
        const {settings,url} = this.props;
        let total = 0;
        data.map((item)=>{
            if(item.alt){
                if(item.alt.length > 0) total++;
            }
        })
        console.log(total/data.length);
        let color = ((total/data.length) < 0.5) ? 'red' : ((total/data.length) < 0.75) ? 'orange' : 'green';

        console.log(data);
        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"minify-performance"} >
                       <div className="normal-size">
                            <h3>{data.length}</h3>
                            <h5>Total Images</h5>
                       </div>
                       <div className="minify-size">
                            <h3 className={`noalt-${color}`}>{total}</h3>
                            <h5>Images with alternative</h5>

                        </div>
                    </div>
                    <div className={"explanation extra-m"}>
                        <h6>Description</h6>
                        <p>Alternatives are used to increase accesibility to people with disabilities, using screen readers to have a clear explanation of what is the image about. Generally this screen readers are based in promter that tells blind people what is currently happening on the page meanwhile they are scrolling, if not, the screen reading will skip the image, and our content will not be shown to these kind of people. </p>
                        </div> 
                </div> 
                <div>
                    <div className='noalt-tile-container'>
                        {
                            ( data.length >= 0) ?
                                data.map(function(item, i){
                                if(item.url.substring(0,2)==="//"){
                                }else if(item.url.substring(0,1) === "/"){
                                  item.url = item.url.substring(1);
                                }else if(item.url.substring(0,2)=== "./"){
                                  item.url = item.url.substring(2);                                
                                }
                                console.log(item.url);

                                 return (
                                            <Tile key={i} icon={"none"} url={url} item={item} type={"no"} />
                                    );
                                })

                                : null
                            }

                    </div>
                </div>
            </Slider>
            <div className={"status-arrow"}>
            <i onClick={this.next} className="fas  fa-chevron-right top-arrow status-arrow__right"/>
            </div> 
            </>
        )
    }
}

export default Alternative;

class Tile extends Component{
    constructor(props){
      super(props);
    };
  
    render(){
      const {icon,item,type} = this.props;
      let finalUrl = '';
      let pattern = /^((http|https|ftp):\/\/)/;
      if(item.url !== undefined){
        if(item.url.substring(0, 2) == "//"){
          finalUrl = item.url;
        }else if(isAbsoluteUrl(item.url)){
          finalUrl = item.url;
        }else if(!pattern.test(item.url)) {
          if(this.props.url.substring(this.props.url.length - 1) === "/" ){
            if(item.url.substring(1) === "/" ){
              item.url = item.url.substring(1);
            }
            if(pattern.test(this.props.url)){
              finalUrl = this.props.url + item.url;
            }else{
              finalUrl = "http://"+  this.props.url + item.url;
            }
            
          }else{
          
            if(item.url.substring(1) === "/" ){
              if(pattern.test(this.props.url)){
                finalUrl = this.props.url + item.url;
              }else{
                finalUrl = "http://"+  this.props.url + item.url;
              }
            }else{
              if(pattern.test(this.props.url)){
                  finalUrl = this.props.url + "/" + item.url;
              }else{
                finalUrl = "http://"+  this.props.url +"/"+ item.url;
              }
            }

          }
          
        }
      }
      console.log(finalUrl);
     // item.alt = (!item.alt) ? "No alternative Set" : item.alt;
      return(  
        <>
          <div className="noalt-item">
                <div className='noalt-item-title'> 
                    <div className={"pic-wrapper"} ><a href={finalUrl } target="_blank"><img src={finalUrl}/></a> </div>
                    <div className="noalt-tile-text">
                        <p className="noalt-tile-name">{( item.alt === "" ) ? "No alternative set" : item.alt}</p>
                    </div>
                </div>
                
          </div>
      </>);
    }
  }
/*                      <div className={"pic-wrapper"} ><a href={(item.url.substring(0, 2) == "//") ? item.url : `${this.props.url}${item.url}` } target="_blank"><img src={(item.url.substring(0, 2) == "//") ? item.url : `${this.props.url}${item.url}`}/></a> </div>

  <td><img src={'/assets/img/icon/' + icon }/></td>
  <td className='minify-name'>{item.name}</td>

  <td>{item.deadlink.resourceSize}</td>
  <td>{item.minifiedSize}</td>
  <td><div className="minified yesm">{Math.abs(Math.floor((item.efficiency)*100))}%</div></td>

  <td><a  href={"/api/minifier/minify?url="+ item.where+"?type="+type }><div className="minify-button">Minify</div></a></td>

  */