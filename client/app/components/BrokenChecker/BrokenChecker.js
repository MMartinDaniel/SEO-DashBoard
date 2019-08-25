import React, {Component} from 'react';
import openSocket from 'socket.io-client';
import  ReactTable from 'react-table';
import {Link} from "react-router-dom";
import {getFromStorage} from "../utils/storage";

class BrokenChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      uid: '',
      loading: false,
      percentage: '0',
      website:'',
      url:'',
    };

    this.checkBrokenLinks = this.checkBrokenLinks.bind(this);
    this.changeURL = this.changeURL.bind(this);

  }


  componentDidMount() {
    const obj = getFromStorage('static');
    this.setState({
      uid: obj.uid,
      loading: false,
    });
    this.socket = openSocket('http://localhost:80');
    console.log('brokenLinks-'+obj.uid);
    this.socket.on('brokenLinks-'+obj.uid, message =>{
      //esto estaba comentado
         this.setState({messages:[message, ...this.state.messages]});
         ///
      if(message.status ===  'finished'){
        this.setState({messages: message.links,loading:false,percentage:message.percentage});
      }else {
        this.setState({messages: message.links,loading:true,percentage:message.percentage});
      }
    });

  }

  changeURL(){
    this.setState({url:event.target.value});
  }

  checkBrokenLinks(event){
    this.setState({
      loading: true,
      percentage: '0',
    });
    fetch('/library/brokenLink',{
      method:'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        web: this.state.url,
        uid: this.state.uid,
      })
    });


  }

  render(){
    const { messages , loading,percentage} = this.state;
    const columns = [{
      Header: 'Link',
      accessor: 'deadlink' // String-based value accessors!
    }, {
      Header: 'Status',
      accessor: 'status'
    },{
      Header: 'Location',
      accessor: 'where'
    }];
    return (<>
      <div className='main-tab'>
    <div className="row">
      <div className='col-lg-8'>
        <div className="card-deck m-b-30">
          <div className="card" >



          <div className="loading-card">
              { loading
                        ?   <form onSubmit={this.formPreventDefault}><input type="text" onChange={this.changeURL} value={this.state.url} placeholder="Insert URL"></input><input type="submit"onClick={this.checkBrokenLinks}  value={`${percentage}%         `} disabled></input> </form>
                        :   <form onSubmit={this.formPreventDefault}><input type="text" value={this.state.url} onChange={this.changeURL} placeholder="Insert URL"></input><input type="submit"onClick={this.checkBrokenLinks}  value="Generate"></input> </form>
                      }

                <div className={loading ? 'spinner-border float-right text-secondary spinner-white spinner-activated' : ' spinner-border float-right text-secondary  spinner-white spinner-deactivated' } id="spinner" role="status">
                  <span className="sr-only"></span>
                </div>
          </div>
           
            <h5 className="card-header">Broken Links Table</h5>
            <div className="card-body">
                <ReactTable
                data={messages}
                columns={columns}
                defaultPageSize={10}
               />
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </>);

  }
}

export default BrokenChecker;



/* OLD

import React, {Component} from 'react';
import openSocket from 'socket.io-client';
import  ReactTable from 'react-table';
import {Link} from "react-router-dom";
import {getFromStorage} from "../utils/storage";

class BrokenChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      uid: '',
      loading: false,
      percentage: '0',
    };

    this.checkBrokenLinks = this.checkBrokenLinks.bind(this);
  }


  componentDidMount() {
    const obj = getFromStorage('static');
    this.setState({
      uid: obj.uid,
      website: obj.website,
      loading: false,
    });
    this.socket = openSocket('http://localhost:80');
    console.log('brokenLinks-'+obj.uid);
    this.socket.on('brokenLinks-'+obj.uid, message =>{
      //esto estaba comentado
         this.setState({messages:[message, ...this.state.messages]});
         ///
      if(message.status ===  'finished'){
        this.setState({messages: message.links,loading:false,percentage:message.percentage});
      }else {
        this.setState({messages: message.links,loading:true,percentage:message.percentage});
      }
    });

  }

  checkBrokenLinks(event){
    this.setState({
      loading: true,
      percentage: '0',
    });
    fetch('/library/brokenLink',{
      method:'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        web: this.state.website,
        uid: this.state.uid,
      })
    });


  }

  render(){
    const { messages , loading,percentage} = this.state;
    const columns = [{
      Header: 'Link',
      accessor: 'deadlink' // String-based value accessors!
    }, {
      Header: 'Status',
      accessor: 'status'
    },{
      Header: 'Location',
      accessor: 'where'
    }];
    return (<>
      <div className='main-tab'>
    <div className="row">
      <div className='col-lg-8'>
        <div className="card-deck m-b-30">
          <div className="card" >

            <div className="loading-card">
              { loading
                ?   <button type="button" id='generate-btn' className="btn btn-info"  disabled>Generating...{percentage}%</button>
                :   <button type="button" id='generate-btn' onClick={this.checkBrokenLinks} className="btn btn-info" >Generate</button>
              }
              <div className={loading ? 'spinner-border float-right text-secondary spinner-activated' : 'spinner-border float-right text-secondary spinner-deactivated' } id="spinner" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            <h5 className="card-header">Broken Links Table</h5>
            <div className="card-body">
                <ReactTable
                data={messages}
                columns={columns}
                defaultPageSize={10}
               />
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </>);

  }
}

export default BrokenChecker;
*/