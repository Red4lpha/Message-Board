import {useEffect, useRef, useState} from 'react';
import { useAppDispatch } from '../app/hooks';
import { createMessage } from '../features/messages/messagesSlice';
import { messagesDataInterface } from '../types/types';
import avatar from '../assets/avatars/image-juliusomo.webp';

interface PostProps {
  btnType: string,
  submitReply?: (reply: string, event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const NewPost = ({btnType, submitReply}:PostProps) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
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

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "75px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [text]);

  return (
    <section className='post-container container-style'>
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
}

export default NewPost

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