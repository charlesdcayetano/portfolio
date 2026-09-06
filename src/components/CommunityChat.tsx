import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User } from 'lucide-react';
import { sound } from '../utils/sound';

interface ChatMessage {
  id: string;
  name: string;
  message: string;
  time: string;
  isOwner?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    name: 'Charles (Owner)',
    message: 'Welcome to my portfolio! Feel free to leave a note or ask anything about my systems.',
    time: 'Recently',
    isOwner: true,
  },
  {
    id: '2',
    name: 'Dev Community',
    message: 'Awesome work on Chep-POS and MediCore. The Philippine LGU integration is super clean!',
    time: '2h ago',
  },
];

interface CommunityChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommunityChat: React.FC<CommunityChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('charles_community_chat');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [userName, setUserName] = useState(() => {
    try {
      return localStorage.getItem('charles_chat_name') || '';
    } catch {
      return '';
    }
  });

  const [nameInput, setNameInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      sound.play('toggle');
      document.documentElement.style.overflow = 'hidden';
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [isOpen]);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    const val = nameInput.trim();
    if (!val) return;
    setUserName(val);
    try {
      localStorage.setItem('charles_chat_name', val);
    } catch {}
    sound.play('toggle');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const val = messageInput.trim();
    if (!val) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      name: userName || 'Guest Visitor',
      message: val,
      time: 'Just now',
    };

    const updated = [...messages, newMessage];
    setMessages(updated);
    setMessageInput('');
    try {
      localStorage.setItem('charles_community_chat', JSON.stringify(updated));
    } catch {}

    sound.play('success');
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg/85 backdrop-blur-md transition-opacity"
        onClick={() => {
          sound.play('release');
          onClose();
        }}
      />

      {/* Modal */}
      <div className="relative z-10 flex flex-col w-full max-w-lg h-[32rem] rounded-2xl border border-g200 bg-bg p-5 sm:p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-g200">
          <div>
            <h3 className="font-pixel text-base text-ink">Community Chat</h3>
            <p className="font-mono text-[11px] text-g400">
              Leave a quick greeting or feedback
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-g400 hover:text-ink transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3.5">
          {messages.map((m) => (
            <div key={m.id} className="flex items-start gap-2.5">
              <div className="h-7 w-7 rounded-full bg-g100 border border-g200 flex items-center justify-center shrink-0 font-mono text-[10px] font-bold text-g600">
                {m.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[12px] font-semibold text-ink">
                    {m.name}
                  </span>
                  <span className="font-mono text-[10px] text-g400">{m.time}</span>
                </div>
                <div className="mt-1 inline-block rounded-xl rounded-tl-none border border-g200 bg-g50 px-3 py-2 text-[13px] text-g700 leading-relaxed break-words">
                  {m.message}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input / Name flow */}
        {!userName ? (
          <form onSubmit={handleSaveName} className="pt-3 border-t border-g200 flex gap-2">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter your name to say hi..."
              className="flex-1 rounded-xl border border-g200 bg-g50 px-3.5 py-2 font-mono text-xs text-ink outline-none focus:border-ink transition-colors"
              autoFocus
            />
            <button
              type="submit"
              className="rounded-xl bg-ink px-4 py-2 font-mono text-xs text-bg hover:opacity-85 transition-opacity"
            >
              Next ↵
            </button>
          </form>
        ) : (
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-g200 flex flex-col gap-2">
            <div className="flex items-center justify-between font-mono text-[10.5px] text-g400">
              <span>Chatting as <b className="text-ink">{userName}</b></span>
              <button
                type="button"
                onClick={() => setUserName('')}
                className="hover:text-ink transition-colors"
              >
                Change name
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Say something friendly..."
                className="flex-1 rounded-xl border border-g200 bg-g50 px-3.5 py-2 font-mono text-xs text-ink outline-none focus:border-ink transition-colors"
                autoFocus
              />
              <button
                type="submit"
                className="rounded-xl bg-ink px-3.5 py-2 text-bg hover:opacity-85 transition-opacity"
                title="Send"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
