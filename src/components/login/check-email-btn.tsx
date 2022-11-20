import { useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  validateAccount,
  validateAccountVariables,
} from '__generated__/validateAccount';
import toast from 'react-hot-toast';

export const VALIDATE_ACCOUNT_QUERY = gql`
  query validateAccount($input: ValidateAccountInput!) {
    validateAccount(input: $input) {
      ok
      error
    }
  }
`;

type CheckEmailBtnProps = {
  checkEmail: (confirm: boolean) => void;
  canCheckEmail: boolean;
  completedEmail: boolean;
  email: string;
};

const CheckEmailBtn = ({
  checkEmail,
  canCheckEmail,
  completedEmail,
  email,
}: CheckEmailBtnProps) => {
  const { data, loading, error, refetch } = useQuery<
    validateAccount,
    validateAccountVariables
  >(VALIDATE_ACCOUNT_QUERY, {
    variables: {
      input: {
        email: email,
      },
    },
  });
  function onClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    if (data?.validateAccount.ok === true) {
      toast.success('사용 가능한 이메일입니다', {
        position: 'top-right',
      });
      checkEmail(true);
    }
    if (data?.validateAccount.error) {
      toast.error('이미 등록된 이메일입니다', {
        position: 'top-right',
      });
      checkEmail(false);
    }
  }

  return (
    <>
      <button
        onClick={onClick}
        className={`login-btn w-1/5 text-bgBlue  ${
          canCheckEmail ? 'bg-mainBlue ' : 'bg-gray-300'
        }`}
      >
        {completedEmail ? '확인 완료' : '중복 확인'}
      </button>
    </>
  );
};

export default CheckEmailBtn;
