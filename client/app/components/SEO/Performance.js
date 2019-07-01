import {Component} from "react";
import React from "react";
import {Pie} from 'react-chartjs-2';
import openSocket from "socket.io-client";
import {getFromStorage} from "../utils/storage";
import  ReactTable from 'react-table';

class Tile extends Component{
  constructor(props){
    super(props);
  };

  render(){
    const {data} = this.props;
    return(
      <>
        <div className="speed-item"><div className='tile-data'> <h6>{data.title}</h6><p>{data.displayValue}</p></div></div>
    </>);
  }
}

class Pagespeed extends Component{
  constructor(props){
    super(props);
      this.state = {
        data: null,
      }
    }

    componentWillMount(){

      let pattern = /^((http|https|ftp):\/\/)/;
      let url = "";
      if(!pattern.test(this.props.url)) {
        url = "http://" + this.props.url;
      }else{
        url = this.props.url;
      }

      fetch('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url='+url+'&category=performance').then(response => response.json())
        .then(data => this.setState({data:data.lighthouseResult.audits}));
    }

    render(){
     let {data} = this.state;
    if(data){
      return (<>

        <div className='tile-container'>
          <Tile data={data['speed-index']}/>
          <Tile data={data['first-cpu-idle']}/>
          <Tile data={data['first-contentful-paint']}/>
          <Tile data={data['first-meaningful-paint']}/>
          <Tile data={data['speed-index']}/>
          <Tile data={data['interactive']}/>
        </div>

      </>);
    }



     if(data && false){
       return (<><ul>
         {
           data.lighthouseResult.audits['network-requests'].details.items.map(function (items, i) {
             return <li key={i}>
               {items.url}
               {items.statusCode}
             </li>;

           })
         }

       </ul> </>);
     }else{ return <></>};

    };
}

class ContentDisplay extends Component {
  constructor(props){
    super(props);
    const obj = getFromStorage('static');

    this.state = {
      data: [],
      color:['#FF6384', '#36A2EB', '#FFCE56', '#20c997', '#e083ff'],
      chartData: {},
      uid: obj.uid,
      web: obj.website,
    };
  }
  componentWillMount(){
    const obj = getFromStorage('static');


    this.setState({
      uid: obj.uid,
      web: obj.website,
    });


    let pattern = /^((http|https|ftp):\/\/)/;
    let url = "";
    if(!pattern.test(this.state.web)) {
      url = "http://" + this.state.web;
    }else{
      url = this.state.web;
    }

    fetch('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url='+url+'&category=performance').then(response => response.json())
      .then(data => {
        this.setState({data:data.lighthouseResult.audits['network-requests'].details.items});
        this.props.onLoadedPerformance(60);
      //  this.props.onLoadedPerformance(parseInt(data.lighthouseResult.categories.performance.score)*100);
        this.loadCharts();
      });


  }
  loadCharts(){
  console.log('hello');
    let {data} = this.state;
    let total = 0;
    var index = 0;
    var indexArray =[];

    let data_chart={labels:[],datasets:[{data:[],backgroundColor: [],hoverBackgroundColor:[]}]};
    for (let i = 0; i < data.length; i++){
      if(data_chart.labels.indexOf(data[i].resourceType) === -1 ){
        data_chart.labels.push(data[i].resourceType);
        indexArray[data[i].resourceType] = {index: index,total:0,count: 0,percentage: 0};
        index++;
      }
      total += (data[i].transferSize/1000);
      indexArray[data[i].resourceType].total +=  (data[i].transferSize/1000);
      indexArray[data[i].resourceType].count ++;
    }

    var iterator = Object.keys(indexArray);
    let table_data = [];

    for(let x = 0; x < iterator.length; x++){
      data_chart.datasets[0].data.push(indexArray[iterator[x]].count);
      data_chart.datasets[0].backgroundColor.push(this.state.color[x]);
      indexArray[iterator[x]].percentage =  ((indexArray[iterator[x]].total/total)*100).toFixed(2) + '%';
      table_data.push({resourceType:iterator[x],percentage: indexArray[iterator[x]].percentage,transferSize:indexArray[iterator[x]].total.toFixed(2),count:indexArray[iterator[x]].count});
    }

    this.setState({chartData:data_chart,data: table_data});
  }

  render(){
    let {chartData,data,web} = this.state;
   // console.log(chartData);
   // console.log(data);

    const columns = [{
      Header: 'Type',
      accessor: 'resourceType' // String-based value accessors!
    },{
      Header: 'Percentage',
      accessor: 'percentage'
    },{
      Header: 'Size(KB)',
      accessor: 'transferSize'
    },{
      Header: 'Amount',
      accessor:'count'
    }

    ];

    return (<>
          <div className='resource-container'>
            <div id='pie-chart-container'>
              <h6 className='chart-name'>Content amount by type</h6>
              <Pie data={chartData}  />
            </div>
            <div id='pie-table-container'>
              <h6 className='chart-name'>Content Size by type</h6>

              <ReactTable
                data={data}
                columns={columns}
                defaultPageSize={5}
                showPagination={false}
              />
            </div>

            <div id='pie-speed-container'>
              <h6 className='chart-name'>Speed Metrics</h6>
              <Pagespeed url={web} />
            </div>
          </div>
    </>);
  }

}

export default ContentDisplay;


