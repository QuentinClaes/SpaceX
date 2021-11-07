import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadposts } from "../store/posts";
import { useEffect } from "react";
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import YouTube from 'react-youtube';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Pagination from '@mui/material/Pagination';

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

const WrapperContainer = styled.div`
  padding-top: 200px;
  padding-bottom: 200px;
`;

const Posts = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [index, setIndex] = useState(0)
    const [youtubeOPTS, setYoutubeOPTS] = useState({
        height: '400',
        width: '100%',
        playerVars: {
          autoplay: 1,
        },
      })
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
        };
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.list);
    const options = {
        "query": { upcoming: false},
        "options": { 
            page: page,
            limit: limit,
            sort: '-date_local',
        },
      }
    useEffect(() => {
        dispatch(loadposts(options));
    }, [dispatch, limit, page]);

    const handleChangePage = (event, newPage) => {
        console.log('mon event', event)
        setPage(newPage);
      };

      const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
      };

      const handleOpen1 = (index) => {
        setIndex(index)
        handleOpen()
        };

        function isDateBeforeToday(date) {
            return new Date(date.toDateString()) < new Date(new Date().toDateString());
        }
    console.log('mes ifos', posts)
    return (
        <WrapperContainer>
            <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Patch</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Details</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="center">Success</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.docs&&[0] ? posts.docs.map((row, index) => (
              <>
            <TableRow
              key={row.id}
              onClick={() => handleOpen1(index)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left"><Avatar alt="Remy Sharp" src={row.links.patch.small} /></TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.details}</TableCell>
              <TableCell align="left">{new Date(row.date_utc).toLocaleDateString('en-US')}</TableCell>
              <TableCell align="center">
                  {isDateBeforeToday(new Date(row.date_utc)) ? <Chip label={row.success ? "Success" : "Failure"} color={row.success ? "success" : "error"} /> : <Chip label={"hasn't taken off yet"} color={"warning"} />}
                  
            </TableCell>
            </TableRow>
                        </>
          )): null}
        </TableBody>
      </Table>
      <Typography>Page: {page}</Typography>
      <Pagination count={posts.totalPages} page={page} onChange={handleChangePage} />
    </TableContainer>
                        {posts.docs&&[index] ? <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          {/* <Box sx={style}>
                          <Avatar alt="SpaceX" src={posts.docs[index].links.patch.large} sx={{ width: 200, height: 200 }}/>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                            {posts.docs[index].name}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {posts.docs[index].details}
                            </Typography>
                          </Box> */}
                          <Card sx={style}>
      <CardHeader
        avatar={
<Avatar alt="SpaceX" src={posts.docs[index].links.patch.large} sx={{ width: 150, height: 150 }}/>
        }
        title={'🚀 ' + posts.docs[index].name + ' 🚀'}
        subheader={'📅' + new Date(posts.docs[index].date_utc).toLocaleDateString('en-US')}
      />
        {posts.docs[index].links.youtube_id ? <YouTube videoId={posts.docs[index].links.youtube_id} opts={youtubeOPTS} /> : null }
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {posts.docs[index].details}
        </Typography>
      </CardContent>
      </Card>
                        </Modal> : null}
        </WrapperContainer>
    );
};

export default Posts;