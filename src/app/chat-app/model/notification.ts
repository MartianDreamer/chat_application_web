export interface AppNotification {
  id: string | undefined;
  timestamp: string;
  content: any;
  type: string;
}

export const MESSAGE = 'MESSAGE';
export const FRIEND_REQUEST = 'FRIEND_REQUEST';
export const ATTACHMENT = 'ATTACHMENT';
export const FRIEND_ACCEPT = 'FRIEND_ACCEPT';
export const NEW_CONVERSATION = 'NEW_CONVERSATION';
export const ONLINE_STATUS_CHANGE = 'ONLINE_STATUS_CHANGE';
export const SEEN_BY = 'SEEN_BY';
