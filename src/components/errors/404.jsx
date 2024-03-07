import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <div className="h-screen min-h-full pt-16 pb-12 flex flex-col bg-evento-300">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="text-center">
              <p className="mt-2 text-9xl font-extrabold text-white tracking-tight sm:text-9xl">
                404
              </p>
              <p className="mt-2 text-base text-white">
                The page you are looking for was not found.
              </p>
              <div className="mt-6">
                <a
                  href="#"
                  className="text-base font-medium text-white hover:text-evento-400"
                >
                  Go back home<span aria-hidden="true"> &rarr;</span>
                </a>
                <div className="flex-shrink-0 flex justify-center">
                  <Link to="/" className="inline-flex">
                    <span className="sr-only">Evento</span>
                    <img
                      className="mx-auto"
                      src="./evento.png"
                      alt="Evento"
                      width={100}
                      height={100}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default NotFoundPage;
