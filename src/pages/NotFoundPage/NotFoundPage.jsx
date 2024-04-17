import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

const NotFoundPage = () => {
  // const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1)
    }, 1000);
      
    return () => clearInterval(intervalId);
  }, []);

  if (seconds === 10) {
    // return navigate("/", { replace: true });
    return <Navigate to="/" replace />
  }

  return (
    <div>
      <h1>The page you visited does not exist.</h1>
      <p>After {10 - seconds} seconds, you will be redirected to the main page.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFoundPage;