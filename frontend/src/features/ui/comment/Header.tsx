import { messagesDataInterface } from "../../../types/types";
import avatar from '../../../assets/avatars/image-juliusomo.webp';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAppSelector } from "../../../store/hooks";
dayjs().format();
dayjs.extend(relativeTime);

interface HeaderProps {
  id: messagesDataInterface['id'];
  owner: messagesDataInterface['owner']; 
  ownerId: messagesDataInterface['ownerId'];
  updatedAt:messagesDataInterface['updatedAt'];
}

export const Header = ({id, owner, ownerId, updatedAt}: HeaderProps) => {
  const date = dayjs(updatedAt).fromNow();
  const authUserId = useAppSelector((state) => state.auth.user?._id);
  
  return(
    <section className="header">
      <span className="header-avatar">
        <img src={avatar} alt="avatar icon"/>
      </span>
      <h2 className="header-name">{owner}</h2>
      {(authUserId === ownerId) ? <span className="header-you">you</span> :null }
      <span className="header-time">{date}</span>
  </section>
  )
}