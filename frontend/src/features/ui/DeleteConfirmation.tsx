import { forwardRef, Ref, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ThemeProvider } from "@mui/material/styles";
//import Theme from "../style/theme";
//import NewPost from "./NewPost";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DeletionProps {
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>; 
  submitDelete: () => void;
}

export const DeleteConfirmation = ({setIsDeleting, submitDelete}:DeletionProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setIsDeleting(false);
  };
  const handleDelete = () => {
    submitDelete();
    handleClose();
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{sx: {
          width: 350,
        } }}
        >
        <div className="delete-confirm-container"
        style={{padding:'25px'}}>
          <h2>Delete comment</h2>
          <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
          <div className="delete-confirm-btns">
            <span className="delete-no btn" onClick={handleClose}>NO, CANCEL</span>
            <span className="delete-yes btn" onClick={handleDelete}>YES, DELETE</span>
          </div>
        </div>
      </Dialog>
    </>
  );

 /*  return (
    <div>
      <ThemeProvider theme={Theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{sx: {
          width: 300,
        } }}
      >
        <DialogTitle>{"Delete comment"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this comment? This will remove the comment and can't be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined"
          color="primary" >
            NO, CANCEL
          </Button>
          <Button onClick={handleDelete} variant="outlined" 
          sx={{backgroundColor: 'red', color: 'white'}}>
            YES, DELETE
          </Button>
        </DialogActions>
        
      </Dialog>
      </ThemeProvider>
    </div>
  ); */
}