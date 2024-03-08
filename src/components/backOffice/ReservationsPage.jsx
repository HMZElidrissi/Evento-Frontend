import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import {Switch} from '@headlessui/react'

const status = {
    pending: "inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20",
    rejected: "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10",
    approved: "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ReservationsPage = () => {
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        getReservations();
        getConfig();
    }, []);

    const getReservations = () => {
        setLoading(true);
        axiosClient
            .get("/reservations")
            .then((response) => {
                setLoading(false);
                console.log(response);
                setReservations(response.data);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    const getConfig = () => {
        axiosClient
            .get("/reservations/config")
            .then((response) => {
                console.log('Config:', response.data);
                setEnabled(response.data);
            });
    }

    const toggleAutoApprove = (newEnabledValue) => {
        setEnabled(newEnabledValue);

        axiosClient.put(`/reservations/config`, {enabled: newEnabledValue})
            .then((response) => {
                console.log('Config updated:', response.data);
            })
            .catch((error) => {
                setEnabled(!newEnabledValue);
                console.error('Error updating config:', error);
            });
    }

    const approve = (reservationId) => {
        axiosClient.put(`/reservations/${reservationId}/approve`).then(() => {
            getReservations();
        });
    }

    const reject = (reservationId) => {
        axiosClient.put(`/reservations/${reservationId}/reject`).then(() => {
            getReservations();
        });
    }

    return (
        <div className="overflow-hidden flex flex-col">
            <div className="-my-2 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <div className="my-1 flex float-end mr-6">
                            <Switch.Group as="div" className="flex items-center">
                                <Switch
                                    checked={enabled}
                                    onChange={toggleAutoApprove}
                                    className={classNames(
                                        enabled ? 'bg-indigo-600' : 'bg-gray-200',
                                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                    )}
                                >
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        enabled ? 'translate-x-5' : 'translate-x-0',
                                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                    )}
                                />
                                </Switch>
                                <Switch.Label as="span" className="ml-3">
                                    <span className="text-sm font-medium text-gray-900">Auto Approve </span>
                                </Switch.Label>
                            </Switch.Group>
                        </div>
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
                                    Attendee
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Approve</span>
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Reject</span>
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
                                {reservations.map((reservation, reservationIdx) => (
                                    <tr
                                        key={reservation.id}
                                        className={
                                            reservationIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {reservation.event.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 break-normal">
                                            {reservation.user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium capitalize">
                                            <span className={status[reservation.status]}>
                                                {reservation.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => approve(reservation.id)}
                                                className="text-evento-600 hover:text-evento-900"
                                            >
                                                Approve
                                            </button>
                                            &nbsp; &nbsp; &nbsp; &nbsp;
                                            <button
                                                onClick={() => reject(reservation.id)}
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

export default ReservationsPage;
