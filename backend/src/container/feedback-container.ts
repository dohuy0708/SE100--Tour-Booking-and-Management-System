import { FeedbackController } from '../controllers/feedback-controller';
import { FeedbackService } from '../services/feedback-service';
import { Feedback } from '../models/feedback_model';
import { FeedbackRepository } from '../repositories/feedback-repository';
import { IFeedbackService } from '../services/interfaces/i-feedback-service';
import { IFeedBackRepository } from '../repositories/interfaces/i-feedback-repository';
import { BaseContainer } from './base-container';

class FeedbackContainer extends BaseContainer {
  constructor() {
    super(Feedback);

    this.container.bind<IFeedbackService<Feedback>>('FeedbackService').to(FeedbackService);

    this.container.bind<IFeedBackRepository<Feedback>>('FeedbackRepository').to(FeedbackRepository);

    this.container.bind<FeedbackController>(FeedbackController).toSelf();
  }

  export() {
    const feedbackController = this.container.get<FeedbackController>(FeedbackController);
    const feedbackService = this.container.get<IFeedbackService<Feedback>>('FeedbackService');
    return { feedbackController, feedbackService };
  }
}

const feedbackContainer = new FeedbackContainer();
const { feedbackController, feedbackService } = feedbackContainer.export();
export { feedbackController, feedbackService };
