import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Main from './components/Main';
import Register from './components/Register';

//TODO set isLoading event to tell user when loading is occurring
//TODO set isError event to tell user when an error occurred
//TODO make a header with the login / register buttons if user is not found
//TODO make a header with logout if user is found - maybe display the user?
//TODO implement the main message page with separate componenet for each message
//TODO implement limit user to only edit/delete their own messages
//TODO expand the messages to contain the proper info
//TODO implement the reply messages
//TODO implement the reply functionality
//TODO look into why several get calls are used in the get messages function



function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/main' element={<Main />} />
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
