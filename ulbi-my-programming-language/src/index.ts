import Lexer from "./Lexer";

const code = `
  code EQUALS 5 PLUS 9 PLUS (4 MINUS 6);
  CONSOLE code;
  variable EQUALS code PLUS 3;
  CONSOLE variable PLUS code MINUS 6;
`;

const lexer = new Lexer(code);

lexer.lexAnalysis();

console.log(lexer.tokenList);
