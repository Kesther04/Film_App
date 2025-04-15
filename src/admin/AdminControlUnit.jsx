import Dashboard from "./components/Dashboard";
import { UseSessionAdmin } from "./components/UseSessionAdmin";

export default function AdminControlUnit(){
    const {user} = UseSessionAdmin();
    let AdminName;
    user ? AdminName = user.name : AdminName = "";
    return (
        <>
            <Dashboard/>
            <main>
                <h1>Welcome {AdminName}</h1>
            </main>
        </>
    );
}