import { useState} from 'react';
import { useAppSelector } from '../../store/hooks';
import avatar from '../../assets/avatars/image-juliusomo.webp';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { useContentText } from './useContentText';

interface PostProps {
  btnType: string,
  toggleReply?: () => void;
  submitReply: (e: any, text: string | undefined, 
    setText: React.Dispatch<React.SetStateAction<string | undefined>>) => void;
}

export const NewPost = ({btnType, toggleReply, submitReply}: PostProps) => {

  const [text, setText] = useState("");
  const newClassName = btnType.toLowerCase();
  const {isLoading, loadingArea} = useAppSelector((state) => state.messages)

  const {
    commentText,
    setCommentText,
    textareaRef,
    styles
  } = useContentText({text, toggleReply});

  const handleClick = (e: any) => {
    submitReply(e, commentText, setCommentText);
  }

  //Loading indicator
  if (isLoading && loadingArea === 'createMessage'){
    return (
      <div className='center'>
        <CircularProgress color="secondary" />
      </div>
    )
  }  

  return (
    
    <section className={`post-container container-style ${newClassName}-post`}>
      <div className="post-avatar">
      <img src={avatar} alt="avatar icon"/>
      </div>
      <div className="post-form">
        <textarea ref={textareaRef}  
        onChange={(e) => setCommentText(e.target.value)} 
        style={styles.textareaDefaultStyle}
        value={commentText}
        placeholder="Add a comment..." />  
      </div>
      <div className="post-btn btn" onClick={handleClick}>
        <span className='btn-text'>{btnType}</span>
      </div>
    </section>
  ) 
}