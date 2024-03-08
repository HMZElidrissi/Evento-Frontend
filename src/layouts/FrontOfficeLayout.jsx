import {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {
    BookmarkAltIcon,
    CalendarIcon,
    LocationMarkerIcon,
    MenuIcon,
    SearchIcon,
    TagIcon,
    UsersIcon,
    XIcon
} from '@heroicons/react/outline'
import {Link, useNavigate} from "react-router-dom";
import axiosClient from "../axios-client";
import {useStateContext} from "../contexts/ContextProvider.jsx";


const FrontOfficeLayout = () => {
    const {user, token, setUser, setToken} = useStateContext();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleLogout = () => {
        setUser({});
        setToken(null);
    };

    const register = (eventId) => {
        if (!token) {
            navigate("/login");
        }
        axiosClient.post(`/events/${eventId}/register`).then(() => {
            getevents();
        });
    }

    useEffect(() => {
        getevents();
        getCategories();
    }, []);

    useEffect(() => {
        if (token) {
            axiosClient.get("/me").then(({data}) => {
                setUser(data.user);
            });
        }
    }, [token, setUser]);

    const getevents = () => {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (searchQuery) queryParams.append('search', searchQuery);
        if (selectedCategory) queryParams.append('category', selectedCategory);
        queryParams.append('page', currentPage);
        axiosClient
            .get(`/available-events?${queryParams.toString()}`)
            .then((response) => {
                setLoading(false);
                console.log(response);
                setEvents(response.data.data);
                setTotalPages(response.data.last_page);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    useEffect(() => {
        getevents();
    }, [searchQuery, selectedCategory, currentPage]);

    const getCategories = () => {
        axiosClient
            .get("/categories")
            .then((response) => {
                setCategories(response.data);
            });
    }

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
                                    {token && (
                                        <div className="flow-root">
                                            Welcome, {user.name}
                                        </div>
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
                                        <a href="#">
                                            <span className="sr-only">Evento</span>
                                            <img
                                                className="h-8 w-auto"
                                                src="./evento.png"
                                                alt="Evento"
                                            />
                                        </a>
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

                                    <div className="flex-1 flex items-center justify-end">
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
                                            {token && (
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
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>

            <div>
                {/* Mobile filter dialog */}

                <main>
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="py-24 text-center">
                            <img
                                className="mx-auto"
                                width={250}
                                height={250}
                                src="./evento.png"
                                alt="Evento"
                            />
                            <form className="max-w-xl mx-auto text-center">
                                <div className="relative flex lg:inline-flex items-center bg-gray-50 rounded-xl">
                                    <div className="absolute inset-y-0 flex items-center pl-2">
                                        <SearchIcon className="h-6 text-gray-400"/>
                                    </div>
                                    <input
                                        name="search"
                                        type="text"
                                        className="bg-transparent w-full pl-12 py-4 focus:outline-none"
                                        placeholder="Search for events"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <div className="relative flex lg:inline-flex items-center bg-gray-50 rounded-xl mt-4">
                                    <select
                                        className="bg-transparent w-full pl-12 py-4 focus:outline-none text-gray-400"
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}>
                                        <option value="">All categories</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>

                        {/* Product grid */}
                        <section aria-labelledby="products-heading" className="mt-8">
                            <h2 id="products-heading" className="sr-only">
                                Products
                            </h2>

                            {loading && (
                                <h2 className="texy-center">
                                    Loading...
                                </h2>
                            )}
                            {!loading && (
                                <div
                                    className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8 my-6">
                                    {events.map((event) => (
                                        <div key={event.id} className="group">
                                            <div
                                                className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
                                                <img
                                                    src="./placeholder.jpg"
                                                    alt={event.name}
                                                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                                                />
                                            </div>
                                            <div
                                                className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                                                <h3>{event.title}</h3>
                                            </div>
                                            <p className="mt-1 text-base text-gray-500">{event.organizer.name}</p>
                                            <div
                                                className="mt-1 text-sm text-gray-700">
                                                <LocationMarkerIcon className="h-5 w-5 inline-block mr-2"/>
                                                {event.location}
                                            </div>
                                            <div
                                                className="mt-1 text-sm text-gray-700">
                                                <CalendarIcon className="h-5 w-5 inline-block mr-2"/>
                                                {event.date}
                                            </div>
                                            <div
                                                className="mt-1 text-sm text-gray-700">
                                                <TagIcon className="h-5 w-5 inline-block mr-2"/>
                                                {event.category.title}
                                            </div>
                                            <div
                                                className="mt-1 text-sm text-gray-700">
                                                <UsersIcon className="h-5 w-5 inline-block mr-2"/>
                                                {event.number_attendees} attendees
                                            </div>
                                            <p className="mt-1 text-sm italic text-gray-500">{event.description}</p>
                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => register(event.id)}
                                                    className="bg-evento-600 border border-transparent rounded-md py-2 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-evento-700"
                                                >
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {/* Pagination control */}
                            <div className="mt-8">
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage <= 1}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage >= totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>

                        </section>
                    </div>
                </main>

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
