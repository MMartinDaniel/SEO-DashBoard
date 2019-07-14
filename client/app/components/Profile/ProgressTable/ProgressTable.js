import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style.scss';
import ItemProgress from "./ItemProgress";

class ProgressTable extends Component {
    constructor(props) {
        super(props);
        this.state= {
            onProgress:[],
        };

    }
    componentWillMount() {
        const {uid} = this.props.stats;
        const {onProgress} = this.state;
        console.log(uid);
        fetch('/library/user/onProgress?uid='+ uid).then(response => response.json())
        .then(data => {
            this.setState({onProgress:data.data});
        });
        
    }

    render() {
        let {basename} = this.props;
        let {onProgress} = this.state;
        basename = `${basename}_ProgressTable__`;
        console.log(onProgress);
        return (
            <>
            <div className={`${basename}wrapper` } >
                <h2 className={`${basename}heading`}>Reports in progress</h2>
                <div className={`${basename}table`}>
                { 
                         (onProgress.length > 0) ?
                        onProgress.map((item,i)=>{
                          return <ItemProgress basename={basename} key={i} data={item}/>  
                        })
                        : null
                    }
                </div>

            </div>
            </>
        );
    }
}

ProgressTable.propTypes = {
    
};

export default ProgressTable;