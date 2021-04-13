import React, {useEffect, useState} from 'react';
import AppRouter from 'components/router';
import {authService} from "fbInstance";

//App은 최상단 컴포넌트

//react hooks :  ustState로 array 를 반환
//첫번째 값은 value(init), 
//두번째 값(setInit)은 value를 어덯게 할 것인지 다루는 방법
function App() {
  //파이어베이스가 초기화 하도록 기다려야함(로그인한 걸 확인하기 위해)
  const [init, setInit]=useState(false);
  const [userObj, setUserObj]= useState(null);
  
  //useEffect: 렌더링 이후에 마무리 단계에서 처리할 일들을 넣을 수 있음
  //[props.source]: props를 관찰할 수 있음
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){ 
        //setUserObj(user)로 할 경우 userObj가 너무 많은 정보를 담고 있어서
        //userProfile을 업데이트 할 경우 판단상태가 길어져서 실시간으로 반영되지 않음
        //그래서 필요한 정보만 정의하도록 크기를 줄임
        setUserObj({
          displayName: user.displayName,
          uid:user.uid,
          updateProfile: (args)=>user.updateProfile(args),
        }); 
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  },[]);
  
  //userObj 새로고침(profile 변경)
  const refreshUser=()=>{
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid:user.uid,
      updateProfile: (args)=>user.updateProfile(args),
    }); 
  };
  
  //<>: fragement - 여러가지 요소를 렌더링하고자 하는데 부모요소가 딱히 없을 때
  return (
    <>
  {/*로그인 되었다면 라우터에서 home으로 보내고 아니면 초기화 중
      Boolean(userObj) : userObj가 있다면 true*/}
  {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser}/>: "Initializing.."}
  
  {/*&copy; 특수기호 (동그라미 C)*/}
  {/*{new Date().getFullYear()} react에서 현재날짜 받아오는 법-무조건 { }로 감싸야함*/}
  <footer>&copy; {new Date().getFullYear()} Twitter</footer>
  </>
  );
}

export default App;
