import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";

const status = {
    pending: "inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20",
    rejected: "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10",
    approved: "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
}

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getevents();
    }, []);

    const approve = (eventId) => {
        axiosClient.put(`/events/${eventId}/approve`).then(() => {
            getevents();
        });
    }

    const reject = (eventId) => {
        axiosClient.put(`/events/${eventId}/reject`).then(() => {
            getevents();
        });
    }

    const getevents = () => {
        setLoading(true);
        axiosClient
            .get("/events")
            .then((response) => {
                setLoading(false);
                console.log(response);
                setEvents(response.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div className="overflow-hidden flex flex-col">
            <div className="-my-2 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Event
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Number of Attendees
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Organizer
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Delete</span>
                                </th>
                            </tr>
                            </thead>
                            {loading && (
                                <tbody>
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                                </tbody>
                            )}
                            {!loading && (
                                <tbody>
                                {events.map((event, eventIdx) => (
                                    <tr
                                        key={event.id}
                                        className={
                                            eventIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {event.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 break-normal">
                                            {event.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {event.date}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {event.location}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {event.category.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {event.number_attendees}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {event.organizer.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium capitalize">
                                            <span className={status[event.status]}>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => approve(event.id)}
                                                className="text-evento-600 hover:text-evento-900"
                                            >
                                                Approve
                                            </button>
                                            &nbsp; &nbsp; &nbsp; &nbsp;
                                            <button
                                                onClick={() => reject(event.id)}
                                                className="text-evento-600 hover:text-evento-900"
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
