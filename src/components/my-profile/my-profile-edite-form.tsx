import React from 'react';
import { meQuery_me } from '__generated__/meQuery';
import { useForm } from 'react-hook-form';
import userFilled from '../../images/icon/userFilled.svg';
import { FormError } from 'components/common/form-error';

type Props = {
  me: meQuery_me;
  onEdite: () => void;
};

type MyProfile = {
  name: string;
  email: string;
  password: string;
  passwordAgain: string;
  profileUrl: string;
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
    <form className="flex items-center bg-middleBlue px-16 py-8  mb-20 rounded-2xl shadow-xl relative">
      {me.profileUrl && (
        <div className="flex flex-col mr-10">
          <img
            src={me.profileUrl}
            alt="user"
            width="200"
            className="object-fill"
          />
          <label
            className="cursor-pointer flex h-10 justify-center items-center bg-middleBlue"
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
        <label className="text-mainBlue mr-4">
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
            className="transition search-input"
            defaultValue={me.name}
          />
        </label>
        {errors.name?.type === 'pattern' && (
          <FormError errorMessage="영문과 숫자 4자리를 입력해주세요" />
        )}
        {errors.name?.message && (
          <FormError errorMessage={errors.name?.message} />
        )}
        <div className="flex items-center">
          <p className="text-mainBlue mr-8">Email</p>
          <p className="text-lg mr-4">{me.email}</p>
        </div>
        <div className="flex items-center">
          <p className="text-mainBlue mr-4">authenfication</p>
          <p className="text-sm mr-4">
            {me.verified ? 'yes' : <EmailAuthenfication />}
          </p>
        </div>
        <label className="text-mainBlue mr-4">
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
            className="search-input"
            autoComplete="true"
          />
        </label>
        {errors.password?.type === 'pattern' && (
          <FormError errorMessage="대소문자, 숫자, 특수문자(@$!%*?&) 8-14자리를 입력해주세요" />
        )}
        {errors.password?.message && (
          <FormError errorMessage={errors.password?.message} />
        )}
        <label className="text-mainBlue mr-4">
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
            className="search-input transition-colors"
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
      </div>
      <div className="absolute right-20 bottom-8  flex items-center justify-between">
        <button
          onClick={onEdite}
          className="mr-4 py-2 px-4 bg-mainBlue rounded-xl shadow-lg text-bgBlue"
        >
          confirme
        </button>
        <button
          onClick={onEdite}
          className="py-2 px-4 bg-lightGray rounded-xl shadow-lg text-darkGray"
        >
          cancle
        </button>
      </div>
    </form>
  );
};

export default MyProfileEditeForm;

const EmailAuthenfication = () => {
  return (
    <button className="py-2 px-4 bg-mainBlue rounded-xl shadow-lg text-bgBlue">
      인증 요청
    </button>
  );
};
