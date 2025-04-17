import Dashboard from "../components/Dashboard";

export default function Profile(){
    return (
        <>
            <Dashboard ddState={false}/>
            <main>
                <section className="admin-content">
                    <h1>Welcome</h1>
                </section>
            </main>
        </>
    );
}