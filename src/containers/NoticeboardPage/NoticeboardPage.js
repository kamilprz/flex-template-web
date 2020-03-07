import React from 'react';
import { bool, object } from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { propTypes } from '../../util/types';
import config from '../../config';
import {
  Page,
  NamedLink,
} from '../../components';

import { TopbarContainer } from '../../containers';


import css from './NoticeboardPage.css';

export const NoticeboardPageComponent = props => {
  const {
    history,
    intl,
    location,
    scrollingDisabled,
    currentUserListing,
    currentUserListingFetched,
  } = props;

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { siteTitle });
  const schemaDescription = intl.formatMessage({ id: 'LandingPage.schemaDescription' });


  return (
    <Page
      className={css.root}
      scrollingDisabled={scrollingDisabled}
      contentType="website"
      description={schemaDescription}
      title={schemaTitle}

      schema={{
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        description: schemaDescription,
        name: schemaTitle,
      }}
    >


    <TopbarContainer />

    <div className={css.PlaceAnAd}>
        Are you a parent hoping to advertise a job?
        <NamedLink
          name="NewNoticeboardListing"
          className={css.PlaceAnAdLink}
        >
          <FormattedMessage id="Place an Ad Now" />
        </NamedLink>
    </div>

    </Page>
  );
};

NoticeboardPageComponent.defaultProps = {
  currentUserListing: null,
  currentUserListingFetched: false,
};

NoticeboardPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,

  // from injectIntl
  // intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUserListing, currentUserListingFetched } = state.user;

  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUserListing,
    currentUserListingFetched,
  };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const NoticeboardPage = compose(
  withRouter,
  connect(mapStateToProps),
  injectIntl
)(NoticeboardPageComponent);

export default NoticeboardPage;
