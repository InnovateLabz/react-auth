import { Navigate,  Route, Outlet } from 'react-router-dom';
import { useUser } from './useUser';

export const PrivateRoute = () => {
    const user = useUser();

    return !user ? <Navigate to="/login" /> : <Outlet/>
}