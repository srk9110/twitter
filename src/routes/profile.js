import { authService, dbService } from 'fbInstance';
import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router';

const Profile=({refreshUser, userObj}) => {

    //새로운 유저이름으로 바꾸기
    const [newDisplayName, setNewDisplayName]=useState(userObj.displayName);

    const onChange=(event)=>{
        const {target:{value},}=event;
        setNewDisplayName(value);
    };

    const onSubmit=async (event)=>{
        event.preventDefault();
        if(userObj.displayName!==newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };

    //hook을 써서 로그아웃 후 home으로 돌아가기
    const history = useHistory();
    const onLogOutClick=()=>{
        authService.signOut();
        history.push("/");
    };

    //내가 쓴 트윗들 보기
    const getMyTweets = async()=>{
        //콜렉선 tweets에서 creatorID가 userObj의 uid와 ==인 것을 찾아서
        //가져와!
        const tweets=await dbService.collection("tweets")
        .where("creatorID","==", userObj.uid)
        //orderBy를 사용하면 인덱스 오류,즉 쿼리를 미리 만들라고 오류가 나는데
        //오류를 보고 링크를 누르면 인덱스를 파이어베이스에서 자동으로 만들수 있음 
        .orderBy("createdAt","asc")
        .get();
        console.log(tweets.docs.map((doc)=>doc.data()));
    };

    useEffect(()=>{
        getMyTweets();
    },[]);

    return(
        <>
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    onChange={onChange} 
                    type="text" 
                    placeholder="Display Name"
                    value={newDisplayName} />
                <input className="formBtn" type="submit" value="Update Profile" 
                style={{
                    marginTop: 10,
                  }}
                />
            </form>
            <span className="formBtn cancelBtn logOut"
                onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
        </>
    )};
export default Profile;