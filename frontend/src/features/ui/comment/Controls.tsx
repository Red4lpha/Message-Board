import {ReactComponent as ReplyIcon} from '../../../assets/icon-reply.svg';
import {ReactComponent as EditIcon} from '../../../assets/icon-edit.svg';
import {ReactComponent as DeleteIcon} from '../../../assets/icon-delete.svg';
import { messagesDataInterface } from '../../../types/types';
import { useAppSelector } from '../../../store/hooks';
interface ControlsProps {
  ownerId: messagesDataInterface['ownerId'];
  toggleReply: () => void;
  toggleEdit: () => void;
  toggleDelete: () => void;
}

export const Controls = ({ownerId, toggleReply, toggleEdit, toggleDelete}: ControlsProps) => {
  const authUserId = useAppSelector((state) => state.auth.user?._id);
  
  return (
  <section className="edit" >
    {(authUserId === ownerId) ? 
      <>
        <span className="edit-delete" 
          onClick={toggleDelete}>
          <DeleteIcon aria-label="delete icon" />
          <span className="edit-text">Delete</span> 
        </span>
        <span className="edit-edit" 
        onClick={toggleEdit}>
          <EditIcon aria-label="edit icon" />      
          <span className="edit-text">Edit</span>  
        </span>
      </>
      :
      <span onClick={toggleReply}>
        <ReplyIcon aria-label="reply icon" />
        <span className="edit-text">Reply</span> 
      </span>
    }
  </section>
 )
}