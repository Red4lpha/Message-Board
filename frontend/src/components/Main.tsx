import { useEffect, useState } from 'react';
import './Main.css';
import Message from './Message';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getMessages } from '../features/messages/messagesSlice';

const Main = () => {
  const [messageData, setMessageData] = useState({
    userName: 'Kevin',
    voteCount: 1,
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus unde dignissimos praesentium. Modi itaque doloribus eum eligendi vitae. Labore nihil quia fugit a dolor, soluta nesciunt saepe non commodi sunt.'
  })

  

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMessages())
  },[dispatch])
  
  const {messagesArray} = useAppSelector((state) => state.messages)

  //TODO clear out the any type
  //TODO look into why several get calls are used in the get messages function
  return (
    
    <main>
      <h1>Main message</h1>
      <Message userName={messageData.userName} voteCount={messageData.voteCount} message={messageData.message}/>
      {messagesArray != null ? (
        <>
          {messagesArray.map((msg: any) => (
            <Message
            key={msg._id}
            userName={msg.owner.name}
            voteCount={msg.votes.vote_count}
            message={msg.text}
            />
          ))}
        </>  
      ) : (
        <h2>No Replies Yet</h2>
      )}
    </main>
  )
}

export default Main