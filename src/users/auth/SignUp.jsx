import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../constants";

export default function SignUp({auth}) {
    const [formData, setFormData] = useState({name:"",email:"",password:""});
    const [msg,setMsg] = useState("");
    const URL = `${BASE_API_URL}?apiKey=signUp`;    
    let navigate = useNavigate();
    const signUpUser = (e) => {
        e.preventDefault();
        axios.post(URL,formData,{withCredentials: true, headers:{'Content-Type':'application/json'}})
        .then((res) => {
            console.log(res.data);
            if(res.data.status === "success"){
                navigate('/');
            }else{
                setMsg(res.data.message);
            }
        })
        .catch(error =>console.log(error));       
    }  
         
    return (
        
        <section className="auth xl:h-128">
            <span className={auth !== "signup" ? "active  xl:-right-3 justify-end " : ""}>
                <div className="bg-content right-0 "></div>

                <div className="content">
                    <h1>Enter your Credentials Here to Sign In</h1>
                    <br />
                    <p>If you don't have an Account Yet</p>
                    <Link to="/user/auth/signup">Click Here to Sign Up</Link>   
                </div>
                     
            </span>
            <form onSubmit={(data)=>signUpUser(data)} className={auth == "signup" ? "active" : ""}>
                <h1>Sign Up</h1>
                <p className="p-msg">{msg}</p>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="name" id="name" onChange={(e)=>setFormData({...formData,name:e.target.value})}  placeholder="Enter Username.." />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" onChange={(e)=>setFormData({...formData,email:e.target.value})}  placeholder="Enter Email Address.." />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={(e)=>setFormData({...formData,password:e.target.value})}  placeholder="Enter Password.." />
                </div>

                <div className="btn">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </section>
    )
}