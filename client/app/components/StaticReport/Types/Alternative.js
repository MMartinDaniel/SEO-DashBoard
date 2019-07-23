import React, { Component } from 'react'
import RatingWidget from './../../SEO/block/RatingWidget'
import Slider from "react-slick"

class Alternative extends Component {
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
        let total = 0;
        data.map((item)=>{
            if(item.alt){
                if(item.alt.length > 0) total++;
            }
        })
        console.log(total/data.length);
        let color = ((total/data.length) < 0.5) ? 'red' : ((total/data.length) < 0.75) ? 'orange' : 'green';

        console.log(data);
        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"minify-performance"} >
                       <div className="normal-size">
                            <h3>{data.length}</h3>
                            <h5>Total Images</h5>
                       </div>
                       <div className="minify-size">
                            <h3 className={`noalt-${color}`}>{total}</h3>
                            <h5>Images with alternative</h5>

                        </div>
                    </div>
                    <div className={"explanation"}>
                        <h6>Description</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div> 
                </div> 
                <div>
                    <div className='noalt-tile-container'>
                        {
                            ( data.length >= 0) ?
                                data.map(function(item, i){
                                  
                            
                                    return (
                                            <Tile key={i} icon={"none"} item={item} type={"no"} />
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

export default Alternative;

class Tile extends Component{
    constructor(props){
      super(props);
    };
  
    render(){
      const {icon,item,type} = this.props;
      item.alt = (!item.alt) ? "No alternative Set" : item.alt;
      return(
        <>
          <div className="noalt-item">
                <div className='noalt-item-title'> 
                    <div className={"pic-wrapper"} ><a href={item.url} target="_blank"><img src={item.url}/></a> </div>
                    <div className="noalt-tile-text">
                        <p className="noalt-tile-name">{(item.alt.length === 0 ) ? "No alternative set" : item.alt}</p>
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