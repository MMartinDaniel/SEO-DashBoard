import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFromStorage } from '../utils/storage';
import Header from "./Header/Header"
import CardGrid from "./CardGrid/CardGrid"
import ProgressTable from "./ProgressTable/ProgressTable"
import socketIOClient  from "socket.io-client";


import './style.scss';
class Profile extends Component {
    
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
        }
    }

    componentDidMount() {
   
      }

    componentWillMount() {
      
        this.state.socket.on("update_job", data =>{
            this.updateTable();
            console.log("called");
        });
        this.updateTable();
    }

   updateTable(){
       const {uid} = this.state.stats;
       fetch('/library/user/reports?uid='+ uid).then(response => response.json())
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
            <div>
                <Header  basename={basename} history={this.props.history} nreports={cards.length} stats={stats} />
                <CardGrid cards={cards} basename={basename} stats={stats}/>
                <ProgressTable socket={socket} stats={stats}  basename={basename}/>
            </div>
        )
    }
}

Profile.propTypes = {

};

export default Profile;