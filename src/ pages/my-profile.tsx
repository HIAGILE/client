import { useQuery } from '@apollo/client';
import DashboardTitle from 'components/dashboard/dashbord-title';
import MyProfileEditeForm from 'components/my-profile/my-profile-edite-form';
import { useMe } from 'lib/useMe';
import React, { useEffect, useState } from 'react';
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

function MyProfile() {
  const { data: myProfile, loading: loadingProfile } = useMe();

  const [edite, setEdite] = useState<Boolean>(false);
  function onEdite() {
    setEdite(!edite);
  }

  const { data: myFriends, loading: myFriendsLoading } = useQuery<
    getFriends,
    getFriendsVariables
  >(GET_FRIENDS_QUERY, {
    variables: {
      input: {
        userId: myProfile?.me.id ?? 0,
      },
    },
  });

  const [friends, setFriends] = useState<
    getFriends_getFriends_friends[] | null
  >([]);

  useEffect(() => {
    if (!myFriendsLoading && myFriends !== undefined) {
      setFriends(myFriends?.getFriends.friends);
    }
  }, [myFriends]);

  const navigate = useNavigate();
  return (
    <div className="pt-28 px-8">
      <DashboardTitle title="My Profile" />
      {!edite && myProfile && (
        <div className="flex items-center bg-middleBlue px-16 py-8 mb-20 rounded-2xl shadow-xl relative">
          {myProfile?.me.profileUrl && (
            <img
              src={myProfile?.me.profileUrl}
              width="100"
              className="mr-20 rounded-full shadow-xl"
              alt="프로필"
            />
          )}
          <div>
            <div className="flex items-center py-1">
              <p className="mr-4 text-mainBlue">Name</p>
              <p className="text-xl font-semibold  text-darkBlue">
                {myProfile?.me.name}
              </p>
            </div>
            <div className="flex items-center py-1">
              <p className="mr-4 text-mainBlue">Email</p>
              <p className="text-xl font-semibold text-darkBlue">
                {myProfile?.me.email}
              </p>
            </div>
            <div className="flex items-center py-1">
              <p className=" mr-4 text-mainBlue">Authenfication</p>
              <p className="text-darkBlue">
                {myProfile?.me.verified
                  ? 'yes'
                  : '아직 인증되지 않았습니다. 메일함을 확인해 주세요.'}
              </p>
            </div>
          </div>
          <button
            onClick={onEdite}
            className="py-2 px-4 bg-mainBlue rounded-xl shadow-lg text-bgBlue flex items-center justify-between absolute right-20 bottom-8"
          >
            <img
              src={editFilledWhite}
              width="20"
              className="mr-2"
              alt="edite"
            />
            edite
          </button>
        </div>
      )}
      {edite && myProfile && (
        <MyProfileEditeForm me={myProfile.me} onEdite={onEdite} />
      )}
      <DashboardTitle title="My Friends" />
      <div className="bg-middleBlue px-16 py-8 rounded-2xl shadow-xl relative">
        {friends?.map((friend) => {
          return <p key={friend.name}>{friend.name}</p>;
        })}
        <button
          onClick={() => navigate('/friends')}
          className="py-2 px-4 bg-mainBlue rounded-xl shadow-lg text-bgBlue flex items-center justify-between absolute right-20 bottom-8"
        >
          edite
        </button>
      </div>
      <div className="pt-20 grid-cols-4">
        <button className="py-2 px-4 rounded-xl shadow-lg text-bgBlue flex items-center justify-between bg-mainRed">
          <img src={trashDeleteWhite} width="20" className="mr-2" alt="삭제" />{' '}
          delete my account
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
