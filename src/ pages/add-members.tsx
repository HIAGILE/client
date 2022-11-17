import { gql, useQuery } from "@apollo/client";
import { useMe } from "hooks/useMe";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFriends, getFriendsVariables, getFriends_getFriends_friends } from "__generated__/getFriends";

const GET_FRIENDS_QUERY = gql`
  query getFriends($input:GetFriendsInput!){
    getFriends(input:$input){
      ok
      error
      friends{
        id
        email
        name
        role
        verified
      }
    }
  }
`


function AddMembers() {
  const params = useParams<{ projectId: string }>();
  const {data:myProfile, loading:myProfileLoading} = useMe()
  const {data:myFriends,loading:myFriendsLoading} = useQuery<getFriends,getFriendsVariables>(
    GET_FRIENDS_QUERY,
    {
      variables:{
        input:{
          userId:myProfile?.me.id ?? 0
        }
      }
    }
  );

  const [firstListValues, setFirstListValues] = useState<getFriends_getFriends_friends[]>([]);
  const [secondListValues, setSecondListValues] = useState<getFriends_getFriends_friends[]>([]);
  const [selectedListValues, setSelectedListValues] = useState<getFriends_getFriends_friends[]>([]);

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
        (item) => (optionsList = optionsList.filter((x) => x.id !== item.id))
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
        (item) => (rightList = rightList.filter((x) => x.id !== item.id))
      );
      setFirstListValues(rightList);
      setSecondListValues([...secondListValues, ...selectedListValues]);
      setSelectedListValues([]);
    }
  };

  const handleChange = (e:ChangeEvent<HTMLSelectElement>) => {
    const temp = Array.from(e.target.selectedOptions, (option) => option.value);
    //setSelectedListValues([...temp]);
  };

  useEffect(() => {
    
  }, [firstListValues, secondListValues]);

  return (
    
      <div className="h-full rounded-3xl bg-white flex justify-center items-center">
        <select
          className="w-64 rounded-md p-4 h-96 shadow-xl outline-0 outline-purple-500"
          onChange={(e) => {
            handleChange(e);
          }}
          multiple
        >
          {
            myFriends?.getFriends.friends?.map(
              (friend) => {
                return (
                  <option
                    value={friend.id}
                    key={friend.id}
                    label={friend.name}
                  />
                )
              }
            )
          }
        </select>
        <div className="mx-5 flex justify-center items-center">
          <div className="">
            <div className="p-3">
            <button className="hover:bg-purple-600 transition w-16 h-10 bg-purple-500 text-white rounded-md" onClick={() => moveAllRight()}>{">>"}</button>
            </div>
            <div className="p-3">
            <button className="hover:bg-purple-600 transition w-16 h-10 bg-purple-500 text-white rounded-md" onClick={() => moveRight()}>{">"}</button>
            </div>
            <div className="p-3">
            <button className="hover:bg-purple-600 transition w-16 h-10 bg-purple-500 text-white rounded-md" onClick={() => moveAllLeft()}>{"<<"}</button>
            </div>
            <div className="p-3">
            <button className="hover:bg-purple-600 transition w-16 h-10 bg-purple-500 text-white rounded-md" onClick={() => moveLeft()}>{"<"}</button>
            </div>
          </div>
        </div>
        <select
          className="w-64 rounded-md p-4 h-96 shadow-xl outline-0 outline-purple-500"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            handleChange(e);
          }}
          multiple
        >
          {secondListValues.map((item, i) => (
            <option
              value={item.id}
              key={item.id}
              label={item.name}
            />
          ))}
        </select>
      </div>
      
  );
}

export default AddMembers;
