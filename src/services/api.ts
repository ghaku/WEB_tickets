import { Event, Ticket } from "@/types";

const API_BASE_URL = "http://localhost:3001"; // Если API находится по тому же домену (благодаря rewrites или proxy), оставляем пустым

export const createEvent = async (eventData: Omit<Event, "id">): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  return response.json();
};

export const getEvents = async (params: Record<string, string> = {}): Promise<Event[]> => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/events?${query}`);
  return response.json();
};

export const sellTicket = async (eventId: number | string, userData: { user: string }): Promise<Ticket> => {
  const response = await fetch(`${API_BASE_URL}/tickets/events/${eventId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const getTickets = async (): Promise<Ticket[]> => {
  const response = await fetch(`${API_BASE_URL}/tickets/booked`);
  return response.json();
};
