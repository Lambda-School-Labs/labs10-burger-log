import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, CardImg, CardBody,
    CardTitle, CardSubtitle  } from 'reactstrap';
import { firebase, provider } from '../firebase/firebase';
import axios from 'axios'
import taco from '../taco.jpg';
import './login-page.css';

const local = 'http://localhost:5000/'
const heroku = 'https://tacobe.herokuapp.com/'

class LoginPage extends Component {
    constructor() {
        super();
        this.state= {
            user:null,
            userInfo: {},
            taco_location: "",
            taco_description: "",
            rating: ""
        }
        this.login = this.login.bind(this);
        //this.logout = this.logout.bind(this);
    }

    login() {
        firebase.auth().signInWithPopup(provider)
          .then((result)=> {
            const user = {
                name: result.user.displayName,
                email: result.user.email,
                ext_user_id: result.user.uid
            }                       
            axios
                .get(`${heroku}api/users`) 
                .then(res => {                    
                    let post = true
                    for(let i = 0; i < res.data.length; i++){
                        if(res.data[i].ext_user_id == user.ext_user_id){
                           axios.get(`${heroku}api/users/${res.data[i].internal_id}`)
                           .then(res =>{                                
                                this.setState({userInfo: res.data})
                           })
                           .catch(err => {
                                console.log(err);
                            });
                            post = false
                        }
                    }       
                    if(post){
                        axios    
                            .post(`${heroku}api/users`, user)
                            .then(res => {   
                                const stats = { user_id: res.data.internal_id}    
                                axios.post(`${heroku}api/user_stats`, stats)
                                .then(res => {
                                    this.setState({userInfo: res.data})
                                })  
                                .catch(err => {
                                    console.log(err);
                                });       
                                
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }                    
                })
                .catch(err => {
                    console.log(err);
                });
            
            this.setState({
              user: true
            });
        });
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    newTaco = e => {
        e.preventDefault();
        const taco = {
            user_id: this.state.userInfo.internal_id,
            taco_location: this.state.taco_location,
            taco_description: this.state.taco_description,
            rating: this.state.rating
        }
        axios
            .post(`${heroku}api/tacos`, taco)
            .then(res => {                    
                this.setState({
                taco_location: "",
                taco_description: "",
                rating: ""
                });
                const stats = {
                    tacos_logged: res.data.taco_logs.length
                }                
                axios
                    .put(`${heroku}api/user_stats/${res.data.internal_id}`, stats)
                    .then(res => {  
                        if (res.data.stats[0].tacos_logged >= 5){
                            const achievement = {
                                user_id: res.data.internal_id,
                                achievement_id: 2
                            }
                            console.log(achievement)
                            axios
                                .post(`${heroku}api/user_achievements`, achievement)
                                .then(res => {
                                    this.setState({
                                        userInfo: res.data
                                    })
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }                     
                        this.setState({
                            userInfo: res.data
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {console.log(this.state.userInfo)
        return (
             
            <div className= 'login-page'>
<<<<<<< HEAD
                <div className='login-box'>
                <Card className='card'>
                    <CardImg className='taco-image' src={taco} alt="taco image" />
                    <CardBody className='card-body'>
                        <CardTitle className="login-text"> Continue With </CardTitle>
                        {/* <Form>
                            <Input
                                placeholder= "Enter Email"
                                name= "email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <br />
                            <Input
                                placeholder= "Enter Password"
                                name= "password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </Form> */}
                        {/* <Button onClick= {this.emailLogin}>Login</Button>
                        <CardSubtitle>OR</CardSubtitle> */}
                        <Link to='/home'><Button className='google-button' onClick= {this.login}>Google</Button></Link>
                        <Link to='/home'><Button className='fb-button' onClick= {this.login}>Facebook</Button></Link>
                    </CardBody>
                </Card>
                </div>
=======
                <p>This is the login page</p>
                <Button onClick= {this.login}>Login</Button>
                <form onSubmit={this.newTaco}>
                    <input
                    onChange={this.handleInputChange}
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
                    <button>Submit</button>
                </form>  
                {(this.state.userInfo.achievements && this.state.userInfo.achievements.length > 0)
                    ?<div>
                        <p>Achievement:{this.state.userInfo.achievements[0].title}</p>
                        <p>Description:{this.state.userInfo.achievements[0].description}</p>
                    </div>
                    :<div></div>                                       
                }
                              
>>>>>>> 3bad12c3f80cddbf002053e7a3ac33703809d721
            </div>
         
        )
    }
}

export default LoginPage; 