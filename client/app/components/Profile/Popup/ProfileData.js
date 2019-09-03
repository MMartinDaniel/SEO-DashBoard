import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style.scss';
import { isEmpty } from 'xmlbuilder/lib/Utility';

class ProfileData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options:[false,false,false,false,false,false,false,false,false,false],
            website: '',
            atLeastOne: false,
            name: props.userdata.name,
            subtitle: props.userdata.subtitle,
            image: props.userdata.image,
            file: '',
            newpass1: '',
            newpass2: '',
            
        }
    
        this.changePic = this.changePic.bind(this);
        this.changeData = this.changeData.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handlepass1 = this.handlepass1.bind(this);
        this.handlepass2 = this.handlepass2.bind(this);
        this.handleSubtitle = this.handleSubtitle.bind(this);

    }

    handlepass2(event){
        this.setState({newpass2: event.target.value});
    }
    handlepass1(event){
        this.setState({newpass1: event.target.value});
    }
    changePic(event){
        this.setState({
            file: URL.createObjectURL(event.target.files[0]),
            image: event.target.files[0],
          })
    }

    toggle(){
        const {toggle} = this.state;
        this.setState({toggle: !toggle});
    }

    handleName(){
        this.setState({name: event.target.value});

    }

    handleSubtitle(){
        this.setState({subtitle: event.target.value});

    }

    changeData(e){
        let hasnewpass = false;
        const {newpass1,newpass2} = this.state;
        if(newpass1 === newpass2 && newpass1 !== "" && newpass2 !== "" ){
            hasnewpass = true;
        }
        console.log(this.state.image);
        let data = new FormData();
        data.append('uid', this.props.stats.uid);
        data.append('fullname',this.state.name);
        data.append('subtitle', this.state.subtitle);
        data.append('img', this.state.image);
        if(hasnewpass){ data.append('password', this.state.newpass1)};
        let url;
        console.log(this.state.file);
        if(this.state.file === ""){
           
            fetch('/api/account/profileName',{
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: this.props.stats.uid,
                    subtitle: this.state.subtitle,
                    fullname:this.state.name,
                    password: (hasnewpass) ? newpass1 : ''
                })
                }).then(
                   window.location.reload()
            )      
        }else{
          url = "/api/account/profileData";
          let h = {};
          h.Accept = 'application/json';
            fetch(`/api/account/profileData`, {
                    method:'POST',
                headers:h,
                body:data
            })
            .then(res => res.json())
            .then(image => {
                this.setState({ 
                picture: image,
                })
            }).then(window.location.reload());
        }
        
    }


    render() {
        const {options,atLeastOne,name,subtitle,image,file} = this.state;
        console.log(this.props.userData);
        console.log(this.props);
        console.log(this.state);
 
        let {basename} = this.props; 
        basename = `${basename}__popup`;
        return (<>
            <div className={`${basename}__wrapper` } >
                <form onSubmit={(e) => e.preventDefault()} className={"profile-form"}>
                <div className={`${basename}__inner personaldata__inner `}>
                    <div className={`${basename}__header`}>
                        <div className={`${basename}__cropped`}><span>Editor Perfil</span></div>
                    </div>
                    <div className={`${basename}__options-body`}>
                        <h3>Datos personales</h3><span className={(!atLeastOne) ?  "form-visible form-validator" : "form-hidden form-validator"  } style={{ color: "transparent"}}>Por favor, selecciona una opcion</span>
                            
                        <label className='picpic' htmlFor="filemodifyinput" onClick={this.toggleData} >
                            <img className={`${basename}__pic`} src={ (file !== "") ? file : (image !== "") ? `../assets/img/uploads/${image}` : "../assets/img/default.png"  }/>

                            <div className="avatar-container">
                                <div className="avatar-overlay">
                                    <div className="avatar-text"><i className="fas fa-edit"></i></div>

                                </div>

                            </div> 
                        </label>

                            <input ref='file' style={{display: "none"}}  onChange={this.changePic} id="filemodifyinput" name="avatar" type="file"/> 
                            <input type="text" value={this.state.name} onChange={this.handleName} placeholder="Nombre" ></input>
                            <input type="text" value={this.state.subtitle} onChange={this.handleSubtitle} placeholder={"Apellidos"} ></input>
                            <label className={'cpassword'}>Cambiar Contraseña</label>
                            <input type="password" value={this.state.newpass1} onChange={this.handlepass1} placeholder={"Contraseña"} ></input>
                            <input type="password" value={this.state.newpass2} onChange={this.handlepass2} placeholder={"Confirmar Contraseña"} ></input>
                        <div className={`${basename}__button--wrap`}>
                            <input type='submit' className={`${basename}__button`}  onClick={this.changeData} value='Guardar cambios' />
                            <button   onClick={this.props.toggleData} className={`${basename}__button red-report`}  >Cerrar </button>       
                        </div>                   
                    </div>
                </div>
                </form>      
            </div>
            </>
        );
    };
}


ProfileData.propTypes = {

};

export default ProfileData;