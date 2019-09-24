import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './modal/modal';
import { Switch, Route } from 'react-router-dom';

// import MainPage from './main/main_page';
import SignUpFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import Navbar from './navbar/navbar';
import Profile from './profile/profile_container';
import CreateStoryContainer from './stories/create_story_container';
import EditStoryContainer from './stories/edit_story_container';
import StoryShowContainer from './stories/story_show_container';
import HomePageContainer from './homepage/homepage_container';
import AuthorStoriesIndexContainer from './author_stories/author_stories_index_container';

const App = () => (
    
    <div>
        <Modal />
        <header>
            <Navbar />
        </header>

        <Switch>
            <ProtectedRoute path="/@:username" component={Profile} />
            <AuthRoute exact path="/register" component={SignUpFormContainer}/>
            <AuthRoute exact path="/login" component={LoginFormContainer}/>
            <ProtectedRoute exact path="/stories/new" component={CreateStoryContainer}/>
            <ProtectedRoute exact path="/stories/:storyId/edit" component={EditStoryContainer}/>
            <ProtectedRoute exact path="/stories/:storyId" component={StoryShowContainer}/>
            <Route exact path="/" component={HomePageContainer}/>
            <ProtectedRoute exact path="/author_stories_index" component={AuthorStoriesIndexContainer}/>
        </Switch>
    </div>
)

export default App;