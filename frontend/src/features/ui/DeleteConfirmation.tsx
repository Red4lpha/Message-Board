import { forwardRef, Ref, useState } from "react";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DeletionProps {
  toggleDelete: () => void;
  submitDelete: () => void;
}

export const DeleteConfirmation = ({toggleDelete, submitDelete}:DeletionProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    toggleDelete();
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
}