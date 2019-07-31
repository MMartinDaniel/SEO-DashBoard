import React, { Component } from 'react'
import RatingWidget from './../../SEO/block/RatingWidget'
import Slider from "react-slick"

class BrokenLinks extends Component {
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
        console.log(data);
        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"minify-performance"} >
                       <div className="normal-size">
                            <h3></h3>
                            <h5>Total Size</h5>
                       </div>
                       <div className="minify-size">
                            <h3 className="saving"></h3>
                            <h5>Estimated Space saving</h5>

                        </div>
                    </div>
                    <div className={"explanation"}>
                        <h6>Description</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div> 
                </div> 
                <div>
                    <div className='broken-tile-container'>
                        {
                            ( data.length >= 0) ?
                                data.map(function(item, i){
                                  
                                    let icon = null;
                                    let type = 0;
                                    console.log(item.status);
                                    if(item.status == '404'){
                                        icon = "error-404.png"
                                        type =2;
                                    }else if(item.status == 'Script' ){
                                        icon = "icons8-javascript-48.png";
                                        type=1;
                                    }
                                    console.log(icon);
                                    return (
                                            <Tile key={i} icon={icon} item={item} />
                                    );
                                })

                                : null
                            }

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

export default BrokenLinks;

class Tile extends Component{
    constructor(props){
      super(props);
    };
  
    render(){
      const {icon,item,type} = this.props;
      let val = Math.abs(Math.floor((item.efficiency)*100));
      return(
        <>
          <div className="broken-item">
                <div className='broken-item-title'> 
                    <img src={'/assets/img/icon/' + icon }/>
                    <div className="broken-tile-text">
                        <p className="broken-tile-name"><a href={item.deadlink}>{item.deadlink}</a></p>
                        <p className="broken-tile-saving">Location: <a href={item.where}>{item.where}</a></p>
                    </div>
                </div>
                
          </div>
      </>);
    }
  }
/*
  <td><img src={'/assets/img/icon/' + icon }/></td>
  <td className='minify-name'>{item.name}</td>

  <td>{item.deadlink.resourceSize}</td>
  <td>{item.minifiedSize}</td>
  <td><div className="minified yesm">{Math.abs(Math.floor((item.efficiency)*100))}%</div></td>

  <td><a  href={"/api/minifier/minify?url="+ item.where+"?type="+type }><div className="minify-button">Minify</div></a></td>

  */