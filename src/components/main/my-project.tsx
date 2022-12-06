import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectRole } from '../../__generated__/globalTypes';
import { getProjects } from '__generated__/getProjects';
import LoadingProject from './loading-project';

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
          myProjects?.getProjects.projects?.length > 0 &&
          myProjects?.getProjects.projects.map((project, index) => {
            if (index === 0) {
              return (
                <div key={project.id}>
                  <div className="bg-white border-2 border-mainRed h-72 relative rounded-3xl shadow-2xl hover:scale-105 transition duration-300 ease-in-out">
                    <div className="w-12/12">
                      <div
                        className="p-5 absolute right-0 cursor-pointer text-black"
                        onClick={() => {
                          navigate(`/project/${project.id}`);
                        }}
                      >
                        더보기
                      </div>
                      <div className="p-5 text-2xl font-bold text-mainRed">
                        {project.code}
                      </div>
                    </div>
                    <p className="text-black px-5 pb-3 text-xl">
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
                    <p className="px-5 text-black">
                      {project?.members?.map((member) => {
                        return member.role == ProjectRole.Leader
                          ? `프로젝트 리더 : ${member.user.name}`
                          : null;
                      })}
                    </p>
                    <p className="px-5 text-black">
                      생성일자 : {project.createAt.substr(0, 10)}
                    </p>
                    <p className="px-5 text-black">
                      현재 할 일 : {project?.sprints.length}개
                    </p>
                  </div>
                </div>
              );
            } else if (index === 1) {
              return (
                <div key={project.id}>
                  <div className="bg-white border-2 border-mainBlue h-72 relative rounded-3xl shadow-2xl hover:scale-105 transition duration-300 ease-in-out">
                    <div className="w-12/12">
                      <div
                        className="p-5 absolute right-0 cursor-pointer text-black"
                        onClick={() => {
                          navigate(`/project/${project.id}`);
                        }}
                      >
                        더보기
                      </div>
                      <div className="p-5 text-2xl font-bold text-mainBlue">
                        {project.code}
                      </div>
                    </div>
                    <p className="text-black px-5 pb-3 text-xl">
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
                    <p className="px-5 text-black">
                      {project?.members?.map((member) => {
                        return member.role == ProjectRole.Leader
                          ? `프로젝트 리더 : ${member.user.name}`
                          : null;
                      })}
                    </p>
                    <p className="px-5 text-black">
                      생성일자 : {project.createAt.substr(0, 10)}
                    </p>
                    <p className="px-5 text-black">
                      현재 할 일 : {project?.sprints.length}개
                    </p>
                  </div>
                </div>
              );
            } else if (index === 2) {
              return (
                <div key={project.id}>
                  <div className="bg-white border-2 hover:text-white border-mainGreen h-72 relative rounded-3xl shadow-2xl hover:scale-105 transition duration-300 ease-in-out">
                    <div className="w-12/12">
                      <div
                        className="p-5 absolute right-0 cursor-pointer text-black"
                        onClick={() => {
                          navigate(`/project/${project.id}`);
                        }}
                      >
                        더보기
                      </div>
                      <div className="p-5 text-2xl font-bold text-mainGreen">
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
                    <p className="px-5 text-black">
                      {project?.members?.map((member) => {
                        return member.role == ProjectRole.Leader
                          ? `프로젝트 리더 : ${member.user.name}`
                          : null;
                      })}
                    </p>
                    <p className="px-5 text-black">
                      생성일자 : {project.createAt.substr(0, 10)}
                    </p>
                    <p className="px-5 text-black">
                      현재 할 일 : {project?.sprints.length}개
                    </p>
                  </div>
                </div>
              );
            }
          })) ||
        (myProjects?.getProjects.projects?.length === 0 && (
          <p className="w-full ml-2 text-sm text-darkBlue">
            생성한 프로젝트가 없습니다.
          </p>
        ))}
    </div>
  );
};

export default MyProjects;
