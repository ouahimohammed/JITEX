const initialState = {
  list: [],
  loading: false,
  error: null
};

const volsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_VOLS_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_VOLS_SUCCESS':
      return {
        ...state,
        loading: false,
        list: action.payload,
        error: null
      };
    case 'FETCH_VOLS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'AJOUTER_SERVICES':
      return {
        ...state,
        list: state.list.map(vol =>
          vol.id === action.payload.volId
            ? { ...vol, services: action.payload.services }
            : vol
        )
      };
    default:
      return state;
  }
};

export default volsReducer;

