import { gql, useMutation } from "@apollo/client";
import { ICreateProjecForm } from "interface/project-type";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createProject, createProjectVariables } from "__generated__/createProject";
import { FormError } from "../components/common/form-error";

const PROJECT_MUTATION = gql`
  mutation createProject($input:CreateProjectInput!){
    createProject(input:$input){
      ok
      error
      projectId
    }
  }
`

export enum ProjectCode {
  SCRUM = "SCRUM",
  EX = "EX",
  PAIR = "PAIR",
  KANBAN = "KANBAN",
}

export function CreateProject() {
  const {
    register,
    getValues,
    formState: { isValid, errors },
    handleSubmit,
    watch,
    setValue
  } = useForm<ICreateProjecForm>({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onCompleted = (data: createProject) => {
    const {
      createProject: { ok, projectId, error },
    } = data;
    if (!ok) {
      alert(error);
    }
    if (ok && projectId) {
      navigate("/add-members/" + projectId);
      toast.success("프로젝트 생성 성공", {
        position: "bottom-center",
      });
    }
    if (error) {
      console.log(error);
    }
  };

  const [createProjectMutation, { data: createProjectResult, loading }] = useMutation<
    createProject,
    createProjectVariables
  >(PROJECT_MUTATION, {
    onCompleted,
  });

  const [agileCode, setAgileCode] = useState<string>();

  const selectedAgile = [
    { name: "스크럼", code: "SCRUM", description: "스크럼으로 시작하기", tag: ["#스크럼", "#스프린트", "#생명주기"] },
    { name: "EX", code: "EX", description: "익스트림 프로그래밍으로 시작하기", tag: ["#익스트림 프로그래밍", "#빠르고 날쌘"] },
    { name: "짝 프로그래밍", code: "PAIR", description: "짝 프로그래밍으로 시작하기", tag: ["#짝 프로그래밍"] },
    { name: "칸반보드", code: "KANBAN", description: "칸반보드로 시작하기", tag: ["#칸반보드", "#실용적인"] },
  ];

  function getAgileCode(code: string) {
    setAgileCode(code);
  }
  function goBackStep() {
    setAgileCode("");
    setValue("name", "", { shouldValidate: true });
    setValue("githubURL", "", { shouldValidate: true });
  }
  const [next, setNext] = useState<boolean>(false);
  function goNextStep() {
    setNext(true);
  }
  function backStep() {
    setNext(false);
  }
  const onSubmit = () => {
    if (!loading) {
      const { name, githubURL } = getValues();
      let enums = ProjectCode.SCRUM;
      if (agileCode === "SCRUM") {
        enums = ProjectCode.SCRUM;
      }
      if (agileCode === "EX") {
        enums = ProjectCode.EX;
      }
      if (agileCode === "PAIR") {
        enums = ProjectCode.PAIR;
      }
      if (agileCode === "KANBAN") {
        enums = ProjectCode.KANBAN;
      }
      createProjectMutation({
        variables: {
          input: {
            name,
            githubURL,
            code: enums,
          },
        },
      });
    }
  }
      
  return (
    <div className="h-full px-10 pt-28 rounded-3xl bg-white">
      <Helmet>
          <title>Create Project | Hi Agile</title>
      </Helmet>
      <p className="font-bold text-3xl h-16">Create New Project{agileCode ? `(${agileCode})`: ""}</p>
      <div className="flex flex-wrap">
        {!agileCode &&
          selectedAgile.map((agile) => (
            <div key={agile.code} className="max-w-xs m-3 hover:scale-105 hover:bg-gray-100 transition duration-300 ease-in-ou rounded-md overflow-hidden shadow-lg" onClick={() => {
              getAgileCode(agile.code);
            }}>
              <img className="w-full" src="https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/9f5d38d5-0fb4-4dfb-f6e3-a39397620700/public" alt="Sunset in the mountains"></img>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{agile.name}</div>
                <p className="text-gray-700 text-base">
                  {agile.description}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                {
                  agile.tag.map((tag) => {
                    return (
                      <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
                    )
                  })
                }
              </div>
            </div>
          ))}
      </div>
      {
        agileCode && (
        <form
          className="grid gap-2 mt-8 mb-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          {
            !next && (
            <>
              <p className="p-8 text-xl font-bold text-black">
              Project Name*
              </p>
                <input
                  {...register("name", {
                    required: "프로젝트 명을 입력해주세요",
                    pattern: /[^?a-zA-Z0-9]/,
                    
                  })}
                  type="text"
                  required
                  className="mb-6 px-4 py-2 bg-white shadow-lg border-2 border-gray-100 rounded-lg w-96 h-12 text-md outline-none"
                  autoComplete="true"
                  placeholder="프로젝트명을 입력하세요(필수)"
                />
              
                <p className="p-8 text-xl font-bold text-black">
                Github URL
                </p>
                <input
                  {...register("githubURL", {
                    required: "github url을 입력해주세요",
                    pattern: /[^?a-zA-Z0-9]/,
                  })}
                  type="text"
                  required
                  className="mb-6 px-4 py-2 bg-white shadow-lg border-2 border-gray-100 rounded-lg w-96 h-12 text-md outline-none"
                  autoComplete="true"
                  placeholder="깃허브 URL을 입력하세요(선택)"
                />
                <button type={"button"} className="rounded-lg border-2 border-mainBlue px-4 py-2 w-40 text-mainBlue mx-1 hover:bg-mainBlue hover:text-white transition duration-300 ease-in-out" onClick={goBackStep}>이전</button>
                <button type={"submit"} className="rounded-lg border-2 border-mainBlue px-4 py-2 w-40 text-mainBlue mx-1 hover:bg-mainBlue hover:text-white transition duration-300 ease-in-out">생성</button>
            </>
            )
          }
        </form>
        )
      }
    </div>
  );
}

export default CreateProject;
