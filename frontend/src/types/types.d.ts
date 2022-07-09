export interface userDataInterface {
  _id?: string,
  name?: string,
  email: string,
  password: string,
  token?: string,
}

export interface messagesDataInterface {
  id?: string,
  text?: string,
  owner?: string,
  ownerId?: string,
  vote?: number,
  updatedAt?: string,
  childArray?: any[]
}