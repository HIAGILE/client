import React from 'react';
import { getNotices } from '__generated__/getNotices';

type MainNoticeProps = {
  loading: boolean;
  notices: getNotices | undefined;
};

const MainNotice = ({ loading, notices }: MainNoticeProps) => {
  return (
    <div className="overflow-scroll" style={{ height: '500px' }}>
      {loading ? (
        <div>loading</div>
      ) : (
        notices?.getNotices.notices &&
        notices?.getNotices.notices.map((notice) => {
          return (
            <div
              key={notice.id}
              className="rounded-lg h-20 hover:bg-gray-100 transition duration-300 ease-in-out flex justify-between items-center my-4 shadow-lg"
            >
              <div className="flex items-center">
                <div className="px-16">
                  <img
                    className="h-16 w-16"
                    src={
                      'https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/a0949a56-bdc7-4c68-4afb-057c08b2c100/public'
                    }
                    alt="notice"
                  ></img>
                </div>
                <div className="px-12">{notice.description}</div>
              </div>
              <div className="px-12">{notice.createAt.substr(0, 10)}</div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MainNotice;
