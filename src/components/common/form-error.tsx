import React from 'react';

interface IFormErrorProps {
  errorMessage?: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => {
  return (
    <span role={'alert'} className="mx-4 text-xs text-mainRed">
      {errorMessage}
    </span>
  );
};
