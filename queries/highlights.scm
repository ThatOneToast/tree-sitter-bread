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
  (import_module_path) @string.special
  target: (identifier)? @string.special
  alias: (identifier)? @keyword.directive)

"--use:" @keyword.directive
"@" @keyword.directive

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

; Table fields
(table_field
  key: (identifier) @property
  value: (_))

; Variable usage - default color for all identifiers
(identifier) @variable

; Parameters - override default
(parameter
  name: (identifier) @variable.parameter)

; Variables declarations - override default
(variable_declaration
  name: (identifier) @variable)

; Member access - override default
(member_expression
  property: (identifier) @property)

; Function definitions - override default
(function_declaration
  name: (identifier) @function)

; Namespace paths - module part should be gray/muted
(namespace_path
  module: (identifier) @type.builtin)

; Namespace paths - name part should be function color (most specific, comes last)
(namespace_path
  name: (identifier) @function)
