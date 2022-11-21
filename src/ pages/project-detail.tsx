import { gql, useQuery } from "@apollo/client";
import React, { ChangeEvent, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { getProject, getProjectVariables, getProject_getProject_project_sprints_toDoList } from "__generated__/getProject";
import { ProjectRole } from "__generated__/globalTypes";

export const GET_PROJECT_QUERY = gql`
  query getProject($input: GetProjectInput!) {
    getProject(input: $input) {
      ok
      error
      project {
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
          toDoList{
            id
            createAt
            updateAt
            title
            description
            status
          }
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

export const ProjectDetail = () =>{
    const params = useParams<{projectId: string}>();
    const [sprintSelectBox, setSprintSelectBox] = useState(1);
    const [toDoListSelectBox, setToDoListSelectBox] = useState(1);
    const {data:myProject,loading:myProjectLoading} = useQuery<getProject,getProjectVariables>(
      GET_PROJECT_QUERY,
      {
        variables:{
          input:{
            id: parseInt(params.projectId ?? "0")
          }
        },
        pollInterval: 500
      }
    );
    
    return(
      <div className="h-screen px-10 pt-28 rounded-3xl bg-white">
            <Helmet>
                <title>Project Dashboard | Hi Agile</title>
            </Helmet>
            <p className="font-bold text-3xl h-10">
              Project Detail</p>
            {
              myProjectLoading ?
              <h1>Loading...</h1>
              :
              <div className="flex flex-wrap">
                <div className="w-5/12 px-10">
                  <div>
                  <p className="p-4 text-2xl font-bold text-mainBlue">
                      프로젝트 종류</p>
                    <div className="px-8 text-xl font-bold h-16 flex justify-start items-center  bg-white shadow-lg text-black">{myProject?.getProject.project?.code}</div>
                  </div>
                  <div>
                  <p className="p-4 text-2xl font-bold text-mainBlue">
                      프로젝트명</p>
                    <div className="px-8 text-xl font-bold h-16 flex justify-start items-center  bg-white shadow-lg text-black">{myProject?.getProject.project?.name}</div>
                  </div>
                  <div>
                  <p className="p-4 text-2xl font-bold text-mainBlue">
                      프로젝트 리더</p>
                    <div className="px-8 text-lg flex justify-start items-center  bg-white shadow-lg text-black">
                      {
                        myProject?.getProject.project?.members.map((member,index) =>{
                          return  (
                            member.role === ProjectRole.Leader ?
                            <div className="flex flex-col my-2">
                              <img key={member.id} className={`w-20 h-20 bg-white rounded-lg bottom-0`} style={{"left":(25*index)+20}} src={member.user.profileUrl}></img>
                              <div className="flex justify-center items-center">{member.user.name}</div>
                            </div>
                            :
                            null
                          )
                        })
                      }
                    </div>
                  </div>
                  <div>
                  <p className="p-4 text-2xl font-bold text-mainBlue">
                      프로젝트 구성원</p>
                    <div className="px-8 text-lg flex flex-wrap items-center  bg-white shadow-lg text-black">
                      {
                        myProject?.getProject.project?.members.map((member,index) =>{
                          return  (
                            member.role === ProjectRole.member ?
                            <div className="flex flex-col my-2 mr-4">
                              <img key={member.id} className={`w-20 h-20 bg-white rounded-lg bottom-0`} style={{"left":(25*index)+20}} src={member.user.profileUrl}></img>
                              <div className="flex justify-center items-center">{member.user.name}</div>
                            </div>
                            :null
                          )
                        })
                      }
                    </div>
                  </div>
                  <div>
                    <p className="p-4 text-2xl font-bold text-mainBlue">
                      프로젝트 생성일자</p>
                    <div className="px-8 text-xl font-bold h-16 flex justify-start items-center  bg-white shadow-lg text-black">{myProject?.getProject.project?.createAt.substr(0,10)}</div>
                  </div>
                </div>
                <div className="w-5/12">
                  <div className="relative flex justify-between items-center">
                    <p className="p-4 text-2xl font-bold text-mainBlue">
                      스프린트
                    </p>
                    <div className="absolute right-0">
                      <select className="px-2 py-1 border border-gray-500 rounded mx-2 outline-none" onChange={(e)=>{
                        setSprintSelectBox(parseInt(e.target.value));
                      }}>
                          <option value="1" selected>진행 중</option>
                          <option value="2">전체</option>
                        </select>
                      <button className="px-2 py-1 bg-purple-500 rounded text-white hover:bg-purple-600" type="button">추가하기</button>
                    </div>
                  </div>
                  <div className="shadow-lg bg-white px-8 my-2 py-4">
                  <div className="overflow-scroll h-60">
                      {
                        myProject?.getProject.project?.sprints.map((sprint,index) =>{
                          const now = new Date();
                          const startDate = new Date(sprint.startDate);
                          const endDate = new Date(sprint.endDate);
                          return(
                            sprintSelectBox === 1 
                            ?
                            (
                              (startDate < now && endDate > now) ?
                              <div key={sprint.id} className="hover:bg-gray-300 text-black flex flex-col my-2 border-2 border-gray-200 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <div className="flex flex-col">
                                    <div className="text-xl ">{sprint.purpose}</div>
                                    <div className="text-xl ">{sprint.startDate.substr(0,10)} ~ {sprint.endDate.substr(0,10)}</div>
                                  </div>
                                  <div className="flex flex-col">
                                    <div className="text-xl ">진행률 : {"80%"}</div>
                                    <div className="text-xl ">주기 : {sprint.period}주일</div>
                                  </div>
                                </div>
                              </div>
                              :
                              null
                            )
                            :
                              <div key={sprint.id} className="hover:bg-gray-300 text-white flex flex-col my-2 border-2 border-gray-200 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <div className="flex flex-col">
                                    <div className="text-xl ">{sprint.purpose}</div>
                                    <div className="text-xl ">{sprint.startDate.substr(0,10)} ~ {sprint.endDate.substr(0,10)}</div>
                                  </div>
                                  <div className="flex flex-col">
                                    <div className="text-xl ">진행률 : {"80%"}</div>
                                    <div className="text-xl ">주기 : {sprint.period}주일</div>
                                  </div>
                                </div>
                              </div>
                          )
                        })
                      }
                     </div>
                  </div>
                     <div className="relative flex justify-between items-center">
                      <p className="px-4 py-2 text-2xl font-bold text-mainBlue">
                          할 일
                      </p>
                      <div className="absolute right-0">
                        {/* <select className="px-2 py-1 border border-gray-500 rounded mx-2 outline-none" onChange={(e)=>{
                        setToDoListSelectBox(parseInt(e.target.value));
                      }}>
                          <option value="1" selected>진행 중</option>
                          <option value="2">전체</option>
                        </select> */}
                        <button className="px-2 py-1 bg-purple-500 rounded text-white hover:bg-purple-600" type="button">추가하기</button>
                      </div>
                     </div>
                     <div className="shadow-lg bg-white px-8 my-2 py-4">
                      <div className="overflow-scroll h-80">
                        {
                          myProject?.getProject.project?.sprints.map((sprint,index) =>{
                            const toDoList = [...sprint.toDoList];
                            return (
                              toDoList.map((toDo,index) =>{
                                return(
                                  <div key={toDo.id} className="hover:bg-gray-300 text-black flex flex-col my-2 border-2 border-gray-200 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                      <div className="flex flex-col">
                                        <div className="text-xl ">{toDo.title}</div>
                                        <div className="text-xl ">{toDo.description}</div>
                                      </div>
                                      <div className="flex flex-col">
                                        <div className="text-xl ">상태 : {toDo.status}</div>
                                        <div className="text-xl ">생성일 : {toDo.createAt.substr(0,10)}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )})
                            )
                          })
                        }
                      </div>
                    </div>
                </div>
              </div>
            }
        </div>
    );
}