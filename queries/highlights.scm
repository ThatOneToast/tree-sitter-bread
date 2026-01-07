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



; Namespace paths - module part should be gray/muted
(namespace_path
  module: (identifier) @type.builtin)

; Namespace paths - name part should be function color
(namespace_path
  name: (identifier) @function)

; Parameters
(parameter
  name: (identifier) @variable.parameter)

; Variables
(variable_declaration
  name: (identifier) @variable)

; Member access
(member_expression
  property: (identifier) @property)

; Variable usage - identifiers that are used (high priority to override defaults)
(identifier) @variable

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
