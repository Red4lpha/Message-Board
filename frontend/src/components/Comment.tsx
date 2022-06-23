import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { deleteMessage, replyMessage, updateMessage, voteMessage } from '../features/messages/messagesSlice';
import { messagesDataInterface } from '../types/types';

interface CommentProps {
  id: messagesDataInterface['id'];
  owner: messagesDataInterface['owner']; 
  vote: messagesDataInterface['vote'];
  text:messagesDataInterface['text'];
  submitReply: (reply: string, event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const Comment = ({id, owner, vote, text, submitReply}:CommentProps) => {
  const [edit, setEdit] = useState(false);
  const [msg, setMsg] = useState(text);
  const [reply, setReply] = useState("");
  const [isReplying, setIsReplying] = useState(false); 
  const dispatch = useAppDispatch();
  const messageData: messagesDataInterface = {
    id: id
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
  
  useEffect(() => {
    /* console.log(`child array for: ${props.id}`)
    props.childArray.length > 0 ? console.log(props.childArray) : 
    console.log("no child")
    console.log('---------------------') */
  })
    


  //TODO remove the any from props
  return (
    <div className="msg-container">
      <div className="vote">
        <div className="voters" onClick={submitUpVote}>+</div>
        <div className="vote-count">{vote} </div>
        <div className="voters" onClick={submitDownVote}>-</div>
      </div>
      <div className="content">
        <div className="content-header">
          <div className="content-header-name">{owner}</div>
          <div className="content-header-edits" >
            <span onClick={submitEdit}>Edit</span>
            <span onClick={() => setIsReplying(!isReplying)}>Reply</span>
            <span onClick={submitDelete}>X</span>
          </div>
        </div>
        {!edit ? <div className="message">{text}</div> :
        <input type='text'
        value={msg}
        onChange={(e) => setMsg(e.target.value)} 
        />}
        
        <div className="message">{id}</div>
        {/* <div>{props.childArray}</div> */}
      </div>
      {isReplying ? 
        <div className="reply-message">
        <input type='text'
        value={reply}
        onChange={(e) => setReply(e.target.value)} /> 
        <span onClick={(e) => submitReply(reply, e)}>Submit Reply</span>
        </div>
        : <></>
      }
    </div>
  )
}

export default Comment