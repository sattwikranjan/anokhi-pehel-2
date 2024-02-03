import Button from '../components/Home/Button';
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Oops!! Page Not Found</h1>
      <p className="text-lg text-gray-500">
        The requested page could not be found.
      </p>
      <div onClick={() => navigate('/')}>
      <Button text="Go Back" styles="my-5"/>
      </div>
    </div>
  );
};

export default PageNotFound;
