import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './routes/login/Login';
import Main from './routes/main/Main';
import { NavBar } from './features/ui';
import Register from './routes/register/Register';

//TODO look into why several get calls are used in the get messages function
//TODO deal with multiple errors with no backend connection
//TODO handle:   code: 'ERR_HTTP_HEADERS_SENT' on the backend (got it from sending an empty update message)
//TODO Make sure when replying to message, that after the new message comes in, the reply section of that original message closes
//TODO center the circular loading icon(in mobile it seems - recheck)
//TODO mobile - change NewPost to have proper padding on the side

function App() {
  
  return (
    <div className="App">
      
      <Router>
      <NavBar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/main' element={<Main />} />
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
