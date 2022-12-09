import React, { useEffect, useRef, useState } from 'react';
import { Process } from 'components/common/process';
import DashboardTitle from 'components/dashboard/dashbord-title';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { gql, useQuery } from '@apollo/client';
import {
  getToDoLists,
  getToDoListsVariables,
} from '__generated__/getToDoLists';
import { useProject } from 'lib/useProject';
import { getProjects_getProjects_projects } from '__generated__/getProjects';

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

  const { data: myProject, loading: myProjectLoading } = useProject(0);
  const [viewType, setViewType] = useState<CalendarType>(CalendarType.Monthly);
  return (
    <>
      <Process />
      <div className="pt-28 px-8">
        <DashboardTitle title="My Schedule" />
        <CalendarHeader setViewType={setViewType} />
        <CalendarBody
          data={myProject?.getProjects.projects}
          viewType={viewType}
        />
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

type CalendarsType = { id: string; name: string };
const CalendarBody = ({
  viewType,
  data,
}: {
  viewType: CalendarType;
  data: getProjects_getProjects_projects[] | undefined | null;
}) => {
  const [calendars, setCalendars] = useState<CalendarsType[]>([]);
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    if (data !== null && data !== undefined) {
      console.log(data);
      const calendar: CalendarsType[] = [];
      const event: any = [];
      data.forEach((project, k) => {
        console.log(k, project.name);
        calendar.push({
          id: project.name,
          name: project.name,
        });
        project.sprints.forEach((sprint) => {
          sprint.toDoList.forEach((todo, key) => {
            console.log('k', key);
            event.push({
              id: `${(project.name, key)}`,
              calendarId: project.name,
              title: todo.title,
              category: sprint.purpose,
              start: sprint.startDate,
              end: sprint.endDate,
            });
          });
        });
      });
      setCalendars(calendars.concat(calendar));
      setEvents(events.concat(event));
    }
  }, [data]);

  useEffect(() => {
    console.log('1', calendars);
  }, [calendars]);

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
        events={events}
        onAfterRenderEvent={onAfterRenderEvent}
      />
    </>
  );
};
