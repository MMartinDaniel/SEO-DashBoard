import React, { Component } from 'react';
import 'whatwg-fetch';
import {getFromStorage, setInStorage} from "../utils/storage";
import openSocket from "socket.io-client";
import ContentDisplay from "./Performance"
import SEOtest from './SEOtest'
import RatingWidget from './block/RatingWidget'
class SeoSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      link: '',
      web :''

    };

    this.handleWebsite = this.handleWebsite.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleWebsite(event){
      this.setState({web:event.target.value});
  };
  handleSubmit(){
    let item = getFromStorage('static');
    item.website = this.state.web;
    setInStorage('static',item);
  }
  render(){
    const site = this.props.web;
    let {web} = this.state;

    return (<>
      <div className='search-wrapper'>
        <i className="fas fa-search seo-search-icon"/>
        <form onSubmit={this.handleSubmit}>
         <input id='seo-search-bar' type='search'   onChange={this.handleWebsite} value={web} placeholder={site} />
        </form>
        </div>

      </>);
  }


}

class SEO extends Component {
  constructor(props) {
    super(props);

    this.state = {
      website: '',
      uid: '',
      phoneurl: '',
      desktopurl: '',
      tableturl: '',
      widgetValue:{performance:0,accesibility:0,practices:0,seoScoreo:0},
    };

    this.getPerformanceParameter = this.getPerformanceParameter.bind(this);

   }

  componentDidMount() {
    const obj = getFromStorage('static');
    this.setState({
      uid: obj.uid,
      website: obj.website,
      loading: false,
    });

    console.log(obj.website + " and " + obj.uid);

    fetch('/library/generateWebShot',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        web: obj.website,
        uid: obj.uid,
      })
    });



    this.socket = openSocket('http://localhost:80');
    console.log('webshotfile-' + obj.uid);
    this.socket.on('webshotfile-' + obj.uid, message => {
      console.log('received:' + message);
      //   this.setState({messages:[message, ...this.state.messages]})
      if (message.includes('desktop')) {
        this.setState({desktopurl:message});
      } else if(message.includes('phone')) {
        this.setState({phoneurl:message});
      }else{
        this.setState({tableturl:message});
      }
    });
  }

  getPerformanceParameter(updatevalue){
    console.log('value: ' + updatevalue);
    var current_state = this.state.widgetValue;
    current_state.performance = updatevalue;
    this.setState(current_state);
  };



  render() {

    const {phoneurl,tableturl,desktopurl,website,widgetValue} = this.state;

    console.log('updated: ');
    console.log(widgetValue);

    return (
      <>

        <div id='page-content-wrapper-seo'>
          <div className="'container-fluid">
              <div className="row">
                <div className='col-lg-12'>
                  <SeoSearch web={website}/>

                  <div className='mockupContainer'>

                    <div className="container-ipad">
                      <img src="/assets/img/ipad-mock.png" alt="iPhone"
                           className="ipad"/>
                      <img id='tablet-placeholder'
                           src={ tableturl !== "" ? "/assets/img/" + tableturl : "/assets/img/empty.jpg" } alt="App Mockup"
                           className="screen-ipad"/>
                    </div>
                    <div className="container-iphone">
                      <img src="http://madebyfalcon.co.uk/wp-content/uploads/2018/01/iphone-x.png" alt="iPhone"
                           className="iphone"/>
                      <img id='phone-placeholder' src={ phoneurl !== "" ? "/assets/img/" + phoneurl : "/assets/img/empty.jpg" } alt="App Mockup"
                           className="screen"/>
                    </div>

                    <div className="container-laptop">
                      <img src="/assets/img/laptop.png" alt="iPhone"
                           className="laptop"/>
                      <img id='desktop-placeholder'
                           src={ desktopurl !== "" ? "/assets/img/" + desktopurl : "/assets/img/empty.jpg" } alt="App Mockup"
                           className="screen-laptop"/>
                    </div>
                  </div>


              </div>
            </div>
          </div>
        </div>
        <div className="seo-report">
          <div className="'container-fluid">
            <div className='row'>
              <div className='col-lg-12 '>
                <div className="card">
                    <div className='card-body'>

                      <div className="tab-panel m-b-30">
                        <ul className="nav nav-tabs primary-tabs">
                          <li className="nav-item" role="presentation"><a href="#tab-3" className="nav-link active show blue"
                                                                          data-toggle="tab"
                                                                          aria-expanded="true"><i
                            className="far fa-file-alt"/> Report</a></li>
                          <li className="nav-item" role="presentation"><a href="#tab-4" className="nav-link red"
                                                                          data-toggle="tab"
                                                                          aria-expanded="true"><i className="fas fa-times"/> Errors</a></li>
                          <li className="nav-item" role="presentation"><a href="#tab-5" className="nav-link orange"
                                                                          data-toggle="tab"
                                                                          aria-expanded="true"><i className="fas fa-exclamation"/> Warnings</a></li>
                          <li className="nav-item" role="presentation"><a href="#tab-6" className="nav-link green"
                                                                          data-toggle="tab"
                                                                          aria-expanded="true"><i className="fas fa-check"/> Passed</a></li>
                        </ul>
                        <div className="tab-content">
                          <div className="tab-pane fadeIn active show" id="tab-3">
                            <div className="widget-container">
                              <RatingWidget name='Performance' percentage={widgetValue.performance} />
                              <RatingWidget name='Accessibility'  percentage={widgetValue.accesibility}/>
                              <RatingWidget name='Practices'  percentage={widgetValue.practices}/>
                              <RatingWidget name='Seo Score'  percentage={widgetValue.seoScoreo}/>
                            </div>
                            <h5 className='content-title'>Performance</h5>
                                <ContentDisplay  onLoadedPerformance={this.getPerformanceParameter} />
                            <h5 className='content-title'>SEO Report</h5>
                                <SEOtest />
                          </div>
                          <div className="tab-pane fadeIn" id="tab-4">
                            <p>Schlitz enamel pin neutra succulents bespoke, dreamcatcher tattooed flannel man bun la
                              croix YOLO readymade chicharrones poke. Selfies ramps brooklyn microdosing church-key
                              sustainable, keytar next level chicharrones PBR&amp;B. Mlkshk schlitz
                              whatever, twee wolf godard banh mi try-hard meh bitters irony. Cronut williamsburg shabby
                              chic, typewriter vape skateboard post-ironic lo-fi YOLO shoreditch iceland.</p>
                          </div>
                        </div>
                      </div>



                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SEO;
