import Dashboard from "../components/Dashboard";

export default function ViewUploads() {
    return (
        <>
            <Dashboard ddState={true}/>
            <main>
                <section className="admin-content">
                    <h1 className="font-bold text-2xl">Search for Film</h1>
                </section>
            </main>
        </>
    );
}