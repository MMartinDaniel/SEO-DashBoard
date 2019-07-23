import React, { Component } from 'react'
import RatingWidget from './../../SEO/block/RatingWidget'
import Slider from "react-slick"

class Minify extends Component {
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
        let {data} = this.props;
        const {settings} = this.props;
        let total_size = 0;
        let total_saving = 0;
        let total_items = 0;

        data.map(function(item){
            total_saving += (item.originalSize < item.minifiedSize) ? item.originalSize : item.minifiedSize;
            total_size+=item.originalSize;
            total_items++;
        });

        total_saving = total_size - total_saving;
        total_size = this.bytesToSize(total_size);
        total_saving = this.bytesToSize(total_saving);




        console.log(data);
        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"minify-performance"} >
                       <div className="normal-size">
                            <h3>{total_size}</h3>
                            <h5>Total Size</h5>
                       </div>
                       <div className="minify-size">
                            <h3 className="saving">{total_saving}</h3>
                            <h5>Estimated Space saving</h5>

                        </div>
                    </div>
                    <div className={"explanation"}>
                        <h6>Description</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div> 
                </div> 
                <div>
                    <div className='minify-tile-container'>
                        {
                            ( data.length >= 0) ?
                                data.map(function(item, i){
                                  
                                    let icon = null;
                                    let type = 0;
                                    if(item.deadlink.resourceType === 'Stylesheet'){
                                        icon = "icons8-css3-48.png"
                                        type =2;
                                    }else if(item.deadlink.resourceType === 'Script' ){
                                        icon = "icons8-javascript-48.png";
                                        type=1;
                                    }
                                    console.log(icon);
                                    return (
                                            <Tile key={i} icon={icon} item={item} type={type} />
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

export default Minify;

class Tile extends Component{
    constructor(props){
      super(props);
    };
  
    render(){
      const {icon,item,type} = this.props;
      let val = Math.abs(Math.floor((item.efficiency)*100));
      let color = ( val > 0 && val <= 20 ) ? 'orange' : ( val > 20) ? 'green' : 'red';
      val = (val >= 100) ? 0 : val;
      color = (val === 0 ) ? 'orange' : color;
      return(
        <>
          <div className="minify-item">
                <div className='minify-item-title'> 
                    <img src={'/assets/img/icon/' + icon }/>
                    <div className="minify-tile-text">
                        <p className="minify-tile-name">{item.name}</p>
                        <p className="minify-tile-saving">Saving:  <span className={color}>{val}%</span></p>
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