import { Publisher, Subjects, TicketCreatedEvent } from "@nody00org/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
