import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ICreateAccountForm } from "../../interface/login-join-type";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const JoinBtn: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => {
  const { register, getValues, formState, handleSubmit, watch } =
    useForm<ICreateAccountForm>({
      mode: "onChange",
    });
  const navigate = useNavigate();

  return (
    <button
      role={"button"}
      className={`text-white text-lg focus:outline-none font-medium py-4 transition-colors ${
        canClick
          ? "bg-lime-600 hover:bg-lime-700"
          : "bg-gray-300 pointer-events-none"
      }`}
    >
      {loading ? "Loading..." : actionText}
    </button>
  );
};
