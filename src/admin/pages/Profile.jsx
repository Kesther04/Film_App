import Dashboard from "../components/Dashboard";
import AdminInfo from "../components/AdminInfo";

export default function Profile(){
    return (
        <>
            <Dashboard ddState={false} />
            <main className="admin-main">
                <section className="admin-content">
                    <h1 className="font-bold text-3xl">My Profile</h1>
                    <AdminInfo/>
                </section>
            </main>
        </>
    );
}