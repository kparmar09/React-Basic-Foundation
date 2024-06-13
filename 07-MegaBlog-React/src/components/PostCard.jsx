import React from "react";
import dataService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <Link to={`/post/${post.$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={dataService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
          <h2 className="text-xl font-bold">{post.title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
