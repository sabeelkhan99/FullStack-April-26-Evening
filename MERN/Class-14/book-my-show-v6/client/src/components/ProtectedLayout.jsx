import { Navigate, Outlet } from "react-router";
import UserContext from "../context/user-context";
import { useContext } from "react";

function ProtectedLayout() {
    const { isLoggedIn } = useContext(UserContext);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedLayout;