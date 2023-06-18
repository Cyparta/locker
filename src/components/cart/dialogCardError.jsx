import { Dialog } from "@mui/material";
import React from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DialogCardError = ({ open, handleClose }) => {
  // open dialog if shipping is greater than 10
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ color: "#6E2E02" }}>
          {"Shipping Address"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            no available shipping address. go to shopping Address and remove one
            adress
          </DialogContentText>

          <Link to="/profile">
            <button
              className="main-btn-outline"
              style={{
                width: "auto",
                padding: "12px 68px",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Back to profile
            </button>
          </Link>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogCardError;
