import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style.scss';

class CardGrid extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    render() {
        let {basename} = this.props;
        basename = `${basename}__CardGrid__`;
        return (
            <>
            <div className={`${basename}wrapper` } >
                <h2 className={`${basename}heading`}>Your Reports</h2>
               <Card basename={basename}/>   
               <Card basename={basename}/>   
               <Card basename={basename}/>   
               <Card basename={basename}/>   
               <Card basename={basename}/>   
               <Card basename={basename}/>   

            </div>
            </>
        );
    }
}
const Card = (props) => {
    const {basename} = props;
    return (
        <>
        <div className={`${basename}card-wrap`}>
            <i className="fas fa-times left"></i>
            <i className="fas fa-arrow-right right"></i>
            <div className={`${basename}name`}>
                <strong>Instantes.com</strong>
                <p>2 febrero 2019</p>
            </div>
            <div className={`${basename}favicon`}>
                <img src="https://cdn.dribbble.com/assets/dribbble-ball-192-ec064e49e6f63d9a5fa911518781bee0c90688d052a038f8876ef0824f65eaf2.png"/>
            </div>
        </div>
        </>
    );
};

CardGrid.propTypes = {
    
};

export default CardGrid;