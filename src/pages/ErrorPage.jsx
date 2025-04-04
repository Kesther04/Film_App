import {Link} from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className="flex justify-center content-center h-100 w-full ">
    <div className="flex flex-col justify-center text-center content-center w-100 m-5 rounded-lg bg-gray-500">
        <p className='w-auto text-4xl font-bold'>404 NOT FOUND</p>
        <Link to="/" className="text-blue-400 hover:underline text-xl italic">
        BACK TO HOME PAGE
        </Link>
    </div>
    </section>
  )
}

export default ErrorPage