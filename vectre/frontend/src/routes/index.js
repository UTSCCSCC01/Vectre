import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LandingPage from '../pages/LandingPage';
import TrendingCommunitiesPage from '../pages/TrendingCommunitiesPage';
import LoginPage from '../pages/Login';
import PostPage from '../pages/PostPage';
import Profile from '../pages/Profile';
import SettingsPage from '../pages/SettingsPage';
import SearchPage from '../pages/SearchPage';
import CommunityPage from '../pages/CommunityPage';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/home" component={HomePage} />
                <Route path="/trending" component={TrendingCommunitiesPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/user/:walletAddress" component={Profile} />
                <Route path="/settings" component={SettingsPage} />
                <Route path="/post/:postID" component={PostPage} />
                <Route path={["/c/:communityID", "/community/:communityID"]} component={CommunityPage} />
                <Route path="/search" component={SearchPage} />
            </Switch>
        </Router>
    );
}