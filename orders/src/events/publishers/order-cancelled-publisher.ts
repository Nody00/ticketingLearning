import { Publisher, OrderCancelledEvent, Subjects } from "@nody00org/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
