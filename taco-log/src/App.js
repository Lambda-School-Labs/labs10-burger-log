import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
//import Map from './Components/map.js';
import { firebase, provider } from "./firebase/firebase";
import HomePage from "./Components/HomePage";
import LogTaco from "./Components/LogTaco";
import LoginPage from "./Components/LoginPage";
import AddStore from './Components/AddStore';
import { loginUser, logTaco, deleteTaco, assignAchievement } from "./actions";
import { connect } from "react-redux";

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      user: null
    };
    //this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://tacobe.herokuapp.com/")
      .then(res => {
        this.setState({ message: res.data.message });
      })
      .catch(err => {
        console.log(err);
      });
  }

  achievementCheck = achievementId => {
    for (let i = 0; i < this.props.userInfo.achievements.length; i++) {
      if (this.props.userInfo.achievements[i].id === achievementId) {
        return true;
      }
    }
  };
  addAchievement = header => {
    if (
      this.props.userInfo.user_stats.tacos_logged >= 5 &&
      !this.achievementCheck(2)
    ) {
      const achievement = {
        user_id: this.props.userInfo.internal_id,
        achievement_id: 2
      };
      this.props.assignAchievement(achievement, header);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.userInfo.user_stats !== this.props.userInfo.user_stats) {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          const header = {
            headers: {
              Authorization: idToken,
              id: this.props.userInfo.ext_user_id
            }
          };
          this.addAchievement(header);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }


  logout() {
    firebase
      .auth()
      .signOut()
      .then(result => {
        this.setState({
          user: null
        });
      });
  }

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => <LoginPage {...this.props} {...props} />}
        />
        <Route
          exact
          path="/home"
          render={props => <HomePage {...this.props} {...props} />}
        />
        <Route
          exact
          path="/tacos"
          render={props => <LogTaco {...this.props} {...props} />}
        />
          <Route
          exact
          path="/addstore"
          render={props => <AddStore {...this.props} {...props} />}
        />
        <Link to="/">
          <Button onClick={this.logout}>Log Out</Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userReducer.user
  };
};

export default connect(
  mapStateToProps,
  { loginUser, logTaco, deleteTaco, assignAchievement }
)(App);
