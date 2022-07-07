import { useEffect } from 'react';
import './Main.css';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {  getMessages, reset } from '../features/messages/messagesSlice';
import LinearLoader from './LinearLoader';
import Post from './Post';
//import Comment from './Comment';
import CommentContainer from './CommentContainer';
import NewPost from './NewPost';


const Main = () => {

  const dispatch = useAppDispatch();
  const {messagesArray, isLoading, isError, message} = useAppSelector((state) => state.messages)
  console.log("main comp rerender")
  let childArray  = messagesArray.filter(msg => msg.parent !== null)
  //console.log(childArray)
  
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
                childArray={childArray}
                />
              </article>
          ))}
        </>  
      ) : (
        <h2>No Replies Yet</h2>
      )}
      <NewPost /> 
    </main>
  )
}

export default Main