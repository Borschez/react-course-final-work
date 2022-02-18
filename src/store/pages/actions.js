export const LOAD_PAGES = 'LOAD_PAGES';
export const SET_SELECTED_PAGE = 'SELECT_PAGE';

export const loadPagesAction = (pages) => ({
    type: LOAD_PAGES,
    payload: pages
});

export const setSelectedPageAction = (pageId) => ({
    type: SET_SELECTED_PAGE,
    payload: pageId
});