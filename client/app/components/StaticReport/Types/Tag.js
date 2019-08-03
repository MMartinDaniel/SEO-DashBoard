import React, { Component } from 'react'
import RatingWidget from './../../SEO/block/RatingWidget'
import Slider from "react-slick"

class Tag extends Component {
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
        (data.canonical === ""  || !data.canonical) ? data.canonical = "No canonical tag found" : null;
        (data.lang === ""  || !data.lang) ? data.lang = "No lang tag found" : null;

        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"metaInfo-title"}>
                        <h6 className={"heading-tags"}>Heading Tags</h6>
                        <div className={"metaInfo-item h-t"}><h5>H1</h5><p> {data.h1} </p></div> 
                        <div   className={"metaInfo-item h-t"} ><h5>H2</h5><p> {data.h2} </p></div> 
                        <div className={"metaInfo-item h-t"} ><h5>H3</h5><p> {data.h3} </p> </div> 
                        <div className={"metaInfo-item h-t"} ><h5>H4</h5><p> {data.h4} </p> </div> 
                        <div className={"metaInfo-item h-t"} ><h5>H5</h5><p> {data.h5} </p> </div> 
                        <div className={"metaInfo-item h-t"} ><h5>H6</h5><p> {data.h6} </p> </div> 
                        <div className={"heading-tags-div"}>
                          <div>
                          <h6 className={"heading-tags"}>Canonical Tag</h6>
                          <div className={"metaInfo-item h-t"}><p>  {data.canonical} </p></div> 
                          </div>
                          <div>
                            <h6 className={"heading-tags"}>HTML Lang</h6>
                            <div className={"metaInfo-item h-t"}><p>  {data.lang} </p></div> 
                          </div>
                        </div>
                    </div> 
                    <div className={"explanation"}>
                        <h6>Description</h6>
                        <p>H tags, expecially the <code className="highlighter-rouge">H1</code> tag are very important to determine the main topic that the page is going to talk about. then  <code className="highlighter-rouge">H2</code> to <code className="highlighter-rouge">H6</code> which define a deeper and more concrete information about the main topic.<br>
                        </br>H1 tags are also very important for people with <a href='https://en.wikipedia.org/wiki/Visual_impairment'><code className="highlighter-rouge">Visual Impairment</code></a> since screen readers use H tags to describe the content of the current page. And since Google is very concerned about usability, this tags are really important. 
                        <br></br>
                        <br></br><code className="highlighter-rouge">Canonical</code> tags are very useful in terms of ranking, due to they specify which domain is important and which domain you actually want Google to rank.
</p>
                        
                        </div> 
                </div> 
                
            </Slider>
            <div className={"status-arrow"}>
          {false && (  <i onClick={this.next} className="fas  fa-chevron-right top-arrow status-arrow__right"/> ) }
            </div> 
            </>
        )
    }
}

export default Tag;
