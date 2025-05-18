import { ACTIONS, EMAIL } from '../../utils/constants';
import { serviceSection } from '../../ui';

const getGeminiOptionsSection = () => {
  const section = CardService.newCardSection();
  section.addWidget(
    CardService.newTextButton()
      .setText('Draft Email Reply')
      .setOnClickAction(
        CardService.newAction()
          .setFunctionName(ACTIONS.GEMINI)
          .setParameters({ [ACTIONS.KEY]: ACTIONS.DRAFT_REPLY })
      )
  );
  section.addWidget(
    CardService.newTextButton()
      .setText('Add Thread to Watch List')
      .setOnClickAction(
        CardService.newAction()
          .setFunctionName(ACTIONS.GEMINI)
          .setParameters({ [ACTIONS.KEY]: ACTIONS.ADD_TO_WATCHLIST })
      )
  );
  return section;
};

const cardGeminiFeature = () => {
  const card = CardService.newCardBuilder();
  card.setHeader(
    CardService.newCardHeader()
      .setTitle('Gemini Feature')
      .setSubtitle('Draft email replies and add threads to watch list')
  );
  card.addSection(getGeminiOptionsSection());
  card.addSection(serviceSection());
  return card.build();
};

export default cardGeminiFeature;
