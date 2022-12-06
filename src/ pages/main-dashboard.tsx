import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'styles/calendar.css';
import { useMe } from 'lib/useMe';
import NewProject from 'components/main/new-project';
import DashboardTitle from 'components/dashboard/dashbord-title';
import MyProjects from 'components/main/my-project';
import { useProject } from 'lib/useProject';
import { gql, useQuery } from '@apollo/client';
import { getNotices } from '__generated__/getNotices';
import { Process } from '../components/common/process';

export const GET_NOTICES_QUERY = gql`
  query getNotices {
    getNotices {
      ok
      error
      notices {
        createAt
        updateAt
        description
        id
      }
    }
  }
`;

function MainDashboard() {
  // apollo
  const [dates, setDates] = useState<Date[]>();
  const navigate = useNavigate();
  const { data: myProfile, loading: myProfileLoading } = useMe();
  const { data: myProjects, loading: myProjectsLoading } = useProject(0);
  const { data: notices, loading: noticesLoading } =
    useQuery<getNotices>(GET_NOTICES_QUERY);

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
              <DashboardTitle title="My Project" />
              <ViewMore goNavi="/project" />
            </div>
            <MyProjects data={myProjects} loading={myProjectsLoading} />
          </div>
          {/* 여기는 최근 폴더 부분 */}
          <div className="pb-10">
            <div className="flex justify-between items-center">
              <DashboardTitle title="Notice" />
            </div>
            <div className="overflow-scroll" style={{ height: '500px' }}>
              {noticesLoading ? (
                <div>loading</div>
              ) : (
                notices?.getNotices.notices &&
                notices?.getNotices.notices.map((notice) => {
                  return (
                    <div
                      key={notice.id}
                      className="rounded-lg h-20 hover:bg-gray-100 transition duration-300 ease-in-out flex justify-between items-center my-4 shadow-lg"
                    >
                      <div className="flex items-center">
                        <div className="px-16">
                          <img
                            className="h-16 w-16"
                            src={
                              'https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/a0949a56-bdc7-4c68-4afb-057c08b2c100/public'
                            }
                            alt="notice"
                          ></img>
                        </div>
                        <div className="px-12">{notice.description}</div>
                      </div>
                      <div className="px-12">
                        {notice.createAt.substr(0, 10)}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        {/* 여기는 오른쪽 사이드 바 */}
        <div className="hidden lg:block w-4/12 bg-bgBlue px-4">
          <div className="pt-28 pb-8">
            <DashboardTitle title="Calendar" />
            <Calendar
              goToRangeStartOnSelect
              onChange={setDates}
              prev2Label={null}
              next2Label={null}
              minDetail="month"
              minDate={new Date()}
              maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
            />
          </div>
          <DashboardTitle title="Your Task" />
          <div className="overflow-scroll" style={{ height: '1000px' }}>
            {myProjects?.getProjects.projects?.map((project) => {
              const sprints = project.sprints;
              return sprints.map((sprint) => {
                return (
                  <div
                    key={sprint.id}
                    className="rounded-lg h-20 hover:bg-gray-100 transition duration-300 ease-in-out flex justify-between items-center my-4 shadow-lg"
                  >
                    <div className="flex items-center">
                      <div className="px-16">
                        <img
                          className="h-16 w-16"
                          src={
                            'https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/51994bb5-2349-4c7a-6b30-473360d1ba00/public'
                          }
                          alt="notice"
                        ></img>
                      </div>
                      <div className="px-12">{sprint.purpose}</div>
                    </div>
                    <div className="px-12">
                      {sprint.startDate.substr(0, 10)}
                    </div>
                  </div>
                );
              });
            })}
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
      className="py-2 px-4 rounded-xl text-xs border-lightGray border-2 text-darkGray shadow-lg transition duration-300 ease-in-out hover:bg-lightGray "
      onClick={() => {
        navigate(goNavi);
      }}
    >
      view all
    </button>
  );
};
