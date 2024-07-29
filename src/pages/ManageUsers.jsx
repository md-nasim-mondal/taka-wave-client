import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  MdBlock,
  MdOutlinePendingActions,
  MdVerifiedUser,
} from "react-icons/md";
import { FaUserCheck } from "react-icons/fa6";
import TakaTable from "../components/TakaTable";
import useUpdateUser from "../hooks/useUpdateUser";
import Loader from "../shared/Loader";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const updateUser = useUpdateUser();

  const {
    isLoading,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const handleActivateUser = (name, email) => {
    const user = { account_status: "active" };
    const msg = `${name}'s Account is Activated!`;

    updateUser(email, user, msg, refetch);
  };

  const handleBlockUser = (name, email) => {
    const user = { account_status: "blocked" };
    const msg = `${name}'s Account is Blocked!`;

    updateUser(email, user, msg, refetch);
  };

  const usersWithSerial = users?.map((user, index) => ({
    ...user,
    serial: index + 1,
  }));
  const userData = useMemo(() => usersWithSerial, [usersWithSerial]);

  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const userColumns = [
    {
      header: "#",
      accessorKey: "serial",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Mobile",
      accessorKey: "mobile",
    },
    {
      header: "Status",
      accessorKey: "account_status",
      cell: (cell) => {
        return (
          <>
            {cell.row.original.account_status === "pending" ? (
              <h3 className='flex items-center gap-1 font-bold text-lg text-green-700 mx-auto justify-center'>
                <MdOutlinePendingActions /> Pending
              </h3>
            ) : cell.row.original.account_status === "blocked" ? (
              <h3 className='flex items-center gap-1 font-bold text-lg text-green-700 mx-auto justify-center'>
                <MdBlock /> Blocked
              </h3>
            ) : (
              <h3 className='flex items-center gap-1 font-bold text-lg text-green-700 mx-auto justify-center'>
                <FaUserCheck /> Active
              </h3>
            )}
          </>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "account_status",
      cell: (cell) => {
        const { name, email } = cell.row.original;
        return (
          <>
            {cell.row.original.account_status === "pending" ||
            cell.row.original.account_status === "blocked" ? (
              <button
                className={`flex items-center gap-0.5 border border-lightBlue px-3 py-0.5 rounded-3xl text-lightBlue hover:text-white hover:bg-lightBlue font-bold text-lg transition-all duration-500 mx-auto`}
                onClick={() => handleActivateUser(name, email)}>
                <MdVerifiedUser /> Activate
              </button>
            ) : (
              <button
                className={`flex items-center gap-0.5 border border-lightBlue px-3 py-0.5 rounded-3xl text-lightBlue hover:text-white hover:bg-lightBlue font-bold text-lg transition-all duration-500 mx-auto`}
                onClick={() => handleBlockUser(name, email)}>
                <MdBlock /> Block
              </button>
            )}
          </>
        );
      },
    },
  ];

  if (isLoading) return <Loader />;

  return (
    <section className='m-8'>
      <TakaTable data={userData} columns={userColumns} />
    </section>
  );
};

export default ManageUsers;
