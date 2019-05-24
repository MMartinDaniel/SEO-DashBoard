import {Component} from "react";
import React from "react";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return(<>
      <div className='test-report'>
        <div className='report-name'>
          <strong> {this.props.name}</strong>
          <ul className='report-importance'>
          </ul>
        </div>
        <div className='report-info'>
          <p>{this.props.details}</p>
        </div>
      </div>
    </>);
  }

}
/*

 <label><i className="fas fa-check"/></label>
            <li className='full'/><li className='full'/>
            <li className='full'/><li className='full'/>
            <li className=''/>
 */
export default Report;
