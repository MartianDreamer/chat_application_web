import { User } from './user';

export interface Conversation {
  id: string;
  name: string;
  modifiedAt: string;
  members: Array<User>;
}

export interface ConversationContent {
  type: 'MESSAGE' | 'ATTACHMENT';
  object: {
    id: string;
    to: string;
    from: string;
    timestamp: string;
    content: string;
  };
}

export const MESSAGE = 'MESSAGE'
export const ATTACHMENT = 'ATTACHMENT'