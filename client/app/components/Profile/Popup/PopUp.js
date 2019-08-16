import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style.scss';

class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options:[false,false,false,false,false,false,false,false,false,false],
            website: '',
            atLeastOne: false,
        }
    
        this.selectBox = this.selectBox.bind(this);
        this.sendReport = this.sendReport.bind(this);
        this.handleChange = this.handleChange.bind(this);


    }


    selectBox(n){
        console.log(n);
        let {options} = this.state;
        options[n] = !(options[n]);
        this.setState({options : options});
        if(options.includes(true)){this.setState({atLeastOne:true})}else{this.setState({atLeastOne: false})}
        console.log(options);
    }

    toggle(){
        const {toggle} = this.state;
        this.setState({toggle: !toggle});
    }

    handleChange(event){
        this.setState({website: event.target.value});
    }
    sendReport(){
        const {options} = this.state;
        console.log(options.includes(true));
        
        if(options.includes(true)){

            fetch('/library/fullReport',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                web: this.state.website,
                options: options,
                uid: this.props.stats.uid
            })
            }).then(
               window.location.reload()
            )
        }
    }

    render() {
        const {options,atLeastOne} = this.state;
        console.log(this.props);
        let {basename} = this.props; 
        basename = `${basename}__popup`;
        return (<>
            <div className={`${basename}__wrapper` } >
                <form onSubmit={(e) => e.preventDefault()}>
                <div className={`${basename}__inner`}>
                    <div className={`${basename}__header`}>
                        <div className={`${basename}__cropped`}><span>New Report</span></div>
                        <input required type='text' onChange={this.handleChange} value={this.state.website} placeholder='Website URL'></input>
                    </div>
                    <div className={`${basename}__options-body`}>
                        <h3>Options</h3><span className={(!atLeastOne) ? "form-visible form-validator" : "form-hidden form-validator" }>Please, select at least one option.</span>
                        <div className={`${basename}__options-wrapper`}>
                            {
                                TABS.map((item, i)=>{
                                    return (
                                    <div key={i} onClick={ () => this.selectBox(item.value) } className={`${basename}__item${ (options[item.value]) ? ' selected' : ''} ` }>
                                    <div className={`${basename}__icon-grid`} >
                                        <img src={`../assets/img/icon/${item.icon}`}></img>
                                        <span>{item.name}</span>
                                        </div>
                                    </div>
                                    );
                                })
                            }    
                        </div>
                        <div className={`${basename}__button--wrap`}>
                            <input type='submit' className={`${basename}__button`}  onClick={this.sendReport} value='Generate Report' />
                            <button   onClick={this.props.toggle} className={`${basename}__button red-report`}  >Close </button>       
                        </div>                   
                    </div>
                </div>
                </form>      
            </div>
            </>
        );
    };
}

const TABS =[
    {name:"H tag",  value:0,icon: '64x64.png'},
    {name:"SSL",        value:1, icon: 'ssl.png'},
    {name:"MetaTag",     value:2,icon: 'meta.png'},
    {name:"BrokenLinks",  value:3,icon: 'broken.png'},
    {name:"Minify",         value:4,icon: 'minify2.png'},
    {name:"Headers & Performance",  value:5, icon: 'performance.png'},
    {name:"Indexation",  value:6, icon: 'sitemap.png'},
    {name:"Resources",  value:7, icon: 'resources.png'},
    {name:"Alternative",  value:8,icon: 'alternative.png'},
    {name:"ScreenShot",  value:9,icon: 'screenshot.png'},
    
    
  ];

PopUp.propTypes = {

};

export default PopUp;