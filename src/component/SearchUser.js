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
      findAddresses();
    };  
    const findAddresses = () => {
      if (!inputAddress) {
        let addressesResponse;
  
        return (
          axios.get(`https://cors-everywhere.herokuapp.com/http://tweet-application.us-east-1.elasticbeanstalk.com/api/v1.0/tweets/user/search/${inputAddress}`)
            .then(response => {
              if (response.status==200) {
                console.log(response.data);
                return;
              }
              setAddressesList(addressesResponse);
            })
            .catch(error => console.log(error))
        )
      }
    }
  
    return (
      <>
       <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={addressesList}
        getOptionLabel={(option) => option.Text}
        renderInput={(params) => <TextField 
            id="address-input"                          
            {...params} 
            onChange={handleAddressChange}
            label="Search input"
            InputProps={{ ...params.InputProps,
                type: 'search',
            }}
          /> 
        }
        />
    </Stack>
       
      </>
    );
}
export default SearchUser;