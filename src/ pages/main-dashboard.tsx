import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMe } from 'lib/useMe';
import NewProject from 'components/main/main-new-project';
import DashboardTitle from 'components/dashboard/dashbord-title';
import MyProjects from 'components/main/main-my-project';
import { useProject } from 'lib/useProject';
import { useNotices } from 'lib/useNotices';
import { Process } from 'components/common/process';
import MainNotice from 'components/main/main-notice';
import dotMenu from 'images/icon/dotMenu.svg';
import MainTasks from 'components/main/main-my-task';

function MainDashboard() {
  const { data: myProfile, loading: myProfileLoading } = useMe();
  const { data: myProjects, loading: myProjectsLoading } = useProject(0);
  const { data: notices, loading: noticesLoading } = useNotices(0);
  return (
    <>
      <Process />
      <div className="flex">
        {/* 왼쪽 사이드바 */}
        <div className="w-full lg:w-8/12 px-8 pt-28 rounded-3xl bg-white">
          {/* 메인 대시보드*/}
          <DashboardTitle title="Dashboard" />
          <NewProject userName={myProfile?.me.name} />
          {/* 프로젝트 */}
          <div className="my-20">
            <div className="flex justify-between items-center">
              <DashboardTitle title="My Projects" />
              <ViewMore goNavi="/project" />
            </div>
            <MyProjects data={myProjects} loading={myProjectsLoading} />
          </div>
          {/* 알림 */}
        </div>
        {/* 오른쪽 사이드바 */}
        <div className="hidden lg:block bg-bgBlue w-4/12 pt-28 px-4 h-screen">
          {/* 할 일 */}
          <div className=" pb-8">
            <div className="flex justify-between items-center">
              <DashboardTitle title="My Tasks" />
              <ViewMore goNavi="/todolist" />
            </div>
            <MainTasks projects={myProjects?.getProjects.projects} />
          </div>
          {/* 알림 */}
          <div className="pb-10">
            <DashboardTitle title="Notices" />
            <MainNotice loading={noticesLoading} notices={notices} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainDashboard;

const ViewMore = ({ goNavi }: { goNavi: string }) => {
  const navigate = useNavigate();
  return (
    <button
      className="text-xs text-darkBlue w-[18px]"
      onClick={() => {
        navigate(goNavi);
      }}
    >
      <img src={dotMenu} className="w-full" />
    </button>
  );
};
