import {createPostDao} from "../dao/post.dao.js";

export const createPostService = async (postData) => {
  return await createPostDao(postData);
}