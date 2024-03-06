import { useState } from "react";
import Label from "./common/Label";
import Input from "./common/Input";
import PrimaryButton from "./common/PrimaryButton";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process Register here
    console.log(email, password);
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
              <form className="space-y-6" onSubmit={handleSubmit} method="POST">

                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your name ..."
                  />
                </div>

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

                <div>
                  <Label htmlFor="password_confirmation">Password Confirmation</Label>
                  <Input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password confirmation ..."
                  />
                </div>

                <div className="text-center">
                  <Link to="/login" className="text-sm font-medium text-gray-700 hover:underline">
                    Already have an account? Login
                  </Link>
                </div>

                <div>
                  <PrimaryButton type="submit">Register</PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
