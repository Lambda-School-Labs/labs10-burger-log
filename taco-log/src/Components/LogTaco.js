import React, { Component } from "react";
import { firebase } from "../firebase/firebase";

class LogTaco extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taco_location: "",
      taco_description: "",
      rating: "",
      place_id: "",
      tortilla: ["Corn", "Flour", "Other"],
      meat: ["Al Pastor", "Chicken", "Fish", "Steak", "Choriso"],
      cheese: ["Manchego", "Fontina", "Swiss", "Mozzarella", "Feta"],
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount(){
    const inputElement = document.querySelector('.dropdown');
    console.log(inputElement);
    const dropdown = new window.google.maps.places.Autocomplete(inputElement);
    dropdown.addListener('place_changed',() => {
        const place = dropdown.getPlace();
        console.log(place);
        this.setState({lat:place.geometry.location.lat(),
            lng:place.geometry.location.lng(),
            taco_location:place.name,
            place_id:place.id,
            staticMap:true
        })
    })
}
  // achievementCheck = achievementId => {
  //   for (let i = 0; i < this.props.userInfo.achievements.length; i++) {
  //     if (this.props.userInfo.achievements[i].id === achievementId) {
  //       return true;
  //     }
  //   }
  // };
  // addAchievement = () => {
  //   if (
  //     this.props.userInfo.user_stats.tacos_logged >= 5 &&
  //     !this.achievementCheck(2)
  //   ) {
  //     const achievement = {
  //       user_id: this.props.userInfo.internal_id,
  //       achievement_id: 2
  //     };
  //     this.props.assignAchievement(achievement, header);
  //   }
  // };

  newTaco = e => {
    e.preventDefault();
    const taco = {
      user_id: this.props.userInfo.internal_id,
      taco_location: this.state.taco_location,
      taco_description: this.state.taco_description,
      rating: this.state.rating
    };
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
        this.props.logTaco(taco, header);        
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      taco_location: "",
      taco_description: "",
      rating: ""
    });
  };

  render() {
    return (
      <div className="taco-form">
        <p>Log a Taco Here:</p>
        <form>
          <input
            onChange={this.handleInputChange}
            class="dropdown"
            placeholder="location"
            value={this.state.taco_location}
            name="taco_location"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="rating"
            value={this.state.rating}
            name="rating"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="description"
            value={this.state.taco_description}
            name="taco_description"
          />
          <button onClick={this.newTaco}>Submit</button>
        </form>
      </div>
    );
  }
}

export default LogTaco;
