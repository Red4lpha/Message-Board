import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteMessage, replyMessage, updateMessage, voteMessage } from '../features/messages/messagesSlice';
import { messagesDataInterface } from '../types/types';
import plus from '../assets/icon-plus.svg';
import minus from '../assets/icon-minus.svg';
import avatar from '../assets/avatars/image-juliusomo.webp';
import replyIcon from '../assets/icon-reply.svg';
import editIcon from '../assets/icon-edit.svg';
import deleteIcon from '../assets/icon-delete.svg';

interface CommentProps {
  id: messagesDataInterface['id'];
  owner: messagesDataInterface['owner']; 
  ownerId: messagesDataInterface['ownerId'];
  vote: messagesDataInterface['vote'];
  text:messagesDataInterface['text'];
  submitReply: (reply: string, event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const Comment = ({id, owner, ownerId, vote, text, submitReply}:CommentProps) => {
  const [edit, setEdit] = useState(false);
  const [msg, setMsg] = useState(text);
  const [reply, setReply] = useState("");
  const [isReplying, setIsReplying] = useState(false); 
  const dispatch = useAppDispatch();
  const authUserId = useAppSelector((state) => state.auth.user?._id);
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
    <div className="comment-container container-style">
      <section className="vote">
        <div className="vote-btn" onClick={submitUpVote}>
          <img src={plus} alt="positive up vote"/>
        </div>
        <div className="vote-count">{vote} </div>
        <div className="vote-btn" onClick={submitDownVote}>
        <img src={minus} alt="minus down vote"/>
        </div>
      </section>
      
      <section className="header">
        <span className="header-avatar">
          <img src={avatar} alt="avatar icon"/>
        </span>
        <h2 className="header-name">{owner}</h2>
        {(authUserId === ownerId) ? <span className="header-you">you</span> :<></> }
      </section>

      <section className="edit" >
        {(authUserId === ownerId) ? 
          <>
            <span className="edit-delete" onClick={submitDelete}>
              <img src={deleteIcon} alt="delete post icon"/>
              <span className="edit-text">Delete</span> 
            </span>
            <span onClick={submitEdit}>
              <img src={editIcon} alt="edit post icon"/>
              <span className="edit-text">Edit</span>  
            </span>
          </>
          :
          <span onClick={() => setIsReplying(!isReplying)}>
            <img src={replyIcon} alt="reply to post icon"/>
            <span className="edit-text">Reply</span> 
          </span>
        }
      </section>

      <section className="content">
        {!edit ? <div className="message">{text}</div> :
        <input type='text'
        value={msg}
        onChange={(e) => setMsg(e.target.value)} 
        />}
        
        <div className="message">{id}</div>
        {/* <div>{props.childArray}</div> */}
        {isReplying ? 
          <div className="reply-message">
          <input type='text'
          value={reply}
          onChange={(e) => setReply(e.target.value)} /> 
          <span onClick={(e) => submitReply(reply, e)}>Submit Reply</span>
          </div>
          : <></>
        }
      </section>
    </div>
  )
}

export default Comment