export const If = ({ condition, children }) => (condition ? children : false);

export const IfElse = ({ condition, True, False }) =>
  condition ? True : False;
