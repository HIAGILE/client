import React from "react";
import { Helmet } from "react-helmet-async";

function Main() {
  return (
    <>
      <Helmet>
        <title>Home | Hi Agile</title>
      </Helmet>
      <MainDashbord />
    </>
  );
}

export default Main;

const MainDashbord = () => {
  return <>{!false ? <MakeProject /> : null}</>;
};

const MakeProject = () => {
  return <div className="ml-40 px-10 py-10">프로젝트 생성하기</div>;
};
