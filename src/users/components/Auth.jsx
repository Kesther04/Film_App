import { useParams } from "react-router-dom";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import ErrorPage from "../pages/ErrorPage";

export default function Auth() {
    let authSign;
    const params = useParams();
    if (params.auth === "signin" || params.auth === "signup"){
        authSign = params.auth;
        return(
            <main className="main-auth">
                <SignUp auth={authSign} />
                <SignIn auth={authSign} />
            </main>
        )
    }else{
        return (
            <ErrorPage/>
        )
    }

}