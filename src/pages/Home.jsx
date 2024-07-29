import useGetUserType from "../hooks/useGetUserType";

const Home = () => {
    const { userType } = useGetUserType();

    return (
        <section>
            {userType}
        </section>
    );
};

export default Home;