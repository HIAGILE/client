import React from 'react';
import SearchBar from './search-bar';
import Alarm from './alarm-appbar';
import MyProfile from './my-profile-appbar';

const MainBar = () => {
  return (
    <div className="flex justify-between absolute px-8 py-6 w-full">
      <SearchBar />
      <div className="flex items-center">
        <Alarm />
        <MyProfile />
      </div>
    </div>
  );
};

export default React.memo(MainBar);
