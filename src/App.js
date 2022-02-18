import MyLocationIcon from '@mui/icons-material/MyLocation';
import TaskIcon from '@mui/icons-material/Task';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FeedbackIcon from '@mui/icons-material/Feedback';
import './App.css';

import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';

import MainHeader from './components/Header';
import { useEffect, useMemo } from 'react';
import { loadPagesAction } from './store/pages/actions';
import { courseData } from './courseData';
import SimpleContainer from './components/Container';

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
    ...pages.map(({ title, id }) => ({
      id,
      title,
      icon: MENU_ICONS[id]
    }))
  ]), [pages]);

  return (
    <div className="App">
      <MainHeader title={"Учи React!"} menuItems={menuItems} />
      <SimpleContainer page={selectedPage || pages[0]} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  loadPages: bindActionCreators(loadPagesAction, dispatch)
})

export default connect(null, mapDispatchToProps)(App);
