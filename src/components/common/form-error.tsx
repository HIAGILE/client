import React from "react";

interface IFormErrorProps {
  errorMessage?: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => {
  return (
    <span role={"alert"} className="font-medium text-sm text-red-400">
      {errorMessage}
    </span>
  );
};
