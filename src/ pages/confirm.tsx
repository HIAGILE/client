import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useMe } from "lib/useMe";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { MutatingDots } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { verifyEmail, verifyEmailVariables } from "__generated__/verifyEmail";


const VERIFY_EMAIL_MUTATION = gql`
    mutation verifyEmail($input: VerifyEmailInput!) {
        verifyEmail(input: $input) {
            ok
            error
        }
    }
`


export const Confirm = () =>{
    const params = useParams<{code: string}>();
    const {data:userData} = useMe();
    const navigate = useNavigate();
    const client = useApolloClient();
    const [verifyEmail] = useMutation<verifyEmail,verifyEmailVariables>(VERIFY_EMAIL_MUTATION, {
        onCompleted: (data:verifyEmail) => {
            const {
                verifyEmail: { ok, error },
            } = data;
            // if (ok && userData?.me.id) {
            //     const queryResult = client.readQuery({
            //         query: gql`
            //             query me {
            //                 me {
            //                     id
            //                     verified
            //                 }
            //             }
            //         `,
            //     });
            //     if (queryResult) {
            //         client.writeQuery({
            //             query: gql`

            //                 query me {
            //                     me {
            //                         id
            //                         verified
            //                     }
            //                 }
            //             `,
            //             data: {
            //                 me: {
            //                     ...queryResult.me,
            //                     verified: true,
            //                 },
            //             },
            //         });
            //     }
            // }
            if (!ok) {
                alert(error);
            }
            navigate("/");
        }
    });
    
    useEffect(() => {
        verifyEmail({
            variables: {
                input: {
                    code: params.code ?? "",
                }
            }
        })
    }, [verifyEmail]);

    return(
        <div className="h-screen flex flex-col items-center justify-center">
            <Helmet>
                <title>Email Confirm | Hi Agile</title>
            </Helmet>
            <h2 className="font-semibold text-2xl mb-3">
                이메일 검증 중입니다....
            </h2>
            <h4 className="font-medium text-base mb-5">
                다른 페이지로 이동하지 마세요.
            </h4>
            <MutatingDots
                height={120}
                width={120}
                color="rgb(74 222 128)"
                secondaryColor="rgb(239 68 68)"
                radius={12.5}
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass={''}
                visible={true}
            />
    </div>
    );
}