import { useParams } from "react-router-dom";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import ErrorPage from "../pages/ErrorPage";

export default function Auth() {
  const { auth } = useParams();

  const isValidAuth = auth === "signin" || auth === "signup";
  if (!isValidAuth) return <ErrorPage />;

  const layoutClass =
    auth === "signin"
      ? "main-auth flex-col md:flex-row"
      : "main-auth flex-col-reverse md:flex-row";

  return (
    <main className={layoutClass}>
      <SignUp auth={auth} />
      <SignIn auth={auth} />
    </main>
  );
}
