import React from 'react';
import DeletedMessage from './messageTypes/Deleted';
import DialogueMessage from './messageTypes/Dialogue';
import LineBreak from './messageTypes/LineBreak';
import TypingMessage from './messageTypes/Typing';
import Narration from './messageTypes/Narration';
import ThoughtMessage from './messageTypes/Thought';

const MessageList = ({ messages, setMessageId, editMessage, mode }) => {
  const RenderMessages = (message) => {
    switch (message?.type) {
      case 'narration':
        return (
          <Narration
            message={message}
            key={message?._id}
            setMessageId={setMessageId}
            editMessage={editMessage}
            previousMessage={getPreviousMessage(message)}
            mode={mode}
          />
        );
      case 'lineBreak':
        return (
          <LineBreak
            message={message}
            key={message?._id}
            setMessageId={setMessageId}
            editMessage={editMessage}
            previousMessage={getPreviousMessage(message)}
            mode={mode}
          />
        );
      case 'typing':
        return (
          <TypingMessage
            message={message}
            key={message?._id}
            setMessageId={setMessageId}
            editMessage={editMessage}
            previousMessage={getPreviousMessage(message)}
            mode={mode}
          />
        );
      case 'dialogue':
        return (
          <DialogueMessage
            message={message}
            key={message?._id}
            editMessage={editMessage}
            setMessageId={setMessageId}
            previousMessage={getPreviousMessage(message)}
            mode={mode}
          />
        );
      case 'deleted':
        return (
          <DeletedMessage
            message={message}
            setMessageId={setMessageId}
            key={message?._id}
            editMessage={editMessage}
            previousMessage={getPreviousMessage(message)}
            mode={mode}
          />
        );
      case 'thought':
        return (
          <ThoughtMessage
            message={message}
            key={message?._id}
            setMessageId={setMessageId}
            editMessage={editMessage}
            previousMessage={getPreviousMessage(message)}
            mode={mode}
          />
        );
      default:
        return (
          <DialogueMessage
            message={message}
            setMessageId={setMessageId}
            editMessage={editMessage}
            key={message?._id}
            previousMessage={getPreviousMessage(message)}
            mode={mode}
          />
        );
    }
  };

  const getPreviousMessage = (currentMsg) => {
    let previousMessage = {};
    const currentMsgIndex = messages.findIndex((message) => message._id === currentMsg._id);
    if (currentMsgIndex === 0) {
      previousMessage = {};
    } else {
      previousMessage = messages[currentMsgIndex - 1];
    }
    return previousMessage;
  };

  return (
    <div className={`py-10 ${mode === 'edit' ? 'px-10' : 'px-0'}`}>
      {messages?.length > 0 && messages?.map((message) => RenderMessages(message))}
    </div>
  );
};

export default MessageList;
