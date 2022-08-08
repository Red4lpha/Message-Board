import {ReactComponent as PlusIcon} from '../../../assets/icon-plus.svg';
import {ReactComponent as MinusIcon} from '../../../assets/icon-minus.svg';
import { messagesDataInterface } from '../../../types/types';
import { useVote } from '../../comments/useVote'

interface VoteProps {
  vote: messagesDataInterface['vote']; 
  id: messagesDataInterface['id'];
}

export const Vote = ({vote, id}:VoteProps) => {

  const {
    submitDownVote,
    submitUpVote
  } = useVote(id);

  return (
    <section className="vote">
      <div className="vote-btn" onClick={submitUpVote}>
        <PlusIcon aria-label="icon for plus upvote" />
      </div>
      <div className="vote-count">{vote} </div>
      <div className="vote-btn" onClick={submitDownVote}>
        <MinusIcon aria-label="icon for minus downvote" />
      </div>
    </section>
    );
}