import { useQuery } from '@apollo/client';
import DashboardTitle from 'components/dashboard/dashbord-title';
import MyProfileEditeForm from 'components/my-profile/my-profile-edite-form';
import { ME_QUERY, useMe } from 'lib/useMe';
import React, {useState } from 'react';
import {
  getFriends,
  getFriendsVariables,
  getFriends_getFriends_friends,
} from '__generated__/getFriends';
import { meQuery, meQuery_me } from '__generated__/meQuery';
import editFilledWhite from '../images/icon/editFilledWhite.svg';
import trashDeleteWhite from '../images/icon/trashDeleteWhite.svg';
import { GET_FRIENDS_QUERY } from '../ pages/add-members';
import { useNavigate } from 'react-router-dom';
import { getVariableValues } from 'graphql';

function MyProfile() {
  const [myProfileUrl, setMyProfileUrl] = useState("");
  const { data: myProfile, loading: loadingProfile } = useQuery<meQuery>(ME_QUERY,{
    onCompleted: (data) => {
      setMyProfileUrl(data.me.profileUrl);
    }
  });
  const [edit, setEdit] = useState<Boolean>(false);
  const [friends, setFriends] = useState<getFriends_getFriends_friends[] | null>([]);
  function onEdit() {
    setEdit(!edit);
  }
  const [inputName, setInputName] = useState("");
  const { data: myFriends, loading: myFriendsLoading } = useQuery<
    getFriends,
    getFriendsVariables
  >(GET_FRIENDS_QUERY, {
    variables: {
      input: {
        userId: myProfile?.me.id ?? 0,
      },
    },
    onCompleted: (data) => {
      setFriends(data.getFriends.friends);
    }
  });

  return (
    <div className="pt-28 px-8 flex">
      <div>
        <DashboardTitle title="My Profile" />
        {!edit && myProfile && (
          <form className="flex items-center bg-white px-8 py-8 mb-20 rounded-lg relative">
          {myProfile.me.profileUrl && (
            <div className="flex flex-col mr-10">
              <img
                src={myProfileUrl}
                alt="user"
                width="200"
                className="object-fill rounded-lg shadow-xl"
              />
              <label
                className="text-white hover:bg-blue-600 transition duration-300 ease-in-out shadow-xl cursor-pointer flex h-10 justify-center items-center bg-blue-500 rounded-lg mt-4"
                htmlFor="input-file"
              >
                ?????? ??????
              </label>
              <input
                id="input-file"
                type="file"
                accept="image/*"
                required
                className="hidden"
                disabled={true}
              />
            </div>
          )}
          <div className="py-auto flex flex-col gap-2">
            <label className="text-black mr-4">
              Name
              <input
                name="name"
                type="text"
                required
                autoComplete="true"
                className="transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 border border-zinc-200 w-full h-10 px-4 rounded-md shadow-sm"
                defaultValue={myProfile.me.name}
                disabled={true}
              />
            </label>
            <label className="text-black mr-4">
              Email
              <input
                type="text"
                className="transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 border border-zinc-200 w-full h-10 px-4 rounded-md shadow-sm"
                defaultValue={myProfile.me.email}
                disabled={true}
              />
            </label>
            <label className="text-black mr-4">
              Authenfication
              {
                myProfile.me.verified 
                ? 
                (
                  <div className="flex justify-center items-center transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent w-full h-10 px-4 rounded-lg shadow-xl">?????? ??????</div>
                )
                :
                (<EmailAuthenfication />)
              }
            </label>
            <label className="text-black mr-4">
              Password
              <input
                name="password"
                type="password"
                placeholder="Password *"
                className="transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 border border-zinc-200 w-full h-10 px-4 rounded-md shadow-sm"
                autoComplete="true"
                disabled={true}
              />
            </label>
            <label className="text-black mr-4">
              Password Again
              <input
                name="passwordAgain"
                type="password"
                placeholder="password agin *"
                className="transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 border border-zinc-200 w-full h-10 px-4 rounded-md shadow-sm"
                autoComplete="true"
                disabled={true}
              />
            </label>
            <div className="flex items-center justify-end m-4">
              <button
                type='button'
                onClick={onEdit}
                className="mr-2 hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-10 px-4 rounded-lg shadow-xl bg-blue-500 text-white"
              >
                Edit
              </button>
            </div>
          </div>
        </form>
        )}
        {edit && myProfile && (
          <MyProfileEditeForm profileUrl={myProfileUrl} setMyProfileUrl={setMyProfileUrl} me={myProfile.me} onEdit={onEdit} />
        )}
      </div>
      <div>
        <DashboardTitle title="My Friends" />
        <div className="flex flex-col items-center px-8 py-8">
          <input onChange={(e) => {
              setInputName(e.target.value);
          }} placeholder="????????? ???????????? ??????" className="mb-6 px-4 py-2 bg-white shadow-md border border-zinc-200 rounded-md w-96 h-12 text-sm outline-none"></input>
          <div style={{ "height": "600px" }} className="bg-white shadow-md border border-zinc-200 rounded-md">
              {
                  friends && friends.map((friend, index) => {
                      return (
                        friend.name !== "" && friend.name.includes(inputName) 
                        ?
                        <div key={friend.id} className="relative border border-zinc-200 flex w-96 h-16 bg-white shadow-md rounded-md m-2">
                            <div className="flex justify-center items-center h-full px-2">
                                <img src={friend.profileUrl} alt="profileImg" className="w-10 h-10 rounded-full"></img>
                            </div>
                            <div className="flex flex-col p-2 text-sm my-auto">
                                <p>{friend.name}</p>
                                <p>{friend.email}</p>
                            </div>
                        </div>
                        :
                        null
                      )
                  })
              }
          </div>
        </div>
      </div>
      <div className="pt-20 grid-cols-4">
        <button type='button' className="py-2 px-4 rounded-xl shadow-lg text-bgBlue flex items-center justify-between bg-mainRed">
          <img src={trashDeleteWhite} width="20" className="mr-2" alt="??????" />{' '}
          delete my account
        </button>
      </div>
    </div>
  );
}

export default MyProfile;

const EmailAuthenfication = () => {
  return (
    <button type='button' className="hover:bg-blue-600 text-white bg-blue-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent w-full h-10 px-4 rounded-lg shadow-xl">
      ?????? ??????
    </button>
  );
};
