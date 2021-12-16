import React from 'react';
import DialogueTips from './../../writingTipsTypes/Dialogue';
import NarrationTips from './../../writingTipsTypes/Narration';
import LineBreakTips from './../../writingTipsTypes/LineBreak';
import TypingTips from './../../writingTipsTypes/Typing';
import AltTextTips from './../../writingTipsTypes/AltText';
import DeletedTips from './../../writingTipsTypes/Deleted';
import ThoughtTips from './../../writingTipsTypes/Thought';
import ImageGuideTips from './../../writingTipsTypes/Image';
import NewChapterTips from './../../writingTipsTypes/NewChapter';

const RenderWritingTips = ({ currentTips }) => {
  let renderedContent;
  switch (currentTips) {
    case 'dialogue':
      renderedContent = <DialogueTips />;
      break;
    case 'narration':
      renderedContent = <NarrationTips />;
      break;
    case 'line break':
      renderedContent = <LineBreakTips />;
      break;
    case 'typing':
      renderedContent = <TypingTips />;
      break;
    case 'translation':
      renderedContent = <AltTextTips />;
      break;
    case 'deleted':
      renderedContent = <DeletedTips />;
      break;
    case 'thought':
      renderedContent = <ThoughtTips />;
      break;
    case 'image':
      renderedContent = <ImageGuideTips />;
      break;
    case 'chapter':
      renderedContent = <NewChapterTips />;
      break;

    default:
      break;
  }
  return <>{renderedContent}</>;
};

export default RenderWritingTips;
