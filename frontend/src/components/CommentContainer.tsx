import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { replyMessage, setMsgId} from '../features/messages/messagesSlice';
import { messagesDataInterface } from '../types/types';
import Comment from './Comment';

const CommentContainer = ({id, owner, ownerId, vote, text, updatedAt, childArray}:messagesDataInterface) => {
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
    if (id) dispatch(setMsgId(id));
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
        key={id}
        id={id}
        owner={owner}
        ownerId={ownerId}
        vote={vote}
        text={text}
        updatedAt={updatedAt}
        submitReply={submitReply}
        />

      { sortSuccessors(id).length? 
        <div className="child-container">  
        {sortSuccessors(id).filter(child=> child.parent === id).map((child) => (
          
          <CommentContainer
            key={child._id}
            id={child._id}
            owner={child.owner.name}
            ownerId={child.owner.name_id}
            vote={child.votes.vote_count}
            text={child.text}
            updatedAt={child.updatedAt}
            childArray={sortSuccessors(id)}
          />
          
        ))}
        </div>
      : null}
    </>
  )
}

export default CommentContainer
