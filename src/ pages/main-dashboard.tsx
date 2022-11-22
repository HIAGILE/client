import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

import temp from 'images/icon/bellAlarm.svg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'styles/calendar.css';
import { useMe } from 'lib/useMe';
import NewProject from 'components/main/new-project';
import DashboardTitle from 'components/dashboard/dashbord-title';
import MyProjects from 'components/main/my-project';
import { useProject } from 'lib/useProject';
import { getProjects, getProjectsVariables } from '__generated__/getProjects';
import { client, isLoggedInVar, meVar } from 'apollo';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { meQuery, meQuery_me } from '__generated__/meQuery';
import { getNotices } from '__generated__/getNotices';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      type: 'line' as const,
      label: 'Dataset 1',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
    {
      type: 'bar' as const,
      label: 'Dataset 2',
      backgroundColor: 'rgb(75, 192, 192)',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar' as const,
      label: 'Dataset 3',
      backgroundColor: 'rgb(53, 162, 235)',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
  ],
};

export const GET_NOTICES_QUERY = gql`
  query getNotices {
    getNotices {
      ok
      error
      notices{
        createAt
        updateAt
        description
        id
      }
    }
  }
`;

function MainDashboard() {
  const project = false;
  // apollo
  const [dates, setDates] = useState<Date[]>();
  const userName = 'user name';
  const navigate = useNavigate();
  const { data: myProfile, loading: myProfileLoading } = useMe();
  
  //console.log(me);
  const { data: myProjects, loading: myProjectsLoading } = useProject(0);
  const { data: notices, loading: noticesLoading } = useQuery<getNotices>(GET_NOTICES_QUERY)

  return (
    <>
      <div className="flex h-full">
        {/* 왼쪽 사이드바 */}
        <div className="w-full lg:w-8/12 px-8 pt-28 rounded-3xl bg-white">
          {/* 메인 대시보드*/}
          <DashboardTitle title="Dashboard" />
          <NewProject userName={myProfile?.me.name} />
          {/* 프로젝트 */}
          <div className="my-10">
            <div className="flex justify-between items-start">
              <DashboardTitle title="My Project" />
              <button
                className="py-1 px-4 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs text-darkGray font-semibold shadow-lg transition duration-300 ease-in-out"
                onClick={() => {
                  navigate('/project');
                }}
              >
                view all
              </button>
            </div>
            <MyProjects data={myProjects} loading={myProjectsLoading}/>
          </div>
          {/* 여기는 최근 폴더 부분 */}
          <div>
            <div className="flex justify-between items-start">
              <DashboardTitle title="Notice" />
              <button className="py-1 px-4 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs text-darkGray font-semibold shadow-lg transition duration-300 ease-in-out">
                view all
              </button>
            </div>
            {
              noticesLoading 
              ? 
              <div>loading</div> 
              : 
                notices?.getNotices.notices && notices?.getNotices.notices.map((notice) => {
                  return (
                    <div key={notice.id} className="rounded-lg h-20 hover:bg-gray-100 transition duration-300 ease-in-out flex justify-between items-center my-4 shadow-lg">
                      <div className='flex items-center'>
                        <div className="px-16">
                          <img className='h-16 w-16' src={"https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/a0949a56-bdc7-4c68-4afb-057c08b2c100/public"} alt="notice"></img>
                        </div>
                        <div className="px-12">{notice.description}</div>
                      </div>
                      <div className="px-12">{notice.createAt.substr(0,10)}</div>
                    </div>
                  )
                })
            }
            
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
        </div>
      </div>
    </>
  );
}

export default MainDashboard;
