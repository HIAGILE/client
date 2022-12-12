import React, { Dispatch, SetStateAction } from 'react';
import { meQuery_me } from '__generated__/meQuery';
import { useForm } from 'react-hook-form';
import userFilled from '../../images/icon/userFilled.svg';
import { FormError } from 'components/common/form-error';
import axios from 'axios';
import { gql, useMutation } from '@apollo/client';
import { editProfile, editProfileVariables } from '__generated__/editProfile';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { MutatingDots } from 'react-loader-spinner';
import { verificationAgain } from '__generated__/verificationAgain';


const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`

const VERIFICATION_AGAIN_MUTATION = gql`
  mutation verificationAgain {
    verificationAgain {
      ok
      error
    }
  }
`

type Props = {
  me: meQuery_me;
  onEdit: () => void;
  setMyProfileUrl: Dispatch<SetStateAction<string>>;
  profileUrl: string;
};

type MyProfile = {
  name: string;
  email: string;
  password: string;
  passwordAgain: string;
  //profileUrl: string;
  verified: boolean;
};


const MyProfileEditeForm = ({ me, onEdit,setMyProfileUrl,profileUrl }: Props) => {
  const [myImage, setMyImage] = React.useState<File>();
  const {
    register,
    getValues,
    formState: { isValid, errors },
    handleSubmit,
    watch,
  } = useForm<MyProfile>({
    mode: 'onChange',
  });

  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok, error },
    } = data;
    if (ok) {
      toast.success('프로필이 수정되었습니다', {
        position: 'bottom-center',
      });
      onEdit();
    } else {
      toast.error(error, {
        position: 'bottom-center',
      });
    }
  };
  const watchValue = watch();
  const [editProfileMutation, { loading, data: editProfileMutationResult }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION,{
    onCompleted,
    refetchQueries: ['meQuery'],
  });

  const [verificationAgainMutation, {data: verificationAgainMutationResult }] = useMutation<
    verificationAgain    
  >(VERIFICATION_AGAIN_MUTATION,{
    onCompleted: (data) => {
      const {
        verificationAgain: { ok, error },
      } = data;
      if (ok) {
        toast.success('인증메일이 발송되었습니다', {
          position: 'bottom-center',
        });
      }
    },
  });

  const encodeFileToBase64 = (fileBlob:File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setMyProfileUrl(reader.result?.toString() || '');
        resolve();
      };
    });
  };
  const onSubmit = async () =>{
    try{
      const { email, password, name,passwordAgain } = getValues();
      const actualFile = myImage;

      if (!password){
        toast.error('비밀번호를 입력해주세요', {
          position: 'bottom-center',
        });
        return;
      }
      if (password !== passwordAgain){
        toast.error('비밀번호가 일치하지 않습니다', {
          position: 'bottom-center',
        });
        return;
      }
      if (actualFile) {
        const formData = new FormData();
        formData.append('file', actualFile ?? '');
        const {url:profileImg} = await (
            await fetch(`${process.env.REACT_APP_HEROKU_URL}/uploads/`, {
              method: 'POST',
              body: formData,
            })
        ).json();
        setMyProfileUrl(profileImg);
      
        editProfileMutation({
          variables: {
            input: {
              email: email,
              password: password,
              profileUrl: profileImg,
              name: name,
            },
          },
        });
      }
      else{
        editProfileMutation({
          variables: {
            input: {
              email: email,
              password: password,
              profileUrl: profileUrl,
              name: name,
            },
          },
        });
      }
    }
    catch(e){
      console.log("error",e);
      toast.error("에러가 발생했습니다.", {
        position: 'bottom-center',
      });
    }
  }
  
  return (
    loading ? (
      <div className="flex flex-col items-center justify-center ">
        <h2 className="font-semibold text-2xl mb-3">
          프로필 수정 중입니다....
        </h2>
        <h4 className="font-medium text-base mb-5">
          다른 페이지로 이동하지 마세요.
        </h4>
        <MutatingDots
          height={120}
          width={120}
          color="rgb(74 222 128)"
          secondaryColor="rgb(239 68 68)"
          radius={12.5}
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass={''}
          visible={true}
        />
      </div>
    )
    :
    (
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center bg-white px-8 py-8 mb-20 rounded-lg relative">
        {me.profileUrl && (
        <div className="flex flex-col mr-10 ">
          <img
            src={profileUrl}
            alt="user"
            width="200"
            className="object-fill rounded-lg shadow-xl"
          />
          <label
            className="text-white hover:bg-blue-600 transition duration-300 ease-in-out shadow-xl cursor-pointer flex h-10 justify-center items-center bg-blue-500 rounded-lg mt-4"
            htmlFor="input-file"
          >
            사진 변경
          </label>
          <input
            id="input-file"
            type={"file"}
            accept={"image/*"}
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              setMyImage(file);
              if (file) {
                await encodeFileToBase64(file);
              }
            }}
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
              className="transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 border border-zinc-200 w-full h-10 px-4 rounded-md shadow-sm"
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
              {...register('email')}
              className="transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 border border-zinc-200 w-full h-10 px-4 rounded-md shadow-sm"
              defaultValue={me.email}
            />
          </label>
          <label className="text-black mr-4">
            Authenfication
            {
              me.verified 
              ? 
              (
                <div className="flex justify-center items-center transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent w-full h-10 px-4 rounded-lg shadow-xl">인증 완료</div>
              )
              :
              (
                <button onClick={()=>{
                  verificationAgainMutation();
                }} type='button' className="hover:bg-blue-600 text-white bg-blue-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent w-full h-10 px-4 rounded-lg shadow-xl">
                  인증 요청
                </button>
              )
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
              className="transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 border border-zinc-200 w-full h-10 px-4 rounded-md shadow-sm"
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
              className="transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 border border-zinc-200 w-full h-10 px-4 rounded-md shadow-sm"
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
              type={"submit"}
              className="mr-2 hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-10 px-4 rounded-lg shadow-xl bg-blue-500 text-white"
            >
              Confirm
            </button>
            <button
              type={'button'}
              onClick={onEdit}
              className="hover:bg-gray-200 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-10 px-4 rounded-lg shadow-xl bg-gray-100 text-black"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    )
  );
};

export default MyProfileEditeForm;

const EmailAuthenfication = () => {
  return (
    <button 
     type='button' className="hover:bg-blue-600 text-white bg-blue-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent w-full h-10 px-4 rounded-lg shadow-xl">
      인증 요청
    </button>
  );
};
