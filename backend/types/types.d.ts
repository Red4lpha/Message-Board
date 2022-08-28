import { Types } from 'mongoose';

export interface OwnerInterface {
  name: string;
  name_id: Types.ObjectId | undefined;
}

export interface VoteInterface {
  vote_count: number;
  voters: Types.ObjectId[];
}

export interface MessagesInterface {
  id?: Types.ObjectId;
  text: string;
  owner: OwnerInterface;
  parent?: Types.ObjectId;
  ancestors?: Types.ObjectId[];
  votes: VoteInterface;
  deleted?: boolean;
}

export interface UsersInterface {
  id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
}
