import React, { Component } from 'react';
import 'whatwg-fetch';
import Analytics from "../Analytics/Analytics";
import Header from "../Profile/Header/Header"
import { getFromStorage } from '../utils/storage';
 import socketIOClient  from "socket.io-client";
 import ProgressTable from "../Profile/ProgressTable/ProgressTable"
 import {Link} from 'react-router-dom'


 class ReceivedReports extends Component{
    constructor(props){
      super(props);
    
      this.state = {users: []};
      this.removeReceived = this.removeReceived.bind(this);

    }
    removeReceived(id){
        const {uid} = this.props.stats;
        
         const $ = this;
        fetch('/library/user/received',{
            method:'DELETE',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            id: id,
            uid: uid,
            })
        }).then(response => response.json()).then(response=>{
            console.log(response);
                //window.location.reload();
        });
    }
  
    render(){
      let {cards} = this.props;
      console.log(cards);
      const basename="email-table"
  
      return (
        <>
        <div className='main-tab phonr-res'>
        <div className="row">
        <div className='col-lg-12'>
          <div className="card-deck m-b-30">
            <div className={`card ${basename}`}>
              <h5 className={`card-header  `}>Received Reports Table</h5>
              <div className="card-body">
                <p> <code className="highlighter-rouge"> Latest </code> Received Reports </p>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                    <tr>
                      <th>Website</th>
                      <th>from</th>
                      <th>Date received</th>
                      <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cards.map((item, i) =>{ 
                       let date = new Date(item.date)
  
                     return( <tr key={i}>
                        <td><Link to={`/Report/${item.id}`}>{item.website}</Link></td>
                        <td>{item.email}</td>
                        <td>{date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() }</td>
                        <td> <div onClick={() => this.removeReceived(item.id)} className={"profile_ProgressTable__delete delete-report "}><button >Delete</button></div></td>
                       </tr>);
                    })
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
  
          </div>
        </div>
        </div>
        </div>
        </>
      );
    }
  }
  
  


class Received extends Component {
  constructor(props) {
    super(props);

    const obj = getFromStorage('static');

      this.state = {
        stats: obj,
        cards: [],
        percentage: null,
        response: false,
        in_progress_sate: [],  
        socket: socketIOClient("http://localhost:80"),  
   
    };

  }
  componentWillMount() {

    
    this.updateTable();
}
  updateTable(){
    const {uid} = this.state.stats;
    console.log(uid);
    console.log('/library/user/received/reports?uid=' + uid);
    fetch('/library/user/received/reports?uid='+ uid).then(response => response.json())
    .then(data => {
        this.setState({cards:data.data[0].receivedreports});
    });
  }

  render() {
          
    const {cards,stats,in_progress_sate,socket} = this.state;
    console.log(in_progress_sate);
    const basename = "profile";
    return (
      <>
         <Header basename={basename} nogenerate={true} history={this.props.history} placeh={"Reports Received"} nreports={cards.length} stats={stats} />
         <ReceivedReports basename={basename} nogenerate={true} history={this.props.history} cards={cards}  stats={stats}  />
         <ProgressTable socket={socket} stats={stats}  basename={basename}/>

      </>
    );
  }
}

    
export default Received;
