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
class ReportFavicon extends Component {
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
                return <div className="" key={i}><strong>{item.name}</strong> <img className='favicon-preview' alt="Report favicon preview" src={item.href} /></div>
              })
            }
          </div>
        </div>
      </div>
    </>);
  }

}


class GooglePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    console.log(this.props);
    return(<>
        <div className='google-preview-container'>
          <div className='desktop'>
            <p className='title'>{this.props.details.title.data}</p>
            <p className='url'>{this.props.url}</p>
            <p className='description'>{this.props.details.description.data}</p>
          </div>
          <div className='mobile'>
            <p className='title'>{this.props.details.title.data}</p>
            <p className='url'>{this.props.url}</p>
            <p className='description'>{this.props.details.description.data}</p>
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
          <ReportFavicon name={'Favicon'} details={data.favicon.data} />
          <GooglePreview name={'Google Search Preview'} url={this.state.website} details={data} />

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
