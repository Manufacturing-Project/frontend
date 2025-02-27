import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';

interface ProtectedRoutesProps{
    children: ReactNode;
}

const ProtectedRoutes:React.FC<ProtectedRoutesProps> = ({children}) => {

    const { isAuthenticated } = useSelector((state: RootState)=>state.user);

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoutes;