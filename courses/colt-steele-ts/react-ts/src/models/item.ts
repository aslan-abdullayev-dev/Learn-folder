export default interface Item {
  id: string;
  product: string;
  quantity: number;
}

export type AddItem = (newItem: { product: string; quantity: number }) => void;
