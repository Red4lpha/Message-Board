import { forwardRef, useEffect, useState } from 'react';
import './Main.css';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {  getMessages, reset } from '../features/messages/messagesSlice';
//import Post from './Post';
//import Comment from './Comment';
import CommentContainer from './CommentContainer';
import NewPost from './NewPost';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Button } from '@mui/material';
import { FormControls } from './FormControls';


const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Main = () => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const dispatch = useAppDispatch();
  const {messagesArray, isLoading, loadingArea, isError, message} = useAppSelector((state) => state.messages)
  console.log("main comp rerender")
  const {formatRes} = FormControls();
  


  let childArray  = messagesArray.filter(msg => msg.parent !== null)
  

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsToastOpen(false);
  };

  useEffect(() => {
    if (isError) {
      setToastMsg(formatRes(message))
      setIsToastOpen(true);
    } 

    console.log("main useEffect called")
    dispatch(getMessages());
    
    return () => {
      console.log("main useEffect dismount");
      dispatch(reset());
    }
  },[dispatch, isError, message])

   if (isLoading && loadingArea === 'getMessages') {
    return (
    <main>
      <h1>Main message</h1>
      <div className="center">
      <CircularProgress color="secondary" />
      </div>
    </main>
    )
  }   

  //TODO clear out the any type
  //TODO look into why several get calls are used in the get messages function
  return (
    <>
      <main>
        <h1>Main message</h1>
        {}
        {messagesArray.length ? (
          <>
            {messagesArray.filter(msg => msg.parent === null).map((msg: any, index) => (
                <article>
                  <CommentContainer
                  key={msg._id}
                  id={msg._id}
                  owner={msg.owner.name}
                  ownerId={msg.owner.name_id}
                  vote={msg.votes.vote_count}
                  text={msg.text}
                  updatedAt={msg.updatedAt}
                  childArray={childArray}
                  />
                </article>
            ))}
          </>
        ) : (
          <h2>No Replies Yet</h2>
        )}
        <NewPost btnType="SEND"/>
      </main>
      {/* <Button variant="outlined" onClick={() => setIsToastOpen(true)}>
        Open success snackbar
      </Button> */}
      <Snackbar open={isToastOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </>
  ) 
}

export default Main