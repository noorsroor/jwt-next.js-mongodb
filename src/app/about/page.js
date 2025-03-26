import axios from "axios";

async function getPosts() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
}

export default async function About() {
    const posts = await getPosts();
  
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">📰 Latest Posts</h1>
        <ul className="space-y-4">
          {posts.slice(0, 5).map((post) => (
            <li key={post.id} className="p-4 bg-white rounded-lg shadow">
              <strong className="text-lg text-gray-800">{post.title}</strong>
              <p className="text-gray-600">{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  