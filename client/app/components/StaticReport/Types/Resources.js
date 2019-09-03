import React, { Component } from 'react'
import Slider from "react-slick"
import {Pie} from 'react-chartjs-2';
import  ReactTable from 'react-table';

class Resources extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataCha: {},
        color:['#FF6384', '#36A2EB', '#FFCE56', '#20c997', '#e083ff','#65f7c7','#7968ad',"#ebb249",'#f75eab','#5eadf7'],
        chartData: {},
    
      };
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
    }
    componentWillMount(){
         this.loadCharts();  
         this.loadCharts2();
   }
   loadCharts(){
     let data= this.props.data[0].details.items;
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
 
     for(let x = 0; x < iterator.length; x++){
       data_chart.datasets[0].data.push(indexArray[iterator[x]].count);
       data_chart.datasets[0].backgroundColor.push(this.state.color[x]);
       indexArray[iterator[x]].percentage =  ((indexArray[iterator[x]].total/total)*100).toFixed(2);
     }

     this.setState({chartData:data_chart});
   }

   loadCharts2(){
    let data= this.props.data[0].details.items;
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
      indexArray[iterator[x]].percentage =  ((indexArray[iterator[x]].total/total)*100).toFixed(2);
      table_data.push({resourceType:iterator[x],percentage: indexArray[iterator[x]].percentage,transferSize:indexArray[iterator[x]].total.toFixed(2),count:indexArray[iterator[x]].count});
    }

   for(let x= 0; x < table_data.length; x++){
    data_chart.datasets[0].data[x] = table_data[x].percentage;
   }

    this.setState({dataCha: data_chart});
    console.log(this.state);
  }




    next() {
      this.slider.slickNext();
    }
    previous() {
      this.slider.slickPrev();
    }
    render(){

        let {chartData,dataCha} = this.state;

        let {data,url} = this.props;
         
        const {settings} = this.props;
        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className='resource-container'>
                        <div id='pie-chart-container'>
                            <h6 className='chart-name'>Contenido por tipo</h6>
                            <Pie data={chartData}  />

                        </div>
                    </div>
                    <div className={"explanation"}>
                        <h6>Descripción</h6>
                        <p>El tamaño del contenido es una de las cosas mas importantes cuando queremos tiempos de carga rapidos, reducir el tamaño significa reducir drastricamente el tiempo de carga, es por eso por lo que controlar los archivos que son demasiados grantes en tamaño, e intentar reducirlos mediante minificacion, entre otras herramientas va a afectar positivamente en la experiencia de los usuarios</p>

                    </div> 
                </div> 
                <div>
                <div className='resource-container'>
                        <div id='pie-chart-container'>
                            <h6 className='chart-name'>Tamaño del contenido por tipo</h6>
                            <Pie data={dataCha}  />

                         
                        </div>
                    </div>
                    <div className={"explanation"}>
                        <h6>Descripción</h6>
                        <p>El tamaño del contenido es una de las cosas mas importantes cuando queremos tiempos de carga rapidos, reducir el tamaño significa reducir drastricamente el tiempo de carga, es por eso por lo que controlar los archivos que son demasiados grantes en tamaño, e intentar reducirlos mediante minificacion, entre otras herramientas va a afectar positivamente en la experiencia de los usuarios</p>
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


export default Resources;

  