import React, { Component } from 'react'
import Slider from "react-slick"
class MetaInfo extends Component {
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
        let {data,url} = this.props;
        console.log(data);
//                            <GooglePreview name={'Google Search Preview'} url={this.state.website} details={data} />

        const {settings} = this.props;
        let pattern = /^((http|https|ftp):\/\/)/;
        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"metaInfo-title"}>

                            <div className={"metaInfo-item"}><h5>Title</h5><p> {data.title} </p></div> 
                            <div   className={"metaInfo-item"} ><h5>Description</h5><p> {data.description} </p></div> 
                            <div className={"metaInfo-item"} ><h5>Keywords</h5><p> {data.keywords} </p> </div> 
                            <div className={"metaInfo-item"} ><h5>Favicon(s)</h5>
                                <div className={"favicon-grid"}>
                            { 

                                data.favicon.map((item,i)=>{
                                    let fav;
                                    if(!pattern.test(item.href)) {
                                        if(item.href.slice(0, -4).includes(".")){
                                            fav = item.href;
                                        }else if(!pattern.test(url)){
                                        fav =  `http://${url}${item.href}`;
                                        }
                                    }else{
                                        fav =  `${url}${item.href}`;
                                    }
                                    return <div className="favicon-itemn" key={i} >
                                    <div className='favicon-preview'> <img alt="Report favicon preview" src={fav} /></div>
                                    </div>;
                                
                                })
                            }
                            </div>
                          </div>
                          <div className={"metaInfo-item"} > 
                          {(false) ? <h5>Word Cloud</h5> : null }
                            { (false) ? 
                                data.wordCloud.map(function(item, i){
                                return <div className="cloud-item" key={i}><strong>{item.name}</strong> <p>{item.value}</p></div>
                                })
                                : null
                            } 
                             </div>
                           

                    </div>
                    <div className={"explanation"}>
                        <h6>Description</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    </div> 
                </div> 
                <div>
                    <div className={"metaInfo-title"}>
                        <GooglePreview details={data} url />
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





class GooglePreview extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render(){
      console.log(this.props);
      return(<>
        <div className=''>
          <h6 className="chart-name spaced">Desktop Preview</h6>
  
          <div className='google-preview-container'>
            <div className='desktop'>
              <p className='title'>{this.props.details.title}</p>
              <p className='url'>{this.props.url}</p>
              <p className='description'>{this.props.details.description}</p>
            </div>
          
          </div>
          <h6 className="chart-name spaced mobile">Mobile Preview</h6>
          <div className='google-preview-container'>
                <div className='mobile'>
                <p className='title'>{this.props.details.title}</p>
                <p className='url'>{this.props.url}</p>
                <p className='description'>{this.props.details.description}</p>
                </div>
            </div>
        </div>
      </>);
    }
  
  }
   
export default MetaInfo;
