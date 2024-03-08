import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axiosClient from "../../axios-client";

const EventForm = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState({});
    const [errors, setErrors] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`/my-events/${id}`)
                .then((response) => {
                    setLoading(false);
                    console.log(response);
                    setEvent(response.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
        getCategories();
    }, [id]);

    const getCategories = () => {
        axiosClient
            .get("/categories")
            .then((response) => {
                setCategories(response.data);
                console.log(response);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            axiosClient
                .put(`/my-events/${id}`, event)
                .then(() => {
                    navigate("/my-events");
                })
                .catch((error) => {
                        const {response} = error;
                        if (response && response.status === 422) {
                            if (response.data.errors) {
                                setErrors(response.data.errors);
                            }
                        }
                    }
                );
        } else {
            axiosClient
                .post("/my-events", event)
                .then(() => {
                    navigate("/my-events");
                })
                .catch((error) => {
                        const {response} = error;
                        if (response && response.status === 422) {
                            if (response.data.errors) {
                                setErrors(response.data.errors);
                            }
                        }
                    }
                );
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12 mx-24">
                    <div className="border-b border-gray-200 pb-12">
                        {id ? (
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Edit event
                            </h2>
                        ) : (
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Create a new event
                            </h2>
                        )}
                        {loading && <div className="text-center">Loading...</div>}

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {!loading && (
                                <>
                                    <div className="sm:col-span-3">
                                        {errors && (
                                            <div className="text-red-500 text-sm mb-2">
                                                {errors.title}
                                            </div>
                                        )}
                                        <label
                                            htmlFor="first-name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Title
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                placeholder="Event title ..."
                                                value={event.title}
                                                onChange={(e) => setEvent({...event, title: e.target.value})}
                                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:outline-none focus:ring-evento-700 focus:border-evento-700 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        {errors && (
                                            <div className="text-red-500 text-sm mb-2">
                                                {errors.description}
                                            </div>
                                        )}
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Description
                                        </label>
                                        <div className="mt-2">
                                        <textarea
                                            name="description"
                                            id="description"
                                            placeholder="Event description ..."
                                            value={event.description}
                                            onChange={(e) => setEvent({...event, description: e.target.value})}
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:outline-none focus:ring-evento-700 focus:border-evento-700 sm:text-sm sm:leading-6"
                                        />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        {errors && (
                                            <div className="text-red-500 text-sm mb-2">
                                                {errors.date}
                                            </div>
                                        )}
                                        <label
                                            htmlFor="date"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Date
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="date"
                                                name="date"
                                                id="date"
                                                value={event.date}
                                                onChange={(e) => setEvent({...event, date: e.target.value})}
                                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:outline-none focus:ring-evento-700 focus:border-evento-700 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        {errors && (
                                            <div className="text-red-500 text-sm mb-2">
                                                {errors.location}
                                            </div>
                                        )}
                                        <label
                                            htmlFor="location"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Location
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="location"
                                                id="location"
                                                placeholder="Event location ..."
                                                value={event.location}
                                                onChange={(e) => setEvent({...event, location: e.target.value})}
                                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:outline-none focus:ring-evento-700 focus:border-evento-700 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        {errors && (
                                            <div className="text-red-500 text-sm mb-2">
                                                {errors.category_id}
                                            </div>
                                        )}
                                        <label
                                            htmlFor="category"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Category
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                name="category_id"
                                                id="category_id"
                                                value={event.category_id}
                                                onChange={(e) => setEvent({...event, category_id: e.target.value})}
                                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:outline-none focus:ring-evento-700 focus:border-evento-700 sm:text-sm sm:leading-6"
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        {errors && (
                                            <div className="text-red-500 text-sm mb-2">
                                                {errors.number_attendees}
                                            </div>
                                        )}
                                        <label
                                            htmlFor="attendees"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Number of Attendees
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="attendees"
                                                id="attendees"
                                                placeholder="Number of attendees ..."
                                                value={event.number_attendees}
                                                onChange={(e) => setEvent({...event, number_attendees: e.target.value})}
                                                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:outline-none focus:ring-evento-700 focus:border-evento-700 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6 mx-24">
                    <Link
                        to="/my-events"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    );
};

export default EventForm;
