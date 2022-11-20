import { useMe } from "hooks/useMe";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import userFilled from "../../images/icon/userFilled.svg";
// https://icon-icons.com/ko/pack/Teamleader-Icons/2346

const MainBar = () => {
  return (
    <div className="flex justify-between absolute p-10 w-full">
      <SearchBar />
      <MyProfile />
    </div>
  );
};

export default MainBar;

const SearchBar = () => {
  return (
    <form method="post">
      <input
        placeholder="search"
        name="search"
        type="text"
        className="search-input"
      />
    </form>
  );
};

const MyProfile = () => {
  const porfileImg = "";
  const name = "user name";
  const {data:myProfile, loading:myProfileLoading} = useMe()
  const [toggle, setToggle] = useState(false);
  return (
    
    <div className="relative flex">
      <div className="flex justify-center items-center text-darkGray text-xl">{myProfile?.me.name}</div>
      <div className="relative flex justify-end items-center w-16 mx-2">
        <div className="relative">
          <div className="flex items-center" onClick={()=>{setToggle(!toggle)}}>
            <div className="hover:bg-gray-100 bg-white transition flex justify-center items-center w-14 h-14 p-2 rounded-full ring-2 ring-lightGray shadow-md">
              {(porfileImg && <img src={porfileImg} className="w-8" />) || (
                <img src={userFilled} alt="teamleadercrm" className="w-8"/>
              )}
            </div>
          </div>
          {toggle && (
            <div className="absolute top-16 right-0">
              <ol className="w-32 shadow-lg bg-white">
                <Link to="/profile" className="text-black">
                  <li className="hover:bg-purple-300 transition h-10 w-full flex justify-center items-center border-2 border-gray-100">
                    프로필
                  </li>
                </Link>
                <Link to="/logout" className="text-black">
                  <li className="hover:bg-purple-300 transition h-10 w-full flex justify-center items-center border-2 border-gray-100">
                    로그아웃
                  </li>
                </Link>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
    
  );
};
