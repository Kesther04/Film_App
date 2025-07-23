import axios from "axios";
import { BASE_API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

function Logout({toLo}) {
    let URL = `${BASE_API_URL}destroy_session.php`;
    let navigate = useNavigate();
    const handleLogOut = () => {    
        axios.get(URL,{withCredentials:true}).then(res => { 
            console.log(res.data.message);
            navigate('/admin/auth/signin');
        }
        ).catch(err=>console.log(err))
    }
    return (
        <section className="popup">
            <div className="popup-box">
            <p className="py-2 italic font-semibold md:text-xl text-red-500">Are you sure you want to Log Out</p>
                <div className="btn flex gap-2 justify-center">
                    <button onClick={()=>toLo(false)}>No</button>
                    <button onClick={handleLogOut}>Yes</button>
                </div>
            </div>

        </section>
    );
}

export default Logout;