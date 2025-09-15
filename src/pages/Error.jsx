import { Link } from "react-router-dom";
function Error() {
  return (
    <div className=" flex flex-col items-center content-center pt-20">
      <h4 className="self-center text-9xl text-red-400 font-bold"> 404</h4>

      <p className="self-center text-xl">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="self-center text-xl font-semibold text-blue-600 hover:underline mt-3"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default Error;



