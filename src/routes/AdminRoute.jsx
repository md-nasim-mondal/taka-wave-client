import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from '../shared/Loader';
import useGetUserType from '../hooks/useGetUserType';

const AdminRoute = ({ children }) => {
    const { currentUser, userLoading } = useAuth();
    const { userType, userTypeLoading } = useGetUserType();

    const location = useLocation();

    if (userLoading || userTypeLoading) {
        return <Loader/>
    }

    if (currentUser && userType === 'admin') {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

AdminRoute.propTypes = {
    children: PropTypes.node
}

export default AdminRoute;