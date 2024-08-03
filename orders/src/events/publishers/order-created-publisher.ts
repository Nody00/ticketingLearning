import { Publisher, OrderCreatedEvent, Subjects } from "@nody00org/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
