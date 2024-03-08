import {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {BookmarkAltIcon, ChartBarIcon, MenuIcon, XIcon} from '@heroicons/react/outline'
import {Link, Outlet} from "react-router-dom";
import axiosClient from "../axios-client";
import {useStateContext} from "../contexts/ContextProvider.jsx";


const FrontOfficeLayout = () => {
    const {user, token, setUser, setToken} = useStateContext();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        if (token) {
            axiosClient.get("/me").then(({data}) => {
                setUser(data.user);
            }).catch(() => {
                setUser({});
            });
        }
    }, [token, setUser]);

    const handleLogout = () => {
        setUser({name: null});
        setToken(null);
    };

    return (
        <div className="bg-gray-50">
            <div>
                {/* Mobile menu */}
                <Transition.Root show={mobileMenuOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileMenuOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25"/>
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div
                                className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                                <div className="px-4 pt-5 pb-2 flex">
                                    <button
                                        type="button"
                                        className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>
                                </div>

                                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                    {!token && (
                                        <>
                                            <div className="flow-root">
                                                <Link to="/register"
                                                      className="-m-2 p-2 block font-medium text-gray-900">
                                                    Create an account
                                                </Link>
                                            </div>
                                            <div className="flow-root">
                                                <Link to="/login" className="-m-2 p-2 block font-medium text-gray-900">
                                                    Sign in
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                    {token && user && (
                                        <>
                                            <div className="flow-root text-gray-600 font-medium">
                                                Welcome, {user.name}
                                            </div>
                                            &nbsp; &nbsp; &nbsp; &nbsp;
                                            <div className="flow-root">
                                                <a href="#"
                                                   onClick={handleLogout}
                                                   className="-m-2 p-2 block text-gray-600">
                                                    Sign out
                                                </a>
                                            </div>
                                            <div className="ml-4 flow-root lg:ml-8">
                                                <Link to="/my-reservations"
                                                      className="group -m-2 p-2 flex items-center">
                                                    <BookmarkAltIcon
                                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                                        aria-hidden="true"/>
                                                    <span
                                                        className="ml-2 text-sm font-medium text-gray-900">Approved Reservations</span>
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Transition.Child>
                    </Dialog>
                </Transition.Root>

                <header className="relative">
                    <nav aria-label="Top">
                        <div className="bg-white shadow-sm">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="h-16 flex items-center justify-between">
                                    {/* Logo (lg+) */}
                                    <div className="hidden lg:flex-1 lg:flex lg:items-center">
                                        <Link to="/">
                                            <span className="sr-only">Evento</span>
                                            <img
                                                className="h-8 w-auto"
                                                src="./evento.png"
                                                alt="Evento"
                                            />
                                        </Link>
                                    </div>

                                    {/* Mobile menu and search (lg-) */}
                                    <div className="flex-1 flex items-center lg:hidden">
                                        <button
                                            type="button"
                                            className="-ml-2 bg-white p-2 rounded-md text-gray-400"
                                            onClick={() => setMobileMenuOpen(true)}
                                        >
                                            <span className="sr-only">Open menu</span>
                                            <MenuIcon className="h-6 w-6" aria-hidden="true"/>
                                        </button>
                                    </div>

                                    {/* Logo (lg-) */}
                                    <a href="#" className="lg:hidden">
                                        <span className="sr-only">Evento</span>
                                        <img
                                            src="./evento.png"
                                            alt="Evento"
                                            className="h-8 w-auto"
                                        />
                                    </a>

                                    <div className="hidden lg:flex flex-1 items-center justify-end">
                                        <div className="flex items-center lg:ml-8">
                                            {!token && (
                                                <>
                                                    <div className="flow-root">
                                                        <Link to="/register"
                                                              className="-m-2 p-2 block font-medium text-gray-600">
                                                            Create an account
                                                        </Link>
                                                    </div>
                                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                                    <div className="flow-root">
                                                        <Link to="/login"
                                                              className="-m-2 p-2 block font-medium text-gray-600">
                                                            Sign in
                                                        </Link>
                                                    </div>
                                                </>
                                            )}
                                            {token && (user && user.role_id === 3) && (
                                                <>
                                                    <div className="flow-root text-gray-600 font-medium">
                                                        Welcome, {user.name}
                                                    </div>
                                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                                    <div className="flow-root">
                                                        <a href="#"
                                                           onClick={handleLogout}
                                                           className="-m-2 p-2 block text-gray-600">
                                                            Sign out
                                                        </a>
                                                    </div>
                                                    <div className="ml-4 flow-root lg:ml-8">
                                                        <Link to="/my-reservations"
                                                              className="group -m-2 p-2 flex items-center">
                                                            <BookmarkAltIcon
                                                                className="flex-shrink-0 h-6 w-6 text-gray-400"
                                                                aria-hidden="true"/>
                                                            <span
                                                                className="ml-2 text-sm font-medium text-gray-900">Approved Reservations</span>
                                                        </Link>
                                                    </div>
                                                </>
                                            )}
                                            {token && (user && user.role_id !== 3) && (
                                                <>
                                                    <div className="flow-root text-gray-600 font-medium">
                                                        Welcome, {user.name}
                                                    </div>
                                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                                    <div className="flow-root">
                                                        <a href="#"
                                                           onClick={handleLogout}
                                                           className="-m-2 p-2 block text-gray-600">
                                                            Sign out
                                                        </a>
                                                    </div>
                                                    <div className="ml-4 flow-root lg:ml-8">
                                                        <Link to="/dashboard"
                                                              className="group -m-2 p-2 flex items-center">
                                                            <ChartBarIcon
                                                                className="flex-shrink-0 h-6 w-6 text-gray-400"
                                                                aria-hidden="true"/>
                                                            <span
                                                                className="ml-2 text-sm font-medium text-gray-900">Dashboard</span>
                                                        </Link>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>

            <div>
                {/* Mobile filter dialog */}

                <Outlet/>

                <footer aria-labelledby="footer-heading" className="bg-white border-t border-gray-200">
                    <h2 id="footer-heading" className="sr-only">
                        Footer
                    </h2>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="border-t border-gray-100 py-10 text-center">
                            <p className="text-sm text-gray-500">&copy; 2024 Evento, Inc. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default FrontOfficeLayout
