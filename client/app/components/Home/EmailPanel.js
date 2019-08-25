import React, { Component } from 'react';
import 'whatwg-fetch';
import {Link} from 'react-router-dom'
import openSocket from "socket.io-client";
import {getFromStorage, setInStorage} from "../utils/storage";

class AnalysisTable extends Component{
  constructor(props){
    super(props);
    this.state = {users: []};

  }

  componentDidMount() {
    fetch('/api/signin')
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json
        });
      });
  }
  render(){
    let {cards} = this.props;
    console.log(cards);
    const basename="email-table"

    return (
      <>
        <div className="card-deck m-b-30 phonr-res">
          <div className={`card ${basename}`}>
            <h5 className={`card-header  `}>Report Status Table</h5>
            <div className="card-body">
              <p> Latest  <code className="highlighter-rouge"> 10</code> Created Reports</p>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                  <tr>
                    <th>Website</th>
                    <th>Report ID</th>
                    <th>Created</th>

                    <th>Seen</th>
                  </tr>
                  </thead>
                  <tbody>
                  {cards.map((item, i) =>{ 
                     let date = new Date(item.date)

                   return( <tr key={i}>
                      <td><Link to={`/Report/${item.id}`}>{item.website}</Link></td>
                      <td>{item.id}</td>
                      <td>{date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() }</td>
                      <td> <div className={(item.views > 0) ? `table-report-state yes ` : `table-report-state no ` }><button >{item.views}</button></div></td>

                     </tr>);
                  })
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </>
    );
  }
}


class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

 
  render() {
    let {cards} = this.props;
    return (
      <>
        <div className='main-tab phonr-res'>
          <div className="row">
            <div className='col-lg-12'>
              <AnalysisTable cards={cards}  />
            </div>
          </div>
        </div>
      </>
    );
  }

}

export default Analytics;
