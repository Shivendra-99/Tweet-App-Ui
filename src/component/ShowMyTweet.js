import React from "react";
import {Card,CardHeader,CardContent,Avatar,Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton"
import MoreVertIcon from "@mui/icons-material/MoreVert";


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
    /* eslint-enable no-bitwise */

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
function ShowMyTweet(){
    return (
    <Card sx={{maxWidth: 750,marginLeft: "320px"}}>
        <CardHeader 
          avatar={
            <Avatar {...stringAvatar("Shivendra Kumar Sonkar")}/>
          }
          action={
            <IconButton aria-label="Setting">
                <MoreVertIcon/>
            </IconButton>
          }
          title="Shivendra Kumar Sonkar"
          subheader="July 11,2022"       
        />
        <CardContent>
            <Typography paragraph>
            </Typography>
        </CardContent>
    </Card>
    );
}
export default ShowMyTweet;