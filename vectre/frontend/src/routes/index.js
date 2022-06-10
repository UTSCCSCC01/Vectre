import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LandingPage from '../pages/LandingPage';
import Feed from '../pages/Feed';
import LoginPage from '../pages/Login';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/home" component={HomePage} />
                <Route path="/feed" component={Feed} />
                <Route path="/login" component={LoginPage} />
                <Route path="/profile" component={Profile} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </Router>
    );
}