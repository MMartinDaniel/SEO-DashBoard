import React from 'react';
import '../style.scss';
import ItemProgress from "./ItemProgress";
import socketIOClient  from "socket.io-client";

class ProgressTable extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            onProgress:[],
            endpoint: "http://127.0.0.1:80",
            update:false,
        };

    }
    componentWillMount() {
         this.props.socket.on("update_job", data =>{
            this.updateTable();
            console.log("called");
        });
        this.updateTable();
    }
    updateTable(){
        const {uid} = this.props.stats;
        fetch('/library/user/onProgress?uid='+ uid).then(response => response.json())
        .then(data => {
            console.log("updated");
            this.setState({onProgress:data.data});
        });
    }


    render() {
        let {basename,socket} = this.props;
        let {onProgress} = this.state;
        basename = `${basename}_ProgressTable__`;
        console.log(onProgress);
        return (
            <>
            <div className={`${basename}wrapper card` } >
                <h2 className={`${basename}heading`}>Reports in progress</h2>
                <div className={`${basename}table`}>
                { 
                    (onProgress.length > 0) ?
                        onProgress.map((item,i)=>{
                          return <ItemProgress socket={socket} basename={basename} key={i} data={item}/>  
                        })
                        : null
                    }
                </div>

            </div>
            </>
        );
    }
}


export default ProgressTable;