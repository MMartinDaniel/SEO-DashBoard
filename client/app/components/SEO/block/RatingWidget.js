import React, { Component } from 'react';

class RatingWidget extends Component{
    constructor(props){
      super(props);
      this.state = {
        currentGradient: '',
        percentage:0,
      };
    }
  
    render(){
  
      let { currentGradient} = this.state;
      let percentage = this.props.percentage;
      let rating,styleInside;
      if(percentage == 0){
        currentGradient = 'gradient';
        styleInside={color:'#BF3A30', marginLeft:'50px'};
        rating = percentage;
      }
      else if (percentage <= 25){
        currentGradient = 'gradient';
        styleInside={color:'#BF3A30', marginLeft:'45px'};
        rating = percentage;
      }else if( percentage > 25 && percentage < 50) {
        currentGradient = 'gradient2';
        rating = percentage;
        styleInside={color:'#F9484A',marginLeft:'45px'};
      }else if(percentage >= 50 && percentage < 75){
        currentGradient = 'gradient3';
        styleInside={color:'#FBB034',marginLeft:'45px'};
        rating =percentage;
      }else{
        currentGradient = 'gradient4';
        styleInside={color:'#259900',marginLeft:'45px'};
        rating = percentage;
      }
      var styl = { strokeDashoffset: 320-((percentage/100)*320)};
      var styl2 = { strokeDashoffset: 0};
      return (
        <>
              <div className='rating-div'>
                <div className='rating-text' style={styleInside}>{rating}</div>
                  <svg height="120" width="120">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#864BA2" />
                        <stop offset="100%" stopColor="#BF3A30" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FBD72B" />
                        <stop offset="100%" stopColor="#F9484A" />
                      </linearGradient>
                      <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFDD00" />
                        <stop offset="100%" stopColor="#FBB034" />
                      </linearGradient>
                      <linearGradient id="gradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#A2D240" />
                        <stop offset="100%" stopColor="#1B8B00" />
                      </linearGradient>
                    </defs>
  
                  <circle className='circle-inner' strokeDasharray="326.7256359733385 326.7256359733385"
                          style={styl2}
                          strokeWidth="1"
                          fill="transparent"
                          r="52"
                          cx="60"
                          cy="60"
                  />
                  <circle className='circle-outer' strokeDasharray="326.7256359733385 326.7256359733385"
                  style={styl}
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="transparent"
                          stroke={'url(#' + currentGradient +')'}
                  r="52"
                  cx="60"
                  cy="60"
                  />
  
              </svg>
                <div className='rating-subtext'>{this.props.name}</div>
              </div>
        </>
      );
    };
  }
export default RatingWidget;  