import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useGetUserType = () => {
    const { currentUser, userLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userType = '', isLoading: userTypeLoading } = useQuery({
        queryKey: ['userType', currentUser?.email],
        enabled: !userLoading && !!currentUser?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/single?email=${currentUser?.email}`);
            return data?.account_type;
        }
    })

    return { userType, userTypeLoading };
}

export default useGetUserType;