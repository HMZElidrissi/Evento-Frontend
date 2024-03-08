import {CalendarIcon, DownloadIcon, LocationMarkerIcon} from "@heroicons/react/outline";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";

const MyReservationsPage = () => {
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        getReservations();
    }, []);

    const getReservations = () => {
        setLoading(true);
        axiosClient.get(`/my-reservations`).then((response) => {
            setLoading(false);
            console.log(response.data);
            setReservations(response.data);
            console.log(reservations);
        }).catch(() => {
            setLoading(false);
        });
    }

    const download = (reservationId) => {
        axiosClient.get(`/my-reservations/${reservationId}/download`, {
            responseType: 'blob'
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data], {
                type: 'application/pdf'
            }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ticket.pdf');
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            link.parentNode.removeChild(link);
        }).catch((error) => {
            console.error("Download error", error);
        });
    }

    return (
        <>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="py-24 text-center">
                    <img
                        className="mx-auto"
                        width={250}
                        height={250}
                        src="./evento.png"
                        alt="Evento"
                    />
                </div>
                <section aria-labelledby="reservations-heading" className="mt-8">
                    <h2 id="reservations-heading" className="sr-only">
                        Reservations
                    </h2>

                    {loading && (
                        <h2 className="texy-center">
                            Loading...
                        </h2>
                    )}
                    {!loading && (
                        <div
                            className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8 my-6">
                            {reservations.map((reservation) => (
                                <div key={reservation.id} className="group">
                                    <div
                                        className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
                                        <img
                                            src="./placeholder.jpg"
                                            alt={reservation.event.title}
                                            className="w-full h-full object-center object-cover group-hover:opacity-75"
                                        />
                                    </div>
                                    <div
                                        className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                                        <h3>{reservation.event.title}</h3>
                                    </div>
                                    <p className="mt-1 text-base text-gray-500">{/*{reservation.event.organizer.name}*/}</p>
                                    <div
                                        className="mt-1 text-sm text-gray-700">
                                        <LocationMarkerIcon className="h-5 w-5 inline-block mr-2"/>
                                        {reservation.event.location}
                                    </div>
                                    <div
                                        className="mt-1 text-sm text-gray-700">
                                        <CalendarIcon className="h-5 w-5 inline-block mr-2"/>
                                        {reservation.event.date}
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            onClick={() => download(reservation.id)}
                                            className="bg-evento-600 border border-transparent rounded-md py-2 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-evento-700"
                                        >
                                            <DownloadIcon className="h-5 w-5 inline-block mr-2"/>
                                            Download Ticket
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}

export default MyReservationsPage;
