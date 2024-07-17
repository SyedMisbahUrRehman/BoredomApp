import { useRouteError } from "react-router-dom";
import ErrorSvg from "./assets/7906236_3804933.svg"; // Replace with your SVG file path

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-gray-100 ">
        <img src={ErrorSvg} className="h-52 w-52 mx-auto mb-4" alt="Error Icon" />
        <h1 className="text-3xl font-bold text-gray-800">Oops!</h1>
        <p className="text-lg text-gray-500 mb-4">Sorry, an unexpected error has occurred.</p>
        <p className="text-sm text-gray-500 ">{error.statusText || error.message}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
