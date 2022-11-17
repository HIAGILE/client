import { gql, useQuery } from "@apollo/client";
import { useMe } from "hooks/useMe";
import React from "react";
import { useParams } from "react-router-dom";
import { getFriends, getFriendsVariables } from "__generated__/getFriends";

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

  return (
    <div className="h-full px-10 pt-28 rounded-3xl bg-white">
      {
        myFriends?.getFriends.friends?.map(
          (friend) => {
            return (
              <div>
                <div>{friend.email}</div>
                <div>{friend.name}</div>
              </div>
            )
          }
        )
      }
    </div>
  );
}

export default AddMembers;
