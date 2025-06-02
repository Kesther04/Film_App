import AdminOverview from "./components/AdminOverview";
import Dashboard from "./components/Dashboard";


export default function AdminIndex(){
    let ddStates = false;
    return (
        <>
            <Dashboard ddState={ddStates} />
            <main>
                <section className="admin-content">
                    <h1 className="font-bold text-3xl">Overview</h1>
                    <AdminOverview/>
                </section>
            </main>
        </>
    );
}