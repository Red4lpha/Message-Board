import { useState } from 'react';
import './Main.css';
import Message from './Message';
import { useAppDispatch } from '../app/hooks';
import { getMessages } from '../features/messages/messagesSlice';

const Main = () => {
  const [messageData, setMessageData] = useState({
    userName: 'Kevin',
    voteCount: 1,
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus unde dignissimos praesentium. Modi itaque doloribus eum eligendi vitae. Labore nihil quia fugit a dolor, soluta nesciunt saepe non commodi sunt.'
  })

  const dispatch = useAppDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    //const temp: string = 'temp'
    dispatch(getMessages())
  }

  return (
    <main>
      <h1>Main message</h1>
      <button onClick={handleSubmit}>Test Get All</button>
      <Message userName={messageData.userName} voteCount={messageData.voteCount} message={messageData.message}/>
      <Message />
      <Message />
    </main>
  )
}

export default Main