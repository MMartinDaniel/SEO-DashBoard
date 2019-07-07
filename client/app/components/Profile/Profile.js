import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFromStorage } from '../utils/storage';
import Header from "./Header/Header"
import CardGrid from "./CardGrid/CardGrid"
import './style.scss';
class Profile extends Component {
    
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }
    render() {
        const basename = "profile";
        return (
            <div>
                <Header basename={basename} />
                <CardGrid basename={basename}/>
            </div>
        );
    }
}

Profile.propTypes = {

};

export default Profile;