import { ICreateProjecForm } from "interface/project-type";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/common/form-error";

export function CreateProject() {
  const {
    register,
    getValues,
    formState: { isValid, errors },
    handleSubmit,
    watch,
  } = useForm<ICreateProjecForm>({
    mode: "onChange",
  });
  function onSubmit() {
    console.log("완료");
  }

  const [agileCode, setAgileCode] = useState<string>();

  const selectedAgile = [
    { name: "SCRUM", code: "SCRUM" },
    { name: "EX PROGRAMING", code: "EX" },
    { name: "PAIR PROGRAMING", code: "PAIR" },
    { name: "KANBAN", code: "KANBAN" },
  ];

  function getAgileCode(code: string) {
    setAgileCode(code);
    console.log(code);
  }
  function goBackStep() {
    setAgileCode("");
  }
  const [next, setNext] = useState<boolean>(false);
  function goNextStep() {
    setNext(true);
  }
  function backStep() {
    setNext(false);
  }
  return (
    <div className="h-full px-10 pt-28 rounded-3xl bg-white">
      <p className="font-bold text-2xl">Create New Project</p>
      <div className="flex flex-wrap">
        {!agileCode &&
          selectedAgile.map((agile) => (
            <p
              key={agile.code}
              className="w-1/2 p-8 bg-lightGray text-darkGray h-60 rounded-3xl shadow-2xl hover:bg-mainBlue hover:text-lightGray "
              onClick={() => {
                getAgileCode(agile.code);
              }}
            >
              {agile.name}
            </p>
          ))}
      </div>
      {agileCode && (
        <form
          className="grid gap-2 mt-8 mb-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          {(!next && (
            <>
              <label>
                Project name*
                <br />
                <input
                  {...register("name", {
                    required: "프로젝트 명을 입력해주세요",
                    pattern: /^[A-Za-z]{1}[A-Za-z0-9]{3,19}$/,
                  })}
                  type="text"
                  required
                  className="login-input transition-colors"
                  autoComplete="true"
                />
              </label>
              <label>
                github url
                <br />
                <input
                  {...register("name", {
                    required: "github url을 입력해주세요",
                    pattern: /^[A-Za-z]{1}[A-Za-z0-9]{3,19}$/,
                  })}
                  type="text"
                  required
                  className="login-input transition-colors"
                  autoComplete="true"
                />
              </label>
              <button onClick={goBackStep}>Back</button>
              <button onClick={goNextStep}>Next</button>
            </>
          )) || (
            <>
              <label>Project Owner</label>
              <button onClick={backStep}>Back</button>
              <button onClick={onSubmit}>confirme</button>
            </>
          )}
        </form>
      )}
    </div>
  );
}

export default CreateProject;
