import React, { ReactNode } from 'react';
import MainBar from '../dashboard/dashboard-bar';

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="bg-white h-screen p-0 fixed inset-y-0 right-0 left-[160px] rounded-l-3xl overflow-y-scroll">
      <MainBar />
      {children}
    </main>
  );
};

export default React.memo(DashboardLayout);
