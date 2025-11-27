export interface Message {
  id: string;
  text: string;
  image?: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

export interface ChatSession {
  id: string;
  contactName: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}