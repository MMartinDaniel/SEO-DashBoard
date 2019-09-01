import React from 'react';
import '../style.scss';
import {Link} from 'react-router-dom'
import { isThisSecond } from 'date-fns/esm';
import isAbsoluteUrl from 'is-absolute-url'


class EmailPop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            toogle: false,
        }
        this.sendMail = this.sendMail.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    


    handleChange(event){
        this.setState({email: event.target.value});
    }
    sendMail(){
        const {email} = this.state;
        const {id,uid,website} = this.props;
        console.log({email,id,uid,website});

        fetch('/library/user/email',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            uid,
            email,
            website,
          })
        });


    }

    render() {
        console.log(this.props);
        console.log(this.state);
        let {basename,toggle} = this.props; 
        basename = `${basename}__emailPop`;
        return (<>
            <div className={`${basename}__wrapper`}  >
                <div className={`${basename}__div` } >
                    <div className={`${basename}__inner`}>
                        <form onSubmit={this.sendMail}>
                            <input type='email' onChange={this.handleChange} value={this.state.email} ></input>
                            <input type='submit'></input>
                            <button onClick={toggle} className={'exit-btn'}><i className="fas fa-times" aria-hidden="true"></i></button>
                        </form>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

class AlarmPop extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            toogle: false,
            hours: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
            minutes: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],
            hour:0,
            minute:0,
            type:'Daily',
            onoff:false,
            types:['Daily', 'Weekly', 'Monthly'],
        }
        this.setAlarm = this.setAlarm.bind(this);
        this.handleHour = this.handleHour.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleMinutes = this.handleMinutes.bind(this);
        this.setStatus = this.setStatus.bind(this);

    }
    setStatus(event){  
        let {onoff} = this.state;
        this.setState({onoff: !onoff});
    }

    componentWillMount(){
        console.log("calling");
        fetch('/api/account/alarm?id='+this.props.id,{
            method:'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            
            }).then(res => res.json())
            .then(data => {
                console.log("datagot");
                console.log(data);
                this.setState({ 
                    hour:data.data.hour,
                    minute:data.data.minute,
                    type:data.data.type,
                    onoff:data.data.active,
                })
            })
     
    }

    setAlarm(event){
        const {id} = this.props;
        const {hour,minute,type,onoff} = this.state;
        fetch('/api/account/alarm/',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                hour:hour,
                minute:minute,
                type:type,
                onoff:onoff,
            })
            }).then(
               window.location.reload()
        )      
    }
    handleHour(event){
        this.setState({hour: event.target.value});
    }
    handleType(event){
        this.setState({type: event.target.value});
    }
    handleMinutes(event){
        this.setState({minute: event.target.value});
    }

    render() {
        console.log(this.props);
        console.log(this.state);
        let {basename,toggleAlarm} = this.props; 
        let {types,hours,minutes,onoff} = this.state;
        basename = `${basename}__AlarmPop`;
       
        return (<>
            <div className={`${basename}__wrapper` } >
                <form onSubmit={(e) => e.preventDefault()} className={"profile-form"}>
                <div className={`${basename}__inner mail_personaldata__inner `}>
                    <div className={`${basename}__header`}>
                        <div className={`${basename}__cropped`}><span>Automation Settings</span></div>
                    </div>
                    <div className={`${basename}__options-body`}>
                        <h3>Automation Time Data</h3><span onClick={this.setStatus}  className={(onoff) ? "form-visible form-validator alarm-on": "form-visible form-validator alarm-off"}>
                            {(!onoff) ? "Alarm off" : "Alarm on"}
                            </span>
                        <div className={"alarmdiv"}>
                            <label>Type/Hour/Minute</label><br></br>
                            <select type="text" value={this.state.type} onChange={this.handleType} placeholder="Name" >
                                {types.map((item,i)=>{
                                    return (<option key={i} value={item}>{item}</option>)
                                })}
                            </select>
                            <select type="text" value={this.state.hour} onChange={this.handleHour} >
                                {
                                hours.map((item,i)=>{
                                    return (<option key={i} value={item}>{item}</option>)
                                })
                                }
                            </select>
                            <select type="text" value={this.state.minute} onChange={this.handleMinutes} >
                                {
                                minutes.map((item,i)=>{
                                    return (<option key={i} value={item}>{item}</option>)
                                })
                                }
                            </select>
                        </div>
                        <div className={`${basename}__button--wrap`}>
                            <input type='submit' className={`${basename}__button`}  onClick={this.setAlarm} value='Save Changes' />
                            <button   onClick={toggleAlarm} className={`${basename}__button red-report`}  >Close </button>       
                        </div>                   
                    </div>
                </div>
                </form>      
            </div>
            </>
        );
      
    }
}


class CardGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            id: '',
            uid: '',
            website: '',
            toggleAlarm: '',

        }

        this.toggle = this.toggle.bind(this);

    }

    componentWillMount() {
    }
    toggle(item){
        const {toggle} = this.state;
        const {id,uid,website} = item;
        (!toggle) ? this.setState({toggle: !toggle, id,uid,website}) : this.setState({toggle: !toggle, id:'',website});

    }

    toggleAlarm(item){
        const {toggleAlarm} = this.state;
        const {id,uid,website} = item;
        (!toggleAlarm) ? this.setState({toggleAlarm: !toggleAlarm, id,uid,website}) : this.setState({toggleAlarm: !toggleAlarm, id:'',website});

    }
    render() {
        let {cards,basename,stats} = this.props;
        let { toggle, toggleAlarm } = this.state;
        basename = `${basename}__CardGrid__`;
        return (
            <>
         {(toggle) &&      ( <EmailPop basename={basename} toggle={this.toggle.bind(this)} website={this.state.website} id={this.state.id} uid={this.props.stats.uid} />  ) }
         {(toggleAlarm) && ( <AlarmPop basename={basename} toggleAlarm={this.toggleAlarm.bind(this)} website={this.state.website} id={this.state.id} uid={this.props.stats.uid} />  ) }

            <div className={`${basename}wrapper card` } >
                <h2 className={`${basename}heading`}>Your Reports</h2>
                {   (cards.length > 0) ?
                    cards.map((item, i) =>{
                     //  return <Link key={i} className={`${basename}__item`} to={"Report/"+ item.id} target="_blank" ><Card key={i} data={item} basename={basename}/></Link>
                    return <Card toggle={() => this.toggle(item)} toggleAlarm={() => this.toggleAlarm(item)} uid={stats.uid} key={i} data={item} basename={basename}/>   
                    }) : null
                }
            </div>
            </>
        );
    }
}

class Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        };

    }

    deleteCard(id){
         const {uid} = this.props;
        fetch('/library/user/report/'+id,
        {method:'DELETE',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            uid: uid,
            })
        }).then( window.location.reload());

    }
    render(){
        const {basename,data,uid} = this.props;
        console.log(uid);
        let date = new Date(data.date);
        let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
        let pattern = /^((http|https|ftp):\/\/)/;
        let fav;

         data.metadata.favicon.map((item)=>{

            let finalUrl;

            if(item.href !== undefined){
                if(item.href.substring(0,2)==="//"){
                }else if(item.href.substring(0,2)=== "./"){
                  item.href = item.href.substring(2);                                
                }
                console.log(item.href);
                if(item.href.substring(0, 2) == "//"){
                  finalUrl = item.href;
                }else if(isAbsoluteUrl(item.href)){
                  finalUrl = item.href;
                }else if(!pattern.test(item.href)) {

                  if(data.website.substring(data.website.length - 1) === "/" ){
                    if(item.href.substring(1) === "/" ){
                      item.href = item.href.substring(1);
                    }
                    if(pattern.test(data.website)){
                      finalUrl = data.website + item.href;
                    }else{
                      finalUrl = "http://"+  data.website + item.href;
                    }
                  }else{
                    var dominio=String(data.website).replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
                    if(item.href.substring(1) === "/" ){
                      finalUrl = "http://"+dominio+item.href;
                    }else{
                      console.log(dominio);
                      finalUrl = "http://"+ dominio+"/"+item.href;
                    }
          
          
                  }
                }
                }

                fav = finalUrl;

/*
             if(!pattern.test(item.href)) {
                 if(item.href.slice(0, -4).includes(".")){
                     fav = item.href;
                 }else if(!pattern.test(data.website)){
                    fav =  `http://${data.website}${item.href}`;
                }else{
                  fav =  `${data.website}${item.href}`;
      
                }
            }
*/
        });
        const {toggle, toggleAlarm} = this.props;
        return (
            <>
                <div className={`${basename}card-wrap` }>
                <button onClick={() => this.deleteCard(data.id) } className=" mail left"><i className="fas fa-times"></i></button>
                <button onClick={ toggleAlarm } className="right mail-two"><i className="far fa-clock"></i></button>

                <button onClick={ toggle } className="right mail"><i className="fas fa-envelope " ></i></button>
                    <Link className={`right`} target="_blank" to={"Report/"+ data.id}><i className="fas fa-arrow-right"></i></Link>
                    <div className={`${basename}name`}>
                        <strong>{data.website.replace(/(^\w+:|^)\/\//, '')}</strong>
                        <p>{formatted_date}</p>
                    </div>
                    <div className={`${basename}favicon`}>
                        {(data.metadata.favicon.length > 0 ) ? <img src={(fav) ? fav : data.metadata.favicon[0].href}/> : null }
                    </div>
                </div>
            </>
        ); 
    }
}

CardGrid.propTypes = {
    
};

export default CardGrid;