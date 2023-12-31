import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import fb from '../../asset/img/fb.svg'
import { email_Pattern, getHeaderWithProjectId } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slice/userSlice";
import axios from "axios";

export default function Login() {
    const initialData = {
        email: '',
        password: '',
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorIn, setErrorIn] = useState('');
    const [loginData, setLoginData] = useState(initialData);
    const auth = useSelector(state => state.user.user.auth);
    const changeHandler = e => {
        setErrorIn('');
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const loginUser = async (user) => {
        const config = getHeaderWithProjectId();
        try {
            const res = await axios.post(
                "https://academics.newtonschool.co/api/v1/user/login", { ...user, appType: "facebook" }, config
            );
            // console.log("res", res);
            const token = res.data.token;
            if (token) {
                dispatch(login(res.data))
                // if (ticket.flightID || ticket.rooms || ticket.trainName) {
                //     navigate('/checkout')
                // } else {
                navigate('/');
                // }
            }
        } catch (err) {
            console.log("Error:", err);
            setErrorIn(err?.response?.data?.message)
        }
    }

    const loginHandler = async e => {
        e.preventDefault();
        if (!loginData.email.match(email_Pattern)) {
            setErrorIn("Please check Email!");
            return;
        }
        if (loginData.password.trim() === '') {
            setErrorIn('Please enter password!');
            return;
        }
        loginUser(loginData)
    };
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <img src={fb} className="loginLogo" />
                    <div className="loginLeftDesc">
                        Facebook Clone helps you connect and share with the people in your life.
                    </div>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <form action="#" className="loginForm">
                            <div className="loginUsername">
                                <input
                                    className="loginInput"
                                    placeholder="Email or Phone number"
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={changeHandler}
                                    autoFocus
                                />
                            </div>
                            <div className="loginPassword">
                                <input
                                    className="loginInput"
                                    placeholder="Password"
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="loginSubmit">
                                <button id="loginBtn" disabled={auth} onClick={loginHandler}>Log in</button>
                            </div>
                            <div>
                                {errorIn ? <div style={{ color: "red", fontSize: 12 }}>{errorIn}</div> : null}
                            </div>
                            <span>
                                <a className="forgetPwd" href="#email?">
                                    Forgotten password?
                                </a>
                            </span>
                            <hr className="loginHr" />
                            <div className="loginCreateAc">
                                <Link to="/signup">
                                    <input
                                        className="loginCreateBtn"
                                        type="submit"
                                        value="Create new account"
                                    />
                                </Link>
                            </div>
                        </form>
                    </div>
                    <div className="loginRightDesc">
                        <b>Create a Page </b> for a celebrity, brand or business.
                    </div>
                </div>
            </div>
        </div>
    );
}
