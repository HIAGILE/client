import React from "react";
// https://icon-icons.com/ko/pack/Teamleader-Icons/2346
import DashboardLayout from "components/layout/dashboard-layout";
import { Link } from "react-router-dom";

function MainDashboard() {
  const project = false;
  return <DashboardLayout>{project ? <></> : <NewProject />}</DashboardLayout>;
}

export default MainDashboard;

const NewProject = () => {
  return <Link to="/createproject">Create New Project</Link>;
};
