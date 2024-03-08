import {CalendarIcon, LocationMarkerIcon, SearchIcon, TagIcon, UsersIcon} from '@heroicons/react/outline';
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosClient from "../../axios-client.js";

const HomePage = () => {
    const {token} = useStateContext();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const register = (eventId) => {
        if (!token) {
            navigate("/login");
        }
        axiosClient.post(`/events/${eventId}/register`).then(() => {
            alert("You have successfully registered for the event");
            getevents();
        });
    }

    useEffect(() => {
        getevents();
        getCategories();
    }, []);

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
                <section aria-labelledby="events-heading" className="mt-8">
                    <h2 id="events-heading" className="sr-only">
                        Events
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
                                            alt={event.title}
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
                    <div className="my-8">
                        <div className="flex justify-between">
                            <button
                                className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage <= 1}
                            >
                                Previous
                            </button>
                            <button
                                className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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
    );
}

export default HomePage;
