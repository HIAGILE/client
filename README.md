# Hi Agile !!
<p>
  <img alt="lib" src="https://img.shields.io/badge/React-18.2.0-blue"/>
  <img alt="lib" src="https://img.shields.io/badge/Nest-9.1.4-red"/>
  <img alt="lib" src="https://img.shields.io/badge/Postgresql-14.0.0-blue"/>
  <img alt="lib" src="https://img.shields.io/badge/GraphQL-16.6.0-red"/>
  <img alt="lib" src="https://img.shields.io/badge/Apollo GraphQL-10.1.3-green"/>
  <img alt="lib" src="https://img.shields.io/badge/TailwindCSS-3.2.2-blue"/>
</p>

### 4가지 애자일 패턴을 사용해서 소프트웨어를 개발합니다.

## npm
> - npm install
> - npm run start
> - npm run build

## yarn
> - yarn install
> - yarn start
> - yarn build

## Slogan
> ### 안녕! 애자일.

## Logo
<img width="300" src="https://user-images.githubusercontent.com/60413257/203893980-e83a23f8-7822-4f5a-af9e-50dd8e10ee72.svg" alt="hiagile">

## Feature
- 현재는 스크럼만을 지원하고 있습니다.
- 추후에 짝프로그래밍, 칸반보드, EX를 추가할 예정입니다.
- 메인 화면에는 나의 최근 생성한 프로젝트 3가지가 출력됩니다.
- 나의 생성, 친구추가 활동 등에서 발생한 Notice를 메인화면에 출력합니다.
- 달력을 출력합니다.
- 나의 Todolist를 출력합니다.
- 프로젝트 대시보드로 이동해 전체 프로젝트를 확인 할 수 있습니다.
- 친구찾기 대시보드로 이동해 전체 친구를 확인하고 친구추가 할 수 있습니다.
- 일감관리 대시보드로 이동해 전체 일감을 확인하고 관리할 수 있습니다.

## Getting Started
> git clone https://github.com/thewoowon/client.git

## 테스트 아이디
* ID: test@tester.com
* PW: test1234!@

## Login Page
- Json Web Token을 활용한 로그인
- 카카오, 깃허브 OAUTH를 활용한 로그인
<img width="1728" alt="스크린샷 2022-11-27 오후 6 01 07" src="https://user-images.githubusercontent.com/60413257/204127078-5ca80361-cf66-46b4-bf87-11fb30ba65e9.png">


## Create User Page
- 계정 생성 시 이메일 중복 여부를 미리 검사합니다.
- react-hook-form의  useForm() Hook을 활용해 input 태그를 관리합니다.
- 약관을 추가했습니다.
- 계정 생성 시 이메일 인증 메일이 발송됩니다.
- 비밀 번호는 이중으로 검사합니다.
<img width="1726" alt="스크린샷 2022-11-27 오후 6 05 48" src="https://user-images.githubusercontent.com/60413257/204127253-83c39f89-65fe-4d9d-b9e5-bb521cb53dad.png">



## Main Verification
- 이메일 인증 버튼을 클릭하면 이메일 인증이 완료됩니다.

<img width="843" alt="스크린샷 2022-11-27 오후 6 04 24" src="https://user-images.githubusercontent.com/60413257/204127199-b5f8bbcc-c604-40b5-be3e-a36f29383c1a.png">


## Main Dashboard
- 프로젝트 생성이 메인에 위치합니다.
- 최근 프로젝트 3개를 출력합니다.
- 최근의 알림을 출력합니다.
- 달력을 출력합니다.
- 나의 스프린트를 출력합니다.
- 좌측 메뉴에는 4가지 네비게이션 메뉴가 있습니다.
- 우측 상단에는 나의 프로필에 해당하는 메뉴를 펼칠 수 있습니다.
<img width="1728" alt="스크린샷 2022-11-27 오후 6 00 49" src="https://user-images.githubusercontent.com/60413257/204127072-f0c49495-2059-4065-86f5-0eb54051c2bf.png">
<img width="289" alt="스크린샷 2022-11-27 오후 6 10 36" src="https://user-images.githubusercontent.com/60413257/204127419-18baa118-900f-4b92-8b00-32fd5592cd2e.png">
<img width="218" alt="스크린샷 2022-11-27 오후 6 10 54" src="https://user-images.githubusercontent.com/60413257/204127435-68e3fc48-0c61-47c6-9b98-bf652e4fb945.png">

## Create Project
- 4가지의 방법론을 선택할 수 있습니다.
- 현재는 스크럼만 가능합니다.
<img width="1728" alt="스크린샷 2022-11-27 오후 6 11 21" src="https://user-images.githubusercontent.com/60413257/204127446-ea94cd21-1aed-427c-8686-bdacefa70893.png">

## Fill out the Form
- 프로젝트명과 깃허브 주소를 입력합니다.
<img width="1727" alt="스크린샷 2022-11-27 오후 6 14 29" src="https://user-images.githubusercontent.com/60413257/204127553-4698a655-cd02-41eb-b844-4bc0f97ee715.png">

## Allocation of Personnel
- 인원을 역할에 맞게 할당합니다.
<img width="1728" alt="스크린샷 2022-11-27 오후 6 14 59" src="https://user-images.githubusercontent.com/60413257/204127573-5d5b2eea-b903-4042-996c-44f94d6e3430.png">

## Project Dashboard
- 오너인 내가 가지고 있는 프로젝트를 볼 수 있는 대시보드입니다.
<img width="1728" alt="스크린샷 2022-11-27 오후 6 16 17" src="https://user-images.githubusercontent.com/60413257/204127632-152121ac-a7d1-474c-83ef-1cda47f8b68a.png">

## Project Detail
- 프로젝트 디테일입니다.
- 내 프로젝트 상세 및 참가 중인 인원, 스프린트, 할 일 목록 등을 확인 할 수 있습니다.
<img width="1728" alt="스크린샷 2022-11-27 오후 6 16 38" src="https://user-images.githubusercontent.com/60413257/204127647-81e067e1-c98a-45fb-afb2-186576a45b19.png">
<img width="1728" alt="스크린샷 2022-11-27 오후 6 17 49" src="https://user-images.githubusercontent.com/60413257/204127693-687d7b18-410a-4a5d-ae6d-7b207a5a6393.png">

## Add Sprint
- 스프린트 추가 모달입니다.
<img width="1727" alt="스크린샷 2022-11-27 오후 6 18 05" src="https://user-images.githubusercontent.com/60413257/204127707-24f110cc-a1f6-4db4-a56a-381e23a051e3.png">

## Add ToDoList
- 할 일 추가 모달입니다.
- 먼저 스프린트를 선택합니다.
<img width="1728" alt="스크린샷 2022-11-27 오후 6 19 20" src="https://user-images.githubusercontent.com/60413257/204127764-33b4c5ae-1625-418e-b408-f331a076e7bc.png">
- 할 일 내용을 작성합니다.
<img width="1727" alt="스크린샷 2022-11-27 오후 6 20 01" src="https://user-images.githubusercontent.com/60413257/204127796-04b41dd5-98f5-40ca-b791-8b05f2dc40bf.png">

## After Add
<img width="1728" alt="스크린샷 2022-11-27 오후 6 20 44" src="https://user-images.githubusercontent.com/60413257/204127833-34423e35-dd1f-413f-87a9-cb453cdf6adb.png">

## Search Friends
- 친구 목록 확인과 검색, 친구 신청을 할 수 있습니다.
<img width="1728" alt="스크린샷 2022-11-27 오후 6 21 23" src="https://user-images.githubusercontent.com/60413257/204127855-edbff03e-ed10-43e0-9bcc-65644c92d54f.png">

## Edit Profile
- 내 프로필 사진 및 내용을 수정 할 수 있습니다.
<img width="1728" alt="스크린샷 2022-11-27 오후 6 22 19" src="https://user-images.githubusercontent.com/60413257/204127894-d59353ee-dc46-46a6-a5bb-661117f096fb.png">


## Styling
- TailwindCSS

## TCP/IP
- GraphQL
