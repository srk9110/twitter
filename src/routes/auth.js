import AuthFrom from 'components/AuthForm';
import { authService, firebaseInstance } from 'fbInstance';
import React from 'react';
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter,faGoogle,faGithub } from '@fortawesome/free-brands-svg-icons'

const Auth=()=> {
    
    //소셜 로그인(구글, 깃허브)
    const onSocialClick=async (event)=>{
        const {target:{name}}=event;
        
        let provider;

        if(name==="google"){
            provider=new firebaseInstance.auth.GoogleAuthProvider();
        } else if(name==="github"){
            provider=new firebaseInstance.auth.GithubAuthProvider();
        }
        const data=await authService.signInWithPopup(provider);
        console.log(data);
    }

    return (
    <div className="authContainer">
        <FontAwesomeIcon className="twitterIcon" icon={faTwitter} size="3x" />
        <AuthFrom />
        <div className="authButtons">
            <button className="authButton" onClick={onSocialClick} name="google">
                <FontAwesomeIcon icon={faGoogle}/> Continue with Google  
                </button>
            <button className="authButton" onClick={onSocialClick} name="github">
                <FontAwesomeIcon icon={faGithub}/> Continue with Github  
                </button>
        </div>
    </div>
        );
    };
export default Auth;