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
       
        let {data} = this.props;
        const {settings} = this.props;
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
                            {
                                data.map((item,i)=>{
                                    return <Tile key={i} data={item} />
                                })
                            }
                      
                        </div>
                    </div>
                    <div className={"explanation"}>
                        <h6>Description</h6>
                        <p>
                            <code className="highlighter-rouge">First Contentful Paint</code> marks the time at which the first text or image is painted.<br></br>
                            <code className="highlighter-rouge"> Speed Index </code>shows how quickly the contents of a page are visibly populated.<br></br>
                            <code className="highlighter-rouge"> Time to interactive</code> is the amount of time it takes for the page to become fully interactive.<br></br>
                            <code className="highlighter-rouge">First Meaningful Paint</code>  measures when the primary content of a page is visible.<br></br>
                            <code className="highlighter-rouge">First CPU Idle</code>  marks the first time at which the page's main thread is quiet enough to handle input.<br></br>
                            <code className="highlighter-rouge">Maximum potential First Input Delay</code>  that your users could experience is the duration, in milliseconds, of the longest task.<br></br>
                        </p>
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
