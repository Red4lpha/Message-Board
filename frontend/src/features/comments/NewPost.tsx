import { forwardRef, useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createMessage } from './api/messagesSlice';
import { messagesDataInterface } from '../../types/types';
import avatar from '../../assets/avatars/image-juliusomo.webp';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

interface PostProps {
  btnType: string,
  setIsReplying?: React.Dispatch<React.SetStateAction<boolean>>
  submitReply?: (reply: string, event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  //ref?: ForwardedRef<HTMLDivElement | null>
}

export const NewPost = forwardRef< HTMLDivElement, PostProps>(({btnType, setIsReplying, submitReply}, ref) => {
  const [text, setText] = useState("");
  const newClassName = btnType.toLowerCase();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authUserId = useAppSelector((state) => state.auth.user?._id);
  const {isLoading, loadingArea} = useAppSelector((state) => state.messages)

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!authUserId) navigate('/login');

    if(text !== ""){
      if(setIsReplying) setIsReplying(false);
      if(!submitReply) {
        const messageData: messagesDataInterface = {
          text,
        }
        dispatch(createMessage(messageData));
      }
      else {
        submitReply(text, e);
      }
      setText("");
    }
  }

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "75px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [text]);

  //Loading indicator
  if (isLoading && loadingArea === 'createMessage'){
    return (
      <div className='center'>
        <CircularProgress color="secondary" />
      </div>
    )
  }  

  return (
    
    <section className={`post-container container-style ${newClassName}-post`}
      ref={ref}>
      <div className="post-avatar">
      <img src={avatar} alt="avatar icon"/>
      </div>
      <div className="post-form">
        <textarea ref={textareaRef} 
        onChange={textAreaChange} 
        style={styles.textareaDefaultStyle}
        placeholder="Add a comment...">
          {text}
        </textarea>
      </div>
      <div className="post-btn btn" onClick={handleSubmit}><span className='btn-text'>{btnType}</span></div>
    </section>
  ) 
})

const styles: { [name: string]: React.CSSProperties } = {
  
  textareaDefaultStyle: {
    padding: "8px 15px",
    width: "100%",
    height: "75px",
    display: "block",
    resize: "none",
    fontFamily: "'Rubik', 'Courier New', Courier, monospace",
  },
};