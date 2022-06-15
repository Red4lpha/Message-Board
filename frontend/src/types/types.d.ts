export interface userDataInterface {
  name?: string,
  email: string,
  password: string,
}

export interface messagesDataInterface {
  id?: string,
  text?: string,
  owner?: string,
  vote?: number,
  childArray?: any[]
}