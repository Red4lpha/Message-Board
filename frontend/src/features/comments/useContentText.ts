import { createRef, forwardRef, useEffect, useRef, useState } from "react";
import { messagesDataInterface } from "../../types/types";

interface UseContentTextProps {
  text: string | undefined;
  toggleEdit?: () => void;
  toggleReply?: () => void;
}

export const useContentText = (({text, toggleEdit, toggleReply}:UseContentTextProps) => {
  const [commentText, setCommentText] = useState(text);
  const [msgHeight, setMsgHeight] = useState(0);
  //const msgRef = useRef<HTMLDivElement | null>(null);
  //const textareaRef = useRef<HTMLTextAreaElement | null>(null);
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
      && event.target.innerText !== 'SEND' && event.target.innerText !== 'reply') {
        setCommentText(text);
        if (toggleEdit) toggleEdit();
        if (toggleReply) toggleReply();
      }


      //? Detects outside clicks when replying to a message
      /* else if (isReplying && replyRef.current && !replyRef.current.contains(event.target)
      && event.target.innerText !== 'Reply')
      {
        setIsReplying(!isReplying);
      } */
    }


    const handleEscPress = (event: any) => {
      if (textareaRef.current && event.key === 'Escape') {
        setCommentText(text);
        if (toggleEdit) toggleEdit();
        if (toggleReply) toggleReply();
      }
    /*   else if (replyRef.current && event.key === 'Escape') {
        toggleReply();
      } */
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