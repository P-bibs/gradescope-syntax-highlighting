export default function (hljs) {
  const IDENT_RE = '[a-zA-Z\\-0-9]+';
  const KEYWORD_RE = '[a-zA-Z]+';
  const pyretGrammar = {
    "keywords":
      ["end", "type", "type-let", "newtype", "include", "import", "provide", "provide-types", "as",
        "fun", "lam", "check", "examples", "is", "is-not", "satisfies", "violates",
        "raises", "does-not-raise", "raises-violates", "raises-satisfies", "raises-other-than",
        "data", "deriving", "for", "from", "and", "or", "not", "if", "else", "when", "cases", "ask", "spy"]
        .concat(["block:",
          "doc:", "where:", "with:", "sharing:", "then:", "otherwise:",
          "is==", "is=~", "is<=>", "is-not==", "is-not=~", "is-not<=>", "name:"])
        .concat(["var", "ref", "shadow", "let", "letrec", "rec", "method"]),
    "literals": ["true", "false"]
  }
  const KEYWORDS = {
    $pattern: KEYWORD_RE,
    keyword: pyretGrammar["keywords"].join(" "),
    literal: pyretGrammar["literals"].join(" "),
    // built_in: ECMAScript.BUILT_INS.join(" ")
  };
  const STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: "```", end: "```",
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  const digitpart = '[0-9](_?[0-9])*';
  const pointfloat = `(\\b(${digitpart}))?\\.(${digitpart})|\\b(${digitpart})\\.`;
  const NUMBER = {
    className: 'number', relevance: 0,
    variants: [
      { begin: `(\\b(${digitpart})|(${pointfloat}))[eE][+-]?(${digitpart})[jJ]?\\b` },
      { begin: `(${pointfloat})[jJ]?` },
      { begin: '\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?\\b' },
      { begin: '\\b0[bB](_?[01])+[lL]?\\b' },
      { begin: '\\b0[oO](_?[0-7])+[lL]?\\b' },
      { begin: '\\b0[xX](_?[0-9a-fA-F])+[lL]?\\b' },
    ]
  };

  const PARAMS = {
    className: 'params',
    variants: [
      // Exclude params at functions without params
      { begin: /\(\s*\)/, skip: true, className: null },
      {
        begin: /\(/, end: /\)/, excludeBegin: true, excludeEnd: true,
        keywords: KEYWORDS,
        contains: ['self', NUMBER, STRING, hljs.HASH_COMMENT_MODE],
      },
    ],
  };

  return {
    name: 'Pyret',
    aliases: ['pyret'],
    keywords: KEYWORDS,
    case_insensitive: false, // language is case-sensitive
    contains: [
      NUMBER,
      STRING,
      // PARAMS,
      hljs.COMMENT('#', '$'), // single line comment
      hljs.COMMENT('#\\|', '\\|#'), // block comment
    ]
  }
}