import Item, { AddItem } from "./models/item"

import { useState } from "react"
import { v4 as getId } from "uuid"

import ShoppingList from "./components/ShoppingList"
import ShoppingListForm from "./components/ShoppingListForm"

function App() {
  const [items, setItems] = useState<Item[]>([])

  const addItem: AddItem = ({ product, quantity }) => {
    setItems([
      ...items,
      {
        id: getId(),
        product,
        quantity
      }
    ])
  }
  return (
    <div className="App">
      <ShoppingList items={items} />
      <ShoppingListForm onAddItem={addItem} />
    </div>
  )
}

export default App
