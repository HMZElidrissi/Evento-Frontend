import { useState } from "react";
import Label from "./common/Label";
import Input from "./common/Input";
import PrimaryButton from "./common/PrimaryButton";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process login here
    console.log(email);
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
                  <PrimaryButton type="submit">
                    Send Password Reset Link
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordPage;
