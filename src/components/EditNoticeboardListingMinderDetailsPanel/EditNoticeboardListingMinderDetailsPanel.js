import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing } from '../../util/data';
import { EditNoticeboardListingJobDetailsForm } from '../../forms';
import { ListingLink } from '..';

import css from './EditNoticeboardListingMinderDetailsPanel.css';

const FEATURES_NAME = 'minderDetails';

const EditNoticeboardListingMinderDetailsPanel = props => {
  const {
    rootClassName,
    className,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const { publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditNoticeboardListingMinderDetailsPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="What would you like to see in a minder?" />
  );

  const filters = publicData && publicData.categories;
  console.log(publicData);
  const initialValues = { filters };

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditNoticeboardListingJobDetailsForm
        className={css.form}
        name={FEATURES_NAME}
        initialValues={initialValues}
        onSubmit={values => {
          const { filters = [] } = values;

          const updatedValues = {
            publicData: { filters },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
      />
    </div>
  );
};

EditNoticeboardListingMinderDetailsPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditNoticeboardListingMinderDetailsPanel.propTypes = {
  rootClassName: string,
  className: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditNoticeboardListingMinderDetailsPanel;
