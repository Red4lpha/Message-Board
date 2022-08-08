import { createRef, useEffect, useState } from "react";

interface UseContentTextProps {
  text: string | undefined;
  toggleEdit?: () => void;
  toggleReply?: () => void;
}

export const useContentText = (({text, toggleEdit, toggleReply}:UseContentTextProps) => {
  //? When editing a message(the msgHeight) will be set to 16, 
  //? which will be changed by the height size of the message text
  //? but replies and new messages will have an initial fixed height of 75px
  const initialHeightValue = toggleEdit ? 16 : 75;
  const [commentText, setCommentText] = useState(text);
  const [msgHeight, setMsgHeight] = useState(initialHeightValue);
  const msgRef = createRef<HTMLDivElement>();
  const textareaRef = createRef<HTMLTextAreaElement>();

  const styles: { [name: string]: React.CSSProperties } = {
  
    textareaDefaultStyle: {
      padding: "8px 15px",
      width: "100%",
      height: msgHeight + "px",
      display: "block",
      resize: "none",
      fontFamily: "'Rubik', 'Courier New', Courier, monospace",
    },
  };

  useEffect(() => {
    //? Handles controlling of the textarea height
    if (msgRef.current?.clientHeight) {
      setMsgHeight(msgRef.current?.clientHeight);
    }
    if (textareaRef && textareaRef.current) {  
      textareaRef.current.style.height = msgHeight + "px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }

    const handleClickOutside = (event: any) => {
      //? Detects outside clicks when editing/replying a message
      if (textareaRef.current && (textareaRef.current === document.activeElement) 
      && !textareaRef.current.contains(event.target)
      && event.target.innerText !== 'UPDATE' && event.target.innerText !== 'REPLY' 
      && event.target.innerText !== 'SEND' && event.target.innerText !== 'Reply'
      && event.target.innerText !== 'Edit') {
        console.log('click detected')
        setCommentText(text);
        if (toggleEdit) toggleEdit();
        if (toggleReply) toggleReply();
      }
    }

    const handleEscPress = (event: any) => {
      //? Detects 'Esc' pressing when editing/replying a message
      if (textareaRef.current //&& (toggleReply || toggleEdit)
      && event.key === 'Escape') {
        setCommentText(text);
        if (toggleEdit) toggleEdit();
        if (toggleReply) toggleReply();
      }
    }

    //? Event listener for cancelling text editing
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscPress);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscPress);
    };

  },[msgHeight, msgRef, text, textareaRef, toggleEdit, toggleReply]);
  
  return {
    commentText,
    setCommentText,
    msgHeight,
    setMsgHeight,
    msgRef,
    textareaRef,
    styles
  }
});