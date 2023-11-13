const initialState = [
  { name: "Çörəkdə ət dönər", amount: 3.5, id: "1" },
  { name: "Çörəkdə toyuq dönər", amount: 2.5, id: "2" },
  { name: "Toyuq kotlet", amount: 5, id: "3" },
  { name: "Burger", amount: 8, id: "4" },
];

export default function foodMenuReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
