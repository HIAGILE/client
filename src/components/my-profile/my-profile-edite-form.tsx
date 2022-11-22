import React from 'react';
import { meQuery_me } from '__generated__/meQuery';
import { useForm } from 'react-hook-form';
import userFilled from '../../images/icon/userFilled.svg';
import { FormError } from 'components/common/form-error';
import axios from 'axios';

interface IForm{
  file:FileList
}

type Props = {
  me: meQuery_me;
  onEdite: () => void;
};

type MyProfile = {
  name: string;
  email: string;
  password: string;
  passwordAgain: string;
  profileUrl: string | FileList;
  verified: boolean;
};
const MyProfileEditeForm = ({ me, onEdite }: Props) => {
  const {
    register,
    getValues,
    formState: { isValid, errors },
    handleSubmit,
    watch,
  } = useForm<MyProfile>({
    mode: 'onChange',
  });
  const watchValue = watch();
  return (
    <form className="flex items-center bg-white px-8 py-8 mb-20 rounded-lg relative">
      {me.profileUrl && (
        <div className="flex flex-col mr-10">
          <img
            src={me.profileUrl}
            alt="user"
            width="300"
            className="object-fill rounded-lg shadow-xl"
          />
          <label
            className="text-white hover:bg-blue-600 transition duration-300 ease-in-out shadow-xl cursor-pointer flex h-10 justify-center items-center bg-blue-500 rounded-lg mt-4"
            htmlFor="input-file"
          >
            업로드
          </label>
          <input
            id="input-file"
            {...register('profileUrl')}
            type="file"
            accept="image/*"
            required
            className="hidden"
          />
        </div>
      )}
      <div className="py-auto flex flex-col gap-2">
        <label className="text-black mr-4">
          Name
          <input
            {...register('name', {
              required: '이름을 입력해주세요',
              pattern: /^[A-Za-z]{1}[A-Za-z0-9]{3,19}$/,
            })}
            name="name"
            type="text"
            required
            autoComplete="true"
            className="transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full h-10 px-4 rounded-lg shadow-xl"
            defaultValue={me.name}
          />
        </label>
        {errors.name?.type === 'pattern' && (
          <FormError errorMessage="영문과 숫자 4자리를 입력해주세요" />
        )}
        {errors.name?.message && (
          <FormError errorMessage={errors.name?.message} />
        )}

        <label className="text-black mr-4">
          Email
          <input
            type="text"
            
            className="transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full h-10 px-4 rounded-lg shadow-xl"
            defaultValue={me.email}
          />
        </label>
        <label className="text-black mr-4">
          Authenfication
          {
            me.verified 
            ? 
            (
              <div className="transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent w-full h-10 px-4 rounded-lg shadow-xl"></div>
            )
            :
            (<EmailAuthenfication />)
          }
        </label>
        <label className="text-black mr-4">
          Password
          <input
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              pattern:
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/,
            })}
            name="password"
            type="password"
            required
            placeholder="Password *"
            className="transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full h-10 px-4 rounded-lg shadow-xl"
            autoComplete="true"
          />
        </label>
        {errors.password?.type === 'pattern' && (
          <FormError errorMessage="대소문자, 숫자, 특수문자(@$!%*?&) 8-14자리를 입력해주세요" />
        )}
        {errors.password?.message && (
          <FormError errorMessage={errors.password?.message} />
        )}
        <label className="text-black mr-4">
          Password Again
          <input
            {...register('passwordAgain', {
              required: '비밀번호를 재입력해주세요',
              pattern:
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/,
            })}
            name="passwordAgain"
            type="password"
            placeholder="password agin *"
            required
            className="transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full h-10 px-4 rounded-lg shadow-xl"
            autoComplete="true"
          />
        </label>
        {(watchValue.passwordAgain &&
          watchValue.passwordAgain !== watchValue.password && (
            <FormError errorMessage="비밀번호가 일치하지 않습니다" />
          )) ||
          (errors.passwordAgain?.message && (
            <FormError errorMessage={errors.passwordAgain?.message} />
          ))}
        <div className="flex items-center justify-end m-4">
          <button
            onClick={onEdite}
            className="mr-2 hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-10 px-4 rounded-lg shadow-xl bg-blue-500 text-white"
          >
            confirme
          </button>
          <button
            onClick={onEdite}
            className="hover:bg-gray-200 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-10 px-4 rounded-lg shadow-xl bg-gray-100 text-black"
          >
            cancle
          </button>
        </div>
      </div>
    </form>
  );
};

export default MyProfileEditeForm;

const EmailAuthenfication = () => {
  return (
    <button type='button' className="hover:bg-blue-600 text-white bg-blue-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent w-full h-10 px-4 rounded-lg shadow-xl">
      인증 요청
    </button>
  );
};
