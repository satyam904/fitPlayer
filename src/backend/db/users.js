import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have likes (Likes are set to 0 by default), History Array, Playlists Array (added Watch Later Playlist in it by default) by default
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Satyam",
    lastName: "Sahu",
    email: "satyam@gmail.com",
    password: "satyam",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
