import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { messagesDataInterface } from "../../types/types";
import { deleteMessage, setMsgId } from "./api/messagesSlice";

export const useDelete = (id: messagesDataInterface['id']) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();
  const messageData: messagesDataInterface = {
    id: id
  };

  const toggleDelete = () => {
    setIsDeleting(!isDeleting);
  }
  const submitDelete = () => {
    if (id) dispatch(setMsgId(id));
    dispatch(deleteMessage(messageData));
  }

  return {
    toggleDelete,
    isDeleting,
    submitDelete,
  }
}
