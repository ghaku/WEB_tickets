"use client";

import TicketList from "@/components/TicketList";

export default function TicketsPage() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex gap-2">
        <h1 className="text-3xl font-bold mb-4">Продані квитки</h1>
        <a href="/" className="h-fit bg-blue-500 text-white py-1 px-3 rounded">
          Квитки і події
        </a>
      </div>
      <TicketList />
    </main>
  );
}
