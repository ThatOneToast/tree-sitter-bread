module.exports = grammar({
    name: "bread",

    extras: ($) => [/\s/],

    conflicts: ($) => [[$.import_module_path]],

    rules: {
        source_file: ($) =>
            repeat(
                choice(
                    $.import_directive,
                    $.comment,
                    $.function_declaration,
                    $.variable_declaration,
                ),
            ),

        // Comments (not import directives)
        comment: ($) => prec(-1, seq("--", /[^\n]*/)),

        // Import directives
        import_directive: ($) =>
            prec.dynamic(
                1,
                seq(
                    field("use_keyword", "--use:"),
                    field("module_path", $.import_module_path),
                    choice(
                        seq(":", "all"),
                        seq(":", field("target", $.identifier)),
                        seq(":", "[", commaSep1($.identifier), "]"),
                    ),
                    optional(
                        seq(
                            field("at_symbol", "@"),
                            field("alias", $.identifier),
                        ),
                    ),
                ),
            ),

        import_module_path: ($) =>
            seq($.identifier, repeat(seq(":", $.identifier))),

        // Function declarations
        function_declaration: ($) =>
            seq(
                optional("pub"),
                "fn",
                field("name", $.identifier),
                field("parameters", $.parameter_list),
                optional(seq("->", field("return_type", $.type))),
                field("body", $.block),
            ),

        parameter_list: ($) => seq("(", optional(commaSep($.parameter)), ")"),

        parameter: ($) =>
            seq(
                field("name", $.identifier),
                optional(seq(":", field("type", $.type))),
            ),

        // Variable declarations
        variable_declaration: ($) =>
            seq(
                optional("pub"),
                choice("let", "const"),
                field("name", $.identifier),
                optional(seq(":", field("type", $.type))),
                "=",
                field("value", $.expression),
            ),

        // Statements
        statement: ($) =>
            choice(
                $.comment,
                $.variable_declaration,
                $.function_declaration,
                $.return_statement,
                $.if_statement,
                $.while_statement,
                $.for_statement,
                $.expression_statement,
                $.break_statement,
                $.continue_statement,
            ),

        return_statement: ($) =>
            prec.right(seq("return", optional($.expression))),

        if_statement: ($) =>
            seq(
                "if",
                field("condition", $.expression),
                field("consequence", $.block),
                optional(
                    seq(
                        "else",
                        field("alternative", choice($.block, $.if_statement)),
                    ),
                ),
            ),

        while_statement: ($) =>
            seq(
                "while",
                field("condition", $.expression),
                field("body", $.block),
            ),

        for_statement: ($) =>
            seq(
                "for",
                field("variable", $.identifier),
                "in",
                field("iterable", $.expression),
                field("body", $.block),
            ),

        expression_statement: ($) => $.expression,

        break_statement: ($) => "break",
        continue_statement: ($) => "continue",

        block: ($) => seq("{", repeat($.statement), "}"),

        // Expressions
        expression: ($) =>
            choice(
                $.binary_expression,
                $.unary_expression,
                $.call_expression,
                $.member_expression,
                $.index_expression,
                $.assignment_expression,
                $.namespace_path,
                $.identifier,
                $.literal,
                $.table_literal,
                $.array_literal,
                $.range_expression,
                $.parenthesized_expression,
            ),

        binary_expression: ($) =>
            choice(
                prec.left(8, seq($.expression, "*", $.expression)),
                prec.left(8, seq($.expression, "/", $.expression)),
                prec.left(8, seq($.expression, "%", $.expression)),
                prec.left(7, seq($.expression, "+", $.expression)),
                prec.left(7, seq($.expression, "-", $.expression)),
                prec.left(5, seq($.expression, "==", $.expression)),
                prec.left(5, seq($.expression, "!=", $.expression)),
                prec.left(5, seq($.expression, "<", $.expression)),
                prec.left(5, seq($.expression, "<=", $.expression)),
                prec.left(5, seq($.expression, ">", $.expression)),
                prec.left(5, seq($.expression, ">=", $.expression)),
                prec.left(3, seq($.expression, "&&", $.expression)),
                prec.left(2, seq($.expression, "||", $.expression)),
            ),

        unary_expression: ($) =>
            prec(9, choice(seq("-", $.expression), seq("!", $.expression))),

        call_expression: ($) =>
            prec(
                10,
                seq(
                    field("function", $.expression),
                    field("arguments", $.argument_list),
                ),
            ),

        argument_list: ($) => seq("(", optional(commaSep($.expression)), ")"),

        member_expression: ($) =>
            prec(
                10,
                seq(
                    field("object", $.expression),
                    ".",
                    field("property", $.identifier),
                ),
            ),

        index_expression: ($) =>
            prec(
                10,
                seq(
                    field("object", $.expression),
                    "[",
                    field("index", $.expression),
                    "]",
                ),
            ),

        assignment_expression: ($) =>
            prec.right(
                1,
                seq(
                    field(
                        "left",
                        choice(
                            $.identifier,
                            $.member_expression,
                            $.index_expression,
                        ),
                    ),
                    "=",
                    field("right", $.expression),
                ),
            ),

        namespace_path: ($) =>
            seq($.identifier, repeat1(seq("::", $.identifier))),

        range_expression: ($) =>
            prec.left(
                4,
                seq(
                    field("start", $.expression),
                    "..",
                    field("end", $.expression),
                ),
            ),

        parenthesized_expression: ($) => seq("(", $.expression, ")"),

        // Literals
        literal: ($) => choice($.integer, $.float, $.string, $.boolean, $.nil),

        integer: ($) => /\d+/,
        float: ($) => /\d+\.\d+/,
        string: ($) =>
            choice(
                seq('"', repeat(choice(/[^"\\]/, /\\./)), '"'),
                seq("'", repeat(choice(/[^'\\]/, /\\./)), "'"),
            ),
        boolean: ($) => choice("true", "false"),
        nil: ($) => "nil",

        table_literal: ($) =>
            seq("{", repeat(choice($.comment, $.table_field, ",")), "}"),

        table_field: ($) =>
            seq(
                optional("mut"),
                field("key", $.identifier),
                ":",
                field("value", $.expression),
            ),

        array_literal: ($) => seq("[", optional(commaSep($.expression)), "]"),

        // Types
        type: ($) => $.identifier,

        // Identifiers
        identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    },
});

function commaSep(rule) {
    return optional(commaSep1(rule));
}

function commaSep1(rule) {
    return seq(rule, repeat(seq(",", rule)), optional(","));
}
