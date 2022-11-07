import logo from "../../images/logo.svg";

type LoginLayoutProps = {
  children: any;
  title: string;
};

const LoginLayout = ({ children, title }: LoginLayoutProps) => {
  return (
    <div className="flex items-center flex-col ">
      <div className="w-full max-w-screen-sm px-4 pt-4">
        <div className="flex items-center  mb-16 sm:mb-40">
          <img src={logo} className="w-6" alt="Logo" />
          <h2 className="font-medium text-lg ml-2 text-darkBlue">Hi, Agile!</h2>
        </div>
        <h3 className="ml-4 text-3xl font-bold text-darkBlue">{title}</h3>
        {children}
      </div>
    </div>
  );
};
export default LoginLayout;
