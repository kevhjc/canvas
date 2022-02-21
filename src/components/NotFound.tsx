import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="h-screen px-4 pt-40">
      <div className="mx-auto max-w-7xl px-10">
        <div className="text-center">
          <p className="mt-2 text-3xl font-medium leading-8 tracking-tight sm:text-5xl">
            <strong>404</strong> – Page not found
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-neutral-500 dark:text-neutral-300">
            Oops! The page you're looking for doesn't exist
          </p>
        </div>

        <div className="mt-24 flex flex-col items-center justify-center font-medium leading-8 tracking-tight text-neutral-900">
          <Link to="/">
            <button
              type="button"
              className="mb-2 flex items-center justify-center rounded bg-red-500 px-8 py-3 pb-3 font-bold leading-tight text-white transition duration-150 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-0 dark:bg-red-700"
            >
              &larr; Go back home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}