import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { deleteMessage, replyMessage, updateMessage, voteMessage } from '../features/messages/messagesSlice';
import { messagesDataInterface } from '../types/types';

const Message = (props: any) => {
  const [edit, setEdit] = useState(false);
  const [msg, setMsg] = useState(props.message);
  const [reply, setReply] = useState("");
  const [isReplying, setIsReplying] = useState(false); 
  const dispatch = useAppDispatch();
  const messageData: messagesDataInterface = {
    id: props.id
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
  
  const submitReply = () => {
    messageData.text = reply;
    dispatch(replyMessage(messageData))
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
            <span onClick={() => setIsReplying(!isReplying)}>Reply</span>
            <span onClick={submitDelete}>X</span>
          </div>
        </div>
        {!edit ? <div className="message">{props.message}</div> :
        <input type='text'
        value={msg}
        onChange={(e) => setMsg(e.target.value)} 
        />}
        
        <div className="message">{props.id}</div>
      </div>
      {isReplying ? 
        <div className="reply-message">
        <input type='text'
        value={reply}
        onChange={(e) => setReply(e.target.value)} /> 
        <span onClick={submitReply}>Submit Reply</span>
        </div>
        : <></>
      }
    </section>
  )
}

export default Message