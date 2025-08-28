import { BASE_URL } from "@/lib/Base_URL";
import { useEffect, useState } from "react";
// import { Button } from "../ui/button";

import ClockLoader from "react-spinners/ClockLoader";

const AnnouncementModal = () => {
  const [isOpen, setIsOpen] = useState(false); // Modal open state
  const [isFadingOut, setIsFadingOut] = useState(false); // For fade-out effect

  // Function to check server status
  const checkServerStatus = async () => {
    try {
      const response = await fetch(`${BASE_URL}/status`);
      const data = await response.json();

      if (data.success) {
        setIsOpen(false); // Server is live, close the modal immediately
      } else {
        setIsOpen(true); // Server is down, show the modal
      }
    } catch (error) {
      console.log(error);
      setIsOpen(true); // Show modal if server is unreachable
    }
  };

  // Close modal manually with fade-out
  const closeModal = () => {
    setIsFadingOut(true); // Start fading out
    setTimeout(() => {
      setIsOpen(false); // Actually close the modal after fade-out
    }, 500); // Fade duration
  };

  // UseEffect to check the server status immediately on page load
  useEffect(() => {
    // Start polling every 5 seconds while the modal is open
    const interval = setInterval(() => {
      if (isOpen) {
        checkServerStatus(); // Check server status if modal is open
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval when component unmounts or modal closes
  }, [isOpen]); // Dependency on `isOpen` so it only runs when modal is open

  // Check server status when the page loads
  useEffect(() => {
    checkServerStatus(); // Check server status once when the page loads
  }, []);

  return (
    <>
      {/* Modal will show only if server is down */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-lg transition-opacity ${
            isFadingOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative w-full max-w-lg mx-4 bg-white rounded-lg shadow-lg p-6 transition-opacity">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black hover:text-gray-600 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <h2 className="text-2xl max-w-xs mx-auto font-semibold text-black">
                Please Be Patient Server is Loading...
              </h2>
              <p className="mt-2 text-gray-700">
                Our backend server is hosted on a free hosting service.
                Sometimes it may take a few seconds to start. Please be patient
                while we get things up and running.
              </p>

              <div className="flex justify-center items-center mt-5">
                <ClockLoader />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnouncementModal;
