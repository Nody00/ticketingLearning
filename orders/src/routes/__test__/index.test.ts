import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../model/ticket";
import mongoose from "mongoose";

const buildTicket = async (title: string, price: number) => {
  const ticket = Ticket.build({
    title,
    price,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();
  return ticket;
};

it("fetches orders for a particular user", async () => {
  // Create three tickets
  const ticketOne = await buildTicket("Ticket 1", 20);
  const ticketTwo = await buildTicket("Ticket 2", 30);
  const ticketThree = await buildTicket("Ticket 3", 40);

  const userOne = global.signin();
  const userTwo = global.signin();

  // Create one order as User #1
  await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  // Create two orders as User #2
  const responseOne = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketTwo.id })
    .expect(201);

  const responseTwo = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  // Make request to get orders for User #2
  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .send()
    .expect(200);

  // Make sure we only got the orders for User #2
  const [orderOne, orderTwo] = response.body;
  expect(response.body.length).toEqual(2);
  expect(orderOne.id).toEqual(responseOne.body.id);
  expect(orderTwo.id).toEqual(responseTwo.body.id);
  expect(orderOne.ticket.id).toEqual(ticketTwo.id);
  expect(orderTwo.ticket.id).toEqual(ticketThree.id);
});
