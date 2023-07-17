import './App.css';
import { Login } from './components/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from './components/Register';
import { Home } from './components/Home';
import { ProtectedRouets } from './components/ProtectedRoutes';
import { EditUser } from './components/EditUser';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={ <Login /> }/>
          <Route path='/register' element={ <Register />} />
          <Route path='/' element={ <ProtectedRouets Component={Home} />  } />
          <Route path='/user/editProfile' element={<ProtectedRouets Component={EditUser} /> } />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
