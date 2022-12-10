import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import ToastUIReactCalendar from '@toast-ui/react-calendar';

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
  const calendarRef = useRef<typeof Calendar>(null);

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
        <CalendarHeader setViewType={setViewType} calendarRef={calendarRef} />
        <CalendarBody
          data={myProject?.getProjects.projects}
          viewType={viewType}
          calendarRef={calendarRef}
        />
      </div>
    </>
  );
};

export default ScheduleDashboard;

const CalendarHeader = ({
  setViewType,
  calendarRef,
}: {
  setViewType: React.Dispatch<React.SetStateAction<CalendarType>>;
  calendarRef: any;
}) => {
  const [btnState, setBtnState] = useState<string>('month');
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('');

  function changeViewType(type: CalendarType) {
    setBtnState(type);
    setViewType(type);
  }

  const getCalInstance = useCallback(() => {
    if (calendarRef !== null && calendarRef !== undefined)
      return calendarRef.current?.getInstance?.();
  }, []);

  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCalInstance();
    if (!calInstance) {
      setSelectedDateRangeText('');
    }

    const viewName = calInstance.getViewName();
    const calDate = calInstance.getDate();
    const rangeStart = calInstance.getDateRangeStart();
    const rangeEnd = calInstance.getDateRangeEnd();

    let year = calDate.getFullYear();
    let month = calDate.getMonth() + 1;
    let date = calDate.getDate();
    let dateRangeText: string;

    switch (viewName) {
      case 'month': {
        dateRangeText = `${year}-${month}`;
        break;
      }
      case 'week': {
        year = rangeStart.getFullYear();
        month = rangeStart.getMonth() + 1;
        date = rangeStart.getDate();
        const endMonth = rangeEnd.getMonth() + 1;
        const endDate = rangeEnd.getDate();

        const start = `${year}-${month < 10 ? '0' : ''}${month}-${
          date < 10 ? '0' : ''
        }${date}`;
        const end = `${year}-${endMonth < 10 ? '0' : ''}${endMonth}-${
          endDate < 10 ? '0' : ''
        }${endDate}`;
        dateRangeText = `${start} ~ ${end}`;
        break;
      }
      default:
        dateRangeText = `${year}-${month}-${date}`;
    }

    setSelectedDateRangeText(dateRangeText);
  }, [getCalInstance]);

  const onClickNavi = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if ((ev.target as HTMLButtonElement).tagName === 'BUTTON') {
      const button = ev.target as HTMLButtonElement;
      const actionName = (
        button.getAttribute('data-action') ?? 'month'
      ).replace('move-', '');
      getCalInstance()[actionName]();
      updateRenderRangeText();
    }
  };

  return (
    <div className="py-2 mb-4 border-b-2 flex justify-between">
      <div>
        {btnState === CalendarType.Daily || (
          <>
            <button
              type="button"
              className="bg-mainBlue mx-1 px-4 py-2 rounded-lg border text-sm text-lightBlue"
              data-action="move-today"
              onClick={onClickNavi}
            >
              Today
            </button>
            <button
              type="button"
              className="mx-1 px-4 py-2 rounded-lg border text-sm"
              data-action="move-prev"
              onClick={onClickNavi}
            >
              Prev
            </button>
            <span className="px-8">{selectedDateRangeText}</span>
            <button
              type="button"
              className="mx-1 px-4 py-2 rounded-lg border text-sm"
              data-action="move-next"
              onClick={onClickNavi}
            >
              Next
            </button>
          </>
        )}
      </div>

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
  calendarRef,
}: {
  viewType: CalendarType;
  data: getProjects_getProjects_projects[] | undefined | null;
  calendarRef: any;
}) => {
  const [calendars, setCalendars] = useState<CalendarsType[]>([]);
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    if (data !== null && data !== undefined) {
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
        }}
        week={{}}
        useDetailPopup={true}
        isReadOnly={true}
        gridSelection={false}
        calendars={calendars}
        events={events}
        onAfterRenderEvent={onAfterRenderEvent}
        ref={calendarRef}
      />
    </>
  );
};
