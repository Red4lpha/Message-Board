import {Types} from 'mongoose'

interface OwnerInterface {
  name: string,
  name_id: Types.ObjectId | undefined
}

export interface MessagesInterface {
	id?: Types.ObjectId,
  text: string,
	owner: OwnerInterface,
	parent?: Types.ObjectId,
  ancestors?: Types.ObjectId[],
	vote_count?: number,
}

export interface UsersInterface {
  id?: Types.ObjectId,
  name: string,
  email: string,
  password: string,
}