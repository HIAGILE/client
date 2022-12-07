type Props = {
  title: string;
};

const DashboardTitle = ({ title }: Props) => {
  return (
    <h2 className="mb-2 ml-2 text-2xl text-darkBlue">{title}</h2>
  );
};

export default DashboardTitle;
