import HomePage from './pages/HomePage'
import CounterPage from './pages/CounterPage'
import TodosPage from './pages/TodosPage'
import AxiosPage from './pages/AxiosPage'
import ThemePage from './pages/ThemePage'
import ArticlePage from './pages/ArticlePage'
import {
  createRouter
} from '@expo/ex-navigation';

const Router = createRouter(() => ({
  home: () => HomePage,
  counter: () => CounterPage,
  todos: () => TodosPage,
  axios: () => AxiosPage,
  theme: () => ThemePage,
  article: () => ArticlePage,
}));

export default Router;