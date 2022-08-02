import { useAppDispatch } from "../../store/hooks";
import { messagesDataInterface } from "../../types/types";
import { setMsgId, voteMessage } from "./api/messagesSlice";

export const useVote = (id: messagesDataInterface['id']) => {
  const dispatch = useAppDispatch();
  const messageData: messagesDataInterface = {
    id: id
  }

  const submitUpVote = () => {
    messageData.vote = 1;
    if (id) dispatch(setMsgId(id));
    dispatch(voteMessage(messageData));
  }
  const submitDownVote = () => {
    messageData.vote = -1;
    if (id) dispatch(setMsgId(id));
    dispatch(voteMessage(messageData));
  }

  return {
    submitDownVote,
    submitUpVote
  }
}