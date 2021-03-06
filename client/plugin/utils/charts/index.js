import compose from 'compose-function';
import withClassPrefix from 'utils/class-prefix';

export function withoutTitle(config) {
  return Object.assign({}, config || {}, {
    title: {
      text: ''
    }
  });
}

export function withoutCredits(config) {
  return Object.assign({}, config || {}, {
    credits: {
      enabled: false
    }
  });
}

export function withoutLegend(config) {
  return Object.assign({}, config || {}, {
    legend: {
      enabled: false
    }
  });
}

export function makeWithTooltip(getContent) {
  return config => {
    return Object.assign({}, config, {
      tooltip: {
        backgroundColor: 'none',
        borderWidth: 0,
        shadow: false,
        useHTML: true,
        padding: 0,
        formatter: function() {
          return `
            <div class="${withClassPrefix('chart-tooltip')}">
              ${getContent.call(this)}
            </div>
          `;
        }
      }
    });
  };
}

export function withDefaults(config) {
  return compose(withoutTitle, withoutCredits)(config);
}
