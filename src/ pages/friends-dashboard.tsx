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
    },
    );

    const onCompleted = (data: followUser) => {
        const {
            followUser: { ok, error },
        } = data;

        console.log("hello2");
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
        console.log("hello1");
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
            <p className="font-bold text-3xl h-16">친구찾기</p>
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
                                }} placeholder="이름을 입력하여 검색" className="mb-6 px-4 py-2 bg-white shadow-lg border-2 border-gray-100 rounded-lg w-96 h-16 text-xl outline-none"></input>
                                <div style={{ "height": "600px" }} className="bg-white shadow-md">
                                    {
                                        allUsers.map((user, index) => {
                                            return (

                                                user.name !== "" && user.name.includes(inputName) ?
                                                    <div key={user.id} className="relative flex w-96 h-16 bg-white shadow-lg rounded-lg m-2">
                                                        <div className="flex justify-center items-center h-full px-2">
                                                            <img src={user.profileUrl} alt="profileImg" className="w-10 h-10"></img>
                                                        </div>
                                                        <div className="flex flex-col p-2">
                                                            <p className="text-lg">{user.name}</p>
                                                            <p>{user.email}</p>
                                                        </div>
                                                        <div className="absolute right-0 flex justify-center items-center h-full px-2">
                                                            {
                                                                myFriends.find((friend) => friend.friendId === user.id && friend.verified === true)
                                                                    ?
                                                                    <button onClick={() => {onSubmit(user.id)}} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                                                        팔로워
                                                                    </button>
                                                                    :
                                                                        myFriends.find((friend) => friend.friendId === user.id && friend.verified !== true) 
                                                                        ?
                                                                        <button onClick={() => {onSubmit(user.id)}} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                                                            친구 요청 중
                                                                        </button>
                                                                        :
                                                                        <button onClick={() => {onSubmit(user.id)}} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
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