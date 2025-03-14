"use client";

import { useState, useEffect } from "react";
import { getTickets } from "@/services/api";
import { Ticket } from "@/types";

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    const data = await getTickets();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Продані квитки</h2>
      <ul className="space-y-2">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="border p-2 rounded">
            <div>Білет: {ticket.ticketNumber}</div>
            <div>Користувач: {ticket.user}</div>
            <div>Подія: {ticket.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
