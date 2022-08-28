import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { messagesDataInterface } from '../../types/types';
import { createMessage, replyMessage } from './api/messagesSlice';

export const useReply = (id?: messagesDataInterface['id']) => {
  //? id is only used for replying to msgs - non-child msgs will not need id
  const [isReplying, setIsReplying] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authUserId = useAppSelector((state) => state.auth.user?._id);

  const toggleReply = () => {
    if (!authUserId) navigate('/login');
    else setIsReplying(!isReplying);
  };

  const submitReply = (
    e: any,
    text: string | undefined,
    setText: React.Dispatch<React.SetStateAction<string | undefined>>
  ) => {
    e.preventDefault();
    if (!authUserId) navigate('/login');

    if (text !== '') {
      //? If a reply message
      if (id) {
        setIsReplying(false);
        const messageData: messagesDataInterface = {
          id,
          text
        };
        dispatch(replyMessage(messageData));
      }
      //? else a new top level message
      else dispatch(createMessage({ text }));

      setText('');
    }
  };

  return {
    toggleReply,
    isReplying,
    submitReply
  };
};
