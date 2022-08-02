import { createRef, useEffect, useState } from "react";

interface UseContentTextProps {
  text: string | undefined;
  toggleEdit?: () => void;
  toggleReply?: () => void;
}

export const useContentText = (({text, toggleEdit, toggleReply}:UseContentTextProps) => {
  //? Editing message will be set to 0, which will be changed by the text size,
  //? but replies and new messages will have an initial fixed height of 75px
  const initialHeightValue = toggleEdit ? 0 : 75;
  const [commentText, setCommentText] = useState(text);
  const [msgHeight, setMsgHeight] = useState(initialHeightValue);
  const msgRef = createRef<HTMLDivElement>();
  const textareaRef = createRef<HTMLTextAreaElement>();

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
      if (textareaRef.current && !textareaRef.current.contains(event.target)
      && event.target.innerText !== 'UPDATE' && event.target.innerText !== 'REPLY' 
      && event.target.innerText !== 'SEND' && event.target.innerText !== 'Reply'
      && event.target.innerText !== 'Edit') {
        setCommentText(text);
        if (toggleEdit) toggleEdit();
        if (toggleReply) toggleReply();
      }
    }

    const handleEscPress = (event: any) => {
      if (textareaRef.current && event.key === 'Escape') {
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
    textareaRef
  }
});