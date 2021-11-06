import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadposts } from "../store/posts";
import { useEffect } from "react";
import styled from 'styled-components';

const WrapperImg = styled.img`
  max-width: 30px;
`;

const Posts = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.list);
    const options = {
        "options": { 
            page: page,
            limit: limit,
        },
      }
    useEffect(() => {
        dispatch(loadposts(options));
    }, [dispatch]);
    console.log('post', posts)
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {console.log('mon post', posts)}
                {posts.docs[0] ? posts.docs.map((post) => (
                    <li key={post.name}>{post.name} <WrapperImg src={post.links.patch.large}/></li>
                )): null}
            </ul>
        </div>
    );
};

export default Posts;