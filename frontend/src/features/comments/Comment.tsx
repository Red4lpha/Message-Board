import { useAppSelector } from "../../store/hooks";
import { messagesDataInterface } from '../../types/types';
import { NewPost } from "./NewPost";
import { Content, Controls, DeleteConfirmation, Header, Vote } from '../ui';
import { useDelete, useEdit } from '../comments'
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useReply } from "./useReply";

interface CommentProps {
  id: messagesDataInterface['id'];
  owner: messagesDataInterface['owner']; 
  ownerId: messagesDataInterface['ownerId'];
  vote: messagesDataInterface['vote'];
  text:messagesDataInterface['text'];
  updatedAt:messagesDataInterface['updatedAt'];
  parent:messagesDataInterface['parent']; 
}

export const Comment = ({id, owner, ownerId, vote, text, updatedAt, parent}:CommentProps) => {
  const {isLoading, messageId } = useAppSelector((state) => state.messages);
  
  const {
    isDeleting,
    toggleDelete,
    submitDelete,
  } = useDelete(id);

  const {
    toggleEdit,
    isEditing,
    submitEdit
  } = useEdit({id, text});
  
  const {
    toggleReply,
    isReplying,
    submitReply
  } = useReply(id);


  //? If loading is occuring the comment is replaced by a loading icon
  if (isLoading && messageId === id){
    return (
      <CircularProgress color="secondary" />
    )
  } 

  return (
    <>
      <div className="comment-container container-style">  
        <Vote vote={vote} id={id} />
        
        <Header id={id} owner={owner} ownerId={ownerId} updatedAt={updatedAt}/>

        <Controls ownerId={ownerId} toggleReply={toggleReply} 
        toggleEdit={toggleEdit} toggleDelete={toggleDelete}/>

        <Content parent={parent} text={text} isEditing={isEditing} 
        submitEdit={submitEdit} toggleEdit={toggleEdit} />
        
      </div>
      {isReplying ? 
        <NewPost btnType="REPLY" submitReply={submitReply} toggleReply={toggleReply}/>
        : null}

      {isDeleting? 
        <DeleteConfirmation toggleDelete={toggleDelete} submitDelete={submitDelete} /> 
        : null}
    </>
  )
}