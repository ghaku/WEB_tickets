"use client";

import { useState, useEffect, FormEvent } from "react";
import { getEvents } from "@/services/api";
import { Event } from "@/types";

interface EventListProps {
  onSelectEvent: (event: Event) => void;
  refresh?: number;
}

const EventList: React.FC<EventListProps> = ({ onSelectEvent, refresh = 0 }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [query, setQuery] = useState({ date: "", venue: "" });

  const fetchEvents = async () => {
    const data = await getEvents(query);
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, [refresh]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    fetchEvents();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 border rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">Список подій</h2>
      <form onSubmit={handleSearch} className="flex space-x-2 mb-2">
        <input
          type="text"
          name="date"
          placeholder="Дата (YYYY-MM-DD)"
          value={query.date}
          onChange={handleChange}
          className="border rounded p-1"
        />
        <input
          type="text"
          name="venue"
          placeholder="Місце проведення"
          value={query.venue}
          onChange={handleChange}
          className="border rounded p-1"
        />
        <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded cursor-pointer">
          Знайти
        </button>
      </form>
      <ul className="space-y-2">
        {events.map((event) => (
          <li key={event.id} className="border p-2 rounded flex flex-col">
            <div>
              <strong>{event.title}</strong> | {new Date(event.date).toLocaleString()} | {event.venue}  
            </div>
            <div>Ціна: {event.price} | Доступно: {event.availableTickets}</div>
            <button
              className="mt-2 bg-green-500 text-white py-1 px-3 rounded self-start cursor-pointer"
              onClick={() => onSelectEvent(event)}
            >
              Купити квиток
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
