import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Cards from './components/pages/Cards';
import Header from './components/UI/Header';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/cards'>
            <Route path='allCards' element={<Cards />} />
          </Route>
          <Route path='/user'>
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Register />}/>
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;