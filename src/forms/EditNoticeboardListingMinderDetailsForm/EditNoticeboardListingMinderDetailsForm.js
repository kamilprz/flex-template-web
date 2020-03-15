import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from '../../util/reactIntl';

import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, FieldCheckboxGroup, Form } from '../../components';

import css from './EditNoticeboardListingMinderDetailsForm.css';

const EditNoticeboardListingMinderDetailsFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={formRenderProps => {
      const {
        disabled,
        ready,
        rootClassName,
        className,
        name,
        handleSubmit,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;

      const classes = classNames(rootClassName || css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = disabled || submitInProgress;

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditNoticeboardListingMinderDetailsForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditNoticeboardListingMinderDetailsForm.showListingFailed" />
        </p>
      ) : null;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}

          <FormattedMessage id="Languages:" />
          <FieldCheckboxGroup
            className={css.features}
            id={name}
            name={name}
            options={config.custom.languages}
          />

          <FormattedMessage id="Qualifications:" />
          <FieldCheckboxGroup
            className={css.features}
            id={name}
            name={name}
            options={config.custom.qualifications}
          />

          <FormattedMessage id="Own Insurance:" />
          <FieldCheckboxGroup
            className={css.features}
            id={name}
            name={name}
            options={config.custom.ownInsurance}
          />

          <FormattedMessage id="Extras:" />
          <FieldCheckboxGroup
            className={css.features}
            id={name}
            name={name}
            options={config.custom.extras}
          />

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditNoticeboardListingMinderDetailsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
};

EditNoticeboardListingMinderDetailsFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

const EditNoticeboardListingMinderDetailsForm = EditNoticeboardListingMinderDetailsFormComponent;

export default EditNoticeboardListingMinderDetailsForm;
