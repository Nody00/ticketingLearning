import { Publisher, Subjects, TicketUpdatedEvent } from "@nody00org/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
