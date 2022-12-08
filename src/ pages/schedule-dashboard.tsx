import React from 'react';
import { Process } from 'components/common/process';
import DashboardTitle from 'components/dashboard/dashbord-title';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

const ScheduleDashboard = () => {
  console.log(Calendar);
  return (
    <>
      <Process />
      <div className="pt-28 px-8">
        <DashboardTitle title="My Schedule" />
      </div>
    </>
  );
};

export default ScheduleDashboard;
