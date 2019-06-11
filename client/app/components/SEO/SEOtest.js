import React, { Component } from 'react';
import 'whatwg-fetch';
import {getFromStorage} from "../utils/storage";
import openSocket from "socket.io-client";
import SEO from "./SEO";
import TitleMetaContainer from './TitleMeta';
import Report from './Report';
import ImageAltContainer from "./ImageAlt";
import SslCertContainer from "./SslCert";

/*            <label><i className="fas fa-check"/></label>
             <li className='full'/><li className='full'/>
            <li className='full'/><li className='full'/>
            <li className=''/>
*/




class HContainer extends Component {

  constructor(props){
    super(props);
    this.state = {data:null,
      details:{
      h: Tags[0].h.info,
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

    fetch('/task/h',{
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
      return(<>
        <h6 className={'chart-name spaced'}>{this.props.name}</h6>
        <div className='seotest-container'>
          <Report name={"H1 Tag"} value={data.h1} details={details.h} />
          <Report name={"H2 Tag"} value={data.h2} details={details.h} />
          <Report name={"H3 Tag"} value={data.h3} details={details.h} />
        </div>
      </>);
    }else{
      return (<>
        <div className='seotest-container'/>
      </>);
    }
  }


}


class SEOtest extends Component {
  constructor(props) {
    super(props);
    this.state = {data: null};
  }

  render(){

      return(<>
        <div className='seotest-container'>
          <HContainer name='H Tags'/>
          <TitleMetaContainer name='meta and Title'/>
          <ImageAltContainer name="Missing alternative text on images"/>
          <SslCertContainer name='HTTPS and SSL certificate information'/>

        </div>
      </>
      );
  }

}
export default SEOtest;
const Tags =[
  {
    h: {h1: '', h2: 'fas fa-home', h3: '',h4:'',info:'Heading Tags are used to define headings in a  page. h1 to h6 determines the importance that a heading has in the hierarchy.'},
  },
];

// Usar JSON-LD -> https://developers.google.com/search/docs/guides/intro-structured-data?hl=es-419 , https://webcode.tools/json-ld-generator/article
// Enable compresion with gzip or deflate,
// Minify CSS
// Minify javascript
// Optimize images
// Document has a [lang attribute]
// Page has Doctype
// Has a <meta name='viewport"> tag with witdh or initial-scale
// Add expires headers
//
const tener_encuenta = [
  {title: 'Title should be 50-60 characters'},
  {description:' description should be between 150-160 characters'},
  {keywords: 'Meta Keywords are obsolete, google does not anymore uses them, you should remove them'},
  {robots: 'Robots.txt not found, creating a robots.txt is important to tell search engines what pages they should not visit.'},
  {sitemap: 'Sitemap not found , Sitemaps can help the search engine to understand your web structure'},
  {favicon: 'Favicon not found.'},

];
