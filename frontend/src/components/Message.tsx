import { useAppDispatch } from "../app/hooks";
import { deleteMessage, voteMessage } from '../features/messages/messagesSlice';
import { messagesDataInterface } from '../types/types';

const Message = (props: any) => {
  const dispatch = useAppDispatch();
  const messageData: messagesDataInterface = {
    id: props.id
  }

  const submitUpVote = () => {
    messageData.vote = 1;
    dispatch(voteMessage(messageData));
  }
  const submitDownVote = () => {
    messageData.vote = -1;
    dispatch(voteMessage(messageData));
  }
  const submitDelete = () => {
    dispatch(deleteMessage(messageData));
  }
    


  //TODO remove the any from props
  return (
    <section>
      <div className="vote">
        <div className="voters" onClick={submitUpVote}>+</div>
        <div className="vote-count">{props.voteCount} </div>
        <div className="voters" onClick={submitDownVote}>-</div>
      </div>
      <div className="content">
        <div className="content-header">
          <div className="content-header-name">{props.userName}</div>
          <div className="content-header-edits" onClick={submitDelete}>X</div>
        </div>
        <div className="message">{props.message}</div>
        <div className="message">{props.id}</div>
      </div>
    </section>
  )
}

export default Message