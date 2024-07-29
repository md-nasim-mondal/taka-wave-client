import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Loader from '../shared/Loader';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { currentUser, userLoading } = useAuth();

    if (userLoading) {
        return <Loader/>;
    }

    if (currentUser) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;