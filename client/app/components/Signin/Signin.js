import React, {Component} from 'react';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.deleteUser = this.deleteUser.bind(this);
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

  deleteUser(index) {
    const id = this.state.users[index]._id;
    fetch(`/api/signin/${id}`, {method: 'DELETE'})
      .then(_ => {
        this._modifyUser(index, null);
      });
  }
  incrementPassword(index) {
    const id = this.state.users[index]._id;

    fetch(`/api/signin/${id}/increment`, { method: 'PUT' })
      .then(res =>res.json())
      .then(json => {
        this._modifyUser(index, json);
      });
  }


  _modifyUser(index, data) {
    let prevData = this.state.users;
    if (data) {
      prevData[index] = data;
    } else {
      prevData.splice(index, 1);
    }

    this.setState({
      users: prevData
    });
  }

  render() {
    return (
      <>
        <p>Users:</p>

        <ul>
          {this.state.users.map((user, i) => (
            <li key={i}>
              <span>{user.email} | {user.password} </span>
              <button onClick={() => this.incrementPassword(i)}>+</button>
              <button onClick={() => this.deleteUser(i)}>x</button>


            </li>
          ))}
        </ul>
      </>
    );
  }
}
export default Signin;
