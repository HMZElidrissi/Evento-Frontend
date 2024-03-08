import {useState} from "react";
import axiosClient from "../../axios-client";


const ForgetPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosClient.post("/password/email", {email}).then(({data}) => {
            setMessage(data.message);
        }).catch(() => {
            setMessage('Failed to send reset link.');
        });
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
                            {message && (<p className="text-center text-red-500 text-sm mb-2">{message}</p>)}
                            <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={email}
                                        placeholder="Your email ..."
                                        onChange={(event) => setEmail(event.target.value)}
                                        className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-evento-700 focus:border-evento-700 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-evento-700 hover:bg-evento-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evento-600"
                                    >
                                        Send password reset link
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

export default ForgetPasswordPage;
