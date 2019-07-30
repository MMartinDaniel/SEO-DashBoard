import React, { Component } from 'react'
import RatingWidget from './../../SEO/block/RatingWidget'
import Slider from "react-slick"

class Ssl extends Component {
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
        const {settings} = this.props;
        if(!data){data = {}}
        return (
            <>
                <div>
                    <div className={"metaInfo-title"}>
                        <div className={"metaInfo-item"}><h5>Issuer</h5><p> {(data.issuer) ? data.issuer : "No issuer found"} </p></div> 
                        <div className={"metaInfo-item"}><h5>Serial Number</h5><p> {(data.SerialNumber) ? data.SerialNumber: "No serial Number found"} </p></div> 
                        <div className={"metaInfo-item"}><h5>Subject Alt Name</h5><p> {(data.subjectaltname) ? data.subjectaltname : "No subject alt name found"} </p> </div>
                        <div className={"metaInfo-item"}><h5>Fingerprint</h5><p> {(data.fingerprint) ? data.fingerprint : "no fingerprint found"} </p> </div> 
                        <div className={"metaInfo-item"}><h5>Valid from</h5><p>{(data.valid_from) ? data.valid_from : "No valid SSL certificate found" }</p></div>
                        <div className={"metaInfo-item"}><h5>Valid from</h5><p>{(data.valid_to) ? data.valid_to : "No valid SSL certificate found"}</p></div>
                    </div> 
                    <div className={"explanation"}>
                        <h6>Description</h6>
                        <p>SSL Certificates are very important if you want to give a secure image to the users visiting your website, 
                          specially when <code className="highlighter-rouge"> sensitive data </code> is being used. Using a SSL certificate keep data secure between servers,
                           as well as increasing your Google Ranking through customer trust and improving <code className="highlighter-rouge"> conversion rates</code>
                          SSL also affirm that your identify is real, when a SSL certification is installed, there is a <code className="highlighter-rouge">Certificate Authority</code> that validates that the indentify is correct and real.
                           </p>
                    </div>
                </div>

            </>
        )
    }
}

export default Ssl;
