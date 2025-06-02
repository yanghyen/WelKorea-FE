import './App.css'
import MainPage from './pages/MainPage'
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import SearchPage from './pages/SearchPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App:React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/searchPage" element={<SearchPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
