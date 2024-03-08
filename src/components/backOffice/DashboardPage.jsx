import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";

const DashboardPage = () => {
    const {user} = useStateContext();
    const [stats, setStats] = useState({
        numberOfOrganizerEvents: 0,
        numberOfReservations: 0,
        numberOfOrganizers: 0,
        numberOfEvents: 0,
        numberOfCategories: 0
    });

    useEffect(() => {
        const getStats = () => {
            if (user && user.role_id === 2) {
                axiosClient.get("/organizer-stats").then((response) => {
                    setStats({
                        numberOfOrganizerEvents: response.data.numberOfOrganizerEvents,
                        numberOfReservations: response.data.numberOfReservations,
                        numberOfCategories: response.data.numberOfCategories,
                    });
                });
            }
            if (user && user.role_id === 1) {
                axiosClient.get("/admin-stats").then((response) => {
                    setStats({
                        numberOfOrganizers: response.data.numberOfOrganizers,
                        numberOfEvents: response.data.numberOfEvents,
                        numberOfCategories: response.data.numberOfCategories,
                    });
                });
            }
        };
        if (user) {
            getStats();
        }
    }, [user]);


    return (
        <>
            {user && user.role_id === 2 && (
                <div className="bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-gray-600">Number of events</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    {stats.numberOfOrganizerEvents}
                                </dd>
                            </div>
                            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-gray-600">Number of reservations</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    {stats.numberOfReservations}
                                </dd>
                            </div>
                            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-gray-600">Number of categories</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    {stats.numberOfCategories}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>)}
            {user && user.role_id === 1 && (
                <div className="bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-gray-600">Number of organizers</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    {stats.numberOfOrganizers}
                                </dd>
                            </div>
                            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-gray-600">Number of events</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    {stats.numberOfEvents}
                                </dd>
                            </div>
                            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-gray-600">Number of categories</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    {stats.numberOfCategories}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardPage;
