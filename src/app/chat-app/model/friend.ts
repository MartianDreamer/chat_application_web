import { User } from './user';

export interface FriendRelationship {
  id: string | undefined;
  since: string | undefined;
  friend: User;
  type: string | undefined;
}
