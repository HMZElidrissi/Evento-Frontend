import { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";

const LoginPage = () => {
  const { token } = useStateContext();
  const { setUser, setToken } = useStateContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState({});

  if (token) {
    return <Navigate to="/" />;
  }

  const handleLogin = (event) => {
    event.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient.post("/login", payload).then(({ data }) => {
      setUser(data.user);
      setToken(data.token);
    })
      .catch((error) => {
        const { response } = error;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({ email: response.data.error });
          }
        }
      });
  };

  return (
    <>
      <div className="h-screen">
        <div className="min-h-full flex flex-col justify-center py-10 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto"
              width={200}
              height={200}
              src="./evento.png"
              alt="Evento"
            />
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleLogin} method="POST">

                {errors && (
                  <div className="text-center text-red-500 text-sm mb-2">
                    {errors.email}
                  </div>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    ref={emailRef}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-evento-700 focus:border-evento-700 sm:text-sm"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email ..."
                  />
                </div>

                {errors && (
                  <div className="text-center text-red-500 text-sm mb-2">
                    {errors.password}
                  </div>
                )}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    ref={passwordRef}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-evento-700 focus:border-evento-700 sm:text-sm"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Your password ..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-evento-200 focus:ring-evento-200 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="#"
                      className="font-medium text-evento-700 hover:text-evento-600"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    to="/register"
                    className="text-sm font-medium text-gray-700 hover:underline"
                  >
                    Don&apos;t have an account? Register
                  </Link>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-evento-700 hover:bg-evento-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evento-600"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
