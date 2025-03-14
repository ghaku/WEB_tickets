"use client";

import { useState } from "react";
import EventForm from "@/components/EventForm";
import EventList from "@/components/EventList";
import TicketForm from "@/components/TicketForm";
import { Event } from "@/types";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [refresh, setRefresh] = useState<number>(0);

  const handleRefresh = () => setRefresh((prev) => prev + 1);

  const handleEventCreated = (newEvent: Event) => {
    handleRefresh();
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleTicketSold = (ticket: any) => {
    if (selectedEvent) {
      setSelectedEvent({ ...selectedEvent, availableTickets: selectedEvent.availableTickets - 1 });
    }
    handleRefresh();
    setSelectedEvent(null);
  };

  const handleCancelTicket = () => {
    setSelectedEvent(null);
  };

  return (
    <main className="container mx-auto p-4">
      <div className="flex gap-2">
        <h1 className="text-3xl font-bold mb-4">Квитки і події</h1>
        <a href="/tickets/" className="h-fit bg-blue-500 text-white py-1 px-3 rounded">
          Продані квитки
        </a>
      </div>
      <EventForm onEventCreated={handleEventCreated} />
      <EventList onSelectEvent={handleSelectEvent} refresh={refresh} />
      {selectedEvent && (
        <TicketForm
          event={selectedEvent}
          onTicketSold={handleTicketSold}
          onCancel={handleCancelTicket}
        />
      )}
    </main>
  );
}
