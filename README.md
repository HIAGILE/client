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
> git clone https://github.com/HIAGILE/client.git

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
- 나의 할일을 출력합니다.
- 좌측 메뉴에는 5가지 네비게이션 메뉴가 있습니다.
- 우측 상단에는 나의 프로필에 해당하는 메뉴를 펼칠 수 있습니다.
<img width="1728" alt="스크린샷 2022-12-08 오후 1 58 41" src="https://user-images.githubusercontent.com/60413257/206360442-701001a5-41bf-495d-988a-de04311bdb4c.png">
<img width="1047" alt="스크린샷 2022-12-08 오후 1 59 04" src="https://user-images.githubusercontent.com/60413257/206360492-142d712b-486c-4c6f-bbac-e3dbbef9e2a5.png">
<img width="1046" alt="스크린샷 2022-12-08 오후 1 59 16" src="https://user-images.githubusercontent.com/60413257/206360518-dcf2cb5f-78e2-4462-8672-33086c358e3d.png">
<img width="523" alt="스크린샷 2022-12-08 오후 1 59 28" src="https://user-images.githubusercontent.com/60413257/206360549-77f62749-3dc0-4a2a-9515-154270e274e5.png">
<img width="183" alt="스크린샷 2022-12-08 오후 1 59 39" src="https://user-images.githubusercontent.com/60413257/206360579-fedc85fd-1365-4b7c-8fa7-dbbced1e63a1.png">
<img width="398" alt="스크린샷 2022-12-08 오후 2 00 01" src="https://user-images.githubusercontent.com/60413257/206360619-12a45736-11a9-48eb-9535-a6c03144a72d.png">


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
<img width="1728" alt="스크린샷 2022-12-08 오후 2 00 31" src="https://user-images.githubusercontent.com/60413257/206360697-76193337-740f-49e0-a0d0-2b2c7f13458d.png">

## Project Detail
- 프로젝트 디테일입니다.
- 내 프로젝트 상세 및 참가 중인 인원, 스프린트, 할 일 목록 등을 확인 할 수 있습니다.
<img width="1728" alt="스크린샷 2022-12-08 오후 2 01 00" src="https://user-images.githubusercontent.com/60413257/206360748-068b83bd-7dcc-4e4b-b559-3729b29ad444.png">
<img width="675" alt="스크린샷 2022-12-08 오후 2 01 24" src="https://user-images.githubusercontent.com/60413257/206360788-bec01519-aef0-4f27-9012-deb8652d6722.png">
<img width="664" alt="스크린샷 2022-12-08 오후 2 01 40" src="https://user-images.githubusercontent.com/60413257/206360821-a9154828-21d2-422e-85fd-3f35876fd56b.png">
<img width="594" alt="스크린샷 2022-12-08 오후 2 01 51" src="https://user-images.githubusercontent.com/60413257/206360835-07efd644-1749-429f-b8c8-3cab92735e45.png">

## Add Sprint
- 스프린트 추가 모달입니다.
<img width="1728" alt="스크린샷 2022-12-08 오후 2 02 21" src="https://user-images.githubusercontent.com/60413257/206360931-afbf067e-bd5f-4491-add2-9c3c6581488c.png">

## Add ToDoList
- 할 일 추가 모달입니다.
- 먼저 스프린트를 선택합니다.
<img width="1728" alt="스크린샷 2022-12-08 오후 2 02 36" src="https://user-images.githubusercontent.com/60413257/206360969-0af934ee-bfc5-47dd-94fe-6fda978e0063.png">
- 인원을 선택합니다.
<img width="1728" alt="스크린샷 2022-12-08 오후 2 03 05" src="https://user-images.githubusercontent.com/60413257/206361007-7662064d-55f8-46ae-94ec-29f9ddf29633.png">
- 할 일 내용을 작성합니다.
<img width="1728" alt="스크린샷 2022-12-08 오후 2 03 19" src="https://user-images.githubusercontent.com/60413257/206361032-80ae7322-f99c-43b1-a7bf-c6878a2b0785.png">

## Search Friends
- 친구 목록 확인과 검색, 친구 신청을 할 수 있습니다.
<img width="1728" alt="스크린샷 2022-12-08 오후 2 04 45" src="https://user-images.githubusercontent.com/60413257/206361198-e5a67440-aa83-4fde-b517-3da0159e1e56.png">

## Edit Profile
- 내 프로필 사진 및 내용을 수정 할 수 있습니다.
<img width="1727" alt="스크린샷 2022-12-08 오후 2 05 02" src="https://user-images.githubusercontent.com/60413257/206361238-01c0e74a-d684-4d72-b96a-7f91e1aebe74.png">

## To Do List Dashboard
<img width="1727" alt="스크린샷 2022-12-08 오후 2 05 24" src="https://user-images.githubusercontent.com/60413257/206361292-713700dd-2072-473f-869d-2e388ea905fd.png">

## My Schedule Dashboard
- Toast UI Calendar를 통해 프로젝트의 스프린트와 할 일을 조회할 수 있습니다.
- 필터를 통해 프로젝트 별 스케쥴 또는 내가 포함된 스케쥴만 조회할 수 있습니다.
<img width="1660" alt="스크린샷 2022-12-19 오후 10 32 35" src="https://user-images.githubusercontent.com/95343748/208437438-b411e97d-0bd2-46e0-902b-101a6e4a32b1.png">


## Styling
- TailwindCSS

## 화면 설계
https://whimsical.com/hi-agile-EYsbstse2Wct6muTbvB9tk
<img width="482" alt="스크린샷 2022-12-19 오후 10 37 56" src="https://user-images.githubusercontent.com/95343748/208443122-d417ed1f-9e93-467b-a0cb-102c4c6e7db3.png">

## TCP/IP
- GraphQL
