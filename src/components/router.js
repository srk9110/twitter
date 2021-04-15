import React, { useState } from "react";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Auth from 'routes/auth';
import Home from 'routes/home';
import Profile from 'routes/profile';
import Navigation from 'components/Navigation';

//<> : fragment - 많은 요소들을 render 하고 싶은데 부모요소가 없을 때 사용(div, span등을 쓰기 싫을 때)
//App에서 hook으로 보낸 isLoggedIn 속성을 받아온다(true/false)
//안붙이면 react Dom 오류가 생김(불편..)
const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {
    return (
        <Router>
            {/*isLoggedIn이 true여야 Navigation 불러옴*/}
            {isLoggedIn && <Navigation userObj={userObj}/>}
    <Switch>
        {isLoggedIn ? ( 
        <>
        <div className="routerContainer"> 
            <Route exact path="/">
                <Home userObj={userObj}/>
            </Route>
            <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser}/>
            </Route>
            {/*Redirect를 사용해서 home으로 돌아가기*/}
            {/*<Redirect from="*" to="/" />*/}
        </div>
        </>
         ) : (
             <>
                 <Route exact path="/">
                    <Auth/>
                 </Route>
             </>
         )}
    </Switch>
</Router>
    )
}

export default AppRouter;
