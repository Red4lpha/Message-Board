import { useEffect } from 'react';
import './Main.css';
import Message from './Message';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {  getMessages, reset } from '../features/messages/messagesSlice';
import LinearLoader from './LinearLoader';
import Post from './Post';


const Main = () => {

  const dispatch = useAppDispatch();
  const {messagesArray, isLoading, isError, message} = useAppSelector((state) => state.messages)

  useEffect(() => {
    //TODO create error message componenet
    if (isError) {
      console.log('Error getting Messages: ',message)
    }

    console.log("main useEffect called")
    dispatch(getMessages())

    return () => {
      //dispatch(reset())
      console.log("main useEffect dismount");
    }
  },[dispatch, isError, message])

  if (isLoading) {
    return (
    <main>
      <h1>Main message</h1>
      <LinearLoader />
    </main>
    )
  } 

  //TODO clear out the any type
  //TODO look into why several get calls are used in the get messages function
  return (
    
    <main>
      <h1>Main message</h1>
      {messagesArray.length ? (
        <>
          {messagesArray.map((msg: any, index) => (
            
            <Message
            key={msg._id}
            id={msg._id}
            userName={msg.owner.name}
            voteCount={msg.votes.vote_count}
            message={msg.text}
            /> 
          ))}
        </>  
      ) : (
        <h2>No Replies Yet</h2>
      )}
      <Post /> 
    </main>
  )
}

export default Main