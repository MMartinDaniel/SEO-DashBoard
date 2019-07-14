import React, { Component } from 'react';
import 'whatwg-fetch';
import StaticReport from '../StaticReport/StaticReport';

class ReportTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <StaticReport/>
      </>
    );
  }

}

export default ReportTemplate;
