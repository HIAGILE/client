import React, { useState } from 'react';
// https://icon-icons.com/ko/pack/Teamleader-Icons/2346
import { Link, useNavigate } from 'react-router-dom';
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
import computer_il from 'images/icon/computer_il.svg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'styles/calendar.css';
import { useMe } from 'hooks/useMe';
import { gql, useQuery } from '@apollo/client';
import { getProjects, getProjectsVariables } from '__generated__/getProjects';
import { ProjectRole } from '__generated__/globalTypes';

export const GET_PROJECTS_QUERY = gql`
  query getProjects($input: GetProjectsInput!) {
    getProjects(input: $input) {
      ok
      error
      projects {
        id
        createAt
        updateAt
        code
        name
        owner {
          name
          role
          email
        }
        githubURL
        sprints {
          id
          createAt
          updateAt
          startDate
          endDate
          period
          purpose
        }
        members {
          id
          user {
            id
            profileUrl
            name
          }
          role
        }
      }
    }
  }
`;

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

function MainDashboard() {
  const project = false;
  return (
    <>
      <NewProject />
    </>
  );
}

export default MainDashboard;

// User Profile
// Project List
// Sprint

const NewProject = () => {
  // apollo
  const [dates, setDates] = useState<Date[]>();
  const userName = 'user name';
  const navigate = useNavigate();
  const { data: myProfile, loading: myProfileLoading } = useMe();
  const { data: myProjects, loading: myProjectsLoading } = useQuery<
    getProjects,
    getProjectsVariables
  >(GET_PROJECTS_QUERY, {
    variables: {
      input: {
        id: 0,
      },
    },
    // pollInterval: 500
  });
  return (
    <>
      <div className="flex">
        {/* 여기는 메인 대시보드 */}
        <div className="w-8/12 px-10 pt-28 rounded-3xl bg-white">
          <div className="flex mb-5">
            <p className="font-bold text-2xl">Dashboard</p>
          </div>
          <div className="bg-middleBlue rounded-xl h-60 flex justify-between relative">
            <div className="p-8 w-full">
              <div className="text-4xl font-bold p-2">
                Hello! {myProfile?.me.name}
              </div>
              <div className="text-sm p-2">
                네가지 애자일 방법론 활용해 최적화된 프로젝트 관리를 시작하세요.
                <br></br>
                스크럼, 짝 프로그래밍, 익스트림 프로그래밍, 칸반보드 등이
                있습니다.
              </div>
              <button
                className="hover:scale-105 transition text-lightBlue text-lg leading-none bg-mainBlue rounded-xl p-4 m-2"
                onClick={() => {
                  navigate('/create-project');
                }}
              >
                프로젝트 생성
              </button>
            </div>
            <img
              src={computer_il}
              width="400"
              className="absolute right-16 bottom-0"
            ></img>
          </div>
          {/* 여기는 폴더 부분 */}
          <div className="my-10">
            <div className="flex">
              <p className="font-bold text-2xl w-96">My Projects</p>
              <div className="flex justify-end w-full">
                <button
                  className="py-2 px-4 bg-gray-100 rounded-3xl"
                  onClick={() => {
                    navigate('/project');
                  }}
                >
                  View All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-10 w-full my-5">
              {myProjectsLoading ? (
                <>
                  <div className="bg-red-400 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-6 py-1">
                        <div className="space-y-3">
                          <div className="grid grid-cols-4 gap-4">
                            <div className="h-4 bg-slate-200 rounded col-span-3"></div>
                            <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="grid grid-cols-4 gap-4">
                            <div className="h-4 bg-slate-200 rounded col-span-3"></div>
                            <div className="h-4 rounded col-span-1"></div>
                          </div>
                        </div>
                        <div className="space-y-5">
                          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-400 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-6 py-1">
                        <div className="space-y-3">
                          <div className="grid grid-cols-4 gap-4">
                            <div className="h-4 bg-slate-200 rounded col-span-3"></div>
                            <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="grid grid-cols-4 gap-4">
                            <div className="h-4 bg-slate-200 rounded col-span-3"></div>
                            <div className="h-4 rounded col-span-1"></div>
                          </div>
                        </div>
                        <div className="space-y-5">
                          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-400 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-6 py-1">
                        <div className="space-y-3">
                          <div className="grid grid-cols-4 gap-4">
                            <div className="h-4 bg-slate-200 rounded col-span-3"></div>
                            <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="grid grid-cols-4 gap-4">
                            <div className="h-4 bg-slate-200 rounded col-span-3"></div>
                            <div className="h-4 rounded col-span-1"></div>
                          </div>
                        </div>
                        <div className="space-y-5">
                          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : myProjects?.getProjects.projects ? (
                myProjects?.getProjects.projects.map((project, index) => {
                  return index % 3 == 0 ? (
                    <div key={project.id}>
                      <div className="bg-red-400 hover:bg-red-500 h-72 relative rounded-3xl shadow-2xl hover:scale-105 transition">
                        <div className="w-12/12">
                          <div
                            className="p-5 absolute right-0 cursor-pointer text-white"
                            onClick={() => {
                              navigate(`/project/${project.id}`);
                            }}
                          >
                            더보기
                          </div>
                          <div className="p-5 text-2xl font-bold text-white">
                            {project.code}
                          </div>
                        </div>
                        <p className="text-white px-5 pb-3 text-xl">
                          {project.name}
                        </p>
                        <div className="relative h-16">
                          {project.members.map((member, index) => {
                            return (
                              <img
                                key={member.id}
                                className={`w-10 h-10 bg-white absolute rounded-full bottom-0 mr-5 mb-5`}
                                style={{ left: 25 * index + 20 }}
                                src={member.user.profileUrl}
                              ></img>
                            );
                          })}
                        </div>
                        <p className="px-5 text-white">
                          {project.members.map((member) => {
                            return member.role == ProjectRole.Leader
                              ? `프로젝트 리더 : ${member.user.name}`
                              : null;
                          })}
                        </p>
                        <p className="px-5 text-white">
                          생성일자 : {project.createAt.substr(0, 10)}
                        </p>
                        <p className="px-5 text-white">
                          현재 할 일 : {project.sprints.length}개
                        </p>
                      </div>
                    </div>
                  ) : index % 3 == 1 ? (
                    <div key={project.id}>
                      <div className="bg-blue-400 hover:bg-blue-500 h-72 rounded-3xl shadow-2xl hover:scale-105 transition">
                        <div className="relative w-12/12">
                          <div
                            className="p-5 absolute right-0 cursor-pointer text-white"
                            onClick={() => {
                              navigate(`/project/${project.id}`);
                            }}
                          >
                            더보기
                          </div>
                          <div className="p-5 text-2xl font-bold text-white">
                            {project.code}
                          </div>
                        </div>
                        <p className="text-white px-5 pb-3 text-xl">
                          {project.name}
                        </p>
                        <div className="relative h-16">
                          {project.members.map((member, index) => {
                            return (
                              <img
                                key={member.id}
                                className={`w-10 h-10 bg-white absolute rounded-full bottom-0 mr-5 mb-5`}
                                style={{ left: 25 * index + 20 }}
                                src={member.user.profileUrl}
                              ></img>
                            );
                          })}
                        </div>
                        <p className="px-5 text-white">
                          {project.members.map((member) => {
                            return member.role == ProjectRole.Leader
                              ? `프로젝트 리더 : ${member.user.name}`
                              : null;
                          })}
                        </p>
                        <p className="px-5 text-white">
                          생성일자 : {project.createAt.substr(0, 10)}
                        </p>
                        <p className="px-5 text-white">
                          현재 할 일 : {project.sprints.length}개
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div key={project.id}>
                      <div className="bg-green-400 hover:bg-green-500 h-72 rounded-3xl shadow-2xl hover:scale-105 transition">
                        <div className="relative w-12/12">
                          <div
                            className="p-5 absolute right-0 cursor-pointer text-white"
                            onClick={() => {
                              navigate(`/project/${project.id}`);
                            }}
                          >
                            더보기
                          </div>
                          <div className="p-5 text-2xl font-bold text-white">
                            {project.code}
                          </div>
                        </div>
                        <p className="text-white px-5 pb-3 text-xl">
                          {project.name}
                        </p>
                        <div className="relative h-16">
                          {project.members.map((member, index) => {
                            return (
                              <img
                                key={member.id}
                                className={`w-10 h-10 bg-white absolute rounded-full bottom-0 mr-5 mb-5`}
                                style={{ left: 25 * index + 20 }}
                                src={member.user.profileUrl}
                              ></img>
                            );
                          })}
                        </div>
                        <p className="px-5 text-white">
                          {project.members.map((member) => {
                            return member.role == ProjectRole.Leader
                              ? `프로젝트 리더 : ${member.user.name}`
                              : null;
                          })}
                        </p>
                        <p className="px-5 text-white">
                          생성일자 : {project.createAt.substr(0, 10)}
                        </p>
                        <p className="px-5 text-white">
                          현재 할 일 : {project.sprints.length}개
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                '생성한 프로젝트가 없습니다.'
              )}
              {/* <div>
                <div className="bg-red-400 h-60 rounded-3xl shadow-2xl">
                  <div className="relative w-12/12">
                    <img className="p-5 absolute right-0" src={temp}></img>
                    <img className="p-5" src={temp}></img>
                  </div>
                  <p className="text-white px-5">프로젝트 제목</p>
                  <img className="p-5" src={temp}></img>
                  <p className="px-5 text-white">생성시기</p>
                  <p className="px-5 text-white">할 일의 갯수</p>
                </div>
              </div>
              <div>
                <div className="bg-mainBlue h-60 rounded-3xl shadow-2xl">
                  <div className="relative w-12/12">
                    <img className="p-5 absolute right-0" src={temp}></img>
                    <img className="p-5" src={temp}></img>
                  </div>
                  <p className="text-white px-5">Design Shift</p>
                  <img className="p-5" src={temp}></img>
                  <p className="px-5 text-white">hello</p>
                  <p className="px-5 text-white">hello there!</p>
                </div>
              </div>
              <div>
                <div className="bg-yellow-300 h-60 rounded-3xl shadow-2xl">
                  <div className="relative w-12/12">
                    <img className="p-5 absolute right-0" src={temp}></img>
                    <img className="p-5" src={temp}></img>
                  </div>
                  <p className="text-white px-5">Design Shift</p>
                  <img className="p-5" src={temp}></img>
                  <p className="px-5 text-white">hello</p>
                  <p className="px-5 text-white">hello there!</p>
                </div>
              </div> */}
            </div>
          </div>
          {/* 여기는 최근 폴더 부분 */}
          <div>
            <div className="flex">
              <p className="font-bold text-2xl w-96">Notice</p>
              <div className="flex justify-end w-full">
                <button className="py-2 px-4 bg-gray-100 rounded-3xl">
                  View All
                </button>
              </div>
            </div>
            <div className="rounded-3xl bg-gray-100 h-20 hover:bg-mainBlue transition flex items-center justify-center my-5">
              <img src={temp} className="px-5"></img>
              <div className="w-96">알림내용</div>
              <div className="px-6">프로젝트명</div>
              <div className="px-6">아바타/사용자명</div>
              <div className="px-6">일자</div>
              <div className="px-6">자세히보기</div>
            </div>
            <div className="rounded-3xl bg-gray-100 h-20 hover:bg-mainBlue transition flex items-center justify-center my-5">
              <img src={temp} className="px-5"></img>
              <div className="w-96">하이 애자일 프로젝트 ㅎㅎㅎㅎ</div>
              <div className="px-6">12 Nov 2023</div>
              <div className="px-6">3,000₩</div>
              <div className="px-6">hello there</div>
              <div className="px-6">hello</div>
            </div>
            <div className="rounded-3xl bg-gray-100 h-20 hover:bg-mainBlue transition flex items-center justify-center my-5">
              <img src={temp} className="px-5"></img>
              <div className="w-96">하이 애자일 프로젝트 ㅎㅎㅎㅎ</div>
              <div className="px-6">12 Nov 2023</div>
              <div className="px-6">3,000₩</div>
              <div className="px-6">hello there</div>
              <div className="px-6">hello</div>
            </div>
          </div>
        </div>
        {/* 여기는 오른쪽 사이드 바 */}
        <div className="w-4/12 bg-bgBlue shwdow-lg">
          <div className="mt-28">
            <div className="text-2xl px-10 py-5 font-bold">Calendar</div>
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
          <div className="text-2xl px-10 py-5 font-bold">Your Task</div>
        </div>
      </div>
      {/* <div className="my-4 rounded-xl h-72 flex justify-between">
        <div className="w-8/12 mr-2">
          <div className="h-72 shadow-lg mb-4 bg-green-200 rounded-md">
          </div>
          <div className="h-72 shadow-lg bg-purple-200 rounded-md"></div>
        </div>
        <div className="w-4/12 ml-2">
          <div className="h-72 shadow-lg mb-4 bg-red-200 rounded-md">
            <Chart type='bar' data={data} />
          </div>
          <div className="h-72 shadow-lg bg-yellow-200 rounded-md">
            <Chart type='bar' data={data} />
          </div>
        </div>
      </div> */}
    </>
  );
};
