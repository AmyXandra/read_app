import { userRoleTypes } from '../../../libs/util';
export const messageTypesArray = [
  '(break)',
  '(typing)',
  '(meaning: text)',
  '(thinking)',
  '(deleted)',
  '(image)',
  '(episode)',
];

const findFeedbackForm = (tabs) => {
  return tabs.some((tab) => tab.name === 'feedback');
};

const showWriterFeedBackForm = (storyDetails, setStoryTabs, tabsArray, setFeedbackFormEditable) => {
  if (storyDetails?.status === 'editreview' || storyDetails?.status === 'approved') {
    setFeedbackFormEditable(false);
    if (findFeedbackForm(tabsArray)) {
      return;
    }
    tabsArray.push({ name: 'feedback', current: false, id: 2 });
    setStoryTabs([...new Set(tabsArray)]);
  } else {
    const filterTabsArray = tabsArray.filter((tab) => tab.name !== 'feedback');
    setStoryTabs([...new Set(filterTabsArray)]);
  }
};

const showAdminFeedBackForm = (storyDetails, setStoryTabs, tabsArray, setFeedbackFormEditable) => {
  if (
    storyDetails?.status === 'submitted' ||
    storyDetails?.status === 'inreview' ||
    storyDetails?.status === 'editreview' ||
    storyDetails?.status === 'approved'
  ) {
    if (storyDetails?.status === 'editreview' || storyDetails?.status === 'approved') {
      setFeedbackFormEditable(false);
    }
    if (storyDetails?.status === 'inreview') {
      setFeedbackFormEditable(true);
    }
    if (findFeedbackForm(tabsArray)) {
      return;
    }
    tabsArray.push({ name: 'feedback', current: false, id: 2, href: '#' });
    setStoryTabs([...new Set(tabsArray)]);
  } else {
    const filterTabsArray = tabsArray.filter((tab) => tab.name !== 'feedback');
    setStoryTabs([...new Set(filterTabsArray)]);
  }
};

export function showFeedbackForm(
  user,
  storyDetails,
  setStoryTabs,
  storyTabs,
  setFeedbackFormEditable
) {
  const tabsArray = [...storyTabs];
  if (user?.roles.includes(userRoleTypes['writer'])) {
    showWriterFeedBackForm(storyDetails, setStoryTabs, tabsArray, setFeedbackFormEditable);
  }

  if (
    user?.roles.includes(userRoleTypes['contentManager']) ||
    user?.roles.includes(userRoleTypes['admin']) ||
    user?.roles.includes(userRoleTypes['superAdmin'])
  ) {
    showAdminFeedBackForm(storyDetails, setStoryTabs, tabsArray, setFeedbackFormEditable);
  }
}

export function showWritersActionButtons(user) {
  if (user?.roles.includes(userRoleTypes['writer'])) {
    return true;
  }
  return false;
}
