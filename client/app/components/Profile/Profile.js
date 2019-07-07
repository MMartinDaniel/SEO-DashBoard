import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFromStorage } from '../utils/storage';
import Header from "./Header/Header"
import CardGrid from "./CardGrid/CardGrid"
import ProgressTable from "./ProgressTable/ProgressTable"

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
        console.log(this.props);
        const {stats} = this.props;
        console.log(stats);
        return (
            <div>
                <Header basename={basename} stats={stats} />
                <CardGrid basename={basename}/>
                <ProgressTable basename={basename}/>
            </div>
        );
    }
}

Profile.propTypes = {

};

export default Profile;