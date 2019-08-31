import React from 'react';
import socketIOClient  from "socket.io-client";
import { getFromStorage , setInStorage} from "../../utils/storage";

class ItemProgress extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            progress_step: [false,false,false,false,false,false,false,false,false,false],
            current: 0,
            start_formated: new Date(props.data.start_date),
            elapsed_time: null,
            percentage: null,
            response: false,
            total_item: 0,

        }
        this.removeFromJobsQueue = this.removeFromJobsQueue.bind(this);

    }
    componentWillMount() {
        const {id} = this.props.data;
        let socket = socketIOClient("http://localhost:80");
        socket.on(id, data =>{
            let item;
            const items = getFromStorage('static-progress');
            var index = items.findIndex(x => x.id == id);
            console.log("index:");
            console.log(index);
            if(index > -1){
                const current = items[index].current;
                item = {id:id, current:current + 1, total_item:data};
                items[index] = item;
            }else{
                item = {id:id, current: 1, total_item:data}
                items.push(item);
            }
            setInStorage('static-progress',items);
            this.setState({current: item.current, total_item: data });
        });

      
        /*
        componentWillMount() {
            const {id} = this.props.data;
            let socket = socketIOClient("http://localhost:80");
            console.log("stats"); 
            socket.on(id, data =>{
                const items = getFromStorage('static-progress');
                console.log(data);
                let {current } = this.state;
    
                item = {id:id, current:current + 1, total_item:data}
                var index = items.findIndex(x => x.id == item.id);
                items[index] = item;
                items.push(item);
                setInStorage('static-progress',items);
    
                this.setState({current: current + 1, total_item: data });
            });
         */

        
    }


    tick() {
        const {start_formated}= this.state;
        var seconds = Math.floor(( (new Date() -start_formated ) )/1000);
        var minutes = Math.floor(seconds/60);
        var hours = Math.floor(minutes/60);
        var days = Math.floor(hours/24);
        
        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
        this.setState({elapsed_time: `${hours} Hours, ${minutes} Minutes, ${seconds} seconds` });
    }

    componentDidMount() {
        clearInterval(this.timer);
        const {id} = this.props.data;
        this.timer = setInterval(this.tick.bind(this), 1000);
        const items = getFromStorage('static-progress');
        var index = items.findIndex(x => x.id == id);
        console.log("index:" + index);
        if(index > -1){
            this.setState({current:items[index].current,total_item: items[index].total_item});
        }

    }
    componentWillUnmount () {
        clearInterval(this.timer)
      }
      removeFromJobsQueue(){
        const {id} = this.props.data;
          fetch('/library/user/jobs/'+id,{method:'DELETE',}).then( window.location.reload())
      }


    render() {
        console.log(getFromStorage('static-progress'));
        let {elapsed_time,current,total_item} = this.state;
        let {website,basename} = this.props;
        let value = (current/total_item)*100;
        value = `${value}%`;
        
        if(total_item === 0){
            total_item = '?';
        }
        return (
            <>
            <div className={`${basename}card-wrap`}>
                <div className={`${basename}name`}>
                    <p>{website}</p>
                </div>
                <div className={`${basename}item-progress`}>
                    <div className={`${basename}progress-bg`}>
                    <span  className={`${basename}progress-bg-left`} >Elapsed Time: {elapsed_time} </span>
                     <span  className={`${basename}progress-bg-right`}>({current}/{total_item})</span>
                      
                        <div className={`${basename}progress-bg-html`} style={{width:value}}>
                         </div>

                    </div>
                </div>
            </div>
            <div className={`${basename}delete`}>
                   <button onClick={this.removeFromJobsQueue}>Delete</button>
            </div>
    
            </>
        );
    }
}

export default ItemProgress;
