import React, { Component } from 'react'
import RatingWidget from './../../SEO/block/RatingWidget'
import Tile from './../../SEO/block/Tile'
import Slider from "react-slick"

class Performance extends Component {
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
        let data =[];
        data['speed-index'] = {title: 'speed index',displayValue:1.0};
        data['first-cpu-idle'] ={title: 'first cpu idle',displayValue:1.0};
        data['first-contentful-paint'] = {title: 'first contentful paint',displayValue:1.0};
        data['first-meaningful-paint'] ={title: 'first meaningful paint',displayValue:1.0};
        data['interactive'] = {title: 'Time to interactive',displayValue:1.0};
        var settings = {
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1

        };
        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"report-performance"} >
                        <RatingWidget name='Performance' percentage={'20'} />
                        <RatingWidget name='Accessibility'  percentage={'69'}/>
                        <RatingWidget name='Practices'  percentage={'80'}/>
                        <RatingWidget name='Seo Score'  percentage={'60'}/>

                    </div>
                    <div className={"explanation"}>
                        <h6>Description</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div> 
                </div> 
                <div>
                    <div className={"report-performance"} >
                        <div className='tile-container'>
                        <Tile data={data['speed-index']}/>
                        <Tile data={data['first-cpu-idle']}/>
                        <Tile data={data['first-contentful-paint']}/>
                        <Tile data={data['first-meaningful-paint']}/>
                        <Tile data={data['interactive']}/>
                        </div>
                    </div>
                    <div className={"explanation"}>
                        <h6>Description</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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

export default Performance;
