import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style.scss';
import PopUp from "../Popup/PopUp";
import ProfileData from "../Popup/ProfileData"
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            userData: null,
            toggleData: false,
            uid: this.props.stats.uid,
            name: '',
            subtitle: "",
            reportscount:0,
            picture: "default.png"
        }

        this.toggle = this.toggle.bind(this);
        this.toggleData = this.toggleData.bind(this);


    }

    componentWillMount() {
       
        fetch('/api/account/userData',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: this.state.uid
            })}).then(res => res.json()).then(data =>{
                this.setState({userData:data.data[0],name:data.data[0].name,subtitle:data.data[0].subtitle,image:data.data[0].image,reportscount:data.data[0].repcounter});
            })
        

    }
    toggleData(){
        const{ toggleData} = this.state;
        this.setState({toggleData:!toggleData});
    }
    toggle(){
        const{ toggle} = this.state;
        this.setState({toggle:!toggle});
    }

  

    render() {
        let {picture,userData,name,subtitle,image,reportscount} = this.state;
        if(reportscount === undefined){reportscount = 0;};
        const {basename,stats,nreports,nogenerate,placeh} = this.props;
        console.log("userdata:");
        console.log(userData);
        
        const {toggle,toggleData} = this.state;
        return (
            <>
            {(toggle) ?     <PopUp  toggle={this.toggle.bind(this)} stats={stats}  basename={basename}/> : null }
            {(toggleData) ? <ProfileData userdata={userData} toggleData={this.toggleData.bind(this)} stats={stats}  basename={basename}/> : null }

            <div className={`${basename}__wrapper card` } >
                <div className={`${basename}__picture`}>
                <label htmlFor="fileinput" onClick={this.toggleData} >
                 <img className={`${basename}__pic`} src={ (image !== "") ?  `../assets/img/uploads/${image}` : "../assets/img/default.png"  }/>
                
                 <div className="avatar-container">
                            <div className="avatar-overlay">
                                <div className="avatar-text"><i className="fas fa-edit"></i></div>

                            </div>

                </div> 
                </label>
                </div>
                
                <div className={`${basename}__name`}>
                    <strong>{(name !== "") ? name : "No Name Set"}</strong>
                    <p>{(subtitle !== "") ? subtitle : "No Subtitle Set"}</p>
                </div>
                <div className={`${basename}__reportes`}>
                    <strong>{(placeh) ? "Reports Received" : "Reports Generated" }</strong>

                    <p>{(placeh) ? nreports :reportscount}</p>
                </div>
                {
                (!nogenerate) ?  
                    <div className={`${basename}__button--wrap`}>
                        <button onClick={this.toggle} className={`${basename}__button`}>Generate Report</button>
                    </div>
                    : null
                }
            </div>
            </>
        );
    }
}

Header.propTypes = {

};
//                            <input style={{display: "none"}}  onClick={this.changePicture} id="fileinput" name="avatar" type="file"/> 

export default Header;