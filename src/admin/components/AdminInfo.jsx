import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UseSessionAdmin } from "./UseSessionAdmin";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function AdminInfo(){
    const {user} = UseSessionAdmin();
    console.log(user);
    return (
    <>
        <div className="userContent">
            <div className="userBox">
                {/* admin picture, name and email */}
                <div>
                    <span className="rounded-full border w-30 h-30 relative overflow-hidden cursor-pointer">
                        {/* <img src="" alt="" /> */}
                        <FontAwesomeIcon icon={faUser} className="w-full h-full rounded-full text-8xl absolute top-6"/>
                    </span>
                    <span className="font-bold italic flex flex-col justify-center ml-5">
                        <p>{user?.name}</p>
                        <p>{user?.email}</p>
                    </span>
                </div>
            </div>

            <div className="userBox">
                <h3>Personal Information</h3>
                {/* other personal info */}
                <div>
                    <div>
                        <span></span>
                        <span></span>
                    </div>

                    <div>
                        <span></span>
                        <span></span>
                    </div>

                    <div>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                
                <div className="btn">
                    <button>Edit</button>
                </div>
            </div>

           
        </div>
    </>);
}