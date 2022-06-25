import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Main from './components/Main';
import NavBar from './components/NavBar';
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
//TODO deal with multiple errors with no backend connection
//TODO not getting new lines in create_message
//TODO handle:   code: 'ERR_HTTP_HEADERS_SENT' on the backend (got it from sending an empty update message)



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
