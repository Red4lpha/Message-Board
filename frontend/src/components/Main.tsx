import { useEffect } from 'react';
import './Main.css';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {  getMessages, reset } from '../features/messages/messagesSlice';
import LinearLoader from './LinearLoader';
import Post from './Post';
import Comment from './Comment';


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

  const sortChildren = (id: any): any[] => {
    const obj = childArray.filter(o => o.ancestors.find((ob: any) => ob === id ));
    return obj;
  }

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
              <section>
                <Comment
                key={msg._id}
                id={msg._id}
                userName={msg.owner.name}
                voteCount={msg.votes.vote_count}
                message={msg.text}
                />
                
                {sortChildren(msg._id).map((child: any) => (
                  <div className='child'>
                  <Comment
                  key={child._id}
                  id={child._id}
                  userName={child.owner.name}
                  voteCount={child.votes.vote_count}
                  message={child.text}
                  />
                  </div>
                ))}
              </section>
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