import {Types} from 'mongoose'

export interface MessagesInterface {
	id?: Types.ObjectId,
  text: string,
	owner: Types.ObjectId,
	parent?: Types.ObjectId,
	vote_count?: number,
}

export interface UsersInterface {
  id?: Types.ObjectId,
  name: string,
  email: string,
  password: string,
}