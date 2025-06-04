import Dashboard from "../components/Dashboard";
import SearchBar from "../components/SearchBar";
import UsersContainer from "../components/UsersContainer";

export default function UserDetails() {
    return (
        <>
            <Dashboard ddState={false}/>
            <main>
                <section className="admin-content">
                    <h1 className="font-bold text-3xl">All Users</h1>
                    <SearchBar ph={"Search for Users Here..."}/>
                    <UsersContainer/>
                </section>

            </main>
        </>
    );
}