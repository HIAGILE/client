import { useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProjects, getProjectsVariables } from "__generated__/getProjects";
import { ProjectRole } from "__generated__/globalTypes";
import { GET_PROJECTS_QUERY } from "./main-dashboard";




export const ProjectDashboard = () =>{
    const {data:myProjects,loading:myProjectsLoading} = useQuery<getProjects,getProjectsVariables>(
        GET_PROJECTS_QUERY,
        {
          variables:{
            input:{
              id: 0
            }
          },
          //pollInterval: 500
        }
      );
    const navigate = useNavigate();
    return(
        <div className="h-full px-10 pt-28 rounded-3xl bg-white">
            <Helmet>
                <title>Project Dashboard | Hi Agile</title>
            </Helmet>
            <p className="font-bold text-3xl h-16">Project Dashboard</p>
            <div className="flex flex-wrap">
                {
                    myProjectsLoading ? 
                    (
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
                          <div className="bg-mainBlue shadow rounded-md p-4 max-w-sm w-full mx-auto">
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
                        )
                        :
                        (
                        myProjects?.getProjects.projects 
                        ?
                        myProjects?.getProjects.projects.map((project,index) => {
                          return (
                            index % 3 == 0 ?
                            <div key={project.id}>
                              <div className="bg-red-400 hover:bg-red-500 h-72 w-96 m-10 relative rounded-3xl shadow-2xl hover:scale-105 transition" onClick={()=>{
                                    navigate(`/project/${project.id}`)
                                  }}>
                                <div className="w-12/12">
                                  <div className='p-5 text-2xl font-bold text-white'>{project.code}</div>
                                </div>
                                <p className="text-white px-5 pb-3 text-xl">
                                  {project.name}
                                </p>
                                <div className="relative h-16">
                                {
                                  project.members.map((member,index) => {
                                    return (
                                      <img key={member.id} className={`w-10 h-10 bg-white absolute rounded-full bottom-0 mr-5 mb-5`} style={{"left":(25*index)+20}} src={member.user.profileUrl}></img>
                                    )
                                  })
                                }
                                </div>
                                <p className="px-5 text-white">{
                                    project.members.map((member) => {
                                      return (member.role == ProjectRole.Leader ? `프로젝트 리더 : ${member.user.name}` : null)
                                    })
                                  }
                                </p>
                                <p className="px-5 text-white">생성일자 : {project.createAt.substr(0,10)}</p>
                                <p className="px-5 text-white">현재 할 일 : {project.sprints.length}개</p>
                              </div>
                            </div>
                            :
                            index % 3 == 1 ?
                            <div key={project.id}>
                              <div className="bg-blue-400 hover:bg-blue-500 h-72 w-96 m-10 rounded-3xl shadow-2xl hover:scale-105 transition" onClick={()=>{
                                    navigate(`/project/${project.id}`)
                                  }}>
                                <div className="relative w-12/12">
                                  <div className='p-5 text-2xl font-bold text-white'>{project.code}</div>
                                </div>
                                <p className="text-white px-5 pb-3 text-xl">{project.name}</p>
                                <div className="relative h-16">
                                {
                                  project.members.map((member,index) => {
                                    return (
                                      <img key={member.id} className={`w-10 h-10 bg-white absolute rounded-full bottom-0 mr-5 mb-5`} style={{"left":(25*index)+20}} src={member.user.profileUrl}></img>
                                    )
                                  })
                                }
                                </div>
                                <p className="px-5 text-white">{
                                    project.members.map((member) => {
                                      return (member.role == ProjectRole.Leader ? `프로젝트 리더 : ${member.user.name}` : null)
                                    })
                                  }
                                </p>
                                <p className="px-5 text-white">생성일자 : {project.createAt.substr(0,10)}</p>
                                <p className="px-5 text-white">현재 할 일 : {project.sprints.length}개</p>
                              </div>
                            </div>
                            :
                            <div key={project.id}>
                              <div className="bg-green-400 hover:bg-green-500 h-72 w-96 m-10 rounded-3xl shadow-2xl hover:scale-105 transition" onClick={()=>{
                                    navigate(`/project/${project.id}`)
                                  }}>
                                <div className="relative w-12/12">
                                
                                  <div className='p-5 text-2xl font-bold text-white'>{project.code}</div>
                                </div>
                                <p className="text-white px-5 pb-3 text-xl">{project.name}</p>
                                <div className="relative h-16">
                                {
                                  project.members.map((member,index) => {
                                    return (
                                      <img key={member.id} className={`w-10 h-10 bg-white absolute rounded-full bottom-0 mr-5 mb-5`} style={{"left":(25*index)+20}} src={member.user.profileUrl}></img>
                                    )
                                  })
                                }
                                </div>
                                <p className="px-5 text-white">{
                                    project.members.map((member) => {
                                      return (member.role == ProjectRole.Leader ? `프로젝트 리더 : ${member.user.name}` : null)
                                    })
                                  }
                                </p>
                                <p className="px-5 text-white">생성일자 : {project.createAt.substr(0,10)}</p>
                                <p className="px-5 text-white">현재 할 일 : {project.sprints.length}개</p>
                              </div>
                            </div>
                          )
                        })
                        
                        :
                        "생성한 프로젝트가 없습니다."
                        )
                }
            </div>
        </div>
    );
}