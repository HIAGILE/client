import React from "react";
import DashboardLayout from "components/layout/dashboard-layout";

function CreateProject() {
  const project = false;
  return <DashboardLayout>
    <form className="flex">
      <div className="grid gap-3 mt-8 mb-4 w-20">
        <div className="flex justify-center items-center bg-green-200 text-center">제목</div>
        <div className="flex justify-center items-center bg-green-200 text-center">제목</div>
        <div className="flex justify-center items-center bg-green-200 text-center">제목</div>
        <div className="flex justify-center items-center bg-green-200 text-center">제목</div>
        <div className="flex justify-center items-center bg-green-200 text-center">제목</div>
        <div className="flex justify-center items-center bg-green-200 text-center">제목</div>
      </div>
      <div className="grid gap-3 mt-8 mb-4 w-96">
        <input title="제목" value={"hello"} className="border-2 border-gray-100 shadow-lg w-96 rounded-lg p-2"></input>
        <input title="제목" value={"hello"} className="border-2 border-gray-100 shadow-lg w-96 rounded-lg p-2"></input>
        <input title="제목" value={"hello"} className="border-2 border-gray-100 shadow-lg w-96 rounded-lg p-2"></input>
        <input title="제목" value={"hello"} className="border-2 border-gray-100 shadow-lg w-96 rounded-lg p-2"></input>
        <input title="제목" value={"hello"} className="border-2 border-gray-100 shadow-lg w-96 rounded-lg p-2"></input>
        <input title="제목" value={"hello"} className="border-2 border-gray-100 shadow-lg w-96 rounded-lg p-2"></input>
      </div>
    </form>
    </DashboardLayout>;
}

export default CreateProject;
