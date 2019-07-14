import React, { Component } from 'react';
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
  export default Tile;  