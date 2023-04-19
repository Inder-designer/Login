import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Login from './Login';
import './style.css'
import Signup from './Signup';
import LoginLive from './LoginLive';

const AuthPage = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <div className='authPage'>
            <div className="container">
                
                <TabContext value={value}>
                    <Box sx={{marginBottom: "30px"}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" >
                            <Tab label="Login" value="1" />
                            <Tab label="Signup" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><LoginLive/></TabPanel>
                    <TabPanel value="2"><Signup/></TabPanel>
                </TabContext>
            </div>
        </div>
    )
}

export default AuthPage