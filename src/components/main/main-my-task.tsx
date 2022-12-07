import { changeDate } from 'lib/changeDate';
import React from 'react';
import { getProjects_getProjects_projects } from '__generated__/getProjects';

const MainTasks = ({
  projects,
}: {
  projects: getProjects_getProjects_projects[] | null | undefined;
}) => {
  return (
    <div className="overflow-scroll h-[300px]">
      {projects?.map((project) => {
        return project.sprints.map((sprint) => {
          return sprint.toDoList.map((todo) => {
            return (
              <p
                key={todo.id}
                className="bg-white border-2 border-lightGray rounded-xl my-4 p-4 flex items-center shadow-lg"
              >
                <span className="w-1/6 text-xs font-semibold text-mainRed">
                  {todo.status}
                </span>
                <span className="w-2/6 text-xs">{todo.title}</span>
                <span className="w-2/6 text-xs">{todo.description}</span>
                <span className="w-1/6 text-xs">
                  {changeDate(sprint.startDate)}
                </span>
              </p>
            );
          });
        });
      })}
    </div>
  );
};

export default MainTasks;
