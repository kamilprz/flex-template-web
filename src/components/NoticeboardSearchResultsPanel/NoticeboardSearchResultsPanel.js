import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { NoticeboardListingCard, PaginationLinks } from '../../components';
import css from './SearchResultsPanel.css';
import LetUsKnow from './LetUsKnow';


const NoticeboardSearchResultsPanel = props => {
  const { className, rootClassName, listings, pagination, search, setActiveListing } = props;
  const classes = classNames(rootClassName || css.root, className);

  const paginationLinks =
    pagination && pagination.totalPages > 1 ? (
      <PaginationLinks
        className={css.pagination}
        pageName="NoticeboardPage"
        pageSearchParams={search}
        pagination={pagination}
      />
    ) : null;

  // Panel width relative to the viewport
  const panelMediumWidth = 50;
  const panelLargeWidth = 62.5;
  const cardRenderSizes = [
    '(max-width: 767px) 100vw',
    `(max-width: 1023px) ${panelMediumWidth}vw`,
    `(max-width: 1920px) ${panelLargeWidth / 2}vw`,
    `${panelLargeWidth / 3}vw`,
  ].join(', ');

  return (
    <div className={classes}>
      <div className={css.listingCards}>
        {listings.map(l => (
          <NoticeboardListingCard
            className={css.listingCard}
            key={l.id.uuid}
            listing={l}
            renderSizes={cardRenderSizes}
            setActiveListing={setActiveListing}
          />
        ))}
        <LetUsKnow />
        {props.children}
      </div>
      {paginationLinks}
    </div>
  );
};

NoticeboardSearchResultsPanel.defaultProps = {
  children: null,
  className: null,
  listings: [],
  pagination: null,
  rootClassName: null,
  search: null,
};

const { array, node, object, string } = PropTypes;

NoticeboardSearchResultsPanel.propTypes = {
  children: node,
  className: string,
  listings: array,
  pagination: propTypes.pagination,
  rootClassName: string,
  search: object,
};

export default NoticeboardSearchResultsPanel;
