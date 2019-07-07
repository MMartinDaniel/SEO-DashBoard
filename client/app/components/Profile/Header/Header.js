import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style.scss';
import PopUp from "../Popup/PopUp";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
        }

        this.toggle = this.toggle.bind(this);

    }

    componentWillMount() {

    }
    toggle(){
        const{ toggle} = this.state;
        this.setState({toggle:!toggle});
    }

    render() {
        const picture = 'avatar.jpg';
        const {basename,stats} = this.props;
        const {toggle} = this.state;
        console.log(toggle);
        return (
            <>
            {(toggle) ? <PopUp toggle={this.toggle.bind(this)} stats={stats}  basename={basename}/> : null }

            <div className={`${basename}__wrapper` } >
                <div className={`${basename}__picture`}>
                    <img className={`${basename}__pic`} src={`../assets/img/${picture}`}/>
                </div>
                <div className={`${basename}__name`}>
                    <strong>Daniel Martin Martinez</strong>
                    <p>Ingeniero del software</p>
                </div>
                <div className={`${basename}__reportes`}>
                    <strong>Reportes generador</strong>
                    <p>5</p>
                </div>
                <div className={`${basename}__button--wrap`}>
                   <button onClick={this.toggle} className={`${basename}__button`}>Generate Report</button>
                </div>
                
            </div>
            </>
        );
    }
}

Header.propTypes = {

};

export default Header;