import { User } from './user';

export interface FriendRelationship {
  id: string | undefined;
  since: string | undefined;
  friend: User;
}

export interface FriendRequest {
  id: string;
  user: User;
  type: string; 
}
