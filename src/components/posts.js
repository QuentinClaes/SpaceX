import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadposts } from "../store/posts";
import { useEffect } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import YouTube from "react-youtube";
import Pagination from "@mui/material/Pagination";
import Alert from "@mui/material/Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const WrapperContainer = styled.div`
  padding-top: 100px;
  padding-bottom: 200px;
`;

const WrapperPaper = styled(Paper)`
  padding: 20px;
`;

const Posts = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [index, setIndex] = useState(0);
  const [youtubeOPTS, setYoutubeOPTS] = useState({
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.list);
  const options = {
    query: { upcoming: false },
    options: {
      page: page,
      limit: limit,
      sort: "-date_local",
    },
  };
  useEffect(() => {
    dispatch(loadposts(options));
  }, [dispatch, limit, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleModalOpen = (index) => {
    setIndex(index);
    handleOpen();
  };

  function isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
  }

  return (
    <>
      <Box
        sx={{
          paddingTop: 15,
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "100%",
          },
        }}
      >
        <WrapperPaper elevation={3}>
          <h2>👨🏽‍🚀 SpaceX REST API testing page 👨🏽‍🚀</h2>
          <p>
            Small page to test the SpaceX REST API. I choose to display all the
            past launches in a table.You can click on every row of the table to
            open a modal displaying the informations about the selected launch.
          </p>
          <Alert severity="warning">
            We are not affiliated, associated, authorized, endorsed by, or in
            any way officially connected with Space Exploration Technologies
            Corp (SpaceX), or any of its subsidiaries or its affiliates. The
            names SpaceX as well as related names, marks, emblems and images are
            registered trademarks of their respective owners.
          </Alert>
        </WrapperPaper>
      </Box>
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
              {posts.docs && [0]
                ? posts.docs.map((row, index) => (
                    <>
                      <TableRow
                        key={row.id}
                        onClick={() => handleModalOpen(index)}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">
                          <Avatar
                            alt="Remy Sharp"
                            src={row.links.patch.small}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.details}</TableCell>
                        <TableCell align="left">
                          {new Date(row.date_utc).toLocaleDateString("fr-FR")}
                        </TableCell>
                        <TableCell align="center">
                          {isDateBeforeToday(new Date(row.date_utc)) ? (
                            <Chip
                              label={row.success ? "Success" : "Failure"}
                              color={row.success ? "success" : "error"}
                            />
                          ) : (
                            <Chip
                              label={"hasn't taken off yet"}
                              color={"warning"}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    </>
                  ))
                : null}
            </TableBody>
          </Table>
          <Pagination
            count={posts.totalPages}
            page={page}
            onChange={handleChangePage}
          />
        </TableContainer>
        {posts.docs && [index] ? (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Card sx={style}>
              <CardHeader
                avatar={
                  <Avatar
                    alt="SpaceX"
                    src={
                      posts.docs[index].links.patch.large
                        ? posts.docs[index].links.patch.large
                        : null
                    }
                    sx={{ width: 100, height: 100 }}
                  />
                }
                title={"🚀 " + posts.docs[index].name + " 🚀"}
                subheader={
                  "📅 " +
                  new Date(posts.docs[index].date_utc).toLocaleDateString(
                    "fr-FR"
                  ) +
                  " 📅"
                }
              />
              {posts.docs[index].links.youtube_id ? (
                <YouTube
                  videoId={posts.docs[index].links.youtube_id}
                  opts={youtubeOPTS}
                />
              ) : null}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {posts.docs[index].details}
                </Typography>
              </CardContent>
            </Card>
          </Modal>
        ) : null}
      </WrapperContainer>
    </>
  );
};

export default Posts;
