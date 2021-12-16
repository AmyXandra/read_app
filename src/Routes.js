import React from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Stories from './pages/stories/Stories';
import StoryDetails from './pages/stories/SingleStory';
import EditChatMessage from './pages/chapter/EditChatMessage';
import Genres from './pages/genres/Genres';
import CreateChatMessage from './pages/chapter/CreateChatMessage';
import MyStories from './pages/stories/MyStories';
import Tags from './pages/tags/Tags';
import Users from './pages/users/Users';
import SingleUser from './pages/users/SingleUser';
import NotFound from './pages/notFound/NotFound';
import StoryDetailsWeb from './webPages/pages/storyDetails/StoryDetails';
import BrowseStories from './webPages/pages/BrowseStories/BrowseStories';
import CategoryStories from './webPages/pages/Categories/CategoryStories';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute path='/' exact component={BrowseStories} />
        <PublicRoute path='/login' exact component={Login} />
        <PrivateRoute path='/dashboard' exact component={Dashboard} />
        <PrivateRoute path='/stories' exact component={Stories} />
        <PrivateRoute path='/stories/:storyId' exact component={StoryDetails} />
        <PrivateRoute path='/chat-story/:storyId' exact component={CreateChatMessage} />
        <PrivateRoute path='/stories/:storyId/:chapterId' exact component={EditChatMessage} />
        <PrivateRoute path='/genres' exact component={Genres} />
        <PrivateRoute path='/my-stories' exact component={MyStories} />
        <PrivateRoute path='/tags' exact component={Tags} />
        <PrivateRoute path='/users' exact component={Users} />
        <PrivateRoute path='/users/:userId' exact component={SingleUser} />
        <Route path='/404' component={NotFound} />
        {/* Routes for web interface */}
        <Route path='/story-detail/:storyId' component={StoryDetailsWeb} />
        <Route path='/browse' component={BrowseStories} />
        <Route path='/category/:genreId' component={CategoryStories} />
        <Route
          path='*'
          render={() => (
            <Redirect
              to={{
                pathname: '/404',
              }}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
