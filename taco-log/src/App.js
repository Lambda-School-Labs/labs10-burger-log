import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
//import Map from './Components/map.js';
import { firebase, provider } from './firebase/firebase';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';


class App extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      user: null
    }
    //this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }


  componentDidMount(){
    axios
      .get('https://tacobe.herokuapp.com/')
      .then(res => {
        console.log(res)
        this.setState({message: res.data.message});
      })
      .catch(err=>{
        console.log(err);
      })
  }

  // login() {
  //   firebase.auth().signInWithPopup(provider)
  //   //firebase.auth().signInWithPopup(provider)
  //     .then((result)=> {
  //       const user = result.user;
  //       this.setState({
  //         user: true
  //       });
  //     });
  // }

  logout() {
    firebase.auth().signOut()
    .then((result)=> {
      this.setState({
        user: null
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Route exact path = '/' component = {LoginPage}/>
        <Route exact path = '/home' component = {HomePage}/>
        <Link to = '/'><Button onClick= {this.logout}>Log Out</Button></Link>
      </div>
    );
  }
}

export default App;
