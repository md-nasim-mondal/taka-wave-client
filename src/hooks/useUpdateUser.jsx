import useAxiosSecure from "./useAxiosSecure"
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const useUpdateUser = () => {
    const axiosSecure = useAxiosSecure();

    /**
     * Updates a User.
     *
     * @param {string} email - Email of the user.
     * @param {object} user - The user object to update.
     * @param {string} msg - Success message to display.
     * @param {function} refetch - Function from useQuery to refetch user data after update.
     */

    const updateUser = (email, user, msg, refetch) => {

        axiosSecure.patch(`/users/${email}`, user)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success(msg)
                    refetch();
                }
            })
            .catch(error => {
                console.error(error);
                if (error) {
                    Swal.fire({
                        title: 'Error!!',
                        text: error?.message,
                        icon: 'error',
                        confirmButtonText: 'Close',
                        color: '#fff',
                        background: '#f15d24de'
                    })
                }
            })
    }

    return updateUser;
};

export default useUpdateUser;