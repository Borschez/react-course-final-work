import { LOAD_ISSUES } from "./actions";

const initialState = {
    issues: [],    
}

export const issuesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ISSUES:
            return {
                ...state,
                issues: action.payload,                
            }        
        default:
            return state;
    }
}

// selectors

export const getIssues = (state) => {
    return state.issues.issues;
}