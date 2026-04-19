import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hook";
import { selectUser, selectToken } from "../store/features/auth/auth.slice";


const ProtectedRoute = () => {
    const user = useAppSelector(selectUser);
    const token = useAppSelector(selectToken);

   

    const location = useLocation();
    if (!user || !token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
