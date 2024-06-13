import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DataService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Post related services :--   (Database)

  // Create a new post
  // here, in the featuredImage field, we will pass the fileId that stores that image in the bucket (storage)
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  // Update a post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // document id
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (err) {
      console.log("Appwrite service :: updatePost :: error", err);
    }
  }

  // Delete a post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug // document id
      );
      return true; // if post is deleted
    } catch (err) {
      console.log("Appwrite service :: deletePost :: error", err);
      return false; // if post is not deleted
    }
  }

  // Get a particular post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug // document id
      );
    } catch (err) {
      console.log("Appwrite service :: getPost :: error", err);
      return false;
    }
  }

  // Get all posts
  // Queries can be only applied to indexes in the appwrite database [We made status as an index in our database]
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (err) {
      console.log("Appwrite service :: getPosts :: error", err);
      return false;
    }
  }

  // File (image) services :--  (Bucket)

  // Upload file
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (err) {
      console.log("Appwrite service :: uploadFile :: error", err);
      return false;
    }
  }

  // Delete file
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", err);
      return false;
    }
  }

  // To get file preview
  // No async here as no promise is being handled in the function (I know this from the appwrite documentation)
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const dataService = new DataService();
export default dataService;
