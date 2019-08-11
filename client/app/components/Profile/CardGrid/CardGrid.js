import React from 'react';
import '../style.scss';
import {Link} from 'react-router-dom'
import { isThisSecond } from 'date-fns/esm';


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
                            
                        </form>
                    </div>
                </div>
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
            website: ''

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
    render() {
        let {cards,basename} = this.props;
        let { toggle } = this.state;
        basename = `${basename}__CardGrid__`;
        return (
            <>
         {(toggle)&&(   <EmailPop basename={basename} toggle={this.toggle.bind(this)} website={this.state.website} id={this.state.id} uid={this.props.stats.uid} />  ) }

            <div className={`${basename}wrapper card` } >
                <h2 className={`${basename}heading`}>Your Reports</h2>
                {   (cards.length > 0) ?
                    cards.map((item, i) =>{
                     //  return <Link key={i} className={`${basename}__item`} to={"Report/"+ item.id} target="_blank" ><Card key={i} data={item} basename={basename}/></Link>
                    return <Card toggle={() => this.toggle(item)} key={i} data={item} basename={basename}/>   
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
         
        fetch('/library/user/report/'+id,{method:'DELETE',}).then( window.location.reload());

    }
    render(){
        const {basename,data} = this.props;
        let date = new Date(data.date);
        let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
        let pattern = /^((http|https|ftp):\/\/)/;
        let fav;

         data.metadata.favicon.map((item)=>{
             if(!pattern.test(item.href)) {
                 if(item.href.slice(0, -4).includes(".")){
                     fav = item.href;
                 }else if(!pattern.test(data.website)){
                    fav =  `http://${data.website}${item.href}`;
                }else{
                  fav =  `${data.website}${item.href}`;
      
                }
              
            }
        });
        const {toggle} = this.props;
        return (
            <>
                <div className={`${basename}card-wrap` }>
                <button onClick={() => this.deleteCard(data.id) } className=" mail left"><i className="fas fa-times"></i></button>
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