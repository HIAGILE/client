import { useProject } from "lib/useProject";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";

export const ToDoListDashboard = () =>{
    const params = useParams<{projectId: string}>();
    const { data: myProjects, loading: myProjectsLoading } = useProject(0);
    return(
        <div className="h-full px-10 pt-28 rounded-3xl bg-white">
            <Helmet>
                <title>ToDoList Dashboard | Hi Agile</title>
            </Helmet>
            {
                myProjects?.getProjects.projects?.map((project,index) =>{
                    return (
                        <>
                            <div className="pb-2 pt-5 my-5 text-md">Project : {project.name}</div>
                            <div className="shadow-md bg-white px-8 py-4" style={{border:"1px solid rgba(220,220,220,0.8)"}}>
                                <div>
                                {
                                    project?.sprints.map((sprint,index) =>{
                                    const toDoList = [...sprint.toDoList];
                                    return (
                                        <div key={sprint.id}>
                                            <div className="pb-2 pt-5 text-sm">Sprint : {sprint.purpose}</div>
                                        {
                                        toDoList.map((toDo,index) =>{
                                        return(
                                            <div key={toDo.id} style={{border:"1px solid rgba(220,220,220,0.8)"}} className="hover:bg-gray-100 transition duration-300 ease-in-out text-black flex flex-col my-2 p-4 rounded-md shadow-md">
                                                <div className="flex flex-col justify-center items-center px-4 text-xs">
                                                    <div className="flex justify-between items-center w-full py-2" style={{borderBottom:"1px solid rgba(220,220,220,0.8)"}}>
                                                    <div>할 일 목적</div>
                                                    <div>{toDo.title}</div>
                                                    </div>
                                                    <div className="flex justify-between items-center w-full py-2" style={{borderBottom:"1px solid rgba(220,220,220,0.8)"}}>
                                                    <div>할 일 내용</div>
                                                    <div>{toDo.description}</div>                            
                                                    </div>
                                                    <div className="flex justify-between items-center w-full py-2" style={{borderBottom:"1px solid rgba(220,220,220,0.8)"}}>
                                                    <div>할 일 상태</div>
                                                    <div>{toDo.status}</div>
                                                    </div>
                                                    <div className="flex justify-between items-center w-full py-2" style={{borderBottom:"1px solid rgba(220,220,220,0.8)"}}>
                                                    <div>할 일 구성원</div>
                                                    <div className="flex">{
                                                        toDo.members?.map((member,index) => {
                                                            return (
                                                                <div key={member.id} className="flex flex-col items-center justify-center mx-2">
                                                                    <img className="w-10 h-10 rounded-full" src={member.user.profileUrl} alt="Avatar of Jonathan Reinink"></img>
                                                                    <div className="text-gray-900 font-light text-xs">{member.user.name}</div>
                                                                </div>
                                                            )
                                                        })
                                                    }</div>
                                                    </div>
                                                    <div className="flex justify-between items-center w-full py-2">
                                                    <div>할 일 생성일</div>
                                                    <div className="text-sm ">{toDo.createAt.substr(0,10)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )})
                                        }
                                        </div>
                                    )
                                    })
                                }
                                </div>
                            </div>
                        </>
                    )
                })
            }
        </div>
    );
}