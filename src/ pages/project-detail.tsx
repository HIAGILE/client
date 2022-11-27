import { gql, useMutation, useQuery } from "@apollo/client";
import React, { ChangeEvent, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { getProject, getProjectVariables, getProject_getProject_project_sprints_toDoList } from "__generated__/getProject";
import { ProjectRole } from "__generated__/globalTypes";
import Modal from 'react-modal';
import hiAgileLogo from "images/logo.svg";
import { useForm } from "react-hook-form";
import { createSprint, createSprintVariables } from "__generated__/createSprint";
import { createToDoList, createToDoListVariables } from "__generated__/createToDoList";

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
            email
            role
            verified
          }
          role
        }
      }
    }
  }
`;

export const CREATE_SPRINT_MUTATION = gql`
  mutation createSprint($input: CreateSprintInput!) {
    createSprint(input: $input) {
      ok
      error
      sprintId
    }
  }
`;

// export const updateSprint = gql`
//   mutation updateSprint($input: UpdateSprintInput!) {
//     updateSprint(input: $input) {
//       ok
//       error
//     }
//   }
// `;

// export const deleteSprint = gql`
//   mutation deleteSprint($input: DeleteSprintInput!) {
//     deleteSprint(input: $input) {
//       ok
//       error
//     }
//   }
// `;

export enum ToDoListStatus{
  TODO = 'TODO',
  INPROGRESS = 'INPROGRESS',
  DONE = 'DONE',
}

export const CREATE_TODOLIST_MUTATION = gql`
  mutation createToDoList($input: CreateToDoListInput!) {
    createToDoList(input: $input) {
      ok
      error
      toDoListId
    }
  }
`;

// export const updateToDoList = gql`
//   mutation updateToDoList($input: UpdateToDoListInput!) {
//     updateToDoList(input: $input) {
//       ok
//       error
//     }
//   }
// `;

// export const deleteToDoList = gql`
//   mutation deleteToDoList($input: DeleteToDoListInput!) {
//     deleteToDoList(input: $input) {
//       ok
//       error
//     }
//   }
// `;

interface IParams {
  projectId: string;
}

export interface ICreateSprintForm{
  purpose: string;
  startDate: Date;
  endDate: Date;
  period: number;
};

export interface ICreateToDoListForm{
  title: string;
  description: string;
  status: string;
};

export function ProjectDetail(){
    const params = useParams<{projectId: string}>();
    const [sprintSelectBox, setSprintSelectBox] = useState(1);
    const [toDoListSelectBox, setToDoListSelectBox] = useState(1);
    const [addType, setAddType] = useState(0);
    const [selectSprint,setSelectSprint] = useState(-1);
    const {
      register : sprintRegister,
      getValues : sprintGetValues,
      formState: { isValid : sprintIsValid, errors: sprintErrors },
      handleSubmit : sprintHandleSubmit,
    } = useForm<ICreateSprintForm>({
      mode: "onChange",
    });

    const {
      register : toDoListRegister,
      getValues : toDoListGetValues,
      formState: { isValid : toDoListIsValid, errors: toDoListErrors },
      handleSubmit: toDoListHandleSubmit,
    } = useForm<ICreateToDoListForm>({
      mode: "onChange",
    });


    const [createSprintMutation, { data: createSprintResult, loading:createSprintLoading }] = useMutation<
    createSprint,
    createSprintVariables
  >(CREATE_SPRINT_MUTATION, {
    onCompleted: (data) => {
      const { createSprint: { ok, sprintId } } = data;
      if(ok && sprintId){
        alert("스프린트 생성 성공");
        window.location.reload();
      }
    },
  });

    const [createToDoListMutation, { data: createToDoListResult, loading:createToDoListLoading }] = useMutation<
      createToDoList,
      createToDoListVariables
    >(CREATE_TODOLIST_MUTATION, {
      onCompleted: (data) => {
        const { createToDoList: { ok, toDoListId } } = data;
        if(ok && toDoListId){
          alert("할일 생성 성공");
          window.location.reload();
        }
      },
    });


    const {data:myProject,loading:myProjectLoading} = useQuery<getProject,getProjectVariables>(
      GET_PROJECT_QUERY,
      {
        variables:{
          input:{
            id: parseInt(params.projectId ?? "0")
          }
        },
        //pollInterval: 500
      }
    );
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
      setIsOpen(true);
    }

    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      //subtitle.style.color = '#f00';
    }

    function closeModal() {
      setIsOpen(false);
    }

    const customStyles = {
      content: {
        top: '45%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width:"500px",
        height:"500px"
      },
    };

    const onSubmitSprint = () => {
      const { purpose, startDate, endDate, period } = sprintGetValues();
      
      createSprintMutation({
        variables: {
          input: {
            projectId: parseInt(params.projectId ?? "0"),
            purpose:purpose,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            period: parseInt(period.toString().trim()),
          },
        },
      });
    }

    const onSubmitToDoList = () => {
      const { title, description, status } = toDoListGetValues();

        createToDoListMutation({
          variables: {
            input: {
              sprintId: parseInt(selectSprint.toString().trim()),
              title : title,
              description : description,
              status: status === "TODO" ? ToDoListStatus.TODO : status === "INPROGRESS" ? ToDoListStatus.INPROGRESS : ToDoListStatus.DONE
            },
          },
        });
    }

    
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
                  <p className="p-4 text-xl font-bold text-black">
                      프로젝트 종류</p>
                    <div className="px-8 text-md h-16 flex justify-start items-center bg-white text-black rounded-lg">{myProject?.getProject.project?.code}</div>
                  </div>
                  <div>
                  <p className="p-4 text-xl font-bold text-black">
                      프로젝트명</p>
                    <div className="px-8 text-md h-16 flex justify-start items-center bg-white text-black rounded-lg">{myProject?.getProject.project?.name}</div>
                  </div>
                  <div>
                  <p className="p-4 text-xl font-bold text-black">
                      프로젝트 리더</p>
                    <div className="text-lg flex justify-start items-center w-full">
                      {
                        myProject?.getProject.project?.members.map((member,index) =>{
                          return  (
                            member.role === ProjectRole.Leader ?
                            <div key={member.id} className="max-w-sm w-full lg:max-w-full lg:flex">
                              <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{"backgroundImage":`url(${member.user.profileUrl})`}} title="Woman holding a mug">
                              </div>
                              <div className="lg:w-72 md:w-72 shadow-lg bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                <div className="mb-8">
                                  <p className="text-sm text-gray-600 flex items-center">
                                    Hi Agile!
                                  </p>
                                  <div className="text-gray-900 font-bold text-xl mb-2">{member.user.name}</div>
                                  <p className="text-gray-700 text-base">프로젝트 리더</p>
                                </div>
                                <div className="flex items-center">
                                  <img className="w-10 h-10 rounded-full mr-4" src={hiAgileLogo} alt="Avatar of Jonathan Reinink"></img>
                                  <div className="text-sm">
                                    <p className="text-gray-900 leading-none">{member.user.email}</p>
                                    <p className="text-gray-600">{member.user.verified  ? "인증완료" : "미인증"}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            :
                            null
                          )
                        })
                      }
                    </div>
                  </div>
                  <div>
                  <p className="p-4 text-xl font-bold text-black">
                      프로젝트 구성원</p>
                    <div className="text-lg flex flex-col justify-start items-center w-full">
                      {
                        myProject?.getProject.project?.members.map((member,index) =>{
                          return  (
                            member.role === ProjectRole.member ?
                            <div key={member.id} className="max-w-sm w-full lg:max-w-full lg:flex mb-4">
                              <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{"backgroundImage":`url(${member.user.profileUrl})`}} title="Woman holding a mug">
                              </div>
                              <div className="lg:w-72 md:w-72 shadow-lg bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                <div className="mb-8">
                                  <p className="text-sm text-gray-600 flex items-center">
                                    Hi Agile!
                                  </p>
                                  <div className="text-gray-900 font-bold text-xl mb-2">{member.user.name}</div>
                                  <p className="text-gray-700 text-base">프로젝트 리더</p>
                                </div>
                                <div className="flex items-center">
                                  <img className="w-10 h-10 rounded-full mr-4" src={hiAgileLogo} alt="Avatar of Jonathan Reinink"></img>
                                  <div className="text-sm">
                                    <p className="text-gray-900 leading-none">{member.user.email}</p>
                                    <p className="text-gray-600">{member.user.verified  ? "인증완료" : "미인증"}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            :null
                          )
                        })
                      }
                    </div>
                  </div>
                  <div className="mb-10">
                    <p className="p-4 text-xl font-bold text-black">
                      프로젝트 생성일자</p>
                    <div className="px-8 text-md h-16 flex justify-start items-center bg-white text-black rounded-lg">{myProject?.getProject.project?.createAt.substr(0,10)}</div>
                  </div>
                </div>
                <div className="w-5/12">
                  <div className="relative flex justify-between items-center">
                    <p className="p-4 text-xl font-bold text-black">
                      스프린트
                    </p>
                    <div className="absolute right-0">
                      <select className="px-2 py-1 border border-gray-500 rounded mx-2 outline-none" onChange={(e)=>{
                        setSprintSelectBox(parseInt(e.target.value));
                        
                      }} defaultValue="1">
                          <option value="1">진행 중</option>
                          <option value="2">전체</option>
                        </select>
                      <button onClick={()=>{
                        openModal();
                        setAddType(1)
                      }}  className="px-2 py-1 bg-purple-500 rounded text-white hover:bg-purple-600 transition duration-300 ease-in-out" type="button">추가하기</button>
                    </div>
                  </div>
                  <div className="shadow-lg bg-white px-8 my-2 py-4">
                  <div className="overflow-scroll h-60">
                      {
                        myProject?.getProject.project?.sprints.map((sprint,index) =>{
                          const now = new Date();
                          const startDate = new Date(sprint.startDate);
                          const endDate = new Date(sprint.endDate);
                          const todolist = [...sprint.toDoList];
                          const progress = todolist.filter((toDo) => toDo.status === ToDoListStatus.DONE);
                          const progressPercent = todolist.length  !== 0 ? Math.floor((progress.length / todolist.length) * 100) : 0;
                          return(
                            sprintSelectBox === 1 
                            ?
                            (
                              (startDate < now && endDate > now) 
                              ?
                              <div key={sprint.id} className="hover:bg-gray-100 transition duration-300 ease-in-out text-black flex flex-col my-2 p-4 rounded-lg shadow-md">
                                <div className="flex justify-between items-center">
                                  <div className="flex flex-col">
                                    <div className="text-xl ">{sprint.purpose}</div>
                                    <div className="text-xl ">{sprint.startDate.substr(0,10)} ~ {sprint.endDate.substr(0,10)}</div>
                                  </div>
                                  <div className="flex flex-col">
                                    <div className="text-xl ">진행률 : {progressPercent} %</div>
                                    <div className="text-xl ">주기 : {sprint.period}주일</div>
                                  </div>
                                </div>
                              </div>
                              :
                              null
                            )
                            :
                              <div key={sprint.id} className="hover:bg-gray-100 transition duration-300 ease-in-out text-white flex flex-col my-2 p-4 rounded-lg shadow-md">
                                <div className="flex justify-between items-center">
                                  <div className="flex flex-col">
                                    <div className="text-xl ">{sprint.purpose}</div>
                                    <div className="text-xl ">{sprint.startDate.substr(0,10)} ~ {sprint.endDate.substr(0,10)}</div>
                                  </div>
                                  <div className="flex flex-col">
                                    <div className="text-xl ">진행률 : {progressPercent} %</div>
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
                      <p className="px-4 py-2 text-xl font-bold text-black">
                          할 일
                      </p>
                      <div className="absolute right-0">
                        {/* <select className="px-2 py-1 border border-gray-500 rounded mx-2 outline-none" onChange={(e)=>{
                        setToDoListSelectBox(parseInt(e.target.value));
                      }}>
                          <option value="1" selected>진행 중</option>
                          <option value="2">전체</option>
                        </select> */}
                        <button onClick={()=>{
                          openModal();
                          setAddType(2)
                        }} className="px-2 py-1 bg-purple-500 rounded text-white hover:bg-purple-600 transition duration-300 ease-in-out" type="button">추가하기</button>
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
                                  <div key={toDo.id} className="hover:bg-gray-100 transition duration-300 ease-in-out text-black flex flex-col my-2 p-4 rounded-lg shadow-md">
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
              <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
              >
                {
                  addType === 1
                  ?
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <p className="text-xl">스프린트 추가</p>
                      <button onClick={closeModal} className="text-2xl">X</button>
                    </div>
                    <form className="flex flex-col" onSubmit={sprintHandleSubmit(onSubmitSprint)}>
                        <label className="text-lg my-2">목적</label>
                        <input {...sprintRegister("purpose")} required className="mb-2 px-4 py-1 bg-white shadow-lg border-2 border-gray-100 rounded-lg h-10 text-md outline-none"
                         type="text"/>
                        <label className="text-lg my-2">시작일</label>
                        <input {...sprintRegister("startDate")} required className="mb-2 px-4 py-1 bg-white shadow-lg border-2 border-gray-100 rounded-lg h-10 text-md outline-none"
                         type="date" />
                        <label className="text-lg my-2">종료일</label>
                        <input {...sprintRegister("endDate")} required className="mb-2 px-4 py-1 bg-white shadow-lg border-2 border-gray-100 rounded-lg h-10 text-md outline-none"
                         type="date"
                        />
                        <label className="text-lg my-2">주기</label>
                        <input {...sprintRegister("period")} required className="mb-4 px-4 py-1 bg-white shadow-lg border-2 border-gray-100 rounded-lg h-10 text-md outline-none"
                         type="number"
                        />
                        <button className="px-2 py-1 bg-purple-500 rounded text-white hover:bg-purple-600 transition duration-300 ease-in-out" type={"submit"}>추가하기</button>
                    </form>
                  </div>
                  :
                  
                  (
                    selectSprint == -1
                  ?
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <p className="text-xl">스프린트 선택</p>
                      <button onClick={closeModal} className="text-2xl">X</button>
                    </div>
                    {
                      myProject?.getProject.project?.sprints.map((sprint,index) =>{
                        const now = new Date();
                        const startDate = new Date(sprint.startDate);
                        const endDate = new Date(sprint.endDate);
                        const todolist = [...sprint.toDoList];
                        const progress = todolist.filter((toDo) => toDo.status === ToDoListStatus.DONE);
                        const progressPercent = todolist.length  !== 0 ? Math.floor((progress.length / todolist.length) * 100) : 0;
                        return(
                          
                            (startDate < now && endDate > now) 
                            ?
                            <div key={sprint.id} className="hover:bg-gray-100 transition duration-300 ease-in-out text-black flex flex-col my-2 p-4 rounded-lg shadow-md">
                              <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                  <div className="text-xl ">{sprint.purpose}</div>
                                  <div className="text-xl ">{sprint.startDate.substr(0,10)} ~ {sprint.endDate.substr(0,10)}</div>
                                </div>
                                <div className="flex flex-col">
                                  <div className="text-xl ">진행률 : {progressPercent} %</div>
                                  <div className="text-xl ">주기 : {sprint.period}주일</div>
                                </div>
                                <div>
                                  <button onClick={() =>{setSelectSprint(sprint.id)}}
                                  className="px-2 py-1 bg-purple-500 rounded text-white hover:bg-purple-600 transition duration-300 ease-in-out">선택</button>
                                </div>
                              </div>
                            </div>
                            :
                            null 
                        )})
                    }
                  </div> 
                  :
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <p className="text-xl">할 일 추가</p>
                      <button onClick={()=>{
                        setSelectSprint(-1);
                        closeModal();
                      }} className="text-2xl">X</button>
                    </div>
                    <form className="flex flex-col" onSubmit={toDoListHandleSubmit(onSubmitToDoList)}>
                        <label className="text-lg">제목</label>
                        <input {...toDoListRegister("title")} required className="mb-2 px-4 py-1 bg-white shadow-lg border-2 border-gray-100 rounded-lg h-10 text-md outline-none"
                         type="text"/>
                        <label className="text-lg">설명</label>
                        <input {...toDoListRegister("description")} required className="mb-2 px-4 py-1 bg-white shadow-lg border-2 border-gray-100 rounded-lg h-10 text-md outline-none"
                         type="text" />
                        <label className="text-lg">상태</label>
                        <select {...toDoListRegister("status")} required className="mb-4 px-4 py-1 bg-white shadow-lg border-2 border-gray-100 rounded-lg h-10 text-md outline-none"
                          defaultValue="TODO">
                          <option value="TODO">TODO</option>
                          <option value="DOING">INPROGRESS</option>
                          <option value="DONE">DONE</option>
                        </select>
                        <button className="px-2 py-1 bg-purple-500 rounded text-white hover:bg-purple-600 transition duration-300 ease-in-out" type={"submit"}>추가하기</button>
                    </form>
                  </div>)
                }
              </Modal>
      </div>

    );
}


export default ProjectDetail;