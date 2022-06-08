import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { deleteMessage, updateMessage, voteMessage } from '../features/messages/messagesSlice';
import { messagesDataInterface } from '../types/types';

const Message = (props: any) => {
  const [edit, setEdit] = useState(false);
  const [msg, setMsg] = useState(props.message)
  const dispatch = useAppDispatch();
  const messageData: messagesDataInterface = {
    id: props.id
  }
  const onChange = (e: any) => {
    setMsg(e.target.value);
  }

  const submitUpVote = () => {
    messageData.vote = 1;
    dispatch(voteMessage(messageData));
  }
  const submitDownVote = () => {
    messageData.vote = -1;
    dispatch(voteMessage(messageData));
  }
  const submitDelete = () => {
    dispatch(deleteMessage(messageData));
  }
  const submitEdit = () => {
    if(edit) {
      messageData.text = msg;
      dispatch(updateMessage(messageData))
    }
    setEdit(!edit);
  }
    


  //TODO remove the any from props
  return (
    <section>
      <div className="vote">
        <div className="voters" onClick={submitUpVote}>+</div>
        <div className="vote-count">{props.voteCount} </div>
        <div className="voters" onClick={submitDownVote}>-</div>
      </div>
      <div className="content">
        <div className="content-header">
          <div className="content-header-name">{props.userName}</div>
          <div className="content-header-edits" >
            <span onClick={submitEdit}>Edit</span>
            <span onClick={submitDelete}>X</span>
          </div>
        </div>
        {!edit ? <div className="message">{props.message}</div> :
        <input type='text'
        value={msg}
        onChange={(e) => setMsg(e.target.value)} 
        />
        }
        
        <div className="message">{props.id}</div>
      </div>
    </section>
  )
}

export default Message