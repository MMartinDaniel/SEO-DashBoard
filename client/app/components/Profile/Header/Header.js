import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style.scss';
import PopUp from "../Popup/PopUp";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false,
            picture: "default.png"
        }

        this.toggle = this.toggle.bind(this);
        this.changePicture = this.changePicture.bind(this);


    }

    componentWillMount() {

    }
    toggle(){
        const{ toggle} = this.state;
        this.setState({toggle:!toggle});
    }

    changePicture(e){
        const files = Array.from(e.target.files)    
        const formData = new FormData()
    
        files.forEach((file, i) => {
          formData.append(i, file)
        })
        fetch(`api/user/avatar-upload`, {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(image => {
          this.setState({ 
            picture: image,
          })
        })
    }

    render() {
        const {picture} = this.state;
        const {basename,stats,nreports,nogenerate} = this.props;
        const {toggle} = this.state;
        return (
            <>
            {(toggle) ? <PopUp  toggle={this.toggle.bind(this)} stats={stats}  basename={basename}/> : null }

            <div className={`${basename}__wrapper card` } >
                <div className={`${basename}__picture`}>
                <label for="fileinput">
                 <img className={`${basename}__pic`} src={`../assets/img/${picture}`}/>
                
                 <div className="avatar-container">
                            <div class="avatar-overlay">
                                <div class="avatar-text"><i class="fas fa-edit"></i></div>
                            </div>
                            <input style={{display: "none"}}  onChange={this.changePicture} id="fileinput" name="avatar" type="file"/> 
                </div> 
                </label>
                </div>
                
                <div className={`${basename}__name`}>
                    <strong>Daniel Martin Martinez</strong>
                    <p>Ingeniero del software</p>
                </div>
                <div className={`${basename}__reportes`}>
                    <strong>Reportes generados</strong>
                    <p>{nreports}</p>
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

export default Header;