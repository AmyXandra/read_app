import React from 'react';
import Deleted from './Deleted';
import Dialog from './Dialog';
import LineBreak from './LineBreak';
import Narration from './Narration';
import Thought from './Thought';
import Typing from './Typing';

export default function MessageType({ data, numberOfChatMessages, tapToRead = () => {} }) {
  let dataType = data.type;
  return (
    <div>
      {dataType === 'dialogue' && (
        <Dialog data={data} numberOfChatMessages={numberOfChatMessages} tapToRead={tapToRead} />
      )}
      {dataType === 'narration' && (
        <Narration data={data} numberOfChatMessages={numberOfChatMessages} tapToRead={tapToRead} />
      )}
      {dataType === 'lineBreak' && (
        <LineBreak data={data} numberOfChatMessages={numberOfChatMessages} tapToRead={tapToRead} />
      )}
      {dataType === 'deleted' && (
        <Deleted data={data} numberOfChatMessages={numberOfChatMessages} tapToRead={tapToRead} />
      )}
      {dataType === 'thought' && (
        <Thought data={data} numberOfChatMessages={numberOfChatMessages} tapToRead={tapToRead} />
      )}
      {dataType === 'typing' && (
        <Typing data={data} numberOfChatMessages={numberOfChatMessages} tapToRead={tapToRead} />
      )}
    </div>
  );
}
