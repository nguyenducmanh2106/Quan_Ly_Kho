import * as React from "react";
import { Redirect } from "react-router-dom";
import 'isomorphic-fetch';
import { Form, FormGroup, FormControl, ControlLabel, Button, Col, Grid, Row } from 'react-bootstrap';
import { setAccessToken, isLoggedIn, postAPI, parseJwt, setUser } from '../../utils/helpers';
import { Loading } from '../elements/index'
import { PageLoading } from '../elements/index'

export class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            userName: '',
            password: '',
            loggedIn: isLoggedIn(),
            isError:false,
            messageError: 'Sign in to start your session',
            appLoadingState: true
        };
    }


    componentDidMount() {
        this.setState({ appLoadingState: false })
    }

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, errors: [] });
    }

    prepareFormData = (data = this.state) => {
        return {
            UserName: data.userName.trim(),
            PassWord: data.password.trim()
        };
    }
    // Tell fetch() that 4xx and 5xx are client and server errors respectively,
    // since it hasn't clue yet; redirect to pages depending of response's status code
    checkStatus = (res) => {
      
        if (res.status) {
            setAccessToken(res.result.access_token);
            setAccessToken(res.result.userDetails);
            this.setState({ loggedIn: true });
            this.props.history.push('/');
            console.log("đăng nhập thành công")
        } else {
            //let error = new Error(res.statusTest);
            //console.log(error);
            //this.props.history.push('/error');
            this.setState({
                appLoadingState: false,
                isError:true,
                isError: res.message
            })
        }
    }
    loginUser = (event) => {
        // When pressing Enter, the page shouldn't reload
        event.preventDefault();
        var data = JSON.stringify(this.prepareFormData());
        // Send POST request with data submited from form
        this.setState({ appLoadingState: true })
        var data = postAPI('api/user/login', data, false).then(this.checkStatus)
    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/" />;
        }
        let template;
        if (this.state.appLoadingState) {
            template = <Loading />
        }
        else {
            template = (
                <div className='hold-transition login-page' >
                    <div className="login-box">
                        <div className="login-logo">
                            <a href="../../index2.html"><b>Login</b></a>
                        </div>

                        <div className="card">
                            <div className="card-body login-card-body">
                                <p className="login-box-msg">
                                    <label>{this.state.isError}</label>
                                </p>
                                <form onSubmit={this.loginUser}>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" name='userName' placeholder="Username" onChange={this.handleOnChange} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleOnChange} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="icheck-primary">
                                                <input type="checkbox" id="remember" />
                                                <label htmlFor="remember">
                                                    Remember Me
              </label>
                                            </div>
                                        </div>

                                        <div className="col-4">
                                            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                        </div>

                                    </div>
                                </form>
                                <div className="social-auth-links text-center mb-3">
                                    <p>- OR -</p>
                                    <a href="#" className="btn btn-block btn-primary">
                                        <i className="fab fa-facebook mr-2" /> Sign in using Facebook
        </a>
                                    <a href="#" className="btn btn-block btn-danger">
                                        <i className="fab fa-google-plus mr-2" /> Sign in using Google+
        </a>
                                </div>

                                <p className="mb-1">
                                    <a href="forgot-password.html">I forgot my password</a>
                                </p>
                                <p className="mb-0">
                                    <a href="register.html" className="text-center">Register a new membership</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <>{template}</>

        );
    }
}