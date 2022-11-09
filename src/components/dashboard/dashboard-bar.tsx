import React from "react";
import { Link } from "react-router-dom";
import userFilled from "../../images/icon/userFilled.svg";
// https://icon-icons.com/ko/pack/Teamleader-Icons/2346

const MainBar = () => {
  return (
    <div className="flex justify-between mb-4">
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
  return (
    <Link to="/profile" className="flex items-center">
      <p className="inline-block w-8 h-8 p-2 rounded-full ring-2 ring-lightGray shadow-md">
        {(porfileImg && <img src={porfileImg} className="" />) || (
          <img src={userFilled} alt="teamleadercrm" />
        )}
      </p>
      <span className="text-darkGray ml-2">{name}</span>
    </Link>
  );
};
