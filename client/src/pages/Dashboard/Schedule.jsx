import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import Header from "../../components/Dashboard/Header";
import Button from "../../components/Dashboard/Button";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Student = () => {
  const currentColor = "#03C9D7";
  const { user } = useSelector((state) => state.user);
  let navigate = useNavigate();

  const onClickLine = () => {
    navigate("/addLineSchedule");
  };
  const onClickClass = () => {
    navigate("/addClassSchedule");
  };
  const onClickClassSchedule = () => {
    navigate("/classSchedule");
  };
  const onClickLineSchedule = () => {
    navigate("/lineSchedule");
  };

  return (
    <DashboardLayout>
      <div className="m-2 md:m-5 mt-12 p-2 md:p-0 bg-white rounded-3xl flex flex-col md:flex-row md:justify-between md:items-center">
        <Header category="Academics" title="Schedule" />
        {user?.isAdmin === true && (
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="mb-2 md:mb-0">
              <Button
                color="white"
                bgColor={currentColor}
                text="Add Line Schedule"
                borderRadius="8px"
                width="5px"
                height="10px"
                custumFunc={onClickLine}
              />
            </div>
            <div>
              <Button
                color="white"
                bgColor={currentColor}
                text="Add Class Schedule"
                borderRadius="8px"
                width="5px"
                height="10px"
                custumFunc={onClickClass}
              />
            </div>
          </div>
        )}
      </div>
      <div className="py-8 flex flex-col sm:flex-row justify-center items-center sm:gap-12">
        <div className="mb-4 sm:mb-0">
          <Button
            color="white"
            bgColor={currentColor}
            text="Get Class Schedule"
            borderRadius="8px"
            width="20px" // Increase width for larger buttons
            height="40px" // Increase height for larger buttons
            custumFunc={onClickClassSchedule}
          />
        </div>
        <div>
          <Button
            color="white"
            bgColor={currentColor}
            text="Get Line Schedule"
            borderRadius="8px"
            width="20px" // Increase width for larger buttons
            height="40px" // Increase height for larger buttons
            custumFunc={onClickLineSchedule}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Student;
