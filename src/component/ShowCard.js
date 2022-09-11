import React, { useState } from "react";
import { Button } from "react-bootstrap";
import moment from 'moment';
import Favorite from '@material-ui/icons/Favorite';
import { FavoriteBorder } from '@material-ui/icons';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, Typography, CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton"
import { toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

function ShowCard(props) {
    const history = useNavigate();
    const [comm, setComm] = useState("");
    const [fav, setFav] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [length, setlength] = useState(0);
    const { key, username, twee, time, like, index, setDel } = props;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid blue',
        boxShadow: 24,
        p: 4,
        borderRadius: "16px"
    };
    const countlength = (event) => {
        var co = event.target.value;
        setComm(co);
        setlength(co.length);
    }
    const youClicked = () => {
        setFav(!fav);
        var all = JSON.parse(localStorage.getItem("Alldata"));
        var userId = JSON.parse(localStorage.getItem("data")).userId;
        var tweetid = all[index].tweetId;
        fetch(`https://cors-everywhere.herokuapp.com/http://tweet-application.us-east-1.elasticbeanstalk.com/api/v1.0/tweets/${userId}/like/${tweetid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            const data = response.json();
            if (response.status === 200 || data === null) {
                toast.success("Tweet Like Successfully", {
                    position: "bottom-center"
                });
            } else {
                toast.error("Something went wrong", {
                    position: "bottom-center"
                });
            }
        }).catch((resp) => {
            toast.error(resp, {
                position: "bottom-center"
            });
        });
    }
    return (
        <Card sx={{ maxWidth: '700px', marginLeft: "290px", marginTop: "15px", border: '1px solid blue' }} key={key}>
            <CardHeader
                avatar={
                    <Avatar {...stringAvatar(username)} style={{ marginLeft: "10px" }} />
                }
                action={
                    <IconButton aria-label="Setting">
                        <MoreVertIcon color="primary" />
                    </IconButton>
                }
                title={username}
                subheader={moment(time).fromNow()}
            />
            <CardContent style={{ marginLeft: "60px" }}>
                <Typography paragraph>
                    {<span dangerouslySetInnerHTML={{ __html: twee }} />}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="share" style={{ marginLeft: "50px" }} onClick={youClicked}>
                    {
                        fav ? <Favorite color="error" /> : <FavoriteBorder color="primary" />
                    }
                </IconButton> {like.length}
                {
                    setDel ?
                        <IconButton aria-label="share" style={{ marginLeft: "150px" }}>
                            <EditIcon color="primary" />
                        </IconButton>
                        :
                        <IconButton aria-label="share" style={{ marginLeft: "150px" }} onClick={handleOpen}>
                            <CommentIcon color="primary" />
                        </IconButton>
                }
                {
                    setDel ?
                        <IconButton aria-label="share" style={{ marginLeft: "150px" }} onClick={() => {
                            var all = JSON.parse(localStorage.getItem("Mydata"));
                            var userId = JSON.parse(localStorage.getItem("data")).userId;
                            var tweetid = all[index].tweetId;
                            if (window.confirm('Are you sure to delete this Tweet?')) {
                                fetch(`https://cors-everywhere.herokuapp.com/http://tweet-application.us-east-1.elasticbeanstalk.com/api/v1.0/tweets/${userId}/delete/${tweetid}`, {
                                    method: 'DELETE',
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then((response) => {
                                    if (response.status === 200) {
                                        toast.success("Tweet Deleted Successfully", {
                                            position: "bottom-center"
                                        });
                                    } else {
                                        toast.error("Something went wrong", {
                                            position: "bottom-center"
                                        });
                                    }
                                }).catch((resp) => {
                                    toast.error(resp, {
                                        position: "bottom-center"
                                    });
                                });
                            }

                        }}>
                            <DeleteForeverIcon htmlColor="red" />
                        </IconButton>
                        :
                        <IconButton aria-label="share" style={{ marginLeft: "150px" }}>
                            <ShareIcon color="primary" />
                        </IconButton>
                }
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <textarea rows={6} cols={38} placeholder="write your comment Here" onChange={countlength} value={comm}></textarea>
                        <h6 style={{ fontSize: "15px", marginLeft: "260px" }}>{length}/146</h6>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Button onClick={() => {
                                var all = JSON.parse(localStorage.getItem("Alldata"));
                                var userId = all[index].userId;
                                var tweetid = all[index].tweetId;
                                if (comm.length !== 0) {
                                    fetch(`https://cors-everywhere.herokuapp.com/http://tweet-application.us-east-1.elasticbeanstalk.com/api/v1.0/tweets/${userId}/reply/${tweetid}`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            comment: comm,
                                        })
                                    }).then((response) => {
                                        const data = response.json();
                                        if (response.status === 200 || data === null) {
                                            window.alert("Comment Posted Successfully");
                                        } else {
                                            window.alert("Something went wrong")

                                        }
                                    }).catch((resp) => {
                                        window.alert("Something went wrong");
                                    });

                                } else {
                                    window.alert("Comment can not be empty");
                                }

                            }}>Post Comment</Button>
                        </Typography>
                    </Box>
                </Modal>
            </CardActions>
            {/*   <Card.Subtitle className="mb-2 text-black" style={{ marginLeft: "70px" }}>{twee}</Card.Subtitle>
            <Card.Text>
            </Card.Text>
            <div style={{
                display: 'block',
                width: 'fit-content',
                marginLeft: "60px"
            }}>
                <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        name="checkedH" />}
                    label={like.length}
                    className="text-black"
                    onClick={() => {
                        
                    }}
                />

                <Button style={{ marginLeft: "95px" }} onClick={handleOpen}><CommentIcon /> Comment</Button>
                <Button style={{ marginLeft: "120px", backgroundColor: "white", outline: "white" }} onClick={() => {


                    
                }
                }
                ><DeleteForeverIcon sx={{ color: red[500] }} /></Button>
            </div> */}
        </Card>
    );
}
export default ShowCard;
