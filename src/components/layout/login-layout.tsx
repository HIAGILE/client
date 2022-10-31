import { Process } from "../common/process";
import logo from "../../images/logo.png";

type LoginLayoutProps = {
  children: any;
  title: string;
};

const LoginLayout = ({ children, title }: LoginLayoutProps) => {
  return (
    <div className="flex items-center flex-col mt-40 lg:mt-28">
      <Process />
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={logo} className="w-32 mb-8" alt="UberLogo" />
        <h4 className=" w-full font-medium text-center text-3xl mb-8">
          {title}
        </h4>
        {children}
      </div>
    </div>
  );
};
export default LoginLayout;
