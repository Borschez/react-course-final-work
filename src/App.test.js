import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import App from './App';
import SimpleContainer from './components/Container';
import { courseData } from './courseData';
import { LOAD_PAGES, SET_SELECTED_PAGE } from './store/pages/actions';
import { getPages } from './store/pages/reducer';
import { pagesReducer } from './store/pages/reducer';


describe('>>>H O M E --- REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  const initialState = {
    pages: {
      pages: courseData.pages,
      selectedPage: {}
    }
  }
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    render(<Provider store={store}><App /></Provider>);
  })

  it('renders учи react', () => {
    const linkElement = screen.getByText(/учи react/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders click on navigation', () => {
    const { container } = render(<Provider store={store}><App /></Provider>);
    const drawerButton = container.getElementsByClassName("MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit MuiIconButton-edgeStart MuiIconButton-sizeLarge css-ancrnh-MuiButtonBase-root-MuiIconButton-root")[0];
    fireEvent.click(drawerButton);
    const linkElement = screen.getByText(/обратная связь о курсе/i);
    expect(linkElement).toBeInTheDocument();
  });


  it('renders main title', () => {
    render(<SimpleContainer page={initialState.pages.pages[0]} />);
    const menuElement = screen.getByText(/главная/i);
    expect(menuElement).toBeInTheDocument();
  });
  it('renders description', () => {
    render(<SimpleContainer page={initialState.pages.pages[1]} />);
    const descElement = screen.getByText(/со списком всех домашних заданий/i);
    expect(descElement).toBeInTheDocument();
  });
  it('renders topic', () => {
    render(<SimpleContainer page={getPages(initialState)[1]} />);
    const topicElement = screen.getByText(/Жизненный цикл компонента/i);
    expect(topicElement).toBeInTheDocument();
  });
  it('renders task', () => {
    render(<SimpleContainer page={getPages(initialState)[1]} />);
    const topicElement = screen.getByText(/жизненного цикла componentDidMount/i);
    expect(topicElement).toBeInTheDocument();
  });
  it('check reducer', () => {
    const loadAction = {
      type: LOAD_PAGES,
      payload: courseData.pages
    };
    const selectAction = {
      type: SET_SELECTED_PAGE,
      payload: initialState.pages.pages[2].id
    };

    expect(
      pagesReducer(
        pagesReducer({ pages: [], selectedPage: {} }, loadAction), selectAction)
    ).toEqual({ ...initialState.pages, selectedPage: initialState.pages.pages[2] });
  });

});
