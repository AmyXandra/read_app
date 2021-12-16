import React, { useContext, useState } from 'react';
import Button from '../shared/button/Button';
import { StoriesContext } from './../../context/StoriesContext';
import {
  processCommentOnChatStoryDraftAsync,
  processCompleteChatStoryDraftReviewAsync,
  processApproveChatStoryDraftAsync,
} from './../../store/actions/Stories';
import { notificationHandler } from './../../libs/util/Notification';

export default function AdminConversionActions({ status, storyId, updateStoryDraft, comment }) {
  const { dispatch } = useContext(StoriesContext);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isReviewing, setIsCompletingReview] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const saveFeedback = async () => {
    try {
      if (comment === null || comment === undefined || comment.length === 0) {
        return;
      }
      setIsAddingComment(true);
      const payload = { chatStoryDraft: storyId, comment };
      const { message } = await processCommentOnChatStoryDraftAsync(dispatch, payload);
      notificationHandler('success', message);
      updateStoryDraft();
    } catch (error) {
      notificationHandler('error', error.message);
    } finally {
      setIsAddingComment(false);
    }
  };

  const sendForRevision = async () => {
    try {
      setIsCompletingReview(true);
      await saveFeedback();
      const { message } = await processCompleteChatStoryDraftReviewAsync(dispatch, storyId);
      notificationHandler('success', message);
      updateStoryDraft();
    } catch (error) {
      notificationHandler('error', error.message);
    } finally {
      setIsCompletingReview(false);
    }
  };

  const approveChatStoryDraft = async () => {
    try {
      setIsApproving(true);
      const { message } = await processApproveChatStoryDraftAsync(dispatch, storyId);
      notificationHandler('success', message);
      updateStoryDraft();
    } catch (error) {
      notificationHandler('error', error.message);
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <>
      {/* save response */}
      {status === 'inreview' && (
        <>
          <Button
            buttonText='Save Feedback'
            clicked={saveFeedback}
            disabled={isAddingComment || isReviewing}
            classNames='whipik-button whipik-button__gray mr-0 sm:mr-3'
          />
          <Button
            buttonText='Send for Revision'
            clicked={sendForRevision}
            disabled={isAddingComment || isReviewing}
            classNames='whipik-button whipik-button__primary mr-0 sm:mr-3'
          />
          <Button
            buttonText='Approve'
            clicked={approveChatStoryDraft}
            disabled={isApproving}
            classNames='whipik-button whipik-button__success mr-0 sm:mr-3'
          />
        </>
      )}
    </>
  );
}
