import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdEmail, MdSwitchAccount } from "react-icons/md";
import { FaEye, FaEyeSlash, FaMobileRetro } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, login, currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // redirect logged in user
  useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, from, navigate]);

  // register user
  const handleRegister = async (userInfo) => {
    try {
      userInfo.account_status = "pending";
      const res = await registerUser(userInfo);

      if (res?.insertedId) {
        reset();
        toast.success("Registration Successful!");

        // after successful registration login the user
        const loginRes = await login(userInfo.mobile, userInfo.pin);
        if (loginRes?.success) {
          toast.success(loginRes?.message);
          navigate("/");
        } else {
          toast.error(loginRes?.message);
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  // show input errors as toasts
  useEffect(() => {
    if (errors.name) {
      toast.error(errors.name.message, { duration: 2000 });
      return;
    }
    if (errors.pin) {
      toast.error(errors.pin.message, { duration: 2000 });
      return;
    }
    if (errors.mobile) {
      toast.error(errors.mobile.message, { duration: 2000 });
      return;
    }
    if (errors.email) {
      toast.error(errors.email.message, { duration: 2000 });
      return;
    }
    if (errors.account_type) {
      toast.error(errors.account_type.message, { duration: 2000 });
      return;
    }
  }, [
    errors.account_type,
    errors.email,
    errors.mobile,
    errors.name,
    errors.pin,
  ]);

  return (
    <section className='m-8'>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className='flex flex-col gap-5 items-center justify-between max-w-4xl mx-auto bg-blueBG p-6 rounded-md shadow-md shadow-lighterBlue'>
        {/* Name */}
        <div className='w-full flex items-center gap-2 rounded-lg bg-transparent border-lighterBlue border shadow-md shadow-lighterBlue'>
          <label
            htmlFor='name'
            className='flex items-center gap-1 pl-2 sm:w-24'>
            <FaUserEdit />
            <span className='hidden sm:inline'>Name</span>
          </label>
          <input
            {...register("name", {
              required: { value: true, message: "Name is required!" },
            })}
            name='name'
            id='name'
            type='text'
            placeholder='Your Name'
            className='px-2 rounded-r-lg py-2 w-full border-l bg-transparent focus:outline-0 text-white'
          />
        </div>

        {/* PIN */}
        <div className='w-full flex items-center gap-2 rounded-lg bg-transparent border-lighterBlue border shadow-md shadow-lighterBlue'>
          <label htmlFor='pin' className='flex items-center gap-1 pl-2 sm:w-24'>
            <RiLockPasswordFill />
            <span className='hidden sm:inline'>PIN</span>
          </label>
          <div className='relative w-full'>
            <input
              {...register("pin", {
                required: { value: true, message: "Provide a valid PIN!" },
                minLength: { value: 5, message: "PIN must be 5 digits!" },
                maxLength: { value: 5, message: "PIN must be 5 digits!" },
              })}
              className='px-2 rounded-r-lg py-2 w-full border-l bg-transparent focus:outline-0 text-white'
              type={showPassword ? "text" : "password"}
              name='pin'
              id='pin'
              placeholder='Choose a 5 digit PIN'
            />
            <span
              className='absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Mobile */}
        <div className='w-full flex items-center gap-2 rounded-lg bg-transparent border-lighterBlue border shadow-md shadow-lighterBlue'>
          <label
            htmlFor='mobile'
            className='flex items-center gap-1 pl-2 sm:w-24'>
            <FaMobileRetro />
            <span className='hidden sm:inline'>Mobile</span>
          </label>
          <input
            {...register("mobile", {
              required: { value: true, message: "Mobile number is required!" },
              pattern: {
                value: /^01\d{9}$/,
                message: "Provide a valid 11 digit number!",
              },
            })}
            name='mobile'
            id='mobile'
            type='number'
            placeholder='Your Mobile'
            className='px-2 rounded-r-lg py-2 w-full border-l bg-transparent focus:outline-0 text-white'
          />
        </div>

        {/* Email */}
        <div className='w-full flex items-center gap-2 rounded-lg bg-transparent border-lighterBlue border shadow-md shadow-lighterBlue'>
          <label
            htmlFor='email'
            className='flex items-center gap-1 pl-2 sm:w-24'>
            <MdEmail />
            <span className='hidden sm:inline'>Email</span>
          </label>
          <input
            {...register("email", {
              required: { value: true, message: "Email is required!" },
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format!",
              },
            })}
            name='email'
            id='email'
            type='email'
            placeholder='Your Email'
            className='px-2 rounded-r-lg py-2 w-full border-l bg-transparent focus:outline-0 text-white'
          />
        </div>

        {/* Account Type */}
        <div className='w-full flex items-center gap-2 rounded-lg bg-transparent border-lighterBlue border shadow-md shadow-lighterBlue'>
          <label
            htmlFor='account_type'
            className='flex items-center gap-1 pl-2 whitespace-pre sm:w-24'>
            <MdSwitchAccount />
            <span className='hidden sm:inline'>Account</span>
          </label>
          <select
            {...register("account_type", {
              required: { value: true, message: "Account type is required!" },
            })}
            name='account_type'
            id='account_type'
            className='px-2 rounded-r-lg py-2 w-full border-l bg-blueBG focus:outline-0 text-white'>
            <option className='text-gray-300' value=''>
              Select Account Type
            </option>
            <option value='user'>User</option>
            <option value='agent'>Agent</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='flex items-center gap-1 px-3 py-1 text-xl md:text-2xl border border-lighterBlue rounded-3xl hover:text-lightBlue hover:bg-white hover:scale-105 transition-all duration-700 font-semibold shadow-md shadow-lighterBlue'>
          Register
        </button>
        <p className='text-center text-sm md:text-base font-medium'>
          Already have an account?{" "}
          <Link
            className='hover:pl-4 text-linkColor font-bold hover:text-nexus-secondary transition-all duration-500'
            to={"/login"}>
            Login Here!
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
