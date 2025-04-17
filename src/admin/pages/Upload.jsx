// import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import UploadFilms from "../components/UploadFilms";

export default function Upload() {
    // const [showNav, setShowNav] = useState(true);
    return (
        <>
            <Dashboard ddState={true}/>
            <main>
                <section className="admin-content">
                    <UploadFilms/>
                </section>
            </main>
        </>
    );
}