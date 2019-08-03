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
        let {meta} = data;
        let meta_item = [];
        
        meta_item['viewport'] = "ViewPort not found";
        meta_item['robots'] = "robots not found";
        meta_item['author'] = "author not found";
        meta_item['Cache-Control'] =  "Cache-Control not found";
        meta_item['Expires'] = "Expires not found";
        meta_item['google-analytics'] =  "google-analytics not found";
        meta_item['og:title'] = "og:title not found";
        meta_item['og:description'] =  "og:description not found";
        meta_item['og:url'] =  "og:url not found";
        meta_item['og:image'] =  "og:image not found";
        meta_item['twitter:title'] =  "twitter:title not found";
        meta_item['twitter:description'] =  "twitter:description not found";
        meta_item['twitter:image'] =  "twitter:image not found";
        meta_item['twitter:card'] = "twitter:card not found";
        meta_item['copyright'] =  "copyright not found";
        meta_item['rating'] = "rating not found";
        meta_item['Content-Type'] = "Content-Type not found";

        meta.forEach((item)=>{
          switch(item.name){
            case 'viewport': meta_item['viewport'] = item.value;break
            case 'author': meta_item['author'] = item.value;break
            case 'Cache-Control': meta_item['Cache-Control'] = item.value;break
            case 'robots': meta_item['robots'] = item.value;break
            case 'Expires': meta_item['Expires'] = item.value;break
            case 'google-analytics': meta_item['google-analytics'] = item.value;break
            case 'og:title': meta_item['og:title'] = item.value;break
            case 'og:description': meta_item['og:description'] = item.value;break
            case 'og:url': meta_item['og:url'] = item.value;break
            case 'og:image': meta_item['og:image'] = item.value;break
            case 'twitter:title': meta_item['twitter:title'] = item.value;break
            case 'twitter:description': meta_item['twitter:description'] = item.value;break
            case 'twitter:image': meta_item['twitter:image'] = item.value;break
            case 'twitter:card': meta_item['twitter:card'] = item.value;break
            case 'copyright': meta_item['copyright'] = item.value;break
            case 'rating': meta_item['rating'] = item.value;break
            case 'Content-Type': meta_item['Content-Type'] = item.value;break

          }
        });
    

//                            <GooglePreview name={'Google Search Preview'} url={this.state.website} details={data} />

        const {settings} = this.props;
        let pattern = /^((http|https|ftp):\/\/)/;
        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"metaInfo-title"}>

                            <div className={"metaInfo-item"}><h5>Title</h5><p> {(data.title) ? data.title : "No title was found or it is empty"} </p></div> 
                            <div   className={"metaInfo-item"} ><h5>Description</h5><p> {(data.description) ? data.description : "No description was found, or description is empty"} </p></div> 
                            <div className={"metaInfo-item"} ><h5>Keywords</h5><p> {(data.keywords) ? data.keywords : "No keywords were found, or keywords meta is empty"} </p> </div> 
                            <div className={"metaInfo-item"} ><h5>Favicon(s)</h5>
                                <div className={"favicon-grid"}>
                            { 
                                data.favicon.map((item,i)=>{
                                    let fav;
                                    console.log(item.href);
                                    console.log(pattern.test(item.href));
                                    if(!pattern.test(item.href)) {
                                      
                                       if(item.href.slice(0, -4).includes(".")){
                                            fav = item.href;
                                        }else if(!pattern.test(url)){
                                        fav =  `http://${url}${item.href}`;
                                        }
                              
                                    }else{
                                        fav =  `${item.href}`;
                                    }
                                    return <div className="favicon-itemn" key={i} >
                                    <div className='favicon-preview'> <img alt="Report favicon preview" src={fav} /></div>
                                    </div>;
                                
                                })
                            }
                            {
                             (data.favicon.length === 0) ? "No favicons found" : null
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
                        <p>Metadata regarding title is one of the most important things to consider when we want a to show a clear vision of what your website is, setting a proper 
                           <code className="highlighter-rouge"> Title</code> metatag followed by a very detailed <code className="highlighter-rouge">Description</code> as well as a set of <code className="highlighter-rouge">Keywords</code> that can tell users which type of content your website is offering. Using this meta properly can ensure us that the target user is gonna increase since an overview of your web is properly given. </p>
                    </div> 
                </div> 
                <div>
                    <div className={"metaInfo-title"}>
                        <GooglePreview details={data} url />
                    </div>
                    
                </div>
               
                <div>
                    <div className={"metaInfo-title"}>
                            <div className={"metaInfo-item"}><h5>Cache-Control</h5><p> {(meta_item['Cache-Control'])} </p></div> 
                            <div   className={"metaInfo-item"} ><h5>Expires</h5><p> {(meta_item['Expires'])}</p></div> 
                            <div className={"metaInfo-item"}><h5>ViewPort</h5><p> {(meta_item['viewport'])} </p></div> 
                            <div   className={"metaInfo-item"} ><h5>Robots</h5><p> {(meta_item['robots'])}</p></div> 
                            <div className={"metaInfo-item"} ><h5>Rating</h5><p> {(meta_item['rating'])} </p> </div> 
                            <div className={"metaInfo-item"} ><h5>Content-Type</h5><p> {(meta_item['Content-Type'])} </p> </div> 


                    </div>
                    <div className={"explanation"}>
                        <h6>Description</h6>
                        <p>
                          <code className="highlighter-rouge"> Cache-Control</code> meta is very important, this tells if the page should be cacheable, within high trafic websites, this is a meta tag that should be controlled.
                          <code className="highlighter-rouge"> Expires </code> meta tells the search enginge when will the content in the page expire, this tag must be set to a date 
                         <code className="highlighter-rouge"> Robots </code>  meta controls the behavior of the search engine that is going to crawl and index our pages, it applies to all search engines.
                         <code className="highlighter-rouge">ViewPort </code> meta  tells the browser how it should render a page using a mobile device, the presence of this meta indicates google that this web is mobile friendly.
                         <code className="highlighter-rouge">Rating</code> meta tells wether the page is rated as adult content or not, this tag is very useful if we want to have control over SafeSearch
                        
                        </p>
                    </div> 
                </div>
                <div>
                    <div className={"metaInfo-title"}>
                            <div className={"metaInfo-item"}><h5>og:title</h5><p> {(meta_item['og:title'])} </p></div> 
                            <div   className={"metaInfo-item"} ><h5>og:description</h5><p> {(meta_item['og:description'])}</p></div> 
                            <div className={"metaInfo-item"} ><h5>og:url</h5><p> {(meta_item['og:url'])} </p> </div> 
                            <div className={"metaInfo-item"} ><h5>og:image</h5><p> {(meta_item['og:image'])} </p> </div> 
                          

                    </div>
                    <div className={"explanation "}>
                        <h6>Description</h6>
                        <p>   <code className="highlighter-rouge"> OpenGraph</code> and <code className="highlighter-rouge"> Twitter</code>  Metadatas are very used nowadays, these tags are used by social media websites such as Facebook or Twitter, this way you can make sure that your content is displayed as you want, and that the information that will be displayed is the correct one. This way you can increase the conversion rate due to more appealing content.</p>
                    </div> 
                </div>
                <div>
                    <div className={"metaInfo-title"}>
                           
                            <div className={"metaInfo-item"}><h5>twitter:title</h5><p> {(meta_item['twitter:title'])} </p></div> 
                            <div   className={"metaInfo-item"}><h5>twitter:description</h5><p> {(meta_item['twitter:description'])}</p></div> 
                            <div className={"metaInfo-item"} ><h5>twitter:image</h5><p> {(meta_item['twitter:image'])} </p> </div> 
                            <div className={"metaInfo-item"} ><h5>twitter:card</h5><p> {(meta_item['twitter:card'])} </p> </div> 

                    </div>
                    <div className={"explanation "}>
                        <h6>Description</h6>
                        <p>   <code className="highlighter-rouge"> OpenGraph</code> and <code className="highlighter-rouge"> Twitter</code>  Metadatas are very used nowadays, these tags are used by social media websites such as Facebook or Twitter, this way you can make sure that your content is displayed as you want, and that the information that will be displayed is the correct one. This way you can increase the conversion rate due to more appealing content.</p>
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
