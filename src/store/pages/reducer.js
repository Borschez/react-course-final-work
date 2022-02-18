import { LOAD_PAGES, SET_SELECTED_PAGE } from "./actions";

const initialState = {
    pages: [],
    selectedPage: {}
}

export const pagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PAGES:
            return {
                ...state,
                pages: action.payload,
                selectedPage: action.payload[0] || {}
            }
        case SET_SELECTED_PAGE: {
            return {
                ...state,
                selectedPage: state.pages.find(({ id }) => id === action.payload)
            }
        }
        default:
            return state;
    }
}

// selectors

export const getPages = (state) => {
    return state.pages.pages;
}