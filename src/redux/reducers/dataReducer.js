import { SET_DATA, ADD_TO_LIKE, SORT_BY_DATE, SORT_BY_REVIEW, SORT_BY_RANDOM } from "../actions/index";
import { initialState } from "./initialState";

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state
      }
    case SORT_BY_DATE: {
      const data = [...state.data];
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      return {
        ...state,
        data
      }
    }
    case SORT_BY_REVIEW: {
      const data = [...state.data];
      data.sort((a, b) => b.comments.length - a.comments.length);
      return {
        ...state,
        data
      }
    }
    case SORT_BY_RANDOM: {
      const shuffle = () => (Math.random() - 0.5);
      const data = [...state.data].sort(shuffle)
      return {
        ...state,
        data
      }
    }
    case ADD_TO_LIKE: {
      const pickedReview = state.data.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            like: Number(item.like) + 1
          }
        } else {
          return item;
        }
      })
      return { ...state, data: pickedReview }
    }

    default:
      return state;
  }
}

export default dataReducer;