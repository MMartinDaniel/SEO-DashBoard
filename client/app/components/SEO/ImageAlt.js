import React, { Component } from 'react';
import 'whatwg-fetch';
import {getFromStorage} from "../utils/storage";

class ReportImageAlt extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    console.log(this.props);
    return(<>
      <div className='alt-report-grid'>
            {

              this.props.details.map(function(item, i){
                if(item.alt === undefined ||item.alt === "") {
                  return <div className={(item.alt !== undefined) ? 'alt-report yes-alt' : 'alt-report no-alt'} key={i}>
                    <div className='url-name'> {item.url}</div>
                    { (1===2) ? <div className='alt-name'><p>{item.alt}</p></div> : null }
                  </div>;
                }
              })
            }
      </div>
    </>);
  }

}
class ImageAltContainer extends Component {

  constructor(props){
    super(props);
    this.state = {data:null,
      details:{
        title:'Heading Tags are used to define headings in a  page. h1 to h6 determines the importance that a heading has in the hierarchy.'
      }
    };
  }

  componentWillMount() {
    const obj = getFromStorage('static');
    this.setState({
      uid: obj.uid,
      website: obj.website,
    });
    console.log(obj.website + " and " + obj.uid);

    fetch('/task/imgNoAlt',{
      method:'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(data => data.json()).then( data =>   this.setState({data: data.data}));
  }

  render(){
    const {data,details} = this.state;
    if(data){
      console.log(data.imgAlt);
      return(<>
        <h6 className={'chart-name spaced'}>{this.props.name}</h6>
        <div className='seotest-container'>
          <ReportImageAlt name={"Images with no alternative"} details={data.imgAlt}  />
        </div>
      </>);
    }else{
      return (<>
        <div className='seotest-container'/>
      </>);
    }
  }


}

export default ImageAltContainer;
