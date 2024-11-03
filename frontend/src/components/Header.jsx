import { Link } from "react-router-dom";
import CreateEditModal from "../modals/CreateEditModal";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOpen } from "../slices/modalSlice";

const Header = ({ light, toggleLight }) => {
  const add = useSelector(state => state.modal.add)
  const dispatch = useDispatch()
  return (
    <div className="flex items-center justify-center py-4 flex-wrap dark:bg-gray-900">
      <Link to={'/'} className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">
        All Categories
      </Link>
      <Link to={'/Education'} className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">
        Education
      </Link>
      <Link to={'/Sport'} className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">
        Sport
      </Link>
      <Link to={'/Techology'} className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">
        Technology
      </Link>
      <Link to={'/Science'} className="tetext-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">
        Science
      </Link>
      <button onClick={() => dispatch(addOpen())} className="text-white border border-blue-600 bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-white dark:bg-blue-500 dark:focus:ring-blue-800">
        Add New Book
      </button>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={toggleLight}
        />
        <div className="relative w-11 h-6 bg-yellow-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-slate-300 dark:peer-focus:ring-slate-800 dark:bg-yellow-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-yellow-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-yellow-600 peer-checked:bg-slate-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {light ? "Light" : "Dark"}
        </span>
      </label>
      {add && createPortal(<CreateEditModal />, document.body)}
    </div>
  );
};

export default Header;
