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
  vote?: number,
  childArray?: any[]
}