import React, { useRef, useState } from 'react';
import { Process } from 'components/common/process';
import DashboardTitle from 'components/dashboard/dashbord-title';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { gql, useQuery } from '@apollo/client';
import {
  getToDoLists,
  getToDoListsVariables,
} from '__generated__/getToDoLists';

export const GET_TODO_LISTS_QUERY = gql`
  query getToDoLists($input: GetToDoListsInput!) {
    getToDoLists(input: $input) {
      ok
      error
      toDoLists {
        id
        createAt
        updateAt
        status
        title
        description
        sprint {
          id
          createAt
          updateAt
          startDate
          endDate
          period
          purpose
        }
        members {
          id
          user {
            id
            profileUrl
            name
          }
        }
      }
    }
  }
`;

export enum CalendarType {
  Monthly = 'month',
  Weekly = 'week',
  Daily = 'day',
}

const ScheduleDashboard = () => {
  const { data, loading } = useQuery<getToDoLists, getToDoListsVariables>(
    GET_TODO_LISTS_QUERY,
    {
      variables: {
        input: {
          id: 0,
        },
      },
    },
  );

  const [viewType, setViewType] = useState<CalendarType>(CalendarType.Monthly);
  console.log('togolist :', data, loading);
  return (
    <>
      <Process />
      <div className="pt-28 px-8">
        <DashboardTitle title="My Schedule" />
        <CalendarHeader setViewType={setViewType} />
        <CalendarBody viewType={viewType} />
      </div>
    </>
  );
};

export default ScheduleDashboard;

const CalendarHeader = ({
  setViewType,
}: {
  setViewType: React.Dispatch<React.SetStateAction<CalendarType>>;
}) => {
  const [btnState, setBtnState] = useState<string>('month');
  function changeViewType(type: CalendarType) {
    setBtnState(type);
    setViewType(type);
  }
  return (
    <div className="py-2 mb-4 border-b-2 flex justify-between">
      <div></div>
      <div>
        <button
          className={`mx-1 px-4 py-2 rounded-lg border text-sm ${
            btnState === CalendarType.Monthly
              ? 'bg-mainBlue text-lightBlue'
              : ''
          }`}
          onClick={() => changeViewType(CalendarType.Monthly)}
        >
          Monthly
        </button>
        <button
          className={`mx-1 px-4 py-2 rounded-lg border text-sm ${
            btnState === CalendarType.Weekly ? 'bg-mainBlue text-lightBlue' : ''
          }`}
          onClick={() => changeViewType(CalendarType.Weekly)}
        >
          Weekly
        </button>
        <button
          className={`mx-1 px-4 py-2 rounded-lg border text-sm ${
            btnState === CalendarType.Daily ? 'bg-mainBlue text-lightBlue' : ''
          }`}
          onClick={() => changeViewType(CalendarType.Daily)}
        >
          Daily
        </button>
      </div>
    </div>
  );
};

const CalendarBody = ({ viewType }: { viewType: CalendarType }) => {
  const calendars = [{ id: 'cal1', name: 'Personal' }];
  const initialEvents = [
    {
      id: '1',
      calendarId: 'cal1',
      title: 'Lunch',
      category: 'time',
      start: '2022-12-03T12:00:00',
      end: '2022-12-08T13:30:00',
    },
    {
      id: '2',
      calendarId: 'cal1',
      title: 'Coffee Break',
      category: 'time',
      start: '2022-12-08T15:00:00',
      end: '2022-12-10T15:30:00',
    },
  ];

  const onAfterRenderEvent = (event: any) => {
    console.log(event.title);
  };

  return (
    <>
      <Calendar
        usageStatistics={false}
        height="800px"
        view={viewType}
        month={{
          dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          visibleWeeksCount: 5,
        }}
        week={{}}
        useDetailPopup={true}
        isReadOnly={true}
        gridSelection={false}
        calendars={calendars}
        events={initialEvents}
        onAfterRenderEvent={onAfterRenderEvent}
      />
    </>
  );
};
