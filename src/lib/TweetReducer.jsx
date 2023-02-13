const tweetReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TWEET':
        return {
          ...state,
          tweetsArray: [action.payload, ...state.tweetsArray],
        };

        case 'SET_TWEETS':
          return {
            ...state,
            tweetsArray: action.payload,
          };

        case 'DELETE_ALL_TWEETS':
          return {
            ...state,
            tweetsArray: [],
          };
          
      default:
        return state;
    }
  };

  export default tweetReducer;