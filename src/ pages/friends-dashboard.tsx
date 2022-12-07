import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { allUsers, allUsers_allUsers_friends, allUsers_allUsers_users } from "__generated__/allUsers";
import { followUser, followUserVariables } from "__generated__/followUser";

export const ALL_USERS_QUERY = gql`
  query allUsers {
    allUsers{
      ok
      error
      users{
        id
        name
        email
        role
        verified
        profileUrl
      }
      friends{
        id
        verified
        friendId
        }
    }
  }
`;

export const FOLLOW_USER_MUTATION = gql`
    mutation followUser($input: FollowUserInput!) {
        followUser(input: $input) {
            ok
            error
        }
    }
`



export const FriendsDashboard = () => {
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState<allUsers_allUsers_users[]>([]);
    const [myFriends, setmyFriends] = useState<allUsers_allUsers_friends[]>([]);
    const [inputName, setInputName] = useState("");
    const { data: myUsers, loading: myUsersLoading } = useQuery<
        allUsers
    >(ALL_USERS_QUERY, {
        // pollInterval: 500,
        onCompleted: (data) => {
            setAllUsers(data.allUsers.users ?? []);
            setmyFriends(data.allUsers.friends ?? []);
        }
        ,pollInterval: 1000,
    },
    );

    const onCompleted = (data: followUser) => {
        const {
            followUser: { ok, error },
        } = data;

        if (!ok) {
          alert(error);
        }
        if (error) {
          console.log(error);
        }
      };
    
      const [followUserMutation, { data: followUserResult, loading }] = useMutation<
        followUser,
        followUserVariables
      >(FOLLOW_USER_MUTATION, {
        onCompleted,
      });

      const onSubmit = (id:number) => {
        if (!loading) {
            followUserMutation({
            variables: {
              input: {
                userId: id,
              },
            },
          });
        }
      }
    return (
        <div className="h-full px-10 pt-28 rounded-3xl bg-white">
            <Helmet>
                <title>Friends Dashboard | Hi Agile</title>
            </Helmet>
            <p className="font-bold text-lg h-16">Search Friends</p>
            <div className="flex flex-wrap">
                {
                    myUsersLoading
                        ?
                        (<div>...Loading</div>)
                        :
                        (
                            <div className="flex flex-col items-center">
                                <input onChange={(e) => {
                                    setInputName(e.target.value);
                                }} placeholder="이름을 입력하여 검색" className="mb-6 px-4 py-2 bg-white shadow-md border border-zinc-200 rounded-md w-96 h-12 text-sm outline-none"></input>
                                <div style={{ "height": "600px" }} className="bg-white shadow-md border border-zinc-200 rounded-md">
                                    {
                                        allUsers.map((user, index) => {
                                            return (

                                                user.name !== "" && user.name.includes(inputName) ?
                                                    <div key={user.id} className="relative border border-zinc-200 flex w-96 h-16 bg-white shadow-md rounded-md m-2">
                                                        <div className="flex justify-center items-center h-full px-2">
                                                            <img src={user.profileUrl} alt="profileImg" className="w-10 h-10 rounded-full"></img>
                                                        </div>
                                                        <div className="flex flex-col p-2 text-sm">
                                                            <p >{user.name}</p>
                                                            <p>{user.email}</p>
                                                        </div>
                                                        <div className="absolute text-xs right-0 flex justify-center items-center h-full px-2">
                                                            {
                                                                myFriends.find((friend) => friend.friendId === user.id && friend.verified === true)
                                                                    ?
                                                                    <button onClick={() => {
                                                                        onSubmit(user.id)
                                                                    }} className="px-2 py-1 hover:bg-blue-400 hover:text-white text-blue-400 border border-blue-400 rounded-md transition duration-200 ease-in-out">
                                                                        팔로워
                                                                    </button>
                                                                    :
                                                                        myFriends.find((friend) => friend.friendId === user.id && friend.verified !== true) 
                                                                        ?
                                                                        <button onClick={() => {onSubmit(user.id)}} className="px-2 py-1 hover:bg-blue-400 hover:text-white text-blue-400 border border-blue-400 rounded-md transition duration-200 ease-in-out">
                                                                            친구 요청 중
                                                                        </button>
                                                                        :
                                                                        <button onClick={() => {onSubmit(user.id)}} className="px-2 py-1 hover:bg-blue-400 hover:text-white text-blue-400 border border-blue-400 rounded-md transition duration-200 ease-in-out">
                                                                            팔로우
                                                                        </button>
                                                            }
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    );
}