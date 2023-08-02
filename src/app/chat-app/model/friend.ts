import { User } from './user';

export interface FriendRelationship {
  id: string;
  since: string;
  friend: User;
}
