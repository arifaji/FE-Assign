import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Topilots from "../img/top.png";

class Home extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
      console.log(res);
      this.setState({
        posts: res.data.slice(0, 10)
      });
    });
  }

  render() {
    const { posts } = this.state;
    const postList = posts.length ? (
      posts.map(post => {
        return (
          <div className="post card m-2" key={post.id}>
            <img src={Topilots} alt="A Top" />
            <div className="card-body">
              <Link to={"/" + post.id}>
                <h5 className="card-title" style={{ color: "red" }}>
                  {post.title}
                </h5>
              </Link>
              <p className="card-text">{post.body}</p>
            </div>
          </div>
        );
      })
    ) : (
      <div className="center">No posts yet</div>
    );
    return (
      <div className="home container">
        <h4 className="center">Home</h4>
        {postList}
      </div>
    );
  }
}

export default Home;
