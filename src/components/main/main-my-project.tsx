import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectRole } from '../../__generated__/globalTypes';
import {
  getProjects,
  getProjects_getProjects_projects,
} from '__generated__/getProjects';
import LoadingProject from './loading-project';
import { changeDate } from 'lib/changeDate';

type Props = {
  data: getProjects | undefined;
  loading: boolean;
};

const MyProjects = ({
  data: myProjects,
  loading: myProjectsLoading,
}: Props) => {
  return (
    <div className="grid grid-cols-3 gap-10 w-full my-5">
      {/* 로딩중 */}
      {(myProjectsLoading && <LoadingProject />) ||
        // 프로젝트 있을 때
        (myProjects?.getProjects.projects &&
          myProjects?.getProjects.projects?.length > 0 &&
          myProjects?.getProjects.projects.map((project, index) => {
            if (index === 0) {
              return (
                <ProjectBlock
                  key={project.id}
                  project={project}
                  color="mainRed"
                />
              );
            } else if (index === 1) {
              return (
                <ProjectBlock
                  key={project.id}
                  project={project}
                  color="mainBlue"
                />
              );
            } else if (index === 2) {
              return (
                <ProjectBlock
                  key={project.id}
                  project={project}
                  color="mainGreen"
                />
              );
            }
          })) ||
        // 프로젝트가 없을 때
        (myProjects?.getProjects.projects?.length === 0 && (
          <p className="w-full ml-2 text-sm text-darkBlue">
            생성한 프로젝트가 없습니다.
          </p>
        ))}
    </div>
  );
};

export default MyProjects;

type ProjectBlockProps = {
  project: getProjects_getProjects_projects;
  color: string;
};

const ProjectBlock = ({ project, color }: ProjectBlockProps) => {
  const navigate = useNavigate();
  return (
    <article
      className={`bg-white border border-${color} h-68 p-8 relative rounded-md shadow-md hover:scale-105 transition duration-300 ease-in-out cursor-pointer`}
      onClick={() => {
        navigate(`/project/${project.id}`);
      }}
    >
      <h4 className={`text-${color}`}>{project.code}</h4>
      <h3 className="text-darkBlue text-md py-2">{project.name}</h3>
      <div className="relative h-10 my-4">
        {project?.members?.map((member, index) => {
          return (
            <img
              key={member.id}
              className={`w-10 h-10 bg-white absolute rounded-full bottom-0 mr-5 mb-2`}
              style={{ left: 28 * index }}
              src={member.user.profileUrl}
            ></img>
          );
        })}
      </div>
      <p className="text-darkGray text-sm">
        {project?.members?.map((member) => {
          return member.role == ProjectRole.Leader
            ? `Leader: ${member.user.name}`
            : null;
        })}
      </p>
      <p className="text-darkGray text-sm">
        Create date : {changeDate(project.createAt)}
      </p>
      <p className="text-darkGray text-sm">
        Currently tasks : {project?.sprints.length}
      </p>
    </article>
  );
};
