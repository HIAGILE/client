import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProjectRole } from '../../__generated__/globalTypes';
import { gql, useQuery } from '@apollo/client';
import { getProjects, getProjectsVariables } from '__generated__/getProjects';

type Props = {
  data: getProjects | undefined;
  loading: boolean;
};

const MyProjects = ({
  data: myProjects,
  loading: myProjectsLoading,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-10 w-full my-5">
      {(myProjectsLoading && <LoadingProject />) ||
        (myProjects?.getProjects.projects &&
          myProjects?.getProjects.projects.map((project, index) => {
            if (index === 0) {
              return (
                <div key={project.id}>
                  <div className="bg-mainRed hover:bg-red-500 h-72 relative rounded-3xl shadow-2xl hover:scale-105 transition duration-300 ease-in-out">
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
                      {project?.members?.map((member, index) => {
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
                      {project?.members?.map((member) => {
                        return member.role == ProjectRole.Leader
                          ? `프로젝트 리더 : ${member.user.name}`
                          : null;
                      })}
                    </p>
                    <p className="px-5 text-white">
                      생성일자 : {project.createAt.substr(0, 10)}
                    </p>
                    <p className="px-5 text-white">
                      현재 할 일 : {project?.sprints.length}개
                    </p>
                  </div>
                </div>
              );
            } else if (index === 1) {
              return (
                <div key={project.id}>
                  <div className="bg-mainBlue hover:bg-blue-500 h-72 relative rounded-3xl shadow-2xl hover:scale-105 transition duration-300 ease-in-out">
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
                      {project?.members?.map((member, index) => {
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
                      {project?.members?.map((member) => {
                        return member.role == ProjectRole.Leader
                          ? `프로젝트 리더 : ${member.user.name}`
                          : null;
                      })}
                    </p>
                    <p className="px-5 text-white">
                      생성일자 : {project.createAt.substr(0, 10)}
                    </p>
                    <p className="px-5 text-white">
                      현재 할 일 : {project?.sprints.length}개
                    </p>
                  </div>
                </div>
              );
            } else if (index === 2) {
              return (
                <div key={project.id}>
                  <div className="bg-mainGreen hover:bg-green-500 h-72 relative rounded-3xl shadow-2xl hover:scale-105 transition duration-300 ease-in-out">
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
                      {project?.members?.map((member, index) => {
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
                      {project?.members?.map((member) => {
                        return member.role == ProjectRole.Leader
                          ? `프로젝트 리더 : ${member.user.name}`
                          : null;
                      })}
                    </p>
                    <p className="px-5 text-white">
                      생성일자 : {project.createAt.substr(0, 10)}
                    </p>
                    <p className="px-5 text-white">
                      현재 할 일 : {project?.sprints.length}개
                    </p>
                  </div>
                </div>
              );
            }
          })) || <p className="ml-2 text-sm">생성한 프로젝트가 없습니다.</p>}
    </div>
  );
};

export default MyProjects;

const LoadingProject = () => {
  return (
    <>
      <div className="bg-mainRed rounded-md p-4 max-w-sm w-full mx-auto shadow-2xl">
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
      <div className="bg-mainBlue rounded-md p-4 max-w-sm w-full mx-auto  shadow-2xl">
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
      <div className="bg-mainGreen rounded-md p-4 max-w-sm w-full shadow-2xl">
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
  );
};
