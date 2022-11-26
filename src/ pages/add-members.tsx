import { gql, useApolloClient, useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { meVar } from 'apollo';
import { useMe } from 'lib/useMe';
import { type } from 'os';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { addMembers, addMembersVariables } from '__generated__/addMembers';
import {
  getFriends,
  getFriendsVariables,
  getFriends_getFriends_friends,
} from '__generated__/getFriends';
import { ProjectMemberInput } from '__generated__/globalTypes';

export const NEW_MEMBERS_MUTATION = gql`
  mutation addMembers($input: AddMembersInput!) {
    addMembers(input: $input) {
      ok
      error
    }
  }
`;

export const GET_FRIENDS_QUERY = gql`
  query getFriends($input: GetFriendsInput!) {
    getFriends(input: $input) {
      ok
      error
      friends {
        id
        email
        name
        role
        verified
        profileUrl
      }
    }
  }
`;

type AddMemberType = {
  label: string;
  value: string;
};

function AddMembers() {
  // const meQueryVar = useReactiveVar(meVar);
  // console.log(meQueryVar);
  const params = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { data: myProfile, loading: myProfileLoading } = useMe();
  const { data: myFriends, loading: myFriendsLoading } = useQuery<
    getFriends,
    getFriendsVariables
  >(GET_FRIENDS_QUERY, {
    variables: {
      input: {
        userId: myProfile?.me.id ?? 0,
      },
    },
    onCompleted: (data) => {
      const addMembers = new Array<AddMemberType>();
      data.getFriends.friends?.map((friend) => {
        addMembers.push({
          label: friend.name,
          value: friend.id.toString(),
        });
      });
      setFirstListValues([...addMembers]);
    },
  });

  const onCompleted = (data: addMembers) => {
    const {
      addMembers: { ok, error },
    } = data;
    if (ok) {
      alert('멤버 추가가 완료되었습니다!');
      navigate('/', { replace: true, state: { refresh: true } });
    }
    if (!ok) {
      alert(error);
    }
    if (error) {
      console.log(error);
    }
  };

  const [addMemberstMutation, { data: addMembersResult, loading }] =
    useMutation<addMembers, addMembersVariables>(NEW_MEMBERS_MUTATION, {
      onCompleted,
    });

  const [projectLeaderList, setprojectLeaderList] = useState<AddMemberType[]>(
    [],
  );
  const [firstListValues, setFirstListValues] = useState<AddMemberType[]>([]);
  const [secondListValues, setSecondListValues] = useState<AddMemberType[]>([]);
  const [selectedListValues, setSelectedListValues] = useState<AddMemberType[]>(
    [],
  );

  const moveLeader = () => {
    if (selectedListValues !== null) {
      if (selectedListValues.length > 1) {
        alert('프로젝트 리더는 한명만 선택할 수 있습니다.');
        return;
      }
      let leaderList = firstListValues;
      selectedListValues.map(
        (item) =>
          (leaderList = leaderList.filter((x) => x.value !== item.value)),
      );
      if (projectLeaderList.length > 0) {
        leaderList.push(projectLeaderList[0]);
      }
      setFirstListValues(leaderList);
      setprojectLeaderList([...selectedListValues]);
      setSelectedListValues([]);
    }
  };
  const moveAllRight = () => {
    setFirstListValues([]);
    setSecondListValues([...secondListValues, ...firstListValues]);
  };
  const moveAllLeft = () => {
    setSecondListValues([]);
    setFirstListValues([...firstListValues, ...secondListValues]);
  };
  const moveLeft = () => {
    if (selectedListValues !== null) {
      let optionsList = secondListValues;
      selectedListValues.map(
        (item) =>
          (optionsList = optionsList.filter((x) => x.value !== item.value)),
      );
      setSecondListValues(optionsList);
      setFirstListValues([...firstListValues, ...selectedListValues]);
      setSelectedListValues([]);
    }
  };
  const moveRight = () => {
    if (selectedListValues !== null) {
      let rightList = firstListValues;
      selectedListValues.map(
        (item) => (rightList = rightList.filter((x) => x.value !== item.value)),
      );
      setFirstListValues(rightList);
      setSecondListValues([...secondListValues, ...selectedListValues]);
      setSelectedListValues([]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedListValues(new Array<AddMemberType>());
    const temp = Array.from(
      e.target.selectedOptions,
      (option) => new Object({ value: option.value, label: option.label }),
    );
    const tempSelect = new Array<AddMemberType>();
    temp.map((item) => {
      const select = JSON.stringify(item);
      const selectJson = JSON.parse(select);
      tempSelect.push(selectJson);
    });
    setSelectedListValues(tempSelect);
  };

  const onSubmit = () => {
    const addMembers = new Array<ProjectMemberInput>();

    secondListValues.map((item) => {
      addMembers.push({
        userId: parseInt(item.value),
        role: 'Member',
      });
    });

    projectLeaderList.map((item) => {
      addMembers.push({
        userId: parseInt(item.value),
        role: 'Leader',
      });
    });

    addMemberstMutation({
      variables: {
        input: {
          projectId: parseInt(params.projectId ?? '0'),
          members: addMembers,
        },
      },
    });
  };

  useEffect(() => {}, [firstListValues, secondListValues, selectedListValues]);

  return (
    <div className="h-full px-10 pt-28 rounded-3xl bg-white">
      <Helmet>
        <title>Add Memebers | Hi Agile</title>
      </Helmet>
      <p className="font-bold text-3xl h-16">Add Members</p>
      <div className="flex justify-center items-center">
        <select
          className="w-64 rounded-md p-4 h-96 shadow-xl outline-0 outline-purple-500"
          onChange={(e) => {
            handleChange(e);
          }}
          multiple
        >
          {!myFriendsLoading &&
            firstListValues.map((friend) => {
              return (
                <option
                  value={friend.value}
                  key={friend.value}
                  label={friend.label}
                />
              );
            })}
        </select>
        <div className="mx-5 flex justify-center items-center">
          <div className="">
            <div className="p-3">
              <button
                className="hover:bg-gray-400 transition w-16 h-10 bg-mainBlue text-white rounded-md"
                onClick={() => moveLeader()}
              >
                {'PL'}
              </button>
            </div>
            <div className="p-3">
              <button
                className="hover:bg-gray-400 transition w-16 h-10 bg-mainBlue text-white rounded-md"
                onClick={() => moveAllRight()}
              >
                {'>>'}
              </button>
            </div>
            <div className="p-3">
              <button
                className="hover:bg-gray-400 transition w-16 h-10 bg-mainBlue text-white rounded-md"
                onClick={() => moveRight()}
              >
                {'>'}
              </button>
            </div>
            <div className="p-3">
              <button
                className="hover:bg-gray-400 transition w-16 h-10 bg-mainBlue text-white rounded-md"
                onClick={() => moveAllLeft()}
              >
                {'<<'}
              </button>
            </div>
            <div className="p-3">
              <button
                className="hover:bg-gray-400 transition w-16 h-10 bg-mainBlue text-white rounded-md"
                onClick={() => moveLeft()}
              >
                {'<'}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center items-center bg-mainBlue h-12 text-white">
            프로젝트 리더
          </div>
          <select
            className="w-64 rounded-md p-4 h-16 shadow-xl outline-0 outline-mainBlue"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
            }}
            multiple
          >
            {projectLeaderList.map((leader) => {
              return (
                <option
                  value={leader.value}
                  key={leader.value}
                  label={leader.label}
                />
              );
            })}
          </select>
          <div className="flex justify-center items-center bg-mainBlue h-12 text-white">
            프로젝트 멤버
          </div>
          <select
            className="w-64 rounded-md p-4 h-56 shadow-xl outline-0 outline-mainBlue"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
            }}
            multiple
          >
            {secondListValues.map((item, i) => (
              <option value={item.value} key={item.value} label={item.label} />
            ))}
          </select>
        </div>
      </div>
      <div className="my-5">
        <button
          type={'button'}
          className="rounded-lg border-2 border-mainBlue px-4 py-2 w-40 text-mainBlue mx-1 hover:bg-mainBlue hover:text-white transition"
          onClick={onSubmit}
        >
          완료
        </button>
      </div>
    </div>
  );
}

export default AddMembers;
