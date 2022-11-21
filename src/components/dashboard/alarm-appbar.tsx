import React, { useState } from 'react';
import bellAlarm from 'images/icon/bellAlarm.svg';

const Alarm = () => {
  const alarm = false;
  const [toggle, setToggle] = useState(false);
  function clickAlarm() {
    setToggle(!toggle);
  }
  return (
    <div className="cursor-pointer" onClick={clickAlarm}>
      <p className="mr-4 pt-1 relative">
        <img src={bellAlarm} alt="bellAlarm" />
        {!alarm && (
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-mainRed"></span>
        )}
      </p>
      {toggle && <AlarmList />}
    </div>
  );
};
export default Alarm;

const AlarmList = () => {
  const alarms = [
    '환영합니다. username 님!',
    '가입을 축하드려요.',
    '프로젝트를 생성해서 애자일 템플릿을 적용해 보세요!',
  ];
  return (
    <div className="fixed top-0 right-4 z-50 w-full h-full">
      <ol className="absolute top-16 right-0 w-[360px] mt-1 shadow-lg bg-white rounded-lg overflow-hidden">
        {alarms.map((alarm) => (
          <li
            key={alarm}
            className="hover:bg-middleBlue transition px-4 py-3 w-full text-sm text-darkGray border-2 border-lightGray"
          >
            {alarm}
          </li>
        ))}
      </ol>
    </div>
  );
};
