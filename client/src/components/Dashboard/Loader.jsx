import React, { useEffect, useState } from "react";
import "./Loader.css"; // Import CSS for styling loader animation

const LoaderPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading process
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loader-container">
      {isLoading ? (
        <div className="loader">
          {/* Loading animation */}
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
        </div>
      ) : (
        <div className="content">
          {/* Your main content or redirect to another page */}
          <h1>Welcome to My App</h1>
        </div>
      )}
    </div>
  );
};

export default LoaderPage;
