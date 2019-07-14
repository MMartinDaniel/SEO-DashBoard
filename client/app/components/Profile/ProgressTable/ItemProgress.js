import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            progress_step: 0,
            start_formated: new Date(props.data.start_date),

        }
 
    }
    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        const {start_formated} = this.state;
        let endTime = new Date();
        var timeDiff = endTime - start_formated; //in ms
        timeDiff /= 1000;
        var seconds = Math.round(timeDiff);
        let minutes = Math.round(seconds / 60);
        seconds -= minutes * 60;

        const {basename} = this.props;
        const {website} = this.props;
        return (
            <>
            <div className={`${basename}card-wrap`}>
                <div className={`${basename}name`}>
                    <p>{website}</p>
                </div>
                <div className={`${basename}item-progress`}>
                    <div className={`${basename}progress-bg`}>
                        <div className={`${basename}progress-bg-html`}>
                            <span  className={`${basename}progress-bg-left`}>Elapsed Time: {minutes}:{seconds} </span>
                            <span  className={`${basename}progress-bg-right`}>(1/6)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${basename}delete`}>
                   <button>Delete</button>
            </div>
    
            </>
        );
    }
}

export default ItemProgress;
