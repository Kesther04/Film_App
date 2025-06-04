import AllUploads from "../components/AllUploads";
import Dashboard from "../components/Dashboard";
import SearchBar from "../components/SearchBar";

export default function ViewUploads() {
    return (
        <>
            <Dashboard ddState={true}/>
            <main>
                <section className="admin-content">
                    <h1 className="font-bold text-3xl">All Films</h1>
                    <SearchBar ph={"Search for Films Here..."}/>
                    <AllUploads/>
                </section>
            </main>
        </>
    );
}