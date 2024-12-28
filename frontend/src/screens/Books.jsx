/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useLazyGetBooksQuery } from "../slices/bookApiSlice";
import { setBooks, clearBooks, setPage } from "../slices/bookSlice";
import Spinner from "../components/Spinner";

const Books = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { books, page } = useSelector((state) => {
    return {
      books: state.books.books,
      page: state.books.page,
    };
  });
  const limit = 12;
  const [totalData, setTotalData] = useState(null);

  const [getBooks] = useLazyGetBooksQuery();

  useEffect(() => {
    dispatch(clearBooks());
  }, [category]);
  useEffect(() => {
    loadItems();
  }, [page, category]);

  const loadItems = async () => {
    try {
      const res = await getBooks({
        limit: limit,
        page: page,
        category:
          category?.charAt(0).toUpperCase() + category?.slice(1).toLowerCase(),
      });
      dispatch(setBooks(res?.data?.data));
      setTotalData(category ? res?.data?.data.length : res?.data?.totalData);
    } catch (error) {
      console.log(error);
    }
  };

  const isImageUrl = (url, callback) => {
    try {
      const img = new Image();
      img.src = url;

      img.onload = () => callback(true);
      img.onerror = () => callback(false);
    } catch (e) {
      console.log("URL is Invalid");
      callback(false);
    }
  };

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight - window.scrollY;
      const scrollMax = document.body.offsetHeight;

      if (scrollPosition >= scrollMax) dispatch(setPage());

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    };
  }, [page]);

  if (!books.length) return <Spinner />;
  return (
    <div className="min-h-full px-16 mt-24">
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {books.map((item, index) => {
          return (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <Link to={`/book/${item._id}`}>
                <img
                  className="rounded-t-lg"
                  src={
                    isImageUrl(item.url, function (isImage) {})
                      ? item.url
                      : "https://images.unsplash.com/photo-1630734277837-ebe62757b6e0?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt=""
                />
              </Link>
              <div className="p-5">
                <h2 className="text-sm title-font text-gray-500 dark:text-gray-50 tracking-widest">
                  {item.category}
                </h2>
                <Link to={`/book/${item._id}`}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.title}
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`${item.description.slice(
                  0,
                  100
                )}...`}</p>
                <Link
                  to={`/book/${item._id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-2 items-center my-5">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">1</span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {books.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalData}
          </span>{" "}
          Entries
        </span>
        <button
          onClick={() => {
            if (books.length !== totalData) dispatch(setPage());
          }}
          className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-900 bg-white border-2 border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
            books.length == totalData
              ? ""
              : "hover:bg-gray-900 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
          }`}
        >
          {books.length == totalData ? `You've Reached the End` : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default Books;
