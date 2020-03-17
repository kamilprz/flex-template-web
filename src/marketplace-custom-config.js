/*
 * Marketplace specific configuration.
 */

export const filters = [
  {
    key: 'first_aid',
    label: 'First Aid',
  },
  {
    key: 'own_transport',
    label: 'Own Transport',
  },
  {
    key: 'non_smoker',
    label: 'Non Smoker',
  },
  {
    key: 'new_borns',
    label: 'New Borns',
  },
  {
    key: 'qualifications',
    label: 'Qualifications',
  },
  {
    key: 'overnights',
    label: 'Overnights',
  },
  {
    key: 'evenings',
    label: 'Evenings',
  },
  {
    key: 'mornings',
    label: 'Mornings',
  },
  {
    key: 'all_day',
    label: 'All Day',
  },
];

export const categories = [
  { key: 'babysitter', label: 'Babysitter' },
  { key: 'babysitter_overnight', label: 'Overnight Babysitter' },
  { key: 'nanny', label: 'Nanny' },
  { key: 'childminder', label: 'Childminder' },
  { key: 'day_care', label: 'Day Care' },
  { key: 'maternity_nurse', label: 'Maternity Nurse' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};

// Activate booking dates filter on search page
export const dateRangeFilterConfig = {
  active: true,
};

// Activate keyword filter on search page

// NOTE: If you are ordering search results by distance the keyword search can't be used at the same time.
// You can turn off ordering by distance in config.js file
// export const keywordFilterConfig = {
//   active: true,
// };


// Noticeboard filters
export const typeOfJob = [
  { key: 'flexible', label: 'Flexible' },
  { key: 'part_time', label: 'Part Time' },
  { key: 'full_time', label: 'Full Time' },
  { key: 'all_types', label: 'All' },
];

export const durationOfJob = [
  { key: 'short', label: 'Short Term' },
  { key: 'medium', label: 'Medium Term' },
  { key: 'long', label: 'Long Term' },
  { key: 'all_durations', label: 'All' },
];

export const timeframe = [
  { key: 'urgent', label: 'Urgent'},
  { key: 'immediate', label: 'Immediate Start' },
  { key: 'in3months', label: 'Start in the next 3 months' },
  { key: 'other', label: 'Other' },
  { key: 'all_timeframes', label: 'All' },
];

export const location = [
  { key: 'family_home', label: 'In Family\'s Home' },
  { key: 'minder_home', label: 'In Minder\'s Home' },
  { key: 'travel', label: 'Travel with Family' },
];

export const children = [
  { key: 'new_born', label: 'New Born' },
  { key: 'toddler', label: 'Toddler' },
  { key: 'under10', label: 'Under 10' },
  { key: 'special_needs', label: 'Special Needs' },
];

export const languages = [
  { key: 'english', label: 'English' },
  { key: 'spanish', label: 'Spanish' },
  { key: 'french', label: 'French' },
  { key: 'german', label: 'German' },
  { key: 'portuguese', label: 'Portuguese' },
  { key: 'chinese', label: 'Chinese' },
  { key: 'other', label: 'Other' },
];

export const extras = [
  { key: 'sports', label: 'Sports'},
  { key: 'arts', label: 'Arts' },
  { key: 'music', label: 'Music' },
  { key: 'teaching', label: 'Teaching' },
];

export const qualifications = [
  { key: 'first_aid', label: 'First Aid'},
  { key: 'childcare', label: 'Childcare' },
  { key: 'garda_vetting', label: 'Garda Vetting' },
];

export const ownInsurance = [
  { key: 'own_insurance', label: 'Yes'},
  { key: 'not_own_insurance', label: 'No' },
];
