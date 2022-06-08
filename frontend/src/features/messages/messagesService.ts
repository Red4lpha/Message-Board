import axios from 'axios'

const API_URL: string = '/api/messages/';

const createTokenHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

// Get Messages
const getMessages = async () => {
  const response = await axios.get(API_URL);

  return response.data;
}

//Post top level message
const createMessage = async (messageData: any, token: any) => {
  const header = createTokenHeader(token);
  const response = await axios.post(API_URL + 'create', messageData, header);
  
  return response.data;
}

//Post a message reply
const replyMessage = async (userData: any) => {
  const response = await axios.post(API_URL + userData.id + '/create', userData);

  //TODO reply_message functionality  
  return response.data;
}

//Update a message
const updateMessage = async (messageData: any, token: any) => {
  const header = createTokenHeader(token);
  const {id} = messageData;
  const response = await axios.put(API_URL + id + '/update', messageData, header);

  return response.data;
}

//Delete a message
const deleteMessage = async (messageData: any, token: any) => {
  const header = createTokenHeader(token);
  const {id} = messageData;
  const response = await axios.delete(API_URL + id + '/delete', header);

  return response.data;
}

//Post a vote
const voteMessage = async (messageData: any, token: any) => {
  const header = createTokenHeader(token);
  const {id} = messageData;
  const response = await axios.post(API_URL + id + '/vote', messageData, header);
 
  return response.data;
}


const messagesService = {
  getMessages,
  createMessage,
  replyMessage,
  updateMessage,
  deleteMessage,
  voteMessage
}

export default messagesService