import React from 'react';
import '../style.scss';
import ItemProgress from "./ItemProgress";
import socketIOClient  from "socket.io-client";
import { getFromStorage , setInStorage} from "../../utils/storage";

class ProgressTable extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            onProgress:[],
            endpoint: "http://127.0.0.1:80",
            update:false,
            items: getFromStorage('static-progress'),
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
           // console.log("updated");
            let newProgress = [];
            const items = getFromStorage('static-progress');
           data.data.forEach(element => {
            var index = items.findIndex(x => x.id == element.id);
            if(index > -1){
                newProgress.push(items[index]);
            }else{
                newProgress.push({id:element.id,current:0,total_item:0})    
            }
           });
             setInStorage('static-progress',newProgress);

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
                <h2 className={`${basename}heading`}>Reportes en Progreso</h2>
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