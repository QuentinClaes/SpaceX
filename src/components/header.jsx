import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const TabStyled = styled(Tab)`
    color: white !important;
    #Mui-selected {
        color:red;
    }
`
const BoxStyled = styled(Box)`
    .Mui-selected {
        color: #b6c2d9 !important;
        border-bottom-color: #b6c2d9 !important;
    }
    img {
        max-width: 200px;
    }
`
const Wrapper = styled.div`
    padding: 0 10%;
    height:100vh;
    background-image: url(https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg);
    background-position: center top;
    background-size: 100% auto;
`
const WrapperTitle = styled.div`
    margin-top: 450px;
    width: 40%;
    color: white;
    -webkit-text-stroke: 2px black; /* width and color */
`

function LinkTab(props) {
  return (
    <TabStyled
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function Header() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Wrapper>
        <BoxStyled>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                <img src={'https://i.ibb.co/HqTqxZV/5842a770a6515b1e0ad75afe.png'} />
                <LinkTab label="Page One" href="/drafts" />
                <LinkTab label="Page Two" href="/trash" />
                <LinkTab label="Page Three" href="/spam" />
            </Tabs>
        </BoxStyled>
        <WrapperTitle>
        <Typography variant="h2" gutterBottom component="div">
        SpaceX Test API
        </Typography>
        <Typography variant="h3" gutterBottom component="div">
        Landing page to test the SpaceX free Api.
        </Typography>
        </WrapperTitle>
    </Wrapper>
  );
}