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
  const dispatch = useAppDispatch();
  const messageData: messagesDataInterface = {
    id: id
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }

  const submitEdit = (editedMsg: string) => {
    if(isEditing) {
      messageData.text = editedMsg;
      console.log("comment text: ", editedMsg);
      if (id) dispatch(setMsgId(id))
      dispatch(updateMessage(messageData))
    }
    setIsEditing(!isEditing); 
  } 

  return {
    toggleEdit,
    isEditing,
    submitEdit
  }
}