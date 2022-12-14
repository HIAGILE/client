import { Link, useNavigate } from 'react-router-dom';
import computer_il from 'images/icon/computer_il.svg';

type Props = {
  userName: string | undefined;
};
const NewProject = ({ userName }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white border border-darkBlue rounded-md h-60 p-8 flex justify-between relative shadow-md">
        <div className=" w-full">
          <h3 className="text-3xl text-darkBule">
            Hello, {userName?.toUpperCase()}!
          </h3>
          <p className="text-sm text-darkGray py-4 leading-tight">
            애자일 방법론으로 최적화된 프로젝트 관리를 시작해보세요.
            <br />
            템플릿으로 스크럼, 페어 프로그래밍, 익스트림 프로그래밍, 칸반보드를
            적용하세요.
            <br />
            동료를 초대해 함께 협업할 수도 있습니다.
          </p>
          <button
            className="py-4 px-10 bg-white text-darkBlue font-semibold leading-none border border-darkBlue rounded-xl transition duration-300 ease-in-out hover:bg-darkBlue hover:text-white shadow-xl"
            onClick={() => {
              navigate('/create-project');
            }}
          >
            프로젝트 생성
          </button>
        </div>
        <img
          src={computer_il}
          className="w-[300px] absolute right-2 bottom-4 hidden md:block drop-shadow-xl"
        />
      </div>
    </>
  );
};

export default NewProject;
