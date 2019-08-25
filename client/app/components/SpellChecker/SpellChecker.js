import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { timingSafeEqual } from 'crypto';
import socketIOClient  from "socket.io-client";
import { removeStopwords } from 'stopword';
import { getFromStorage } from '../utils/storage';

class SpellChecker extends Component {
    constructor(props) {
    super(props);
    const obj = getFromStorage('static');

    this.state = {
        stats: obj,
        uid: '',
        loading: false,
        percentage: '0',
        data: [],
        data_excluded: [],
        info_data: {},
        url : '',
        socket: socketIOClient("http://localhost:80"),  

      };
  
      this.checkSpelling = this.checkSpelling.bind(this);
      this.changeURL = this.changeURL.bind(this);
      this.onClickPreventDefault = this.onClickPreventDefault.bind(this);
      this.addWord = this.addWord.bind(this);
      this.removeWord = this.removeWord.bind(this);

  }

  onClickPreventDefault(e) {
    e.preventDefault();
  }

  loadList(){
    const {uid} = this.state.stats;
    let {data_excluded} = this.state;
    fetch('/library/user/word?uid='+uid)
    .then(res => res.json())
    .then(json => {
        this.setState({
          data_excluded: json.data,
        });
    });
  }
  componentWillMount(){
    this.loadList();
  }


  addWord(word){
    const {uid} = this.state.stats;
    let {data,data_excluded} = this.state;
    const $ = this;
    fetch('/library/user/word',{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: word,
          uid: uid,
        })
      }).then(response => response.json()).then(response=>{
        data.forEach(function(item, index, object){
          if(item.base === word){
            object.splice(index, 1);
          }
        })
         
      }).then($.loadList());
  }
  
  removeWord(word){
    const {uid} = this.state.stats;
    let {data_excluded} = this.state;
    const $ = this;
    fetch('/library/user/word',{
        method:'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: word,
          uid: uid,
        })
      }).then(response => response.json()).then(response=>{
        data_excluded.forEach(function(item, index, object){
          if(data_excluded.length == 1){
            $.setState({data_excluded: [] });
          }else{
            if(item.base === word){
              object.splice(index, 1);
            }
          }
          
        })
      }).then($.loadList());
  }


  changeURL(){
      this.setState({url:event.target.value});
  }
  checkSpelling(e){
    let {data_excluded} = this.state;

    function validURL(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ '((\\d{1,3}\\.){3}\\d{1,3}))'+'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ '(\\?[;&a-z\\d%_.~+=-]*)?'+'(\\#[-a-z\\d_]*)?$','i'); 
      return !!pattern.test(str);
    }

    if(!validURL(this.state.url)){
      return;
    }


  
    e.preventDefault();
    let $ = this;
    let id = Date.now();
    this.state.socket.on(id, message =>{
       this.setState({data: message,loading:false});
      });

      fetch('/library/spellcheck',{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: this.state.url,
          hash: id,
          excluded_words: data_excluded
        })
      }).then(response => response.json()).then(response=>{
        this.setState({loading:true});
    
      }).then(    $.loadList() );


  }
  
    render() {
        let {loading,data,data_excluded} = this.state;
        console.log(this.state);
        return (<>
            <div className='main-tab'>
            <div className="row">
              <div className='col-lg-8'>
                <div className="card-deck m-b-30">
                  <div className="card" >

                    <div className="loading-card">
                      { loading
                        ?   <form onSubmit={this.formPreventDefault}><input type="text" onChange={this.changeURL} value={this.state.url} placeholder="Insert URL"></input><input type="submit" onClick={this.checkSpelling}  value={"         "} disabled></input> </form>
                        :   <form onSubmit={this.formPreventDefault}><input type="text" value={this.state.url} onChange={this.changeURL} placeholder="Insert URL"></input><input type="submit" onClick={this.checkSpelling}  value="Check Spelling"></input> </form>
                      }
                      <div className={loading ? 'spinner-border float-right spinner-white spinner-activated' : 'spinner-border float-right spinner-white spinner-deactivated' } id="spinner" role="status">
                        <span className="sr-only"></span>
                      </div>
                    </div>
                    <div className="card-header"><h5>Spell Checker tool</h5>
                    </div> 
                    <div className="card-body">
                        <div className='spell-results'>
                    {   (data.length > 0) ?
                        data.map((word,i)=>{
                          return (word.correct) ? (<p  key={i}>{word.base} </p>) : (<p key={i} onClick={() => this.addWord(word.base)} className="wrong-word">{word.base} </p>);
                        })
                         : null
                    }
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-4'>
                <div className="card-deck m-b-30">
                  <div className="card" >
                    <div className="loading-card">
                    </div>
                    <div className="card-header"><h5>Your Dictionary</h5>
                    </div> 
                    <div className="card-body">
                        <div className='spell-excluded-results'>
                    {    
                      (data_excluded.length > 0) ?
                        data_excluded.map((word,i)=>{
                             return <p onClick={() => this.removeWord(word)} key={i}>{word} </p>;
                        })
                         :  <p>No words added</p>
                    }
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </>);
      
    }
  }
  
  export default SpellChecker;
  //  <input type="text" className={"spellcheck-input"} placeholder='Introduce URL'></input></div>