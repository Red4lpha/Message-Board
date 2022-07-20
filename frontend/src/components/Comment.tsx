import { createRef, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteMessage, setMsgId, updateMessage, voteMessage } from '../features/messages/messagesSlice';
import { messagesDataInterface } from '../types/types';
import {ReactComponent as PlusIcon} from '../assets/icon-plus.svg';
import {ReactComponent as MinusIcon} from '../assets/icon-minus.svg';
import avatar from '../assets/avatars/image-juliusomo.webp';
import {ReactComponent as ReplyIcon} from '../assets/icon-reply.svg';
import {ReactComponent as EditIcon} from '../assets/icon-edit.svg';
import {ReactComponent as DeleteIcon} from '../assets/icon-delete.svg';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import NewPost from "./NewPost";
import DeleteConfirmation from "./DeleteConfirmation";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
dayjs().format();
dayjs.extend(relativeTime);

interface CommentProps {
  id: messagesDataInterface['id'];
  owner: messagesDataInterface['owner']; 
  ownerId: messagesDataInterface['ownerId'];
  vote: messagesDataInterface['vote'];
  text:messagesDataInterface['text'];
  updatedAt:messagesDataInterface['updatedAt'];
  parent:messagesDataInterface['parent']; 
  submitReply: (reply: string, event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const Comment = ({id, owner, ownerId, vote, text, updatedAt, parent,submitReply}:CommentProps) => {
  const [edit, setEdit] = useState(false);
  const [msg, setMsg] = useState(text);
  const [isReplying, setIsReplying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);  
  const [msgHeight, setMsgHeight] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const msgRef = useRef<HTMLDivElement | null>(null);
  const replyRef = createRef<HTMLDivElement>();
  const dispatch = useAppDispatch();
  const authUserId = useAppSelector((state) => state.auth.user?._id);
  const date = dayjs(updatedAt).fromNow();
  const {isLoading, messageId, messagesArray} = useAppSelector((state) => state.messages);
  const parentName: string = messagesArray.filter(msg => msg._id === parent).map((parentArray) => parentArray.owner.name).find(a => true);
  const messageData: messagesDataInterface = {
    id: id
  }

  const submitUpVote = () => {
    messageData.vote = 1;
    if (id) dispatch(setMsgId(id));
    dispatch(voteMessage(messageData));
  }
  const submitDownVote = () => {
    messageData.vote = -1;
    if (id) dispatch(setMsgId(id));
    dispatch(voteMessage(messageData));
  }
  const submitDelete = () => {
    if (id) dispatch(setMsgId(id));
    dispatch(deleteMessage(messageData));
  }
  const submitEdit = () => {
    if(edit) {
      messageData.text = msg;
      if (id) dispatch(setMsgId(id))
      dispatch(updateMessage(messageData))
    }
    setEdit(!edit);
  }
  
  useEffect(() => {
    if (msgRef.current?.clientHeight) {
      setMsgHeight(msgRef.current?.clientHeight);
    }
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = msgHeight + "px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }

    const handleClickOutside = (event: any) => {
      //? Detects outside clicks when editing a message
      if (textareaRef.current && !textareaRef.current.contains(event.target)
      && event.target.innerText !== 'UPDATE') {
        setMsg(text);
        setEdit(!edit);
      }
      //? Detects outside clicks when replying to a message
      else if (isReplying && replyRef.current && !replyRef.current.contains(event.target)
      && event.target.innerText !== 'Reply')
      {
        setIsReplying(!isReplying);
      }
    }
    const handleEscPress = (event: any) => {
      if (textareaRef.current && event.key === 'Escape') {
        setMsg(text);
        setEdit(!edit);
      }
      else if (replyRef.current && event.key === 'Escape') {
        setIsReplying(!isReplying);
      }
    }

    //? Event listener for cancelling text editing
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscPress);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscPress);
    };
  }, [msg, msgHeight, isReplying, replyRef, setMsg, setEdit]);

  const styles: { [name: string]: React.CSSProperties } = {
  
    textareaDefaultStyle: {
      padding: "8px 15px",
      width: "100%",
      height: (msgHeight+16) + "px",
      display: "block",
      resize: "none",
      fontFamily: "'Rubik', 'Courier New', Courier, monospace",
    },
  };

  //? If loading is occuring the comment is replaced by a loading icon
  if (isLoading && messageId === id){
    return (
      <CircularProgress color="secondary" />
    )
  } 

  //TODO remove the any from props
  return (
    <>
      <div className="comment-container container-style">
        <section className="vote">
          <div className="vote-btn" onClick={submitUpVote}>
            <PlusIcon aria-label="icon for plus upvote" />
          </div>
          <div className="vote-count">{vote} </div>
          <div className="vote-btn" onClick={submitDownVote}>
            <MinusIcon aria-label="icon for minus downvote" />
          </div>
        </section>
        
        <section className="header">
          <span className="header-avatar">
            <img src={avatar} alt="avatar icon"/>
          </span>
          <h2 className="header-name">{owner}</h2>
          {(authUserId === ownerId) ? <span className="header-you">you</span> :null }
          <span className="header-time">{date}</span>
        </section>

        <section className="edit" >
          {(authUserId === ownerId) ? 
            <>
              <span className="edit-delete" 
                onClick={() => setIsDeleting(!isDeleting)}>
                <DeleteIcon aria-label="delete icon" />
                <span className="edit-text">Delete</span> 
              </span>
              <span className="edit-edit" 
              onClick={() => setEdit(!edit)}>
                <EditIcon aria-label="edit icon" />      
                <span className="edit-text">Edit</span>  
              </span>
            </>
            :
            <span onClick={() => setIsReplying(!isReplying)}>
              {/* <img src={replyIcon} alt="reply to post icon"/> */}
              <ReplyIcon aria-label="reply icon" />
              <span className="edit-text">Reply</span> 
            </span>
          }
        </section>

        <section className="content">
          {!edit ? 
          <p className="message" ref={msgRef}>
            {parent? <span className="message-parent-name">@{parentName} </span> : null}
            {msg}
          </p> 
          : <>
            <textarea ref={textareaRef} 
            onChange={(e) => setMsg(e.target.value)} 
            style={styles.textareaDefaultStyle}
            value={msg}
            / >
            <div className="content-update-btn btn" onClick={submitEdit}>
              <span className="btn-text">UPDATE</span>
            </div>  
          </>
          }
        </section>
      </div>
      {isReplying ? 
        <NewPost btnType="REPLY" submitReply={submitReply} ref={replyRef} />
        : null}
      {isDeleting? <DeleteConfirmation setIsDeleting={setIsDeleting} submitDelete={submitDelete} /> : null}
    </>
  )
}

export default Comment
