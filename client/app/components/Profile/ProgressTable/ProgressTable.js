import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style.scss';

class ProgressTable extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    render() {
        let {basename} = this.props;
        basename = `${basename}_ProgressTable__`;
        return (
            <>
            <div className={`${basename}wrapper` } >
                <h2 className={`${basename}heading`}>Reports in progress</h2>
                <div className={`${basename}table`}>
                    <ItemProgress basename={basename}/>   
                    <ItemProgress basename={basename}/>   
                    <ItemProgress basename={basename}/>   
                    <ItemProgress basename={basename}/>   
                    <ItemProgress basename={basename}/>   
                    <ItemProgress basename={basename}/>   
                </div>

            </div>
            </>
        );
    }
}
const ItemProgress = (props) => {
    const {basename} = props;
    return (
        <>
        <div className={`${basename}card-wrap`}>
            <div className={`${basename}name`}>
                <p>Instantes.net</p>
            </div>
            <div className={`${basename}item-progress`}>
                <div className={`${basename}progress-bg`}>
                    <div className={`${basename}progress-bg-html`}>
                        <span  className={`${basename}progress-bg-left`}>HTML</span>
                        <span  className={`${basename}progress-bg-right`}>78%</span>
                    </div>
                </div>
            </div>
        </div>
        <div className={`${basename}delete`}>
               <button>Delete</button>
        </div>

        </>
    );
};

ProgressTable.propTypes = {
    
};

export default ProgressTable;