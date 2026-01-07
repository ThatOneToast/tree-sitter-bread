; Keywords
[
  "fn"
  "let"
  "const"
  "pub"
  "mut"
  "if"
  "else"
  "while"
  "for"
  "in"
  "return"
] @keyword

; Break and continue statements
(break_statement) @keyword
(continue_statement) @keyword

; Function definitions
(function_declaration
  name: (identifier) @function)

; Function calls
(call_expression
  function: (_) @function.call)

; Parameters
(parameter
  name: (identifier) @variable.parameter)

; Variables
(variable_declaration
  name: (identifier) @variable)

; Member access
(member_expression
  property: (identifier) @property)

; Namespace paths
(namespace_path) @namespace

; Literals
(integer) @number
(float) @number
(string) @string
(boolean) @boolean
(nil) @constant.builtin

; Comments
(comment) @comment

; Import directives - detailed highlighting
(import_directive
  use_keyword: (_) @keyword.directive
  module_path: (import_module_path) @comment
  target: (identifier)? @comment
  at_symbol: (_)? @keyword.directive
  alias: (identifier)? @keyword.directive)

; Operators
[
  "+"
  "-"
  "*"
  "/"
  "%"
  "="
  "=="
  "!="
  "<"
  "<="
  ">"
  ">="
  "&&"
  "||"
  "!"
] @operator

; Delimiters
[
  "("
  ")"
  "{"
  "}"
  "["
  "]"
] @punctuation.bracket

[
  ","
  "."
  ":"
  "::"
  ".."
] @punctuation.delimiter

; Types
(type) @type
