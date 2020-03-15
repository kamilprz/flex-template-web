import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from '../../util/reactIntl';

import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, FieldCheckboxGroup, Form } from '../../components';

import css from './EditNoticeboardListingJobDetailsForm.css';

const EditNoticeboardListingJobDetailsFormComponent = props => (
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
          <FormattedMessage id="EditNoticeboardListingJobDetailsForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditNoticeboardListingJobDetailsForm.showListingFailed" />
        </p>
      ) : null;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}

          <FormattedMessage id="Select the type of job:" />
          <FieldCheckboxGroup
            className={css.features}
            id={name}
            name={name}
            options={config.custom.typeOfJob} 
          />

          <FormattedMessage id="Select the duration of the job:" />
          <FieldCheckboxGroup
            className={css.features}
            id={name}
            name={name}
            options={config.custom.durationOfJob} 
          />

          <FormattedMessage id="Select the timeframe:" />
          <FieldCheckboxGroup
            className={css.features}
            id={name}
            name={name}
            options={config.custom.timeframe} 
          />

          <FormattedMessage id="Select the location of the job:" />
          <FieldCheckboxGroup
            className={css.features}
            id={name}
            name={name}
            options={config.custom.location} 
          /> 

          <FormattedMessage id="Select child type:" />
          <FieldCheckboxGroup
            className={css.features}
            id={name}
            name={name}
            options={config.custom.children} 
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

EditNoticeboardListingJobDetailsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
};

EditNoticeboardListingJobDetailsFormComponent.propTypes = {
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

const EditNoticeboardListingJobDetailsForm = EditNoticeboardListingJobDetailsFormComponent;

export default EditNoticeboardListingJobDetailsForm;
