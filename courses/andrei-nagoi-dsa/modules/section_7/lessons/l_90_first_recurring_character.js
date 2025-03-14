export const l_90_first_recurring_character = () => {

  const firstRecurringCharacter = (items) => {
    const itemsMap = {}

    for (const item of items) {
      if (itemsMap[item]) {
        return item
      } else {
        itemsMap[item] = true;
      }
    }
    return undefined
  }

  console.log(firstRecurringCharacter([1, 2, 4]))
  console.log(firstRecurringCharacter([1, 2, 4, 1, 2]))
}