import { gql, useMutation, useQuery } from '@apollo/client';
import React, { ChangeEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import {
  getProject,
  getProjectVariables,
  getProject_getProject_project_sprints_toDoList,
} from '__generated__/getProject';
import { ProjectRole } from '__generated__/globalTypes';
import Modal from 'react-modal';
import hiAgileLogo from 'images/logo.svg';
import { useForm } from 'react-hook-form';
import {
  createSprint,
  createSprintVariables,
} from '__generated__/createSprint';
import {
  createToDoList,
  createToDoListVariables,
} from '__generated__/createToDoList';

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
          toDoList {
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

export enum ToDoListStatus {
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

export interface ICreateSprintForm {
  purpose: string;
  startDate: Date;
  endDate: Date;
  period: number;
}

export interface ICreateToDoListForm {
  title: string;
  description: string;
  status: string;
}

export function ProjectDetail() {
  const params = useParams<{ projectId: string }>();
  const [sprintSelectBox, setSprintSelectBox] = useState(1);
  const [toDoListSelectBox, setToDoListSelectBox] = useState(1);
  const [addType, setAddType] = useState(0);
  const [selectSprint, setSelectSprint] = useState(-1);
  const [checkMembers, setCheckMembers] = useState<number[]>([]);
  const [checkMembersPass, setCheckMembersPass] = useState<boolean>(false);
  const {
    register: sprintRegister,
    getValues: sprintGetValues,
    formState: { isValid: sprintIsValid, errors: sprintErrors },
    handleSubmit: sprintHandleSubmit,
  } = useForm<ICreateSprintForm>({
    mode: 'onChange',
  });

  const {
    register: toDoListRegister,
    getValues: toDoListGetValues,
    formState: { isValid: toDoListIsValid, errors: toDoListErrors },
    handleSubmit: toDoListHandleSubmit,
  } = useForm<ICreateToDoListForm>({
    mode: 'onChange',
  });

  const [
    createSprintMutation,
    { data: createSprintResult, loading: createSprintLoading },
  ] = useMutation<createSprint, createSprintVariables>(CREATE_SPRINT_MUTATION, {
    onCompleted: (data) => {
      const {
        createSprint: { ok, sprintId },
      } = data;
      if (ok && sprintId) {
        alert('스프린트 생성 성공');
        window.location.reload();
      }
    },
  });

  const [
    createToDoListMutation,
    { data: createToDoListResult, loading: createToDoListLoading },
  ] = useMutation<createToDoList, createToDoListVariables>(
    CREATE_TODOLIST_MUTATION,
    {
      onCompleted: (data) => {
        const {
          createToDoList: { ok, toDoListId },
        } = data;
        if (ok && toDoListId) {
          alert('할일 생성 성공');
          window.location.reload();
        }
      },
    },
  );

  const { data: myProject, loading: myProjectLoading } = useQuery<
    getProject,
    getProjectVariables
  >(GET_PROJECT_QUERY, {
    variables: {
      input: {
        id: parseInt(params.projectId ?? '0'),
      },
    },
    //pollInterval: 500
  });
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
      width: '500px',
      height: '500px',
    },
  };

  const onSubmitSprint = () => {
    const { purpose, startDate, endDate, period } = sprintGetValues();

    createSprintMutation({
      variables: {
        input: {
          projectId: parseInt(params.projectId ?? '0'),
          purpose: purpose,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          period: parseInt(period.toString().trim()),
        },
      },
    });
  };

  const onSubmitToDoList = () => {
    const { title, description, status } = toDoListGetValues();

    createToDoListMutation({
      variables: {
        input: {
          sprintId: parseInt(selectSprint.toString().trim()),
          title: title,
          description: description,
          status:
            status === 'TODO'
              ? ToDoListStatus.TODO
              : status === 'INPROGRESS'
              ? ToDoListStatus.INPROGRESS
              : ToDoListStatus.DONE,
          memberId: checkMembers.join(','),
        },
      },
    });
  };

  return (
    <div className="h-screen px-10 pt-28 rounded-3xl bg-white">
      <Helmet>
        <title>Project Dashboard | Hi Agile</title>
      </Helmet>
      <p className="text-md py-4">{myProject?.getProject.project?.name}</p>
      {myProjectLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-wrap">
          <div className="w-5/12">
            <div className="relative flex justify-between items-center">
              <p className="px-4 py-2 text-sm text-black">스프린트</p>
              <div className="absolute right-0">
                <select
                  style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                  className="px-2 text-xs py-1 rounded mx-2 outline-none"
                  onChange={(e) => {
                    setSprintSelectBox(parseInt(e.target.value));
                  }}
                  defaultValue="1"
                >
                  <option value="1">진행 중</option>
                  <option value="2">전체</option>
                </select>
                <button
                  onClick={() => {
                    openModal();
                    setAddType(1);
                  }}
                  style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                  className="px-2 py-1 text-xs text-zinc-600 border-2 rounded text-white hover:bg-zinc-100 transition duration-300 ease-in-out"
                  type="button"
                >
                  추가하기
                </button>
              </div>
            </div>
            <div
              className="shadow-md bg-white px-8 my-2 py-4"
              style={{ border: '1px solid rgba(220,220,220,0.8)' }}
            >
              <div className="overflow-y-scroll h-60">
                {myProject?.getProject.project?.sprints.map((sprint, index) => {
                  const now = new Date();
                  const startDate = new Date(sprint.startDate);
                  const endDate = new Date(sprint.endDate);
                  const todolist = [...sprint.toDoList];
                  const progress = todolist.filter(
                    (toDo) => toDo.status === ToDoListStatus.DONE,
                  );
                  const progressPercent =
                    todolist.length !== 0
                      ? Math.floor((progress.length / todolist.length) * 100)
                      : 0;
                  return sprintSelectBox === 1 ? (
                    startDate < now && endDate > now ? (
                      <div
                        key={sprint.id}
                        style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                        className="hover:bg-zinc-50 transition duration-200 ease-in-out text-black flex flex-col my-2 p-4 rounded-md shadow-md"
                      >
                        <div className="flex flex-col justify-center items-center px-4 text-xs">
                          <div
                            className="flex justify-between items-center w-full py-2"
                            style={{
                              borderBottom: '1px solid rgba(220,220,220,0.8)',
                            }}
                          >
                            <div>스프린트 목적</div>
                            <div>{sprint.purpose}</div>
                          </div>
                          <div
                            className="flex justify-between items-center w-full py-2"
                            style={{
                              borderBottom: '1px solid rgba(220,220,220,0.8)',
                            }}
                          >
                            <div>스프린트 기간</div>
                            <div>
                              {sprint.startDate.substr(0, 10)} ~{' '}
                              {sprint.endDate.substr(0, 10)}
                            </div>
                          </div>
                          <div
                            className="flex justify-between items-center w-full py-2"
                            style={{
                              borderBottom: '1px solid rgba(220,220,220,0.8)',
                            }}
                          >
                            <div>스프린트 진행율</div>
                            <div>{progressPercent} %</div>
                          </div>
                          <div className="flex justify-between items-center w-full py-2">
                            <div>스프린트 주기</div>
                            <div className="text-sm ">{sprint.period}주일</div>
                          </div>
                        </div>
                      </div>
                    ) : null
                  ) : (
                    <div
                      key={sprint.id}
                      style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                      className="hover:bg-zinc-50 transition duration-200 ease-in-out text-black flex flex-col my-2 p-4 rounded-md shadow-md"
                    >
                      <div className="flex flex-col justify-center items-center px-4 text-xs">
                        <div
                          className="flex justify-between items-center w-full py-2"
                          style={{
                            borderBottom: '1px solid rgba(220,220,220,0.8)',
                          }}
                        >
                          <div>스프린트 목적</div>
                          <div>{sprint.purpose}</div>
                        </div>
                        <div
                          className="flex justify-between items-center w-full py-2"
                          style={{
                            borderBottom: '1px solid rgba(220,220,220,0.8)',
                          }}
                        >
                          <div>스프린트 기간</div>
                          <div>
                            {sprint.startDate.substr(0, 10)} ~{' '}
                            {sprint.endDate.substr(0, 10)}
                          </div>
                        </div>
                        <div
                          className="flex justify-between items-center w-full py-2"
                          style={{
                            borderBottom: '1px solid rgba(220,220,220,0.8)',
                          }}
                        >
                          <div>스프린트 진행율</div>
                          <div>{progressPercent} %</div>
                        </div>
                        <div className="flex justify-between items-center w-full py-2">
                          <div>스프린트 주기</div>
                          <div className="text-sm ">{sprint.period}주일</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative flex justify-between items-center">
              <p className="px-4 py-2 text-sm text-black">할 일</p>
              <div className="absolute right-0">
                {/* <select className="px-2 py-1 border border-gray-500 rounded mx-2 outline-none" onChange={(e)=>{
                        setToDoListSelectBox(parseInt(e.target.value));
                      }}>
                          <option value="1" selected>진행 중</option>
                          <option value="2">전체</option>
                        </select> */}
                <button
                  onClick={() => {
                    openModal();
                    setAddType(2);
                  }}
                  style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                  className="px-2 py-1 text-xs text-zinc-600 border-2 rounded text-white hover:bg-zinc-100 transition duration-300 ease-in-out"
                  type="button"
                >
                  추가하기
                </button>
              </div>
            </div>
            <div
              className="shadow-md bg-white px-8 my-2 py-4"
              style={{ border: '1px solid rgba(220,220,220,0.8)' }}
            >
              <div className="overflow-y-scroll h-80">
                {myProject?.getProject.project?.sprints.map((sprint, index) => {
                  const toDoList = [...sprint.toDoList];
                  return toDoList.map((toDo, index) => {
                    return (
                      <div
                        key={toDo.id}
                        style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                        className="hover:bg-gray-100 transition duration-300 ease-in-out text-black flex flex-col my-2 p-4 rounded-md shadow-md"
                      >
                        <div className="flex flex-col justify-center items-center px-4 text-xs">
                          <div
                            className="flex justify-between items-center w-full py-2"
                            style={{
                              borderBottom: '1px solid rgba(220,220,220,0.8)',
                            }}
                          >
                            <div>할 일 목적</div>
                            <div>{toDo.title}</div>
                          </div>
                          <div
                            className="flex justify-between items-center w-full py-2"
                            style={{
                              borderBottom: '1px solid rgba(220,220,220,0.8)',
                            }}
                          >
                            <div>할 일 내용</div>
                            <div>{toDo.description}</div>
                          </div>
                          <div
                            className="flex justify-between items-center w-full py-2"
                            style={{
                              borderBottom: '1px solid rgba(220,220,220,0.8)',
                            }}
                          >
                            <div>할 일 상태</div>
                            <div>{toDo.status}</div>
                          </div>
                          <div className="flex justify-between items-center w-full py-2">
                            <div>할 일 생성일</div>
                            <div className="text-sm ">
                              {toDo.createAt.substr(0, 10)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          </div>
          <div className="w-5/12 px-10">
            <div>
              <p className="px-4 py-2 text-sm text-zinc-500">프로젝트 종류</p>
              <div
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                className="px-8 text-xs py-2 flex justify-start items-center bg-white text-black rounded-md"
              >
                {myProject?.getProject.project?.code}
              </div>
            </div>
            <div>
              <p className="px-4 py-2 text-sm text-zinc-500">프로젝트명</p>
              <div
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                className="px-8 text-xs py-2 flex justify-start items-center bg-white text-black rounded-md"
              >
                {myProject?.getProject.project?.name}
              </div>
            </div>
            <div>
              <p className="px-4 py-2 text-sm text-zinc-500">Github</p>
              <div
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                className="px-8 text-xs py-2 flex justify-start items-center bg-white text-black rounded-md"
              >
                {myProject?.getProject.project?.githubURL}
              </div>
            </div>
            <div>
              <p className="px-4 py-2 text-sm text-zinc-500">프로젝트 매니저</p>
              <div
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                className="px-8 text-xs py-2 flex justify-start items-center bg-white text-black rounded-md"
              >
                {myProject?.getProject.project?.owner.name}
              </div>
            </div>
            <div>
              <p className="px-4 py-2 text-sm text-zinc-500">
                프로젝트 매니저 이메일
              </p>
              <div
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                className="px-8 text-xs py-2 flex justify-start items-center bg-white text-black rounded-md"
              >
                {myProject?.getProject.project?.owner.email}
              </div>
            </div>
            <div>
              <p className="px-4 py-2 text-sm text-zinc-500">
                현재 스프린트 개수
              </p>
              <div
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                className="px-8 text-xs py-2 flex justify-start items-center bg-white text-black rounded-md"
              >
                {myProject?.getProject.project?.sprints.length}
              </div>
            </div>
            <div>
              <p className="px-4 py-2 text-sm text-zinc-500">프로젝트 리더</p>
              <div
                className="px-8 py-4 text-lg flex justify-start items-center w-full rounded-md"
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
              >
                {myProject?.getProject.project?.members.map((member, index) => {
                  return member.role === ProjectRole.Leader ? (
                    <div
                      key={member.id}
                      className="flex flex-col items-center justify-center"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={member.user.profileUrl}
                        alt="Avatar of Jonathan Reinink"
                      ></img>
                      <div className="text-gray-900 font-light text-xs">
                        {member.user.name}
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            <div>
              <p className="px-4 py-2 text-sm text-zinc-500">프로젝트 구성원</p>
              <div
                className="px-8 py-4 flex justify-start items-center w-full rounded-md"
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
              >
                {myProject?.getProject.project?.members.map((member, index) => {
                  return member.role === ProjectRole.member ? (
                    <div
                      key={member.id}
                      className="flex flex-col items-center justify-center mr-4"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={member.user.profileUrl}
                        alt="Avatar of Jonathan Reinink"
                      ></img>
                      <div className="text-gray-900 font-light text-xs">
                        {member.user.name}
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            <div className="mb-10">
              <p className="px-4 py-2 text-sm text-zinc-500">
                프로젝트 생성일자
              </p>
              <div
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                className="px-8 text-xs py-2 flex justify-start items-center bg-white text-black rounded-md"
              >
                {myProject?.getProject.project?.createAt.substr(0, 10)}
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false}>
        {addType === 1 ? (
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <p className="text-sm py-1">스프린트 추가</p>
              <button
                onClick={closeModal}
                className="text-md hover:bg-zinc-200 p-1 rounded-full"
              >
                X
              </button>
            </div>
            <form
              className="flex flex-col"
              onSubmit={sprintHandleSubmit(onSubmitSprint)}
            >
              <label className="text-sm my-2">목적</label>
              <input
                {...sprintRegister('purpose')}
                required
                className="mb-2 px-4 py-1 bg-white shadow-sm rounded-sm h-10 text-xs outline-none"
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                type="text"
              />
              <label className="text-sm my-2">시작일</label>
              <input
                {...sprintRegister('startDate')}
                required
                className="mb-2 px-4 py-1 bg-white shadow-sm rounded-sm h-10 text-xs outline-none"
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                type="date"
              />
              <label className="text-sm my-2">종료일</label>
              <input
                {...sprintRegister('endDate')}
                required
                className="mb-2 px-4 py-1 bg-white shadow-sm rounded-sm h-10 text-xs outline-none"
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                type="date"
              />
              <label className="text-sm my-2">주기</label>
              <input
                {...sprintRegister('period')}
                required
                className="mb-4 px-4 py-1 bg-white shadow-sm rounded-sm h-10 text-xs outline-none"
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                type="number"
              />
              <button
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                className="px-2 py-1 text-xs text-zinc-600 border-2 rounded text-white hover:bg-zinc-200 bg-zinc-100 transition duration-300 ease-in-out"
                type={'submit'}
              >
                추가하기
              </button>
            </form>
          </div>
        ) : selectSprint == -1 ? (
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <p className="text-sm py-1">스프린트 선택</p>
              <button
                onClick={() => {
                  setSelectSprint(-1);
                  setCheckMembers([]);
                  setCheckMembersPass(false);
                  closeModal();
                }}
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                className="mr-2 px-2 py-1 text-xs text-zinc-600 border-2 rounded text-white hover:bg-zinc-200 bg-zinc-100 transition duration-300 ease-in-out"
              >
                X
              </button>
            </div>
            {myProject?.getProject.project?.sprints.map((sprint, index) => {
              const now = new Date();
              const startDate = new Date(sprint.startDate);
              const endDate = new Date(sprint.endDate);
              const todolist = [...sprint.toDoList];
              const progress = todolist.filter(
                (toDo) => toDo.status === ToDoListStatus.DONE,
              );
              const progressPercent =
                todolist.length !== 0
                  ? Math.floor((progress.length / todolist.length) * 100)
                  : 0;
              return startDate < now && endDate > now ? (
                <div
                  key={sprint.id}
                  style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                  className="text-black flex flex-col my-2 p-4 rounded-md shadow-md"
                >
                  <div className="flex flex-col justify-center items-center px-4 text-xs">
                    <div
                      className="flex justify-between items-center w-full py-2"
                      style={{
                        borderBottom: '1px solid rgba(220,220,220,0.8)',
                      }}
                    >
                      <div>스프린트 목적</div>
                      <div>{sprint.purpose}</div>
                    </div>
                    <div
                      className="flex justify-between items-center w-full py-2"
                      style={{
                        borderBottom: '1px solid rgba(220,220,220,0.8)',
                      }}
                    >
                      <div>스프린트 기간</div>
                      <div>
                        {sprint.startDate.substr(0, 10)} ~{' '}
                        {sprint.endDate.substr(0, 10)}
                      </div>
                    </div>
                    <div
                      className="flex justify-between items-center w-full py-2"
                      style={{
                        borderBottom: '1px solid rgba(220,220,220,0.8)',
                      }}
                    >
                      <div>스프린트 진행율</div>
                      <div>{progressPercent} %</div>
                    </div>
                    <div className="flex justify-between items-center w-full py-2">
                      <div>스프린트 주기</div>
                      <div className="text-sm ">{sprint.period}주일</div>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setSelectSprint(sprint.id);
                        }}
                        style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                        className="w-full px-2 py-1 text-xs text-zinc-600 border-2 rounded text-white hover:bg-zinc-200 bg-zinc-100 transition duration-300 ease-in-out"
                      >
                        선택
                      </button>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        ) : //  TODO: 여기서는 멤버 선택 구현 필요
        !checkMembersPass ? (
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <p className="text-sm py-1 mb-5">스프린트 선택</p>
              <span className="mx-auto"></span>
              <button
                onClick={() => {
                  setSelectSprint(-1);
                  setCheckMembers([]);
                  setCheckMembersPass(false);
                }}
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                className="mr-2 px-2 py-1 text-xs text-zinc-600 border-2 rounded text-white hover:bg-zinc-200 bg-zinc-100 transition duration-300 ease-in-out"
              >
                이전
              </button>
              <button
                onClick={() => {
                  setCheckMembersPass(true);
                }}
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                className="mr-2 px-2 py-1 text-xs text-zinc-600 border-2 rounded text-white hover:bg-zinc-200 bg-zinc-100 transition duration-300 ease-in-out"
              >
                다음
              </button>
              <button
                onClick={() => {
                  setSelectSprint(-1);
                  setCheckMembers([]);
                  setCheckMembersPass(false);
                  closeModal();
                }}
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                className="mr-2 px-2 py-1 text-xs text-zinc-600 border-2 rounded text-white hover:bg-zinc-200 bg-zinc-100 transition duration-300 ease-in-out"
              >
                X
              </button>
            </div>
            {myProject?.getProject.project?.members.map((member) => {
              return (
                <div
                  key={member.id}
                  className="flex justify-between items-center text-sm py-1 px-2"
                >
                  <div className="flex items-center">
                    <img
                      src={member.user.profileUrl}
                      className="w-8 h-8 rounded-full mr-2"
                    ></img>
                    <div>{member.user.name}</div>
                  </div>
                  <input
                    type={'checkbox'}
                    onClick={() => {
                      if (checkMembers.includes(member.id)) {
                        setCheckMembers(
                          checkMembers.filter((id) => id !== member.id),
                        );
                      } else {
                        setCheckMembers([...checkMembers, member.id]);
                      }
                    }}
                  ></input>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <p className="text-sm py-1">할 일 추가</p>
              <span className="mx-auto"></span>
              <button
                onClick={() => {
                  setCheckMembers([]);
                  setCheckMembersPass(false);
                }}
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                className="mr-2 px-2 py-1 text-xs text-zinc-600 border-2 rounded text-white hover:bg-zinc-200 bg-zinc-100 transition duration-300 ease-in-out"
              >
                이전
              </button>
              <button
                onClick={() => {
                  setSelectSprint(-1);
                  setCheckMembers([]);
                  setCheckMembersPass(false);
                  closeModal();
                }}
                className="text-md hover:bg-zinc-200 p-1 rounded-full"
              >
                X
              </button>
            </div>
            <form
              className="flex flex-col"
              onSubmit={toDoListHandleSubmit(onSubmitToDoList)}
            >
              <label className="text-sm my-2">제목</label>
              <input
                {...toDoListRegister('title')}
                required
                className="mb-2 px-4 py-1 bg-white shadow-sm rounded-sm h-10 text-xs outline-none"
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                type="text"
              />
              <label className="text-sm my-2">설명</label>
              <input
                {...toDoListRegister('description')}
                required
                className="mb-2 px-4 py-1 bg-white shadow-sm rounded-sm h-10 text-xs outline-none"
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                type="text"
              />
              <label className="text-sm my-2">상태</label>
              <select
                {...toDoListRegister('status')}
                required
                className="mb-2 px-4 py-1 bg-white shadow-sm rounded-sm h-10 text-xs outline-none"
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                defaultValue="TODO"
              >
                <option value="TODO">TODO</option>
                <option value="DOING">INPROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
              <button
                style={{ border: '1px solid rgba(220,220,220,0.8)' }}
                className="px-2 py-1 text-xs text-zinc-600 border-2 rounded text-white hover:bg-zinc-200 bg-zinc-100 transition duration-300 ease-in-out"
                type={'submit'}
              >
                추가하기
              </button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ProjectDetail;
