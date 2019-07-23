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
        return (
            <>
                <div>
                    <div className={"metaInfo-title"}>

                            <div className={"metaInfo-item"}><h5>Issuer</h5><p> {data.issuer} </p></div> 
                            <div   className={"metaInfo-item"} ><h5>Serial Number</h5><p> {data.SerialNumber} </p></div> 
                            <div className={"metaInfo-item"} ><h5>Subject Alt Name</h5><p> {data.subjectaltname} </p> </div> 
                            <div className={"metaInfo-item"} ><h5>Fingerprint</h5><p> {data.fingerprint} </p> </div> 

                            <div className={"metaInfo-item"} ><h5>Valid from</h5><p>{data.valid_from}</p></div>
                            <div className={"metaInfo-item"} ><h5>Valid from</h5><p>{data.valid_to}</p></div>

                    </div> 
                    <div className={"explanation"}>
                        <h6>Description</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>

            </>
        )
    }
}

export default Ssl;
