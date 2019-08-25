import React, { Component } from 'react'
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
    bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
     }
    render(){
       
        let {data,headers} = this.props;
        const {settings} = this.props;
        console.log(this.props);
         let mb = (data[5]) ? this.bytesToSize(data[5]) : " No network requests found";
        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"report-performance"} >
                        <div className={"metaInfo-item"}><h5>Cache Control</h5><p> {(headers[0].cachecontrol) ? headers[0].cachecontrol : "No cache control header found"} </p></div> 
                        <div className={"metaInfo-item"}><h5>Content-Encoding</h5><p> {(headers[0].contentencoding) ? headers[0].contentencoding: "No Content Encoding header found"} </p></div> 
                        <div className={"metaInfo-item"}><h5>Total Network Request Size</h5><p> {mb} </p></div>
                        <div className={"metaInfo-item"}><h5>HTTP Request Status</h5><p> {(headers[0].status) ? headers[0].status : "No HTTP status found"} </p> </div>
                        <div className={"metaInfo-item"}><h5>Url</h5><p> {(headers[0].url) ? headers[0].url : "No url found"} </p> </div>

                         
                    </div>
                    <div className={"explanation m-t"}>
                        <h6>Description</h6>
                        <p>
                        <code className="highlighter-rouge">Cache Control</code> header is used to specify directives for caching, the options can be set as public, private, no-cache and only-if-cached, this header is followed by a expiration time of the cache<br></br>
                        <code className="highlighter-rouge">Content-Encoding</code> is used to determine if the content is compressed, when present, its value defines the type of compression applied<br></br>
                        <code className="highlighter-rouge">Total Network Request Size</code> Is the total of network resources that this website requires when loading<br></br>
                        <code className="highlighter-rouge">HTTP request Status</code> refers to the HTTP response got when  accesing the URL. 
                        </p>
                        </div> 
                </div> 
                <div>
                    <div className={"report-performance"} >
                        <div className='tile-container'>
                            {
                                data.map((item,i)=>{
                                    if(i < 5){
                                         return <Tile key={i} data={item} />
                                    }
                                })
                            }
                      
                        </div>
                    </div>
                    <div className={"explanation m-t-s"}>
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
//                         <div className={"metaInfo-item"}><h5>Content Length</h5><p> {(headers[0].contentlength) ? headers[0].contentlength : "no expiration header found"} </p></div>

//                        <div className={"metaInfo-item"}><h5>Expires</h5><p> {(headers[0].expires) ? headers[0].expires : "No content length header found"} </p> </div>
//                        <code className="highlighter-rouge">Expires</code> marks the time at which the first text or image is painted.<br></br>
