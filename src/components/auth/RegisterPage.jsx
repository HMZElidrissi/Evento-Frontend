import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";

const RegisterPage = () => {
  const { token } = useStateContext();
  const { setUser, setToken } = useStateContext();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState({});

  if (token) {
    return <Navigate to="/" />;
  }

  const handleRegister = (event) => {
    event.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    axiosClient.post("/register", payload).then(({ data }) => {
      setUser(data.user);
      setToken(data.token);
    })
      .catch((error) => {
        const { response } = error;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
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
              <form
                className="space-y-6"
                onSubmit={handleRegister}
                method="POST"
              >
                {/* {errors && (
                  <div className="text-center text-red-500 text-sm mb-2">
                    {Object.values(errors).map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )} */}
                {errors && (
                  <div className="text-center text-red-500 text-sm mb-2">
                    {errors.name}
                  </div>
                )}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    ref={nameRef}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-evento-700 focus:border-evento-700 sm:text-sm"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name ..."
                  />
                </div>

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

                <div>
                  <label
                    htmlFor="password_confirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    ref={passwordConfirmationRef}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-evento-700 focus:border-evento-700 sm:text-sm"
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    placeholder="Confirm your password ..."
                  />
                </div>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:underline"
                  >
                    Already have an account? Login
                  </Link>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-evento-700 hover:bg-evento-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evento-600"
                  >
                    Register
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

export default RegisterPage;
