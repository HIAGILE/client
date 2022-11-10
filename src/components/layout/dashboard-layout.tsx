import React, { ReactNode } from "react";
import MainBar from "../dashboard/dashboard-bar";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="bg-white absolute inset-y-0 right-0 left-[160px] rounded-l-3xl p-4">
      <MainBar />
      {children}
    </div>
  );
};

export default DashboardLayout;
