import { messagesDataInterface } from '../../types/types';
import { Comment } from './Comment';

export const CommentList = ({id, owner, ownerId, vote, text, updatedAt, childArray, parent}:messagesDataInterface) => {

  const sortSuccessors = (id: any): any[] => {
    let obj = [];
    if (childArray)  obj = childArray.filter((o:any) => o.ancestors.find((ob: any) => ob === id ));
    return obj;
  }
  let successors = sortSuccessors(id);

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
        parent={parent}
        />

      { successors.length? 
        <div className="child-container">  
        {successors.filter(child=> child.parent === id).map((child) => (
          
          <CommentList
            key={child._id}
            id={child._id}
            owner={child.owner.name}
            ownerId={child.owner.name_id}
            vote={child.votes.vote_count}
            text={child.text}
            updatedAt={child.updatedAt}
            childArray={successors}
            parent={child.parent}
          />
        ))}
        </div>
      : null}
    </>
  )
}