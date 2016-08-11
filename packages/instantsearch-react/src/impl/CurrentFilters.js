import React, {PropTypes, Component} from 'react';

import themeable from '../themeable';
import translatable from '../translatable';

class CurrentFilters extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    applyTheme: PropTypes.func.isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
    })).isRequired,
    refine: PropTypes.func.isRequired,
  };

  render() {
    const {applyTheme, translate, filters, refine} = this.props;
    if (filters.length === 0) {
      return null;
    }

    return (
      <div {...applyTheme('root', 'root')}>
        <div {...applyTheme('filters', 'filters')}>
          {filters.map(filter =>
            <div {...applyTheme(filter.key, 'filter')}>
              <span {...applyTheme('filterLabel', 'filterLabel')}>
                {filter.label}
              </span>
              <button
                {...applyTheme('filterClear', 'filterClear')}
                onClick={refine.bind(null, [filter])}
              >
                {translate('clearFilter', filter)}
              </button>
            </div>
          )}
        </div>
        <button
          {...applyTheme('clearAll', 'clearAll')}
          onClick={refine.bind(null, filters)}
        >
          {translate('clearAll')}
        </button>
      </div>
    );
  }
}

export default themeable({
  root: 'CurrentFilters',
  filters: 'CurrentFilters__filters',
  filter: 'CurrentFilters__filter',
  filterLabel: 'CurrentFilters__filter__label',
  filterClear: 'CurrentFilters__filter__clear',
  clearAll: 'CurrentFilters__clearAll',
})(
  translatable({
    clearFilter: '×',
    clearAll: 'Clear all',
  })(CurrentFilters)
);