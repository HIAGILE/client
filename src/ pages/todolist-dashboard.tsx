import { gql, useMutation } from "@apollo/client";
import { useMe } from "lib/useMe";
import { useProject } from "lib/useProject";
import React, { ChangeEvent, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { updateMonitor, updateMonitorVariables } from "__generated__/updateMonitor";

export const UPDATE_TODOLIST_MUTATION = gql`
  mutation updateToDoList($input: UpdateToDoListInput!) {
    updateToDoList(input: $input) {
      ok
      error
    }
  }
`;

export const UPDATE_MONITOR_MUTATION = gql`
  mutation updateMonitor($input: UpdateMonitorInput!) {
    updateMonitor(input: $input) {
      ok
      error
    }
  }
`;

export interface IMonitor{
    id: string;
    rate: string;
    memberId: string;
}

export const ToDoListDashboard = () =>{
    const params = useParams<{projectId: string}>();
    const { data: myProjects, loading: myProjectsLoading } = useProject(0);
    const { data: myProfile, loading: myProfileLoading } = useMe();
    const [
        updateMonitorMutation,
        { data: updateMonitorResult, loading: updateMonitorLoading },
      ] = useMutation<updateMonitor, updateMonitorVariables>(UPDATE_MONITOR_MUTATION, {
        onCompleted: (data) => {
          const {
            updateMonitor: { ok,error },
          } = data;
          if (ok ) {
            alert('진행률 변경 완료');
            window.location.reload();
          }
        },
    });
    const {
        register,
        getValues,
        formState: { isValid, errors },
        handleSubmit,
      } = useForm<IMonitor>({
        mode: 'onChange',
      });

    const onSubmit = () => {
        const { rate,id,memberId } = getValues();
        console.log(rate,id,memberId)
        updateMonitorMutation({
            variables: {
                input: {
                    id:parseInt(id),
                    rate:parseInt(rate),
                    memberId: parseInt(memberId)
                },
            },
        })
    }    
    return(
        <div className="h-full px-10 pt-28 rounded-3xl bg-white">
            <Helmet>
                <title>ToDoList Dashboard | Hi Agile</title>
            </Helmet>
            {
                myProjects?.getProjects.projects?.map((project,index) =>{
                    return (
                        <div key={project.id}>
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

                                                                const result = toDo.monitors.find((monitor) => monitor.memberId === member.id)?.rate;
                                                                return (
                                                                    <div key={member.id} className="flex flex-col items-center justify-center mx-2">
                                                                        <img className="w-10 h-10 rounded-full" src={member.user.profileUrl} alt="Avatar of Jonathan Reinink"></img>
                                                                        <div className="text-gray-900 font-light text-xs">{member.user.name}<span>{` : ${result ?? 0}%`}</span></div>
                                                                    </div>
                                                                )
                                                            })
                                                        }</div>
                                                    </div>
                                                    <div className="flex justify-between items-center w-full py-2" style={{borderBottom:"1px solid rgba(220,220,220,0.8)"}}>
                                                        <div>나의 진행 상태</div>
                                                        <div>
                                                            {
                                                                toDo.members?.find((member) => member.user.id === myProfile?.me.id)
                                                                ?
                                                                (    
                                                                    <form
                                                                        onSubmit={handleSubmit(onSubmit)}
                                                                        >
                                                                            <input
                                                                            {...register('memberId')}
                                                                            type="hidden"
                                                                            required
                                                                            defaultValue={toDo.members?.find((member) => member.user.id === myProfile?.me.id)?.id}
                                                                            className="mb-6 px-4 py-2 bg-white shadow-lg border-2 border-gray-100 rounded-lg w-96 h-12 text-md outline-none"
                                                                            autoComplete="true"
                                                                            >
                                                                            </input>
                                                                            <input
                                                                            {...register('id')}
                                                                            type="hidden"
                                                                            required
                                                                            defaultValue={toDo.id}
                                                                            className="mb-6 px-4 py-2 bg-white shadow-lg border-2 border-gray-100 rounded-lg w-96 h-12 text-md outline-none"
                                                                            autoComplete="true"
                                                                            >
                                                                            </input>
                                                                            <input
                                                                                {...register('rate', {
                                                                                required: '진행률을 입력해주세요.',
                                                                                pattern: /^[0-9]{1}$|^[1-9]{1}[0-9]{1}$|^100$/,
                                                                                })}
                                                                                type="text"
                                                                                required
                                                                                defaultValue={toDo.monitors.find((monitor) => monitor.userId === myProfile?.me.id)?.rate}
                                                                                className="w-20 px-2 py-1 bg-white shadow-md border-2 border-gray-100 rounded-lg text-md outline-none"
                                                                                autoComplete="true"
                                                                                placeholder="0~100"
                                                                            />
                                                                            <button
                                                                                type={'submit'}
                                                                                className="rounded-lg border-2 border-mainBlue px-2 py-1 text-mainBlue mx-1 hover:bg-mainBlue hover:text-white transition duration-300 ease-in-out"
                                                                            >
                                                                                변경
                                                                            </button>
                                                                    </form>
                                                                )
                                                                :
                                                                (
                                                                    <div className="text-xs">참여하지 않은 할 일입니다.</div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center w-full py-2">
                                                    <div>전체 진행률</div>
                                                    <div className="text-sm ">{
                                                        toDo.monitors.reduce((acc,cur) => {
                                                            return acc + cur.rate
                                                        }
                                                        ,0) / toDo.monitors.length
                                                    }%</div>
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
                        </div>
                    )
                })
            }
        </div>
    );
}