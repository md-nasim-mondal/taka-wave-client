import ripple from '../assets/ripple.svg';

const Loader = () => {
    return (
        <div className='flex items-center justify-center'>
            <img className='w-36' src={ripple} alt="Loading..." />
        </div>
    );
};

export default Loader;