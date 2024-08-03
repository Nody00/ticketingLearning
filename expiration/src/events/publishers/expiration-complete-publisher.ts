import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@nody00org/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
