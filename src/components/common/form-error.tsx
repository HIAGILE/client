import React from 'react';

interface IFormErrorProps {
  errorMessage?: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => {
  return (
    <span role={'alert'} className="mr-4 text-end text-xs text-mainRed">
      {errorMessage}
    </span>
  );
};
