import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { messagesDataInterface } from "../../types/types";
import { setMsgId, updateMessage } from "./api/messagesSlice";

interface UseEditProps {
  id: messagesDataInterface['id'];
  text: messagesDataInterface['text']; 
}

export const useEdit = ({id, text}: UseEditProps) => { 
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState(text);
  const dispatch = useAppDispatch();
  const messageData: messagesDataInterface = {
    id: id
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }

  const submitEdit = () => {
    if(isEditing) {
      messageData.text = commentText;
      if (id) dispatch(setMsgId(id))
      dispatch(updateMessage(messageData))
    }
    setIsEditing(!isEditing); 
  } 

  return {
    toggleEdit,
    isEditing,
    commentText,
    setCommentText,
    submitEdit
  }
}