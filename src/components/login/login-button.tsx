import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const LoginBtn: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => {
  return (
    <button
      role={"button"}
      className={`mt-4 login-btn ${
        canClick
          ? "bg-mainBlue text-bgBlue font-semibold hover:bg-mainBlue"
          : "bg-gray-300 text-bgBlue pointer-events-none"
      }`}
    >
      {loading ? "Loading..." : actionText}
    </button>
  );
};
