import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router";
import { verifytoken } from "../../utils/verifyToken";

type TProtectedRoute = {
    children: ReactNode;
    role: string;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {

    let user ;
    const token = useAppSelector(useCurrentToken);
    if(token){
        user = verifytoken(token);
    }
    console.log(user?.role);

    const dispatch = useAppDispatch();

    if(role !== undefined && role !== user?.role){
        dispatch(logOut());
        return <Navigate to='/login' replace={true} />
    }

    if (!token) {
        return <Navigate to='/login' replace={true} />
    }
    return children;
};

export default ProtectedRoute;