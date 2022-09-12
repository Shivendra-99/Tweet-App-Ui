import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Search } from "@material-ui/icons";
import axios from "axios";

const SearchUser = (props) => {

    const [addressesList, setAddressesList] = useState([]);
    const [inputAddress, setInputAddress] = useState("");
  
    const handleAddressChange = (event) => {
      setInputAddress(event.target.value);
      findAddresses(event.target.value);
    };  
    const findAddresses = (text) => {
      if (!text) {
        let addressesResponse;
        console.log(text)
        return (
          axios.get(`https://cors-everywhere.herokuapp.com/http://tweet-application.us-east-1.elasticbeanstalk.com/api/v1.0/tweets/user/search/${inputAddress}`)
            .then(response => {
              if (response.status==200) {
                setAddressesList(response.data);
                return;
              }
            })
            .catch(error => console.log(error))
        )
      }
    }
  
    return (
      <div>
       <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={addressesList.map((option,keys) => option)}
        renderInput={(params) => <TextField 
            id="address-input"       
            color="success"
            variant="filled"                
            {...params} 
            onChange={handleAddressChange}
            label="Search User By Name"
            
            InputProps={{ ...params.InputProps,
                type: 'search',
                style: {background: "white"}
            }}
          /> 
        }
        />
    </Stack>
       
      </div>
    );
}
export default SearchUser;
