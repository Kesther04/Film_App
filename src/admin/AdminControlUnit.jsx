import { UseSessionAdmin } from "./components/UseSessionAdmin";

export default function AdminControlUnit(){
    const {user} = UseSessionAdmin();
    let AdminName;
    user ? AdminName = user.name : AdminName = "";
    return (
        <>
        <h1>Welcome {AdminName}</h1>
        </>
    );
}