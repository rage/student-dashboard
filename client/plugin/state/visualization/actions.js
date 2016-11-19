import { getVisualization } from 'utils/visualizations';

export const UPDATE_VISUALIZATION = 'VISUALIZATION_UPDATE_VISUALIZATION';
export const LOAD_VISUALIZATION = 'VISUALIZATION_LOAD_VISUALIZATION';
export const LOAD_VISUALIZATION_ERROR = 'VISUALIZATION_LOAD_VISUALIZATION_ERROR';

export function loadVisualization({ cache = true } = {}) {
  return (dispatch, getState) => {
    const { plugin: { exerciseGroups }, course: { id: courseId } } = getState();

    return dispatch(loadVisualizationRequest({ courseId, exerciseGroups, cache }))
      .then(response => {
        if(!response.error) {
          const { data, type } = response.payload.data;

          return dispatch(updateVisualization({ data: getVisualization({ data, type }), type, loading: false, error: false }));
        }
      });
  }
}

export function updateVisualization(update) {
  return {
    type: UPDATE_VISUALIZATION,
    update
  }
}

export function loadVisualizationRequest({ courseId, exerciseGroups, cache }) {
  return {
    type: LOAD_VISUALIZATION,
    payload: {
      request: {
        url: `/courses/${courseId}/visualization/user`,
        method: 'POST',
        data: {
          exerciseGroups,
          cache
        }
      }
    }
  }
}
