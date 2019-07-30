import React, { Component } from 'react'
import Slider from "react-slick"

class Indexation extends Component {
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
        let {total,url} = data;
        console.log(data);

        const {settings} = this.props;
        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"minify-performance"} >
                       <div className="normal-size">
                            <h3>{total}</h3>
                            <h5>Total Url's in Sitemap</h5>
                       </div>
                    
                    </div>
                    <div className={"explanation"}>
                        <h6>Description</h6>
                        <p><code class="highlighter-rouge">Sitemap</code> is in general very related to how Google indexes pages, the Sitemap XML help Google by making his life easier due to some pages are doesn't have other pages pointing to them.
                        It is a good practice to use the <a href='https://search.google.com/search-console/'><code class="highlighter-rouge">Google Search Console</code></a>  to see if your pages has been actually been indexed by Google.
                        </p>
                    </div> 
                </div> 
                <div>
                    <div className={"metaInfo-title"}>
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
