import React from 'react';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import TaskIcon from '@mui/icons-material/Task';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FeedbackIcon from '@mui/icons-material/Feedback';
import GitHubIcon from '@mui/icons-material/GitHub';
import './App.css';

import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';

import MainHeader from './components/Header';
import { useEffect, useMemo } from 'react';
import { loadPagesAction } from './store/pages/actions';
import { Routes, Route, Link } from "react-router-dom";
import { courseData } from './courseData';
import SimpleContainer, { JustContainer } from './components/Container';
import IssueTableContainer from './components/IssuesTable';
import { IssuesComments } from './components/IssueComments';

const MENU_ICONS = {
  1: <MyLocationIcon />,
  2: <TaskIcon />,
  3: <BookmarkIcon />,
  4: <FeedbackIcon />,
};

const App = (props) => {
  const pages = useSelector(state => state.pages.pages);
  const selectedPage = useSelector(state => state.pages.selectedPage);

  useEffect(() => {
    const { loadPages } = props;

    loadPages(courseData.pages);
  }, []);

  const menuItems = useMemo(() => ([
    {
      id: 1,
      title: "Главная",
      icon: <GitHubIcon />,
      route: '/issues'
    },
    ...pages.map(({ title, id }) => ({
      id,
      title,
      icon: MENU_ICONS[id],
    }))
  ]), [pages]);

  return (
    <div className="App">
      <MainHeader title={"Учи React!"} menuItems={menuItems} />
      <Routes>
        <Route path="/issues" element={<IssueTableContainer />} />
        <Route path="/" element={<SimpleContainer page={selectedPage || pages[0]} />} />
        <Route path="/issue/:issueNumber/comments" element={<JustContainer><IssuesComments /></JustContainer> } />
        <Route path="*" element={<JustContainer>404 Page not Found</JustContainer>} />
      </Routes>
      {/*  */}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  loadPages: bindActionCreators(loadPagesAction, dispatch)
})

export default connect(null, mapDispatchToProps)(App);
