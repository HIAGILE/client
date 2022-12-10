import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Process } from 'components/common/process';
import DashboardTitle from 'components/dashboard/dashbord-title';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { useProject } from 'lib/useProject';
import { getProjects_getProjects_projects } from '__generated__/getProjects';

export enum CalendarType {
  Monthly = 'month',
  Weekly = 'week',
  Daily = 'day',
}

const ScheduleDashboard = () => {
  const calendarRef = useRef<typeof Calendar>(null);
  const { data: myProject, loading: myProjectLoading } = useProject(0);
  const [viewType, setViewType] = useState<CalendarType>(CalendarType.Monthly);
  return (
    <>
      <Process />
      <div className="pt-28 px-8 pb-20">
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
        dateRangeText = `${year}.${month}`;
        break;
      }
      case 'week': {
        year = rangeStart.getFullYear();
        month = rangeStart.getMonth() + 1;
        date = rangeStart.getDate();
        const endMonth = rangeEnd.getMonth() + 1;
        const endDate = rangeEnd.getDate();

        const start = `${year}.${month < 10 ? '0' : ''}${month}.${
          date < 10 ? '0' : ''
        }${date}`;
        const end = `${year}.${endMonth < 10 ? '0' : ''}${endMonth}.${
          endDate < 10 ? '0' : ''
        }${endDate}`;
        dateRangeText = `${start} ~ ${end}`;
        break;
      }
      default:
        dateRangeText = `${year}.${month}.${date}`;
    }

    setSelectedDateRangeText(dateRangeText);
  }, [getCalInstance]);

  useEffect(() => {
    updateRenderRangeText();
  }, [btnState, updateRenderRangeText]);

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
    <div className="py-2 mb-2 border-b flex justify-between">
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

type CalendarsType = { id: string; name: string; backgroundColor: string };

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
  const Color = [
    '#f9b84b',
    '#e7533d',
    '#131532',
    '#20998d',
    '#f7f7f7',
    '#404149',
  ];
  useEffect(() => {
    if (data !== null && data !== undefined) {
      const calendar: CalendarsType[] = [];
      const event: any = [];

      data.forEach((project, k) => {
        // 프로젝트 목록 생성
        calendar.push({
          id: project.name,
          name: project.name,
          backgroundColor: Color[k % 6],
        });
        project.sprints.forEach((sprint, k) => {
          const projectMem: string[] = [];
          project.members.forEach((mem) => {
            projectMem.push(mem.user.name);
          });
          // 스프린트 이벤트에 추가
          event.push({
            id: `${(project.name, k)}`,
            calendarId: project.name,
            title: sprint.purpose,
            attendees: projectMem,
            state: project.code,
            category: sprint.purpose,
            start: sprint.startDate,
            end: sprint.endDate,
            isReadOnly: true,
          });
          sprint.toDoList.forEach((todo, key) => {
            const todoMembers: string[] = [];
            todo.members?.forEach((mem) => {
              todoMembers.push(mem.user.name);
            });
            // 할일 이벤트에 추가
            event.push({
              id: `${(project.name, k, key)}`,
              calendarId: project.name,
              title: todo.title,
              body: todo.description,
              attendees: todoMembers,
              state: todo.status,
              category: sprint.purpose,
              start: todo.createAt,
              end: todo.createAt,
              isReadOnly: true,
            });
          });
        });
      });

      setCalendars(calendar);
      setEvents(event);
    }
  }, [data]);

  return (
    <>
      <div className="pb-4 border-b flex justify-between items-start">
        <div className="w-10/12">
          <button className="px-4 py-1 border rounded-lg text-xs">all</button>
          {calendars.length > 0 &&
            calendars.map((cal) => {
              return (
                <button
                  key={cal.id}
                  className="mx-1 px-2 py-1 border rounded-lg text-xs items-center"
                >
                  <span
                    className={`inline-block mr-2 w-2 h-2 rounded-full`}
                    style={{ backgroundColor: cal.backgroundColor }}
                  ></span>
                  {cal.name}
                </button>
              );
            })}
        </div>
        <label htmlFor="" className="text-xs flex items-center">
          <input type="checkbox" className="mr-2" />
          only me
        </label>
      </div>
      <Calendar
        usageStatistics={false}
        height="1000px"
        view={viewType}
        month={{
          dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          startDayOfWeek: 1,
        }}
        useDetailPopup={true}
        gridSelection={false}
        calendars={calendars}
        events={events}
        ref={calendarRef}
        template={{
          milestone(event) {
            return `<span style:"color: blue;">${event.title}</span>`;
          },
          comingDuration(event) {
            return `<span>${event.comingDuration}</span>`;
          },
          monthMoreTitleDate(moreTitle) {
            const { date } = moreTitle;
            return `<span>${date}</span>`;
          },
          monthGridHeader(model) {
            const date = parseInt(model.date.split('-')[2], 10);

            return `<span>${date}</span>`;
          },
        }}
      />
    </>
  );
};
