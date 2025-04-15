import { useState } from "react";
import { BASE_API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminSignUp(){
    const [formData, setFormData] = useState({name:"",email:"",password:""});
        const URL = `${BASE_API_URL}?apiKey=admin_signUp`;    
        const [msg,setMsg] = useState("");
        let navigate = useNavigate();
        const signUpUser = (e) => {
            e.preventDefault();
            axios.post(URL,formData,{withCredentials: true, headers:{'Content-Type':'application/json'}})
            .then((res) => {
                console.log(res.data);
                if(res.data.status === "success"){
                    navigate('/admin/');
                }
                setMsg(res.data.message);
            })
            .catch(error => console.log(error));       
        }  
            
        return (
            <main className="main-auth">
                <section className="auth">

                    <form className="active" onSubmit={(data)=>signUpUser(data)}>
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
        
                        <div className="btn"><button type="submit">Submit</button></div>
                    </form>
                </section>
            </main>
        )
}