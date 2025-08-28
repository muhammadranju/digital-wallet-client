import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <div className="text-center">
        {/* Icon */}
        <svg
          className="w-24 h-24 text-black mb-4 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 9V3a1 1 0 011-1h4a1 1 0 011 1v6M6 10h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V12a2 2 0 012-2z"
          />
        </svg>

        {/* Title */}
        <h1 className="text-4xl font-semibold text-black mb-2">
          Oops! Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg text-black mb-6">
          We couldn't find the page you were looking for. Try going back to the
          dashboard or contact support.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Link to="/">
            <Button>Go to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
