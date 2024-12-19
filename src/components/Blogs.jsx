import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import BlogDetails from "./BlogDetails";

export default function Blogs() {
  const { posts, loading } = useContext(AppContext);

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-20">
      {loading ? (
        <div className="min-h-[80vh] w-full flex justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"/>
            <p className="text-xl text-gray-600 font-medium">Loading posts...</p>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="min-h-[80vh] w-full flex justify-center items-center">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-800 mb-2">No Blogs Found</p>
            <p className="text-gray-600">Check back later for new content</p>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {posts.map((post) => (
            <BlogDetails key={post.id} post={post}/>
          ))}
        </div>
      )}
    </div>
  );
}