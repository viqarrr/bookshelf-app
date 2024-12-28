import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addClose, editClose } from "../slices/modalSlice";
import {
  useCreateBookMutation,
  useEditBookMutation,
  useLazyGetBooksQuery,
} from "../slices/bookApiSlice";
import { clearBooks, setBooks } from "../slices/bookSlice";

const CreateEditModal = ({ edit, prevData }) => {
  const { categoryParams } = useParams();
  const dispatch = useDispatch();
  const { books, page } = useSelector((state) => {
    return {
      books: state.books.books,
      page: state.books.page,
    };
  });

  const loadItems = async () => {
    try {
      const res = await getBooks({
        limit: 10,
        page: page,
        category: categoryParams,
      });
      dispatch(setBooks(res?.data?.data));
      console.log(books);
    } catch (error) {
      console.log(error);
    }
  };

  const initialState = {
    title: "",
    author: "",
    publishYear: "",
    description: "",
    category: "Education",
    url: "",
  };
  const [data, setData] = useState(initialState);
  useEffect(() => {
    if (edit) setData(prevData);
  }, []);
  const { title, author, publishYear, description, category, url } = data;
  const [createBook, { isLoading: createIsLoading }] = useCreateBookMutation();
  const [editBook, { isLoading: editIsLoading }] = useEditBookMutation();
  const [getBooks] = useLazyGetBooksQuery();
  
  const isLoading = createIsLoading || editIsLoading;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        console.log(isLoading)
        const book = await editBook(data).unwrap();
        toast.success("Book edited");
        dispatch(editClose());
      } else {
        console.log(isLoading)
        const book = await createBook(data).unwrap();
        dispatch(clearBooks());
        loadItems();
        toast.success("Book created");
        dispatch(addClose());
      }
    } catch (error) {
      // Check if the error is an RTK Query error
      if (error.status) {
        // Handle specific status codes
        toast.error(
          `Attempt failed: ${error.status} ${error.data?.message || ""}`
        );
      } else {
        // Handle other errors (network issues, etc.)
        toast.error("Attempt Failed: Network or unexpected error");
      }
      console.error("Attempt failed:", error);
    }
    console.log(data);
    setData(initialState);
  };

  return (
    <div
      id="crud-modal"
      onClick={() => {
        if (event.target.id == "crud-modal") {
          dispatch(addClose());
          dispatch(editClose());
        }
      }}
      tabIndex="-1"
      aria-hidden="true"
      className="flex bg-modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] min-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {edit ? "Edit Book" : "Create New Book"}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                dispatch(addClose());
                dispatch(editClose());
              }}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type book title"
                  required={true}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="author"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={author}
                  onChange={handleChange}
                  id="author"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type book author"
                  required={true}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="publishYear"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Publish Year
                </label>
                <input
                  type="number"
                  name="publishYear"
                  value={publishYear}
                  onChange={handleChange}
                  id="publishYear"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="e.g. 2020"
                  required=""
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="Education">Education</option>
                  <option value="Sport">Sport</option>
                  <option value="Technology">Technology</option>
                  <option value="Science">Science</option>
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="url"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  id="url"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required={true}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Book Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write product description here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
              {isLoading ? 'Loading...' : edit ? 'Save': 'Add New Book'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEditModal;
