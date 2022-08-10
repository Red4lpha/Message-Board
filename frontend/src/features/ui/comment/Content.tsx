import { useAppSelector } from "../../../store/hooks";
import { messagesDataInterface } from "../../../types/types";
import { useContentText } from '../../comments';

interface ContentProps {
  parent:messagesDataInterface['parent']; 
  text:messagesDataInterface['text']; 
  isEditing: boolean;
  submitEdit: (editedMsg: string) => void;
  toggleEdit: () => void;
}

export const Content = ({parent, text, isEditing,  toggleEdit ,submitEdit}:ContentProps) => {
  const { messagesArray } = useAppSelector((state) => state.messages);
  const parentName: string = messagesArray.filter(msg => msg._id === parent)
  .map((parentArray) => parentArray.owner.name).find(a => true);

  const {
    commentText,
    setCommentText,
    msgRef,
    textareaRef,
    styles
  } = useContentText({text, toggleEdit});

  const submitChanges = () => {
    if((text && commentText) && text !== commentText){
      submitEdit(commentText);
    }
    else toggleEdit();
  }

  return (
    <section className="content">
      {!isEditing ? 
      <p className="message" ref={msgRef}>
        {parent? <span className="message-parent-name">@{parentName} </span> : null}
        {commentText}
      </p> 
      : <>
        <textarea ref={textareaRef} 
        onChange={(e) => setCommentText(e.target.value)} 
        style={styles.textareaDefaultStyle}
        value={commentText}
        / >
        <div className="content-update-btn btn" onClick={submitChanges}>
          <span className="btn-text">UPDATE</span>
        </div>  
      </>
      }
    </section>
  );
}

