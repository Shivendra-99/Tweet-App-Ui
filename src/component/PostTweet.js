import React from "react";
import { Button, Container } from "react-bootstrap";
import wing from "./wing.png";
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
import JoditEditor1 from "./JoditEditor1";

function PostTweet(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const increment = (value)=>{
        handleClose()
         props.refresh(value)
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <>
            <Container className="fixed-bottom my-2" style={{ width: "200px", height: "90px", marginInlineStart: "1250px" }}>
                <Button style={{ backgroundColor: "lightblue", color: "black" }} onClick={handleOpen}><img src={wing} alt="tweet" style={{ width: "40px", height: "40px" }} /> Post Tweet</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <JoditEditor1 val={increment} />
                    </Box>
                </Modal>
            </Container>
        </>
    );
}


export default PostTweet;