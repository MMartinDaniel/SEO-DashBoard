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
            endpoint: "http://127.0.0.1:80",
            response: false,
            in_progress_sate: [],            
        }
    }

    componentDidMount() {
   
      }

    componentWillMount() {
        const {uid} = this.state.stats;
        fetch('/library/user/reports?uid='+ uid).then(response => response.json())
        .then(data => {
            console.log(data.data);
          this.setState({cards:data.data});
        });
    }
    render() {
        
        const {cards,stats,in_progress_sate} = this.state;
        console.log(in_progress_sate);
        const basename = "profile";
        return (
            <div>
                <Header basename={basename} history={this.props.history} stats={stats} />
                <CardGrid cards={cards} basename={basename}/>
                <ProgressTable stats={stats}  basename={basename}/>
            </div>
        )
    }
}

Profile.propTypes = {

};

export default Profile;