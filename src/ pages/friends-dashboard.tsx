import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { acceptUser, acceptUserVariables } from "__generated__/acceptUser";
import { allUsers, allUsers_allUsers_friends, allUsers_allUsers_inMyFriends, allUsers_allUsers_users } from "__generated__/allUsers";
import { followUser, followUserVariables } from "__generated__/followUser";
import { unfollowUser, unfollowUserVariables } from "__generated__/unfollowUser";

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
      inMyFriends{
        user{
            id
        }
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
            friends{
                id
                verified
                friendId
            }
        }
    }
`

export const UNFOLLOW_USER_MUTATION = gql`
    mutation unfollowUser($input: UnfollowUserInput!) {
        unfollowUser(input: $input) {
            ok
            error
            friends{
                id
                verified
                friendId
            }
        }
    }
`

export const ACCEPT_USER_MUTATION = gql`
    mutation acceptUser($input: FollowUserInput!) {
        acceptUser(input: $input) {
            ok
            error
            friends{
                id
                verified
                friendId
            }
        }
    }
`



export const FriendsDashboard = () => {
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState<allUsers_allUsers_users[]>([]);
    const [myFriends, setmyFriends] = useState<allUsers_allUsers_friends[]>([]);
    const [inMyFriends, setinMyFriends] = useState<allUsers_allUsers_inMyFriends[]>([]);
    const [inputName, setInputName] = useState("");
    const { data: myUsers, loading: myUsersLoading } = useQuery<
        allUsers
        >(ALL_USERS_QUERY, {
        // pollInterval: 500,
        onCompleted: (data) => {
            setAllUsers(data.allUsers.users ?? []);
            setmyFriends(data.allUsers.friends ?? []);
            setinMyFriends(data.allUsers.inMyFriends ?? []);
        }
        ,pollInterval: 1000,
        },
    );
    
    const [followUserMutation, { data: followUserResult, loading:followLoading }] = useMutation<
        followUser,
        followUserVariables
      >(FOLLOW_USER_MUTATION);

    const [unfollowUserMutation, { data: unfollowUserResult, loading:unfollowLoading }] = useMutation<
        unfollowUser,
        unfollowUserVariables
      >(UNFOLLOW_USER_MUTATION);

    const [acceptUserMutation, { data: acceptUserResult, loading:acceptLoading }] = useMutation<
        acceptUser,
        acceptUserVariables
      >(ACCEPT_USER_MUTATION);

    const onFollowMutation = (id:number) => {
        if (!followLoading) {
            followUserMutation({
            variables: {
              input: {
                userId: id,
              },
            },
            onCompleted: (data) => {
                const {
                    followUser: { ok, error, friends },
                } = data;
                if (!ok) {
                    alert(error);
                }else{
                    setmyFriends(friends ?? [])
                }
                if (error) {
                    console.log(error);
                }
                }
          });
        }
    }

    const onUnfollowMutation = (id:number) => {
        if (!unfollowLoading) {
            unfollowUserMutation({
            variables: {
                input: {
                    userId: id,
                },
            },
            onCompleted: (data) => {
                const {
                    unfollowUser: { ok, error, friends },
                } = data;
                if (!ok) {
                    alert(error);
                }else{
                    setmyFriends(friends ?? [])
                }
                if (error) {
                    console.log(error);
                }
                }
            });
        }
    }

    const onAcceptMutation = (id:number) => {
        if (!acceptLoading) {
            acceptUserMutation({
            variables: {
                input: {
                    userId: id,
                },
            },
            onCompleted: (data) => {
                const {
                    acceptUser : { ok, error, friends },
                } = data;
                if (!ok) {
                    alert(error);
                }else{
                    setmyFriends(friends ?? [])
                }
                if (error) {
                    console.log(error);
                }
                }
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
                                            // 나의 친구목록에 있는 사람인지 확인
                                            const isFriend = myFriends.find((friend) => friend.friendId === user.id);
                                            let type = 0;
                                            if (isFriend){
                                                // 내 친구 목록에 있는 사람이면 isInMyFriends에도 있다는 말이됨....
                                                const isInMyFriends = inMyFriends.find((friend) => friend.user.id === user.id);
                                                // 둘 다 서로를 승인 했다면 타입은 "이미 친구" 상태
                                                isFriend.verified && isInMyFriends?.verified
                                                ?
                                                    type = 4 
                                                :
                                                    isFriend.verified && !isInMyFriends?.verified
                                                    ?
                                                        type = 2
                                                    :
                                                        !isFriend.verified && isInMyFriends?.verified
                                                        ?
                                                            type = 3
                                                        :
                                                            type = 1
                                            }
                                            else{
                                                // 내 친구 목록에 없는 사람이면
                                                type = 1
                                            }
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
                                                                type === 1
                                                                ?
                                                                <button onClick={() => {
                                                                    onFollowMutation(user.id)
                                                                }} className="px-2 py-1 hover:bg-blue-400 hover:text-white text-blue-400 border border-blue-400 rounded-md transition duration-200 ease-in-out">
                                                                    친구 요청
                                                                </button>
                                                                :
                                                                    type === 2
                                                                    ?
                                                                    <button onClick={() => {
                                                                        onUnfollowMutation(user.id)
                                                                    }} className="px-2 py-1 hover:bg-blue-400 hover:text-white text-blue-400 border border-blue-400 rounded-md transition duration-200 ease-in-out">
                                                                        친구 요청 중
                                                                    </button>
                                                                    :
                                                                        type === 3
                                                                        ?
                                                                        <button onClick={() => {
                                                                            onAcceptMutation(user.id)
                                                                        }} className="px-2 py-1 hover:bg-blue-400 hover:text-white text-blue-400 border border-blue-400 rounded-md transition duration-200 ease-in-out">
                                                                            친구 요청 수락
                                                                        </button>
                                                                        :
                                                                            type === 4
                                                                            ?
                                                                            <button onClick={() => {
                                                                                onUnfollowMutation(user.id)
                                                                            }} className="px-2 py-1 hover:bg-blue-400 hover:text-white text-blue-400 border border-blue-400 rounded-md transition duration-200 ease-in-out">
                                                                                이미 친구에요
                                                                            </button>
                                                                            :
                                                                            <button onClick={() => {
                                                                                onFollowMutation(user.id)
                                                                            }} className="px-2 py-1 hover:bg-blue-400 hover:text-white text-blue-400 border border-blue-400 rounded-md transition duration-200 ease-in-out">
                                                                                친구 요청
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