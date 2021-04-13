import Tweet from 'components/Tweet';
import TweetFactory from 'components/TweetFactory';
import { dbService } from 'fbInstance';
import React, { useEffect, useState } from 'react';

const Home= ({userObj}) => {

    const[tweets, setTweets]= useState([]);

    //오래된 방법이라 쓰진 않는다. snapshot을 대신 쓸거임
    const getTweets=async()=>{
        //get: firestore의 tweets 콜렉션에 저장된 모든 걸 QuerySnapshat으로 가져옴
        const dbTweets = await dbService.collection("tweets").get();
        //가져온 QuerySnapShat에서 각각의 document에 접근해서 data()함수 실행
        dbTweets.forEach(document=>{
            //prev: 모든 이전의 tweets
            //배열을 리턴할 거임
            //첫번째 요소(document.data()) : 가장 최근의 document
            //두번째 요소(...prev) : 이전의 document
            //=>깔끔하게 tweetObject로 만들거임
            const tweetObject = {
                ...document.data(), //es6 pread attribute : 배열 요소를 나열함
                id: document.id,
            }
            setTweets((prev)=>[tweetObject, ...prev]);
        });
    };

    useEffect(()=>{
        //getTweets(); 대신에 onSnapshot을 쓸거임
        //onSnapshot : !!!실시간!!!으로 db의 변화를 보여줌
        //re-render 를 덜하기 때문에 더 빠르다
        dbService.collection("tweets").orderBy("createdAt","asc").onSnapshot(snapshot=>{
            const tweetArray=snapshot.docs.map(doc=>({
                id:doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        });
    },[]);

    return (
    <div>
        <TweetFactory userObj={userObj} />
        <div>
            {tweets.map((tweet)=>(
                <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorID===userObj.uid}/>   
            ))}
        </div>
    </div>
    );
};
export default Home;