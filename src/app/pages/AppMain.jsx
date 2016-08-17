import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { UrlSwitch, Page } from '@r/platform/url';

import { CommentsPage } from './Comments';
import { PostsFromSubredditPage } from './PostsFromSubreddit';
import { SavedAndHiddenPage } from './SavedAndHidden';
import { SearchPage } from './SearchPage';
import { SubredditAboutPage } from './SubredditAbout';
import { UserActivityPage } from './UserActivity';
import { UserProfilePage } from './UserProfile';
import { WikiPage } from './WikiPage';

import Messages from 'app/components/Messages';
import DirectMessage from 'app/components/DirectMessage';
import Login from 'app/components/Login';
import Register from 'app/components/Register';
import Report from 'app/components/Report';
import ErrorPage from 'app/components/ErrorPage';

const AppMain = ({ statusCode, url, referrer }) => {
  if (statusCode !== 200) {
    return (
      <ErrorPage status={ statusCode } url={ url } referrer={ referrer } />
    );
  }

  return (
    <UrlSwitch>
      <Page
        url='/'
        component={ PostsFromSubredditPage }
      />
      <Page
        url='/r/:subredditName'
        component={ PostsFromSubredditPage }
      />
      <Page
        url='/r/:subredditName/comments/:postId/comment/:commentId'
        component={ CommentsPage }
      />
      <Page
        url='/r/:subredditName/comments/:postId/:postTitle/:commentId'
        component={ CommentsPage }
      />
      <Page
        url='/r/:subredditName/comments/:postId/:postTitle?'
        component={ CommentsPage }
      />
      <Page url='/search' component={ SearchPage } />
      <Page url='/r/:subredditName/search' component={ SearchPage } />
      <Page url='/r/:subredditName/about' component={ SubredditAboutPage } />
      <Page url='/r/:subredditName/(w|wiki)/:path(.*)?' component={ WikiPage } />
      <Page url='/(help|w|wiki)/:path(.*)?' component={ WikiPage } />
      <Page
        url='/comments/:postId/:postTitle/:commentId'
        component={ CommentsPage }
      />
      <Page
        url='/comments/:postId/:postTitle?'
        component={ CommentsPage }
      />
      <Page url='/u/:userName/activity' component={ UserActivityPage } />
      <Page url='/u/:userName/gild' component={ UserProfilePage } />
      <Page url='/u/:userName/:savedOrHidden(saved|hidden)' component={ SavedAndHiddenPage } />
      <Page url='/u/:userName/' component={ UserProfilePage } />
      <Page url='/login' component={ Login } />
      <Page url='/register' component={ Register } />
      <Page url='/message/compose' component={ DirectMessage } />
      <Page url='/message/:mailType' component={ Messages } />
      <Page url='/report' component={ Report } />
    </UrlSwitch>
  );
};

const selector = createSelector(
  state => state.platform.currentPage,
  ({ status, url, referrer }) => ({ statusCode: status, url, referrer }),
);

export default connect(selector)(AppMain);