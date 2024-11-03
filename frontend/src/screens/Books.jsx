import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useParams } from "react-router"
import { useLazyGetBooksQuery } from "../slices/bookApiSlice"
import { setBooks, clearBooks, setPage } from "../slices/bookSlice"
import {toast} from "react-toastify"

const Books = () => {
  const {category} = useParams()
  const dispatch = useDispatch()
  const { books, page } = useSelector(state  => {
    return {
      books: state.books.books,
      page: state.books.page
    }
  })
  
  const [getBooks] = useLazyGetBooksQuery()

  useEffect(() => {
  dispatch(clearBooks());
  toast.success('Cleared books');
  }, [category])
  useEffect(() => {
    loadItems()
  }, [page, category])

  const loadItems = async() => {
    try {
      const res = await getBooks({limit: 10, page: page, category: category})
      dispatch(setBooks(res?.data?.data))
      console.log(books)
    } catch (error) {
      console.log(error)
    }
  }

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight - window.scrollY
      const scrollMax = document.body.offsetHeight

      if(scrollPosition >= scrollMax) dispatch(setPage())

      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [page])

  return (
    <div className="min-h-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-16 mt-5">
      {books.map( (item, index) => {
        return(
        <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/book/${item._id}`}>
                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
            </Link>
            <div className="p-5">
                <Link to={`/book/${item._id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{`${item.description.slice(0, 100)}...`}</p>
                <Link to={`/book/${item._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                     <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </div>  
        )
      }
      )}
    </div>
  )
}

export default Books