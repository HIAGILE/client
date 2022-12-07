import React, { useEffect, useState } from 'react';
import { getNotices } from '__generated__/getNotices';

type MainNoticeProps = {
  loading: boolean;
  notices: getNotices | undefined;
};

const MainNotice = ({ loading, notices }: MainNoticeProps) => {
  return (
    <div className="overflow-scroll h-[300px]">
      {loading ? (
        <div>loading</div>
      ) : (
        notices?.getNotices.notices &&
        notices?.getNotices.notices?.map((notice) => {
          return (
            <p
              key={notice.id}
              className="bg-white border-2 border-lightGray rounded-xl my-4 p-4 flex items-center shadow-lg"
            >
              <span className="w-1/6 text-xs font-semibold text-mainRed">
                New
              </span>
              <span className="w-4/6 text-xs">{notice.description}</span>
              <span className="w-1/6 text-xs">
                {notice.createAt.substr(0, 10).replaceAll('-', '.')}
              </span>
            </p>
          );
        })
      )}
    </div>
  );
};

export default MainNotice;
