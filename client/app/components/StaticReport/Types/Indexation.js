import React, { Component } from 'react'
import Slider from "react-slick"
import {Link} from 'react-router-dom'
import axios from 'axios';

class Indexation extends Component {
    constructor(props) {
      super(props);

      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
    }

    componentWillMount(){
  
    }
    next() {
      this.slider.slickNext();
    }
    previous() {
      this.slider.slickPrev();
    }
    render(){
        let {data} = this.props;
        let {total,url,robots} = data;
        
        console.log(data);
        let id  = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        const {settings} = this.props;
        const pStyle = {
            color: '#77c29f',
            textDecoration : 'none'
          };
          
        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"minify-performance"} >
                       <div className="normal-size">
                            <h3>{total}</h3>
                            <h5>Total Url's in Sitemap</h5>
                       </div>
                       <div className="normal-size">
                            <h3>  <Link to={"/library/sitemap/"+id}  style={pStyle} className='site-down' target="_blank" >Download</Link></h3>
                            <h5>Download the Sitemap</h5>
                       </div>
                    </div>
                    <div className={"explanation ptop"}>
                        <h6>Description</h6>
                        <p><code className="highlighter-rouge">Sitemap</code> is in general very related to how Google indexes pages, the Sitemap XML help Google by making his life easier due to some pages are doesn't have other pages pointing to them.
                        It is a good practice to use the <a href='https://search.google.com/search-console/'><code className="highlighter-rouge">Google Search Console</code></a>  to see if your pages has been actually been indexed by Google.
                        <br></br>Sitemaps also keep tract of the amount of links that a website has, making it easy to access all links within a website.
                        </p>
                    </div> 
                </div> 
                <div>
                    <div className={"metaInfo-title"}>
                    <h6>Robots</h6>
                    {(!robots || (robots.length <= 1)) ?
                        (<p>Robots.txt not found</p>
                    ) : null
                }

                      
                      {(robots && (robots.length > 1) && (
                        <div className={"robot-div"}>
                            <div className="robot-scroll">
                                {   robots.map((rule,i) => {
                                    var css = (rule.includes("Allow:")) ? "robot-green" : (rule.includes("User-agent:")) ? "robot-agent" : "robot-red";
                                    if(rule === "") return null
                                return (<div  key= {i}  className={`${css} robot-item`}>             {rule}                 </div> )
                                    })
                                }
                            </div>
                        </div>
                     )) }
                    </div>
                    <div className={"explanation "}>
                        <h6>Description</h6>
                        <p><code className="highlighter-rouge">Robots.txt </code>
                        is a file that tells search engines that crawls websites which pages or files can or can not request from a certain web. This kind of files is used to avoid overloading the site with request. It is mainly used to manage crawler traffic and exclude parts of your website. This file should be place on the root of the web.
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

export default Indexation;
