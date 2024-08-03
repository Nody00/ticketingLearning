import { Subjects, Publisher, PaymentCreatedEvent } from "@nody00org/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
