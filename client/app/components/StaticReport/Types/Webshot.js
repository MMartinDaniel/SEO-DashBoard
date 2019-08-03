import React, { Component } from 'react'
import RatingWidget from './../../SEO/block/RatingWidget'
import Tile from './../../SEO/block/Tile'
import Slider from "react-slick"

class Webshot extends Component {
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
       
        let {tabletPic,phonePic,desktopPic} = this.props.data;
        const {settings} = this.props;
        const location2 ='/assets/img/webshots/';

        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"report-webshot"} >
                        <div className='mockupContainer'>

                            <div className="container-ipad">
                            <img src="/assets/img/ipad-mock.png" alt="iPhone"
                                className="ipad"/>
                            <img id='tablet-placeholder'
                                src={ tabletPic !== "" ? location2+tabletPic : "/assets/img/empty.jpg" } alt="App Mockup"
                                className="screen-ipad"/>
                            </div>
                         
                          

                        </div>
                    </div>
                    <div className={"explanation extra-s"}>
                        <h6>Description</h6>
                        <p>Preview of how the web will look when accesing it via Tablet.</p>
                    </div> 
                </div> 
                <div>
                    <div className={"report-webshot"} >
                        <div className='mockupContainer'>
                        <div className="container-iphone">
                            <img src="http://madebyfalcon.co.uk/wp-content/uploads/2018/01/iphone-x.png" alt="iPhone"
                                className="iphone"/>
                            <img id='phone-placeholder' src={ phonePic !== "" ?  location2+phonePic : "/assets/img/empty.jpg" } alt="App Mockup"
                                className="screen"/>
                            </div>
                        </div>
                    </div>
                    <div className={"explanation extra-s"}>
                        <h6>Description</h6>
                        <p>Preview of how the web will look when accesing it via mobile.</p>
                    </div> 
                </div> 
                <div>
                    <div className={"report-webshot"} >
                    <div className='mockupContainer'>
                        <div className="container-laptop">
                                <img src="/assets/img/laptop.png" alt="iPhone"
                                    className="laptop"/>
                                <img id='desktop-placeholder'
                                    src={ desktopPic !== "" ? location2+desktopPic : "/assets/img/empty.jpg" } alt="App Mockup"
                                    className="screen-laptop"/>
                                </div>
                        </div>
                    </div>
                    <div className={"explanation extra-s"}>
                        <h6>Description</h6>
                        <p>Preview of how the web will look when accesing it via a desktop computer or either a laptop.</p>
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

export default Webshot;
