export interface ITicket {
  title: string;
  request: string;
  id: string;
  status: "closed" | "open"
}
