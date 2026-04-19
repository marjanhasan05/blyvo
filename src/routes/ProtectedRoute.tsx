import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hook";
import { selectUser, selectToken } from "../store/features/auth/auth.slice";
import type { AppRole } from "@/auth/access";
import { homePathForUser, resolveAppRole } from "@/auth/access";

type ProtectedRouteProps = {
  allowedRoles?: AppRole[];
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const location = useLocation();

  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles?.length) {
    const r = resolveAppRole(user);
    if (!r || !allowedRoles.includes(r)) {
      const fallback = homePathForUser(user) ?? "/login";
      return <Navigate to={fallback} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
