const tweetReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TWEET':
        return {
          ...state,
          tweetsArray: [...state.tweetsArray, action.payload],
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

      // case 'DELETE_TWEET':
      //   return {
      //     ...state,
      //     tweetsArray: state.tweetsArray.filter((tweet, index) => index !== action.payload),
      //   };
      default:
        return state;
    }
  };

  export default tweetReducer;