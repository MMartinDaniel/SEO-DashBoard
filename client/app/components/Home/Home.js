import React, { Component } from 'react';
import 'whatwg-fetch';
import Analytics from "../Analytics/Analytics";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }



  render() {
    return (
      <>
        <Analytics/>
      </>
    );
  }
}

export default Home;
