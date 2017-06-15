import HomePage from './pages/HomePage'
import CounterPage from './pages/CounterPage'
import TodosPage from './pages/TodosPage'
import AxiosPage from './pages/AxiosPage'
import {
  createRouter
} from '@expo/ex-navigation';

const Router = createRouter(() => ({
  home: () => HomePage,
  counter: () => CounterPage,
  todos: () => TodosPage,
  axios: () => AxiosPage
}));

export default Router;