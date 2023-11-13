import React, { useRef } from 'react'
import type { AddItem } from "../models/item"


interface ShoppingListFormProps {
  onAddItem: AddItem
}

function ShoppingListForm({ onAddItem }: ShoppingListFormProps): JSX.Element {

  const nameInputRef = useRef<HTMLInputElement>(null)
  const quantityInputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onAddItem({ product: nameInputRef.current!.value, quantity: +quantityInputRef.current!.value })
    nameInputRef.current!.value = ""
    quantityInputRef.current!.value = ""
    nameInputRef.current!.focus()
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='Product Name' ref={nameInputRef} />
      <input type="number" placeholder='Quantity' ref={quantityInputRef} />
      <button type="submit">Add Item</button>
    </form>
  )
}

export default ShoppingListForm