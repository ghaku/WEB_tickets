"use client";

import { useState, FormEvent } from "react";
import { createEvent } from "@/services/api";
import { Event } from "@/types";

interface EventFormProps {
  onEventCreated: (newEvent: Event) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onEventCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    datetime: "",
    venue: "",
    price: "",
    availableTickets: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const isoDate = new Date(formData.datetime).toISOString();

      const eventData = {
        title: formData.title,
        date: isoDate,
        venue: formData.venue,
        price: parseFloat(formData.price),
        availableTickets: parseInt(formData.availableTickets, 10),
      };
      const newEvent = await createEvent(eventData);
      setMessage("Подію створено!");
      onEventCreated(newEvent);
      setFormData({
        title: "",
        datetime: "",
        venue: "",
        price: "",
        availableTickets: "",
      });
    } catch (error) {
      setMessage("Помилка створення події");
    }
  };

  return (
    <div className="p-4 border rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">Створити подію</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block">Назва:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border rounded p-1 w-full"
          />
        </div>
        <div>
          <label className="block">Дата і час:</label>
          <input
            type="datetime-local"
            name="datetime"
            value={formData.datetime}
            onChange={handleChange}
            required
            className="border rounded p-1 w-full"
          />
        </div>
        <div>
          <label className="block">Місце проведення:</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            required
            className="border rounded p-1 w-full"
          />
        </div>
        <div>
          <label className="block">Ціна:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border rounded p-1 w-full"
          />
        </div>
        <div>
          <label className="block">Кількість квитків:</label>
          <input
            type="number"
            name="availableTickets"
            value={formData.availableTickets}
            onChange={handleChange}
            required
            className="border rounded p-1 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded cursor-pointer">
          Створити подію
        </button>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default EventForm;
