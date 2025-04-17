import Dashboard from "./components/Dashboard";


export default function AdminIndex(){
    let ddStates = false;
    return (
        <>
            <Dashboard ddState={ddStates} />
            <main>
                <section className="admin-content">
                    <h1>Welcome</h1>
                </section>
            </main>
        </>
    );
}