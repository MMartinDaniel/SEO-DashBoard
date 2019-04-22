import React, { Component } from 'react';
import 'whatwg-fetch';
import {getFromStorage} from "../utils/storage";
import openSocket from "socket.io-client";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render(){
    return(<>
      <div className='test-report'>
        <div className='report-name'>
          <label><i className="fas fa-check"/></label><strong>  headers</strong>
          <ul className='report-importance'>
            <li className='full'/><li className='full'/>
            <li className='full'/><li className='full'/>
            <li className=''/>
          </ul>
        </div>
        <div className='report-info'>
          <p>Schlitz enamel pin neutra succulents bespoke, dreamcatcher tattooed flannel man bun la
            croix YOLO readymade chicharrones poke. Selfies ramps brooklyn microdosing church-key
            sustainable, keytar next level chicharrones PBR&amp;B. Mlkshk schlitz
            whatever, twee wolf godard banh mi try-hard meh bitters irony. Cronut williamsburg shabby
            chic, typewriter vape skateboard post-ironic lo-fi YOLO shoreditch iceland.</p>
        </div>
      </div>
    </>);
  }

}

class SEOtest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render(){
    return(<>

      <div className='seotest-container'>
        <Report/>
        <Report/>
        <Report/>
      </div>
    </>);
  }

}
export default SEOtest;
