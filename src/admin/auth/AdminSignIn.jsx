import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../constants";

export default function AdminSignIn(){
    const [formData, setFormData] = useState({email:"",password:""});
        const URL = `${BASE_API_URL}?apiKey=admin_signIn`;
        const [msg,setMsg] = useState("");
        let navigate = useNavigate();
        const signIn = (e) => {
            e.preventDefault();
            axios.post(URL,formData,{withCredentials: true,headers:{'Content-Type':'application/json'}})
            .then((res)=>{
                console.log(res.data)
                if(res.data.status === "success"){
                    navigate('/admin/');
                }else{
                    setMsg(res.data.message);
                }
            })
            .catch((err)=>console.log(err));
        }
        return (
            <main className="main-auth">
                <section className="auth">

                <form className="active" action="" method="post" onSubmit={(data)=>signIn(data)}>
                    <h1>Sign In</h1>
                    <p className="p-msg">{msg}</p>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" onChange={(e)=>setFormData({...formData,email:e.target.value})} placeholder="Enter Email Address.." />
                    </div>
    
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" onChange={(e)=>setFormData({...formData,password:e.target.value})} placeholder="Enter Password.." />
                    </div>
    
                    <div className="btn"><button type="submit">Submit</button></div>
                </form>
                </section>
            </main>
        )
}