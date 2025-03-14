"use client";

import { useState, FormEvent } from "react";
import { sellTicket } from "@/services/api";
import { Event } from "@/types";

interface TicketFormProps {
  event: Event;
  onTicketSold: (ticket: any) => void;
  onCancel: () => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ event, onTicketSold, onCancel }) => {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const ticket = await sellTicket(event.id, { user });
      setMessage(`Квиток продано! Номер: ${ticket.ticketNumber}`);
      onTicketSold(ticket);
      setUser("");
    } catch (error) {
      setMessage("Помилка продажу квитка");
    }
  };

  return (
    <div className="p-4 border rounded shadow mb-4">
      <h3 className="text-lg font-semibold">Покупка білету для: {event.title}</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block">Email користувача:</label>
          <input
            type="email"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            className="border rounded p-1 w-full"
          />
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded">
            Купити
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-500 text-white py-1 px-3 rounded">
            Скасувати
          </button>
        </div>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default TicketForm;
