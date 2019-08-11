import React, { Component } from 'react';
import 'whatwg-fetch';
import Analytics from "../Analytics/Analytics";
import Header from "../Profile/Header/Header"
import { getFromStorage } from '../utils/storage';
 import EmailPanel from "./EmailPanel"
 import socketIOClient  from "socket.io-client";
 import ProgressTable from "../Profile/ProgressTable/ProgressTable"

class Home extends Component {
  constructor(props) {
    super(props);

    const obj = getFromStorage('static');

      this.state = {
        stats: obj,
        cards: [],
        percentage: null,
        response: false,
        in_progress_sate: [],  
        socket: socketIOClient("http://localhost:80"),  
   
    };

  }
  componentWillMount() {

    
    this.updateTable();
}
  updateTable(){
    const {uid} = this.state.stats;
    console.log(uid);
    fetch('/library/user/reports?uid='+ uid+"&limit=10").then(response => response.json())
    .then(data => {
       // console.log("updated");

        this.setState({cards:data.data});
    });
  }

  render() {
          
    const {cards,stats,in_progress_sate,socket} = this.state;
    console.log(in_progress_sate);
    const basename = "profile";
    return (
      <>
        <Header basename={basename} nogenerate={true} history={this.props.history} nreports={cards.length} stats={stats} />
        <EmailPanel basename={basename} nogenerate={true} history={this.props.history} cards={cards}  stats={stats}  />
        <ProgressTable socket={socket} stats={stats}  basename={basename}/>

      </>
    );
  }
}

export default Home;
