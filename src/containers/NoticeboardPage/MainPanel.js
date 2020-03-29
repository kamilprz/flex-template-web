import React, { Component } from 'react';
import { array, bool, func, number, object, objectOf, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import merge from 'lodash/merge';
import { propTypes } from '../../util/types';
import {
  NoticeboardSearchResultsPanel,
  SearchFiltersNoticeboard,
  SearchFiltersNoticeboardMobile,
  SearchFiltersPanel,
  NamedLink,
} from '../../components';
import { validFilterParams } from './SearchPage.helpers';

import css from './NoticeboardPage.css';

class MainPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { isSearchFiltersPanelOpen: false };
  }

  render() {
    const {
      className,
      rootClassName,
      urlQueryParams,
      listings,
      searchInProgress,
      searchListingsError,
      searchParamsAreInSync,
      onActivateListing,
      onManageDisableScrolling,
      onOpenModal,
      onCloseModal,
      onMapIconClick,
      pagination,
      searchParamsForPagination,
      showAsModalMaxWidth,
      primaryFilters,
      secondaryFilters,
    } = this.props;

    const isSearchFiltersPanelOpen = !!secondaryFilters && this.state.isSearchFiltersPanelOpen;

    const filters = merge(primaryFilters, secondaryFilters);
    const selectedFilters = validFilterParams(urlQueryParams, filters);
    const selectedFiltersCount = Object.keys(selectedFilters).length;

    const selectedSecondaryFilters = secondaryFilters
      ? validFilterParams(urlQueryParams, secondaryFilters)
      : {};
    const searchFiltersPanelSelectedCount = Object.keys(selectedSecondaryFilters).length;

    const searchFiltersPanelProps = !!secondaryFilters
      ? {
          isSearchFiltersPanelOpen: this.state.isSearchFiltersPanelOpen,
          toggleSearchFiltersPanel: isOpen => {
            this.setState({ isSearchFiltersPanelOpen: isOpen });
          },
          searchFiltersPanelSelectedCount,
        }
      : {};

    const hasPaginationInfo = !!pagination && pagination.totalItems != null;
    const totalItems = searchParamsAreInSync && hasPaginationInfo ? pagination.totalItems : 0;
    const listingsAreLoaded = !searchInProgress && searchParamsAreInSync && hasPaginationInfo;

    const classes = classNames(rootClassName || css.searchResultContainer, className);

    const filterParamNames = Object.values(filters).map(f => f.paramName);
    const secondaryFilterParamNames = secondaryFilters
      ? Object.values(secondaryFilters).map(f => f.paramName)
      : [];

    return (

      <div className={classes}>
      <div className={css.PlaceAnAd}>
          Are you a parent hoping to advertise a job?
          <NamedLink
          name="NewNoticeboardListing"
          className={css.PlaceAnAdLink}
          >
          <FormattedMessage id="Place an Ad Now" />
          </NamedLink>
      </div>
        <SearchFiltersNoticeboard
          className={css.searchFilters}
          urlQueryParams={urlQueryParams}
          listingsAreLoaded={listingsAreLoaded}
          resultsCount={totalItems}
          searchInProgress={searchInProgress}
          searchListingsError={searchListingsError}
          onManageDisableScrolling={onManageDisableScrolling}
          {...searchFiltersPanelProps}
          {...primaryFilters}
        />
        <SearchFiltersNoticeboardMobile
          className={css.searchFiltersMobile}
          urlQueryParams={urlQueryParams}
          listingsAreLoaded={listingsAreLoaded}
          resultsCount={totalItems}
          searchInProgress={searchInProgress}
          searchListingsError={searchListingsError}
          showAsModalMaxWidth={showAsModalMaxWidth}
          onMapIconClick={onMapIconClick}
          onManageDisableScrolling={onManageDisableScrolling}
          onOpenModal={onOpenModal}
          onCloseModal={onCloseModal}
          filterParamNames={filterParamNames}
          selectedFiltersCount={selectedFiltersCount}
          {...primaryFilters}
          {...secondaryFilters}
        />
        {isSearchFiltersPanelOpen ? (
          <div className={classNames(css.searchFiltersPanel)}>
            <SearchFiltersPanel
              urlQueryParams={urlQueryParams}
              listingsAreLoaded={listingsAreLoaded}
              onClosePanel={() => this.setState({ isSearchFiltersPanelOpen: false })}
              filterParamNames={secondaryFilterParamNames}
              {...secondaryFilters}
            />
          </div>
        ) : (
          <div
            className={classNames(css.listings, {
              [css.newSearchInProgress]: !listingsAreLoaded,
            })}
          >
            {searchListingsError ? (
              <h2 className={css.error}>
                <FormattedMessage id="SearchPage.searchError" />
              </h2>
            ) : null}
            <NoticeboardSearchResultsPanel
              className={css.searchListingsPanel}
              listings={listings}
              pagination={listingsAreLoaded ? pagination : null}
              search={searchParamsForPagination}
              setActiveListing={onActivateListing}
            />
          </div>
        )}
      </div>
    );
  }
}

MainPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listings: [],
  resultsCount: 0,
  pagination: null,
  searchParamsForPagination: {},
  primaryFilters: null,
  secondaryFilters: null,
};

MainPanel.propTypes = {
  className: string,
  rootClassName: string,

  urlQueryParams: object.isRequired,
  listings: array,
  searchInProgress: bool.isRequired,
  searchListingsError: propTypes.error,
  searchParamsAreInSync: bool.isRequired,
  onActivateListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onOpenModal: func.isRequired,
  onCloseModal: func.isRequired,
  onMapIconClick: func.isRequired,
  pagination: propTypes.pagination,
  searchParamsForPagination: object,
  showAsModalMaxWidth: number.isRequired,
  primaryFilters: objectOf(propTypes.filterConfig),
  secondaryFilters: objectOf(propTypes.filterConfig),
};

export default MainPanel;