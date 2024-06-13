import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// This code can be used as auth for any future appwrite projects.

// Advantage of class based is that if we change the backend system from appwrite to lets say Firebase,
// then all we will have to do is change the constructor for that particular framework. The methods in that class will still help to switch easily

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // Sign up
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password }); // Make the user login ie. call another method
      } else {
        return userAccount; // Maybe it is null as the account is not created and we will handle it later
      }
    } catch (err) {
      throw err;
    }
  }

  // Sign in
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (err) {
      throw err;
    }
  }

  // Check user at home page
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      console.log("Appwrite service :: getCurrentUser :: error", err); // Error happens when service fails
    }
    return null; // If account is not found then null will be returned.
  }

  // Log out
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (err) {
      console.log("Appwrite service :: logout :: error", err);
    }
  }
}

const authService = new AuthService();

export default authService;
