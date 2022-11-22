import DashboardTitle from 'components/dashboard/dashbord-title';
import { useMe } from 'lib/useMe';
import React from 'react';
import { meQuery } from '__generated__/meQuery';

function MyProfile() {
  const { data: myProfile, loading: loadingProfile } = useMe();
  console.log(myProfile);

  return (
    <div className="pt-28 px-8">
      <DashboardTitle title="My Profile" />
      {myProfile && (
        <div className="flex bg-middleBlue p-8 rounded-2xl shadow-xl">
          {myProfile?.me.profileUrl && (
            <img src={myProfile?.me.profileUrl} width="100" alt="프로필" />
          )}
          <div>
            <p>Email</p>
            <p>{myProfile?.me.email}</p>
            <p>Name</p>
            <p>{myProfile?.me.name}</p>
          </div>
          <button className="">edite profile</button>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
