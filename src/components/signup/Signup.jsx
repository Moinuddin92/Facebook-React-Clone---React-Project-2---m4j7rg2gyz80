import React, { useState } from "react";
import './Signup.css'
import { useNavigate } from "react-router-dom";
import { email_Pattern, getHeaderWithProjectId } from "../../constant";
import axios from "axios";
import { useDispatch, } from "react-redux";
import { login } from "../../store/slice/userSlice";
import fb from '../../asset/img/fb.svg';

const Signup = () => {
    const initialData = {
        name: '',
        email: '',
        password: '',
    };
    const [signupData, setSignupData] = useState(initialData);
    const [errorIn, setErrorIn] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loggingIn, setLoggingIn] = useState(false);

    const changeHandler = e => {
        setErrorIn('');
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value,
        });
    };
    const signUpUser = async (user) => {
        const config = getHeaderWithProjectId();
        try {
            const resSignup = await axios.post(
                "https://academics.newtonschool.co/api/v1/user/signup", { ...user, appType: "facebook" }, config
            );
            const res = await axios.post(
                "https://academics.newtonschool.co/api/v1/user/login", { ...user, appType: "facebook" }, config
            );
            const token = res.data.token;
            if (token) {
                dispatch(login(res.data))
                navigate('/');
            }

        } catch (err) {
            console.log("Error:", err);
        }
    }

    const signupHandler = e => {
        e.preventDefault();
        if (signupData.name.trim() === '') {
            setErrorIn('Please Enter Name!');
            setLoggingIn(false);
            return;
        }
        if (!signupData.email.match(email_Pattern)) {
            setErrorIn('Please check Email!');
            setLoggingIn(false);
            return;
        }
        if (signupData.password.trim() === '') {
            setErrorIn('Please Enter Password!');
            setLoggingIn(false);
            return;
        }
        setLoggingIn(true);
        signUpUser(signupData)
    };

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerRight">
                    <img className="registerLogo" src={fb} height={75} width={300} style={{ margin: 0 }} />
                    <div className="registerBox">
                        <form action="" className='registerForm'>
                            <div className="registerUsername">
                                <input className='registerInput' placeholder='Name' type="text" id="name" name="name" value={signupData.name} onChange={changeHandler} autoFocus />
                            </div>
                            <div className="registerEmail">
                                <input className='registerInput' placeholder='Email or Phone number' type="email" id="email" name="email" value={signupData.email} onChange={changeHandler} />
                            </div>
                            <div className="registerPassword">
                                <input className='registerInput' placeholder='Password' type="password" id="password" name="password" value={signupData.password} onChange={changeHandler} />
                            </div>
                            <div className="registerSubmit">
                                <button id='registerBtn' type="submit" onClick={signupHandler}>Sign Up</button>
                            </div>
                            <div>
                                {errorIn ? <div style={{ color: "red", fontSize: 12 }}>{errorIn}</div> : null}
                            </div>
                            <hr className="registerHr" />
                            <div className="registerLoginAc">
                                <label htmlFor="reg-btn">
                                    <span style={{ color: 'blue' }} onClick={() => navigate("/")}>Already have a account?</span>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
