import React, { useEffect, useState } from 'react'
import CardComponent from '../components/CardComponent'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import postService from '../services/postService';
import Form from 'react-bootstrap/Form';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [order,setOrder] = useState('asc')
  const getPosts = async () => {
    const posts = await postService.getPosts(order);
    console.log(posts);
    setPosts(posts)
  }
  useEffect(() => {
    getPosts()
    return () => {
    };
  }, []);

  useEffect(() => {
    getPosts()
  }, [order]);

  return (
    <Container>

      <Form.Select className='my-3' aria-label="Default select example" onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">newest</option>
        <option value="desc">oldest</option>
      </Form.Select>
      <Row>

        {posts.length > 0 ? posts.map((post) => (
          <Col xs={12} md={6}>
            <CardComponent key={post.id} post={post} />
          </Col>

        )):
        <h1 className='text-light'>no posts yet</h1>
        }
      </Row>
    </Container>
  )
}

export default Posts