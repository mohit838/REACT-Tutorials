import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    const gePosts = async () => {
      const { data: res } = await axios.get(apiEndPoint);
      setPosts(res);
    };

    gePosts();
  }, []);

  const handleAddPost = async () => {
    const post = { title: "New Post", body: "New" };
    await axios.post(apiEndPoint, post);
    setPosts([post, ...posts]);
  };

  const handleUpdatePost = async (post) => {
    post.title = "update title";
    post.body = "update body";
    await axios.put(apiEndPoint + "/" + post.id);
    const postsClone = [...posts];
    const index = postsClone.indexOf(post);
    postsClone[index] = { ...post };
    setPosts(postsClone);
  };

  const handleDeletePost = async (post) => {
    await axios.delete(apiEndPoint + "/" + post.id + post);
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <h1>CURD OP using Axios</h1>
      <hr />
      <button onClick={handleAddPost} type="submit">
        Add Post
      </button>
      <hr />
      <table className="tableDesign">
        <thead>
          <tr>
            <th>Title</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>
                <button onClick={() => handleUpdatePost(post)} type="submit">
                  Update
                </button>
              </td>
              <td>
                <button onClick={() => handleDeletePost(post)} type="submit">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
