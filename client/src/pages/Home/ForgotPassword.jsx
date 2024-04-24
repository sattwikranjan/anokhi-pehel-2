import React, { useState } from "react";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../Service/helper";
import { logo } from "../../assets/Home";
import Button from "../../components/Home/Button";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    //const [credentials, setCredentials] = useState({ email: "" });
    const handleSubmit = async (e) => {
        

        try {
            
            // Send forgot password request to backend
            await axios.post(`${BASE_URL}/forgot-password`, { email });
            setMessage("Password reset instructions sent to your email.");
            
        } catch (error) {
            console.error("Error:", error.response.data);
            setMessage("Error occurred. Please try again.");
        }
    };
    const onChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-900"
        >
          <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
          Anokhi पहल
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 border-double border-4 border-cyan-500">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot Password
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <Button
                type="submit"
                text="Reset Password"
                styles="w-full bg-primary-600"
                func={handleSubmit}
              />
              {message && <p>{message}</p>}
              
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium hover:underline text-cyan-800"
                >
                  Contact Admin
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
        // <div>
        //     <h2>Forgot Password</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label>Email</label>
        //             <input type="email" value={email} onChange={handleChange} required />
        //         </div>
        //         <button type="submit" disabled={loading}>
        //             Reset Password
        //         </button>
        //     </form>
        //     {message && <p>{message}</p>}
        // </div>
    );
};

export default ForgotPassword;