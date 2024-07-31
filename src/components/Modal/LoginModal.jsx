import React from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from "react";
import axios from "axios";

function LoginModal() {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const navigate=useNavigate()


    const handleLogin=(e) =>{
        e.preventDefault()
        axios.post('http://localhost:3001/login',{email,password})
        .then(result =>{console.log(result)
            if(result.data === 'Success'){
                navigate('/home')
            }
            else{
                alert('Incorrect Username or Password')
            }
        })
        .catch(err=> console.log(err))
    }
  return (
    <>
     <div className="d-flex justify-content-center align-items-center vh-100 signup">
            <div className="background p-3 rounded w-25">
                <center><h2>Login Now</h2></center>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                        type='text'
                        placeholder="Enter @Email"
                        autoComplete="off"
                        name='name'
                        className="form-control rounded-0"
                        onChange={(e) =>setEmail(e.target.value)}
                        >
                        </input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                        type='password'
                        placeholder="Enter Password"
                        autoComplete="off"
                        name='password'
                        className="form-control rounded-0"
                        onChange={(e) =>setPassword(e.target.value)}
                        >
                        </input>
                    </div>
                    <button type='submit' className="btn btn-default bg-success w-100 rounded-0" onClick={handleLogin}> 
                        Login  
                    </button>
                    <p>Not Have an Account?</p>
                    <Link to='/' className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">SignUp</Link>
                </form>
            </div>
        </div>
    </>
  );
}
export default LoginModal;


