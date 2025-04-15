import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../constants";

export default function SignIn({auth}) {
    const [formData, setFormData] = useState({email:"",password:""});
    const [msg,setMsg] = useState("");
    const URL = `${BASE_API_URL}?apiKey=signIn`;
    let navigate = useNavigate();
    const signIn = (e) => {
        e.preventDefault();
        axios.post(URL,formData,{withCredentials: true,headers:{'Content-Type':'application/json'}})
        .then((res)=>{
            console.log(res.data)
            if(res.data.status === "success"){
                navigate('/');
            }
            setMsg(res.data.message);
        })
        .catch((err)=>console.log(err));
    }
    return (
        <section className="auth">
            <span className={auth !== "signin" ? "active  -left-3" : ""}>
                <div className="bg-content left-0"></div>

                <div className="content">
                    <h1>Enter your Credentials Here to Create Account</h1>
                    <br/>
                    <Link to="/user/auth/signin">Click Here to Sign In</Link> 
                </div>
            </span>
            <form method="post" onSubmit={(data)=>signIn(data)} className={auth == "signin" ? "active" : ""}>
                <h1>Sign In</h1>
                <p className="p-msg">{msg}</p>
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