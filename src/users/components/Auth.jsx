import { useParams } from "react-router-dom";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import ErrorPage from "../pages/ErrorPage";

export default function Auth() {
    let authSign;
    let respDisp;
    const params = useParams();
    if (params.auth === "signin" || params.auth === "signup"){
        authSign = params.auth;
        authSign == "signin" && (respDisp = "main-auth flex-col md:flex-row");
        authSign == "signup" && (respDisp = "main-auth flex-col-reverse md:flex-row");
        return(
            <main className={respDisp}>
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