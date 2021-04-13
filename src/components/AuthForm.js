import React, {useState} from 'react';
import { authService } from 'fbInstance';

const AuthFrom=()=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

   //키를 누를때마다 onChange 호출
    //event로부터 정보를 받아옴(target)
    const onChange =(event)=>{
        const {target:{name, value}} = event;
        if(name==="email"){
            //email state를 value로 변경
            setEmail(value);
        } else if(name==="password"){
            //password state를 value로 변경
            setPassword(value);
        }
    };
    
    //제출키가 눌렸을때 호출
    //promise를 받기 때문에 await 사용
    const onSubmit =async (event)=>{
        //이벤트가 일어날때마다 새로고침 되는 것을 막음
        //새로고침이 되면 state에 저장된 내용이 다 사라지게 됨
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                //create Account
                //authService
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                );
            } else {
                //Log In
                data = await authService.signInWithEmailAndPassword(
                    email, password
                );
            }
            console.log(data);
        } catch(error){
           setError(error.message);
        }
    };
    //여기까지하면 firebase authencation에 유저가 등록된다.

    //setNewAccount함수를 실행하는 함수를 만들어줌 
    //이전값을 가져와서 반대되는 값을 리턴해줄거임
    //Sign In text <-> Create Account text
    const toggleAccount = () => setNewAccount((prev)=>!prev);

    return (
    <>
    <form onSubmit={onSubmit}>
         <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
         <input name="password" type="password" placeholder="Password" required={password} onChange={onChange}/>
         <input type="submit" value={newAccount ? "Create Account" : "Sign In"}/>
         {error}
     </form>
     <span onClick={toggleAccount}>{newAccount?"Sign In" : "Create Account"}</span>
     </>
    );
};

export default AuthFrom;