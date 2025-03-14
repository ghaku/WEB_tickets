export interface Event {
    id: number | string;
    title: string;
    date: string;
    venue: string;
    price: number;
    availableTickets: number;
  }
  
  export interface Ticket {
    id: number | string;
    ticketNumber: string;
    eventId: number | string;
    user: string;
    purchaseDate: string;
    title: string;
    event?: Event;
  }
  