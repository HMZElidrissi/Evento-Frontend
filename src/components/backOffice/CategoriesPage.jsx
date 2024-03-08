import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import {Link} from "react-router-dom";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getcategories();
    }, []);

    const deleteCategory = (userId) => {
        if (!window.confirm("Are you sure you want to delete this category?")) {
            return;
        }
        axiosClient.delete(`/categories/${userId}`).then(() => {
            // TODO: Show a success message
            getcategories();
        });
    };

    const getcategories = () => {
        setLoading(true);
        axiosClient
            .get("/categories")
            .then((response) => {
                setLoading(false);
                console.log(response);
                setCategories(response.data);
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
                        <div className="my-1 flex float-end mr-6">
                            <Link
                                to="/categories/create"
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-evento-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-evento-600 focus:outline-none focus:ring-2 focus:ring-evento-500 focus:ring-offset-2 sm:w-auto"
                            >
                                + Add Category
                            </Link>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Category
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
                                {categories.map((category, categoryIdx) => (
                                    <tr
                                        key={category.id}
                                        className={
                                            categoryIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {category.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link to={`/categories/${category.id}`}>
                                                <button className="text-evento-600 hover:text-evento-900">
                                                    Edit
                                                </button>
                                            </Link>
                                            &nbsp; &nbsp; &nbsp; &nbsp;
                                            <button
                                                onClick={() => deleteCategory(category.id)}
                                                className="text-evento-600 hover:text-evento-900"
                                            >
                                                Delete
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

export default CategoriesPage;
