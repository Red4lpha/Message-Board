import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { replyMessage, setMsgId} from './api/messagesSlice';
import { messagesDataInterface } from '../../types/types';
import { Comment } from './Comment';

interface CommentListProps {
  msgList: any[],
  isParent: boolean
}

export const CommentListTemp = ({msgList, isParent}:CommentListProps) => {
  //const [reply, setReply] = useState("");
  const dispatch = useAppDispatch();
  const [successors, setSuccessors] = useState({});
  //const {replyMessage} = useAppSelector((state) => state.messages)
  
  /* const messageData: messagesDataInterface = {
    id: id
  }  */


  const sortSuccessors = (id: any): any[] => {
    let obj = [];
    if (msgList)  obj = msgList.filter((o:any) => o.ancestors.find((ob: any) => ob === id ));
    return obj;
  }

/*   const submitReply = (reply: string, event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    messageData.text = reply;
    if (id) dispatch(setMsgId(id));
    dispatch(replyMessage(messageData)) 
    //childArray.push(replyMessage)
  } */
  useEffect(() => {
 /*    console.log(`child array for: ${id}`)

    childArray ? console.log(childArray) : 
    console.log("no child")
    console.log('---------------------')  */
  })
    

  //TODO remove double sortSuccessors call
  //TODO remove the any from props
  if (isParent){
    return (
     /*  <>
        {msgList.filter((msg:any) => msg.parent === null).map((msg: any, index: any) => (
          <article>
            <Comment
              key={msg._id}
              id={msg._id}
              owner={msg.owner.name}
              ownerId={msg.owner.name_id}
              vote={msg.votes.vote_count}
              text={msg.text}
              updatedAt={msg.updatedAt}
              submitReply={submitReply}
              parent={msg.parent}
            />

            { sortSuccessors(msg._id).length? 
            <div className="child-container">  
              {sortSuccessors(msg._id).filter(child=> child.parent === msg._id).map((child) => (
                <>
                  <CommentList
                    key={child._id}
                    msgList={sortSuccessors(msg._id)}
                    isParent={false}
                  />
                </>
              ))}
            </div>
            : null}
          </article>
        ))}
      </> */
      <div>temp</div>
    )
  }          

}