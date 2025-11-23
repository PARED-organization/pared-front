"use client";

import React from "react";
import PostComment from "./PostComment";

export default function CommentList(){
    React.memo(function CommentList({ innerComments = [] }) {
  return innerComments.map((data, index) => (
    <PostComment key={data.id ?? index} idx={index} comment={data} />
  ));
});
}


