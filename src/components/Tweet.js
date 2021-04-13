import { dbService, storageService } from 'fbInstance';
import React, { useState } from 'react';

const Tweet = ({tweetObj, isOwner})=>{
    //editing mode인가 아닌가
    const [editing, setEditing]=useState(false);
    //tweet의 text 업데이트
    const [newTweet, setNetTweet] = useState(tweetObj.text);

    //수정 기능 버튼
    const toggleEditing = () => setEditing(prev=>!prev);
    const onSubmit =async (event)=>{
        event.preventDefault();
        console.log(tweetObj.text, newTweet);
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text: newTweet,
        });
        setEditing(false);
    };
    const onChange = (event)=>{
        const {
            target:{value},}=event;
            setNetTweet(value);
    };

    //삭제 기능 버튼
    const onDeleteClick=async()=>{
        //confirm 은 확인용으로 메세지를 날리고 true/false를 반환해줌
        const ok = confirm("Are you sure delete this tweet?");
        console.log(ok);
        if(ok){
            //delete
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            await storageService.refFromURL(tweetObj.attachmentUrl).delete();
        } 

    }

    //버튼을 보여줌
    return (
        <div>
            {
                editing ? (
                <>
                    {
                    isOwner && <>
                    <form onSubmit={onSubmit}>
                        <input 
                            type="text" 
                            placeholder="Edit your tweet!" 
                            value={newTweet}
                            onChange={onChange} 
                            required
                        />
                        <input type="submit" value="Update Tweet"/>
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                    </>
                    }
                    
                </>
                ) : (
                    <>
                        <h4>{tweetObj.text}</h4>
                        {/*img가 있을 때만 img를 보겠다*/}
                        {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} width="50px" height="50px"/>}
                        {/*isOwner가 true일때만 버튼을 보겠다. 내가 쓴 글일때만 보겠다*/}
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>delete</button>
                                <button onClick={toggleEditing}>edit</button>
                            </>
                        )}
                    </>    
                )}
        </div>
    );
};

export default Tweet;