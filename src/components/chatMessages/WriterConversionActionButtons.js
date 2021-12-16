import React, { useContext, useState } from 'react';
import Button from '../shared/button/Button';
import { StoriesContext } from './../../context/StoriesContext';
import {
  submitChatStoryDraftHelper,
  convertStoryDraftHelper,
  revertChatStoryDraftHelper,
} from '../chatStory/helper';

export default function WriterConversionActions({
  status,
  storyId,
  updateStoryDraft,
  isSavingStory,
  saveChatStoryDraft,
  draftMessage,
  storyDetails,
  setStoryModalIsOpen,
}) {
  const { dispatch } = useContext(StoriesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReverting, setIsReverting] = useState(false);

  const submitChatStory = submitChatStoryDraftHelper(
    dispatch,
    storyId,
    null,
    setIsSubmitting,
    draftMessage,
    storyDetails,
    updateStoryDraft,
    setStoryModalIsOpen
  );

  const convertChatStoryDraft = convertStoryDraftHelper(
    setIsReverting,
    dispatch,
    storyId,
    null,
    updateStoryDraft,
    draftMessage
  );

  const revertToDraft = revertChatStoryDraftHelper(
    setIsReverting,
    dispatch,
    storyId,
    null,
    updateStoryDraft
  );

  return (
    <>
      {(status === 'draft' || status === 'editreview' || status === 'approved') && (
        <Button
          buttonText='Save'
          clicked={() => saveChatStoryDraft(false)}
          type='button'
          disabled={isSavingStory}
          classNames='whipik-button whipik-button__primary mr-0 sm:mr-3'
        />
      )}
      {/* submit */}
      {(status === 'draft' || status === 'editreview') && (
        <Button
          buttonText={status === 'draft' ? 'Submit' : 'Re-Submit'}
          clicked={submitChatStory}
          disabled={isSubmitting}
          type='button'
          classNames='whipik-button whipik-button__gray mr-0 sm:mr-3'
        />
      )}
      {/* revert to draft */}
      {status === 'submitted' && (
        <Button
          buttonText='Revert to draft'
          clicked={revertToDraft}
          type='button'
          disabled={isReverting}
          classNames='whipik-button whipik-button__success mr-0 sm:mr-3'
        />
      )}

      {/* transform to draft */}
      {status === 'approved' && (
        <Button
          buttonText='Convert'
          clicked={convertChatStoryDraft}
          type='button'
          classNames='whipik-button whipik-button__success mr-0 sm:mr-3'
        />
      )}
    </>
  );
}
