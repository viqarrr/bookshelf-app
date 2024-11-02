import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import CreateEditModal from "../modals/CreateEditModal";
import { editOpen } from "../slices/modalSlice";
import { useDeleteBookMutation, useGetBookDetailQuery } from "../slices/bookApiSlice";
import { useNavigate, useParams } from "react-router";

const BookDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {data, isFetching, error} = useGetBookDetailQuery(id)
  const [deleteBook] =  useDeleteBookMutation()
  console.log(data)
  const edit = useSelector(state => state.modal.edit)
  const dispatch = useDispatch()

  const handleDelete = async() => {
    try {
      await deleteBook(id).unwrap()
      navigate('/')
    } catch (error) {
      console.log(error)
    }    
  }
  return (
    <section className="h-full text-gray-700 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src="https://images.unsplash.com/photo-1716892001559-dfaad6ac3ca4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY1fHxib29rJTIwY292ZXJ8ZW58MHx8MHx8fDI%3D"
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
            <p className="leading-relaxed pb-5 dark:text-gray-200">{data?.description}
            </p>
            <div className="flex pt-5 border-t-2 border-gray-200">
              <div className="flex mr-auto">
                <button className=" text-white bg-blue-500 border-0 py-2 px-6 mr-2 focus:outline-none hover:bg-blue-600 rounded" onClick={() => dispatch(editOpen())}>
                  Edit
                </button>
                <button onClick={handleDelete} className=" text-white bg-red-500 border-0 py-2 px-6 mr-2 focus:outline-none hover:bg-red-600 rounded">
                  Delete
                </button>
              </div>
              <button className="rounded-full w-10 h-10 bg-gray-200 dark:bg-gray-500 p-0 border-0 inline-flex items-center justify-center text-gray-500 dark:text-gray-200 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {edit && createPortal(<CreateEditModal edit={true} prevData={data}/>, document.body)}
    </section>
  );
};

export default BookDetail;
