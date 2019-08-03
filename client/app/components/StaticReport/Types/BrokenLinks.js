import React, { Component } from 'react'
import RatingWidget from './../../SEO/block/RatingWidget'
import {Pie} from 'react-chartjs-2'; 
import Slider from "react-slick"

class BrokenLinks extends Component {
    constructor(props) {
      super(props);
      this.state = {
        color:['#FF6384', '#36A2EB', '#FFCE56', '#20c997', '#e083ff'],
        chartData: {},
        total_broken: 0,
    
      };
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
    }
    componentWillMount(){
      this.loadCharts();  
}
  loadCharts(){
    let {data} = this.props; 
    let total_broken = this.state.total_broken;
    let data_chart={labels:[],datasets:[{data:[],backgroundColor: [],hoverBackgroundColor:[]}]};
   
    let index_arr = [];
    for (let i = 0; i < data.length; i++){
      (index_arr[data[i].status] > -1) ? index_arr[data[i].status]++ : index_arr[data[i].status] = 1;
      total_broken++;
    }
    var iterator = Object.keys(index_arr);
    for(let x = 0; x < iterator.length; x++){
      data_chart.labels.push(iterator[x]);
      data_chart.datasets[0].data.push(index_arr[iterator[x]]);
      data_chart.datasets[0].backgroundColor.push(this.state.color[x]);
      data_chart.datasets[0].hoverBackgroundColor.push(this.state.color[x]);
    }
  console.log(data_chart);
  this.setState({chartData:data_chart,total_broken:total_broken});
  }
    next() {
      this.slider.slickNext();
    }
    previous() {
      this.slider.slickPrev();
    }

    render(){
        let {data,total} = this.props;
        let {chartData,total_broken} = this.state;
        const {settings} = this.props;
        console.log(data);
        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"minify-performance"} >
                       <div className="normal-size">
                            <h3>{total}</h3>
                            <h5>Total link visited</h5>
                       </div>
                       <div className="minify-size">
                            <h3 className="not-found-link">{total_broken}</h3>
                            <h5>Total unsuccessful requests </h5>
                        </div>
                    </div>
                    <div className={"explanation bk-explanation"}>
                        <h6>Description</h6>
                        <p>Broken links is something that will affect every web that is being updated from time to time, we can't have a control of external website status, so is important to have a control with the links that are being linked in the content. Broken link cause frustration to users of the site, since is content that should be available is not, specially if that link is relevant or needed in order to proceed with another process.</p>
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
                <div>
                    <div className={"minify-performance bk-chart"} >
                       <div className="normal-size"> 
                       <h5 >Bad request by type </h5>

                        <div className={'bk-chart'}>  <Pie data={chartData}  />
                                                        </div>
                       </div>
                      
                    </div>
                    <div className={"explanation bk-explanation"}>
                        <h6>HTTP request status code guide</h6>
                        <p>
                        <code className="highlighter-rouge">2XX</code> requests that are successful.<br></br>
                        <code className="highlighter-rouge">3XX</code> requests are Redirections<br></br>
                        <code className="highlighter-rouge">4XX</code> requests are errors by client Side.<br></br>
                        <code className="highlighter-rouge">5XX</code> requests are errors by Server Side.<br></br>

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
                    <p className="status-deadlink">{item.status}</p>
                    <div className="broken-tile-text">
                        <p className="broken-tile-name"><a href={item.deadlink}>{item.deadlink}</a></p>
                        <p className="broken-tile-saving">Location: <a href={item.where}>{item.where}</a></p>
                    </div>
                </div>
                
          </div>
      </>);
    }
  }
/*  // THISSS <img src={'/assets/img/icon/' + icon }/>
  <td><img src={'/assets/img/icon/' + icon }/></td>
  <td className='minify-name'>{item.name}</td>

  <td>{item.deadlink.resourceSize}</td>
  <td>{item.minifiedSize}</td>
  <td><div className="minified yesm">{Math.abs(Math.floor((item.efficiency)*100))}%</div></td>

  <td><a  href={"/api/minifier/minify?url="+ item.where+"?type="+type }><div className="minify-button">Minify</div></a></td>

  */