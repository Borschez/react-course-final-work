export const LOAD_ISSUES = 'LOAD_ISSUES';

export const loadIssuesAction = (issues) => ({
    type: LOAD_ISSUES,
    payload: issues
});
