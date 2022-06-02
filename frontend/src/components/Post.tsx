import {useState} from 'react';
import { useAppDispatch } from '../app/hooks';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import { createMessage } from '../features/messages/messagesSlice';
import { messagesDataInterface } from '../types/types';

const Post = () => {
  const [text, setText] = useState("");

  //const {email, password} = formData;
  const dispatch = useAppDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const messageData: messagesDataInterface = {
      text,
    }
    dispatch(createMessage(messageData));
    setText("");
  }
  const onChange = (e: any) => {
    setText(e.target.value);
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%'},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          onChange={onChange}
          value={text}
        />
      </div>
      <Button onClick={handleSubmit}>POST</Button>
    </Box>
  )
}

export default Post