import React from "react";
// https://icon-icons.com/ko/pack/Teamleader-Icons/2346
import { Link } from "react-router-dom";

function MainDashboard() {
  const project = false;
  return <>{project ? <></> : <NewProject />}</>;
}

export default MainDashboard;

const NewProject = () => {
  const userName = "user name";
  return (
    <>
      <div className="bg-middleBlue rounded-xl h-40 p-8 flex justify-between">
        <p className="text-2xl font-bold text-mainBlue">
          Nice meet you, {userName}
        </p>
        <button className="text-lightBlue text-lg leading-none bg-mainBlue rounded-xl p-4">
          <Link to="/createproject">Create New Project</Link>
        </button>
      </div>
    </>
  );
};
