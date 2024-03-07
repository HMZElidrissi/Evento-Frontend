import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Label from "./common/Label";
import Input from "./common/Input";
import PrimaryButton from "./common/PrimaryButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin =  (event) => {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        } else {
          setError(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setPassword("");
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
                {error && (
                  <div className="text-center text-red-500 text-sm mb-2">{error}</div>
                )}
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address ..."
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    <a
                      href="#"
                      className="font-medium text-evento-700 hover:text-evento-600"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <PrimaryButton type="submit">Login</PrimaryButton>
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
