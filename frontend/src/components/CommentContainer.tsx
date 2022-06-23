import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { replyMessage} from '../features/messages/messagesSlice';
import { messagesDataInterface } from '../types/types';
import Comment from './Comment';

const CommentContainer = ({id, owner, vote, text, childArray}:messagesDataInterface) => {
  //const [reply, setReply] = useState("");
  const dispatch = useAppDispatch();
  //const {replyMessage} = useAppSelector((state) => state.messages)
  const messageData: messagesDataInterface = {
    id: id
  } 
  const sortSuccessors = (id: any): any[] => {
    let obj = [];
    if (childArray)  obj = childArray.filter((o:any) => o.ancestors.find((ob: any) => ob === id ));
    return obj;
  }

  const submitReply = (reply: string, event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    messageData.text = reply;
    dispatch(replyMessage(messageData)) 
    //childArray.push(replyMessage)
  }
  useEffect(() => {
 /*    console.log(`child array for: ${id}`)

    childArray ? console.log(childArray) : 
    console.log("no child")
    console.log('---------------------')  */
  })
    

  //TODO remove double sortSuccessors call
  //TODO remove the any from props
  return (
    <>
      <Comment
        id={id}
        owner={owner}
        vote={vote}
        text={text}
        submitReply={submitReply}
        />
      {sortSuccessors(id).filter(child=> child.parent === id).map((child) => (
        <div className="child">
        <CommentContainer
          key={child._id}
          id={child._id}
          owner={child.owner.name}
          vote={child.votes.vote_count}
          text={child.text}
          childArray={sortSuccessors(id)}
        />
        </div>
      ))}
    </>
  )
}

export default CommentContainer
