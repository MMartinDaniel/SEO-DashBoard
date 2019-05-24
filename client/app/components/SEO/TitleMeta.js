import React, { Component } from 'react';
import 'whatwg-fetch';
import {getFromStorage} from "../utils/storage";
import Report from './Report';

class ReportCloud extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    console.log(this.props);
    return(<>
      <div className='test-report'>
        <div className='report-name'>
          <strong>{this.props.name}</strong>
          <ul className='report-importance'>
          </ul>
        </div>
        <div className='report-info'>
          <div className='cloud-grid'>
          {
            this.props.details.map(function(item, i){
              return <div className="cloud-item" key={i}><strong>{item.name}</strong> <p>{item.value}</p></div>
            })
          }
          </div>
        </div>
      </div>
    </>);
  }

}
class TitleMetaContainer extends Component {

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

    fetch('/task/TitleMeta',{
      method:'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(data => data.json()).then( data =>   this.setState({data: data.data}));
  }

  render(){
    const {data,details} = this.state;
    console.log(data);

    if(data){
      return(<>
        <h6 className={'chart-name spaced'}>{this.props.name}</h6>
        <div className='seotest-container'>
          <Report name={"title"} details={data.title.data}  />
          <Report name={"Description"} details={data.description.data}  />
          <Report name={"Keywords"} details={data.keywords.data}  />
          <ReportCloud name={"Word Cloud"} details={data.cloud.data}  />

        </div>
      </>);
    }else{
      return (<>
        <div className='seotest-container'/>
      </>);
    }
  }


}

export default TitleMetaContainer;
