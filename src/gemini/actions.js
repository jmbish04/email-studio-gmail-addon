import { ACTIONS, SERVICE } from '../utils/constants';
import { showErrorNotification, showInfoNotification } from '../utils/notification';
import { getGmailAPI } from '../utils';

const service = SERVICE.GEMINI;

const actionDraftEmailReply = ({ formInput }) => {
  const draft = formInput[EMAIL.ID];
  if (!draft) {
    return showErrorNotification('Please select an email draft');
  }
  const url = getGmailAPI({
    service,
    draftId: draft,
    action: 'draftReply'
  });
  return openLink(url);
};

const actionAddThreadToWatchList = ({ formInput }) => {
  const threadId = formInput[EMAIL.THREAD_ID];
  if (!threadId) {
    return showErrorNotification('Please select an email thread');
  }
  const url = getGmailAPI({
    service,
    threadId,
    action: 'addToWatchList'
  });
  return openLink(url);
};

const openLink = url => {
  const link = CardService.newOpenLink()
    .setUrl(url)
    .setOpenAs(CardService.OpenAs.FULL_SIZE)
    .setOnClose(CardService.OnClose.NOTHING);

  return CardService.newActionResponseBuilder()
    .setOpenLink(link)
    .setNotification(
      CardService.newNotification()
        .setText('Processing...')
        .setType(CardService.NotificationType.INFO)
    )
    .build();
};

const actionGemini = e => {
  switch (e.parameters[ACTIONS.KEY]) {
    case ACTIONS.DRAFT_REPLY:
      return actionDraftEmailReply(e);
    case ACTIONS.ADD_TO_WATCHLIST:
      return actionAddThreadToWatchList(e);
    default:
      return showInfoNotification('Hello!');
  }
};

export default actionGemini;
