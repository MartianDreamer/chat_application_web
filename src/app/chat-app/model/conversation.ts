import { User } from './user';

export interface Conversation {
  id: string;
  name: string;
  modifiedAt: string;
  members: Array<User>;
}

export interface ConversationContent {
  type: 'MESSAGE' | 'ATTACHMENT';
  read: boolean;
  dto: {
    id: string;
    to: string;
    from: string;
    timestamp: string;
    content: string;
  };
}

export const MESSAGE = 'MESSAGE';
export const ATTACHMENT = 'ATTACHMENT';
