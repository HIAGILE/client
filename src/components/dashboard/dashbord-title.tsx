type Props = {
  title: string;
};

const DashboardTitle = ({ title }: Props) => {
  return (
    <h2 className="mb-4 ml-2 font-bold text-2xl text-darkGray">{title}</h2>
  );
};

export default DashboardTitle;
