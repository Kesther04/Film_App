import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserCard({user}){
    console.log(user);
    return(
        <div className="rounded-xl h-120  p-5 shadow-xl flex flex-col justify-between">
            <div className="w-full h-40 relative flex justify-center ">
                {/* profile image div */}
                <div className="rounded-full border w-40 h-40 relative overflow-hidden cursor-pointer">
                    {/* <img src="" alt="" /> */}
                    <FontAwesomeIcon icon={faUser} className="w-full h-full rounded-full text-9xl absolute top-8"/>
                </div>
            </div>

            <div className=" my-2 p-2 min-h-40 h-auto italic">
                <p><b>Username:</b> {user.name}</p>
                <p><b>Email Address:</b> {user.email}</p>
                <p><b>Joined On:</b> {user.joined_on}</p>
                <p><b>Last Login:</b> {user.last_login}</p>
                
                <div className="flex gap-2 my-2 font-bold">
                {user.activeState ? <span className="border rounded px-1 text-blue-500">Active</span> : <span className="border rounded px-1 text-red-500">Inactive</span>}
                
                {user.is_admin && <span className="border rounded px-1 text-green-500">Admin</span>}
                </div>
            </div>

            <div className="btn flex gap-2 ">
                <button className="p-1">Message User</button>
                <button className="p-1">Delete User</button>
            </div>

        </div>
    );
}