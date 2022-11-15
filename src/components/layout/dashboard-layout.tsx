import React, { ReactNode } from "react";
import MainBar from "../dashboard/dashboard-bar";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="bg-blue-50 absolute inset-y-0 right-0 left-[160px] rounded-l-3xl overflow-scroll">
      <MainBar />
      {children}
    </div>
  );
};

export default DashboardLayout;
