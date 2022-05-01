import {Types} from 'mongoose'

export interface OwnerInterface {
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
  deleted?: boolean
}

export interface UsersInterface {
  id?: Types.ObjectId,
  name: string,
  email: string,
  password: string,
}