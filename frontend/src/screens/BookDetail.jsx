import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import CreateEditModal from "../modals/CreateEditModal";
import { editOpen } from "../slices/modalSlice";
import {
  useDeleteBookMutation,
  useGetBookDetailQuery,
} from "../slices/bookApiSlice";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useEffect } from "react";

const BookDetail = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteBook] = useDeleteBookMutation();
  const { data, isFetching, error } = useGetBookDetailQuery(id);
  const edit = useSelector((state) => state.modal.edit);
  const dispatch = useDispatch();

  const isImageUrl = (url, callback) => {
    try {
      const img = new Image();
      img.src = url;

      img.onload = () => callback(true);
      img.onerror = () => callback(false);
    } catch (e) {
      console.log(
        "Terjadi error: URL tidak valid atau ada masalah dengan gambar."
      );
      callback(false);
    }
  };
  
  const handleDelete = async () => {
    try {
      const result = await deleteBook(id);
      navigate("/");
      toast.success("Book deleted successfully");
    } catch (error) {
      // Check if the error is an RTK Query error
      if (error.status) {
        // Handle specific status codes
        toast.error(
          `Delete failed: ${error.status} ${error.data?.message || ""}`
        );
      } else {
        // Handle other errors (network issues, etc.)
        toast.error("Delete Book Failed: Network or unexpected error");
      }
      console.error("Delete failed:", error);
    }
  };

  const handleClick = () => navigate("/");

  if(isFetching) return <Spinner />;
  return (
    <section className="h-full text-gray-700 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="book-img"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={
              isImageUrl(data?.url, function (isImage) {
                console.log(isImage);
              })
                ? data?.url
                : "https://images.unsplash.com/photo-1630734277837-ebe62757b6e0?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 dark:text-gray-50 tracking-widest">
              {data?.category}
            </h2>
            <h1 className="text-gray-900 dark:text-gray-100 text-3xl title-font font-medium mb-1">
              {data?.title}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <span className="text-gray-600 ml-3">{data?.author}</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <span className="text-gray-600 ml-3">{data?.publishYear}</span>
              </span>
            </div>
            <p className="leading-relaxed pb-5 dark:text-gray-200">
              {data?.description}
            </p>
            <div className="flex pt-5 border-t-2 border-gray-200">
              <div className="flex mr-auto">
                <button
                  className=" text-white bg-blue-500 border-0 py-2 px-6 mr-2 focus:outline-none hover:bg-blue-600 rounded"
                  onClick={() => dispatch(editOpen())}
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className=" text-white bg-red-500 border-0 py-2 px-6 mr-2 focus:outline-none hover:bg-red-600 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {edit &&
        createPortal(
          <CreateEditModal edit={true} prevData={data} />,
          document.body
        )}
    </section>
  );
};

export default BookDetail;
