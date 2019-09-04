import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateUserPop extends Component {
  constructor(props) {
      super(props);
      this.state = {
          email: '',
          newpass1: '',
          
      }
  
  
      this.handleEmail = this.handleEmail.bind(this);
      this.handlepass1 = this.handlepass1.bind(this);
      this.changeData = this.changeData.bind(this);
  }
  handleEmail(event){
    this.setState({email: event.target.value});
}

  handlepass1(event){
      this.setState({newpass1: event.target.value});
  }

  toggle(){
      const {toggle} = this.state;
      this.setState({toggle: !toggle});
  }

  changeData(e){
      let can = false;
      const {newpass1,email} = this.state;
      if( newpass1 === '' || email === '' ){
          can = true;
      }
    
      if(!can){
      fetch('/api/account/signup',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
        email: email,
        password: newpass1,
        }),
      }).then(res => res.json()).then( window.location.reload());
    }
      
  }


  render() {
      console.log(this.props.userData);
      console.log(this.props);
      console.log(this.state);

      let {basename} = this.props; 
      basename = `${basename}__popup`;
      return (<>
          <div className={`${basename}__wrapper` } >
              <form onSubmit={(e) => e.preventDefault()} className={"profile-form"}>
              <div className={`${basename}__inner personaldata__inner__crear `}>
                  <div className={`${basename}__header`}>
                      <div className={`${basename}__cropped`}><span>Crear Usuario</span></div>
                  </div>
                  <div className={`${basename}__options-body crear_user`}>
                      <h3>Datos personales</h3><span className={ "form-hidden form-validator"  } style={{ color: "transparent"}}></span>
                          
                          <input type="email" value={this.state.email} onChange={this.handleEmail} placeholder="Email" required></input>
                          <input type="password" value={this.state.newpass1} onChange={this.handlepass1} placeholder={"Contraseña"} required></input>
                      <div className={`${basename}__button--wrap`}>
                          <input type='submit' className={`${basename}__button`}  onClick={this.changeData} value='Crear Usuario' />
                          <button   onClick={this.props.toggle} className={`${basename}__button red-report`}  >Cerrar </button>       
                      </div>                   
                  </div>
              </div>
              </form>      
          </div>
          </>
      );
  };
}



class Sidebar extends Component {
  constructor(props) {
  super(props);
  this.state = {
    toggle:false,
  };
  this.toggle = this.toggle.bind(this);

  }
  toggle(){
    const{ toggle} = this.state;
    this.setState({toggle:!toggle});
  }



  render() {
    const tabs = this.props.tabs;
    const {admin} = this.props.stats;
    const {toggle} = this.state;
    return(
      <>
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <a href="#">Perfil</a>
            </li>
            {(toggle) && ( <CreateUserPop basename={'profile'}  toggle={this.toggle.bind(this)}  />  ) }

            {
              tabs.map((item) => {
                if(item.name === "Herramientas" && admin){ return <li key={item.name} className="sidebar-brand"><a href="#">{item.name}</a> </li> 
                }else if(item.name === "Crear Usuario" && admin){
                  return <li key={item.name}><a className={"cc-u"}  onClick={this.toggle} ><i className={item.icon}/><span>{item.name}</span></a></li>
                }else{ 
                return (item.noadmin || admin) ? <li key={item.name}><a href={'/'+item.url}><i className={item.icon}/><span>{item.name}</span></a></li>: null
                ;
                }
              })
            }
          </ul>
        </div>
      </>
    );
  }
}

export default Sidebar;
