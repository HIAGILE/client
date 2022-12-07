import React, { useState } from 'react';
import bellAlarm from 'images/icon/bellAlarm.svg';
import { useNotices } from 'lib/useNotices';
import { getNotices_getNotices_notices } from '__generated__/getNotices';

const Alarm = () => {
  const { data: notices, loading: noticesLoading } = useNotices(0);
  const [toggle, setToggle] = useState(false);
  function clickAlarm() {
    setToggle(!toggle);
  }
  return (
    <div className="cursor-pointer relative mt-1 mr-8" onClick={clickAlarm}>
      <img src={bellAlarm} alt="bellAlarm" />
      {!noticesLoading && (
        <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-mainRed"></span>
      )}
      {toggle && <AlarmList notices={notices?.getNotices.notices} />}
    </div>
  );
};
export default Alarm;

const AlarmList = ({
  notices,
}: {
  notices: getNotices_getNotices_notices[] | undefined | null;
}) => {
  return (
    <div className="fixed top-0 right-4 z-50 w-full overflow-scroll h-[600px]">
      <ol className="absolute top-16 right-0 w-[360px] mt-1 shadow-lg bg-white rounded-lg overflow-hidden">
        {notices?.map((notice) => (
          <li
            key={notice.id}
            className="hover:bg-middleBlue transition px-4 py-3 w-full text-sm text-darkGray border-2 border-lightGray"
          >
            {notice.description}
          </li>
        ))}
      </ol>
    </div>
  );
};
