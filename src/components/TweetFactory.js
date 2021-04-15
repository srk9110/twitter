import React, { useState } from 'react';
import {storageService,dbService} from "fbInstance";
//랜덤 아이디 만들기
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TweetFactory=({userObj})=>{

    const[tweet, setTweet] = useState("");
    const[attachment, setAttachment]=useState("");

    const onSubmit=async (event)=>{
        event.preventDefault();

        let attachmentUrl="";
        if(attachment!==""){
            //firebase storage의 bucket에 이미지 업로드하기
            //child : 파일에 대한 reference를 가짐
            //${uuidv4()} : 이미지에 랜덤 이름 주기 
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            //참조된 곳(child)에 string 업로드(put)하기
            //data_url : reader.readAsDataURL(theFile);
            const response = await attachmentRef.putString(attachment,"data_url");
            //responce에서 url로 사진 받아오기
            attachmentUrl=await response.ref.getDownloadURL();
        }
        
        const tweetObj={
            text:tweet,
            createdAt: Date.now(),
            creatorID: userObj.uid,
            attachmentUrl,
        };

        //firebase db인 firestore에 추가하기
        //add가 promise 를 반환하기 때문에 async
        await dbService.collection("tweets").add(tweetObj);
        setTweet("");
        setAttachment("");
    };

    const onChange=(event)=>{
        const {target:{value}}=event;
        setTweet(value);
    };

    const onFileChange =(event) =>{
        //file 받아오기
        console.log(event.target.files);
        const {target:{files},}=event;
        //파일을 가짐
        const theFile=files[0];
        //FileReader Api의 readAsDataURL 메서드로 파일을 읽을거임
        const reader=new FileReader();
        //바로 보이지 않기 때문에 eventlistner를 추가해야함
        reader.onloadend=(finishedEvent)=>{
            //파일 로드가 끝나면 이미지를 볼 수 있는 finishedEvent 안에 result 속성값 url를 가짐
            console.log(finishedEvent);
            const{currentTarget:{result},}=finishedEvent;
            setAttachment(result);
        };
        //onloadend를 끝낸 뒤 여기서 파일을 읽어옴
        reader.readAsDataURL(theFile);
    };

    //clear photo
    const onClearAttachmentClick=()=>{
        setAttachment("");
    };

    return (
    <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
            <input className="factoryInput__input" value={tweet} onChange={onChange} type="text" placeholder="what's on your mind?" maxLength={120}/>
            <input type="submit" value="&rarr;" className="factoryInput__arrow"/>           
        </div>
        <label htmlFor="attach-file" className="factoryInput__label">
            <span>Add Photos  </span>
            <FontAwesomeIcon icon={faPlus} />
        </label>
            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} 
            style={{ opacity: 0}}/>
            {attachment && 
                <div className="factoryForm__attachment">
                    <img 
                        src={attachment} 
                        style={{
                            backgroundImage: attachment,
                    }}/>
                    <div className="factoryForm__clear" onClick={onClearAttachmentClick}>
                        <span>Clear  </span>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>    
            }
    </form>
    )
};

export default TweetFactory;