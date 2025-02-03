import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router";
import { verifytoken } from "../../utils/verifyToken";

type TProtectedRoute = {
    children: ReactNode;
    role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {

    const token = useAppSelector(useCurrentToken);
    let user;

    if (token) {
        user = verifytoken(token);
    }
    // console.log(user?.role);

    const dispatch = useAppDispatch();

    if (role !== undefined && role !== (user as TUser)?.role) {
        dispatch(logOut());
        return <Navigate to="/login" replace={true} />;
    }

    if (!token) {
        return <Navigate to='/login' replace={true} />
    }
    return children;
};

export default ProtectedRoute;