import React, { Component } from "react"
import axios from "axios"
import Post from "./Post/Post"

import "./App.css"

import Header from "./Header/Header"
import Compose from "./Compose/Compose"

class App extends Component {
  constructor() {
    super()

    this.state = {
      posts: []
    }

    this.updatePost = this.updatePost.bind(this)
    this.getPosts = this.getPosts.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.createPost = this.createPost.bind(this)
    this.searchPosts = this.searchPosts.bind(this)
  }

  componentDidMount() {
    // fetch posts, setting the array returned onto posts on state
    axios
      .get("https://practiceapi.devmountain.com/api/posts")
      .then((res) => {
        this.setState({ posts: res.data })
      })
      .catch((err) => console.log(err))
  }

  getPosts() {
    axios
      .get("https://practiceapi.devmountain.com/api/posts")
      .then((res) => {
        this.setState({ posts: res.data })
      })
      .catch((err) => console.log(err))
  }

  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then((res) => {
        this.setState({ posts: res.data })
      })
      .catch((err) => console.log(err))
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then((res) => {
        this.setState({ posts: res.data })
      })
  }

  createPost(text) {
    axios
      .post(`https://practiceapi.devmountain.com/api/posts`, { text })
      .then((res) => {
        this.setState({ posts: res.data })
      })
  }

  searchPosts(text) {
    axios
      .get(`https://practiceapi.devmountain.com/api/posts/filter?text=${text}`)
      .then((res) => {
        this.setState({ posts: res.data })
      })
      .catch((err) => console.log(err))
  }

  render() {
    const { posts } = this.state

    return (
      <div className="App__parent">
        <Header getPosts={this.getPosts} searchPosts={this.searchPosts} />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />

          {/*map over posts on state, and render a Post component for each post*/}
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                text={post.text}
                date={post.date}
                id={post.id}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}
              />
            )
          })}
        </section>
      </div>
    )
  }
}

export default App
