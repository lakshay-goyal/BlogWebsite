import React from 'react';
import { NavLink } from 'react-router-dom';

const BlogDetails = ({post}) => {
  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200">
      <NavLink to={`/blog/${post.id}`}>
        <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-3">
          {post.title}
        </h2>
      </NavLink>
      
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <span>By</span>
        <span className="font-medium text-gray-900">{post.author}</span>
        <span>in</span>
        <NavLink 
          to={`/categories/${post.category.replaceAll(" ","-")}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {post.category}
        </NavLink>
        <span>•</span>
        <time className="text-gray-500">{post.date}</time>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.content}
      </p>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag, index) => (
          <NavLink 
            key={index} 
            to={`/tags/${tag.replaceAll(" ","-")}`}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-600 transition-colors"
          >
            #{tag}
          </NavLink>
        ))}
      </div>
    </article>
  );
};

export default BlogDetails;