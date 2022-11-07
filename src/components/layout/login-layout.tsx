import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

type LoginLayoutProps = {
  children: any;
  title: string;
};

const LoginLayout = ({ children, title }: LoginLayoutProps) => {
  return (
    <div className="flex items-center flex-col ">
      <div className="w-full max-w-screen-sm px-4 pt-4">
        <Link
          to="/"
          className="flex justify-end items-center px-4 mb-16 sm:mb-28"
        >
          <img src={logo} className="w-4" alt="Logo" />
          <h2 className="font-medium text-md ml-2 text-darkBlue">Hi, Agile!</h2>
        </Link>
        <h3 className="ml-4 text-3xl font-bold text-darkBlue">{title}</h3>
        {children}
      </div>
    </div>
  );
};
export default LoginLayout;
