export type TScreenData = [TNumber, TOperator, TNumber]
type TNumber = {
  value: number;
  type: "number"
}
type TOperator = {
  value: "+" | "-" | "/" | "*";
  type: "operator"
}
