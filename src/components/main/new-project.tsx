import { Link, useNavigate } from 'react-router-dom';
import computer_il from 'images/icon/computer_il.svg';

type Props = {
  userName: string | undefined;
};
const NewProject = ({ userName }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-middleBlue rounded-xl h-60 p-8 flex justify-between relative shadow-xl">
        <div className=" w-full">
          <h3 className="text-4xl font-bold text-darkBule">
            Hello! {userName}
          </h3>
          <p className="text-sm text-darkGray py-4 leading-snug">
            애자일 방법론으로 최적화된 프로젝트 관리를 시작해보세요.
            <br />
            스크럼, 페어 프로그래밍, 익스트림 프로그래밍, 칸반보드를 적용하세요.
            <br />
            동료를 초대해 함께 협업할 수도 있습니다.
          </p>
          <button
            className="ml-[260px] py-4 px-8 text-lightBlue font-semibold leading-none bg-mainBlue rounded-xl transition hover:scale-105 shadow-xl"
            onClick={() => {
              navigate('/create-project');
            }}
          >
            프로젝트 생성
          </button>
        </div>
        <img
          src={computer_il}
          className="w-[300px] absolute right-2 bottom-4 hidden md:block"
        />
      </div>
    </>
  );
};

export default NewProject;