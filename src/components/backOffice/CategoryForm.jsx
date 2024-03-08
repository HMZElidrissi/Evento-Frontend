import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios-client";

const CategoryForm = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({
    id: null,
    title: "",
  });
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/categories/${id}`)
        .then((response) => {
          setLoading(false);
          console.log(response);
          setCategory(response.data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      axiosClient
        .put(`/categories/${id}`, category)
        .then(() => {
          navigate("/categories");
        })
        .catch((error) => {
          const { response } = error;
          if (response && response.status === 422) {
            if (response.data.errors) {
              setErrors(response.data.errors);
            }
          }
        }
      );
    } else {
      axiosClient
        .post("/categories", category)
        .then(() => {
          navigate("/categories");
        })
        .catch((error) => {
          const { response } = error;
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
                Edit category
              </h2>
            ) : (
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Create a new category
              </h2>
            )}
            {loading && <div className="text-center">Loading...</div>}

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {!loading && (
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
                      placeholder="Category title ..."
                      value={category.title}
                      onChange={(e) => setCategory({ ...category, title: e.target.value })}
                      className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:outline-none focus:ring-evento-700 focus:border-evento-700 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 mx-24">
          <Link
            to="/categories"
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

export default CategoryForm;
