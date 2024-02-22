import { a1 as bold, a2 as red, a3 as yellow, a4 as dim, a5 as blue } from './chunks/astro_0_9Cd_Bh.mjs';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.4.1/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/article/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/article\\/([^/]+?)\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"article","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false},{"content":".json","dynamic":false,"spread":false}]],"params":["id"],"component":"src/pages/api/article/[id].json.js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/articles.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/articles\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"articles.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/articles.json.js","pathname":"/api/articles.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"}],"routeData":{"route":"/articles/[id]","isIndex":false,"type":"page","pattern":"^\\/articles\\/([^/]+?)\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/articles/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"}],"routeData":{"route":"/blog/banana-is-the-best-meal-packages-in-the-uk-spark-outrage-online","isIndex":false,"type":"page","pattern":"^\\/blog\\/banana-is-the-best-meal-packages-in-the-UK-spark-outrage-online\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"banana-is-the-best-meal-packages-in-the-UK-spark-outrage-online","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/banana-is-the-best-meal-packages-in-the-UK-spark-outrage-online.md","pathname":"/blog/banana-is-the-best-meal-packages-in-the-UK-spark-outrage-online","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"}],"routeData":{"route":"/blog/become-a-morning-person-with-the-help-of-alarm-clock","isIndex":false,"type":"page","pattern":"^\\/blog\\/become-a-morning-person-with-the-help-of-alarm-clock\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"become-a-morning-person-with-the-help-of-alarm-clock","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/become-a-morning-person-with-the-help-of-alarm-clock.md","pathname":"/blog/become-a-morning-person-with-the-help-of-alarm-clock","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"}],"routeData":{"route":"/blog/how-to-make-toys-from-old-olarpaper","isIndex":false,"type":"page","pattern":"^\\/blog\\/how-to-make-toys-from-old-olarpaper\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"how-to-make-toys-from-old-olarpaper","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/how-to-make-toys-from-old-olarpaper.md","pathname":"/blog/how-to-make-toys-from-old-olarpaper","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"}],"routeData":{"route":"/blog/titulo-del-articulo","isIndex":false,"type":"page","pattern":"^\\/blog\\/titulo-del-articulo\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"titulo-del-articulo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/titulo-del-articulo.md","pathname":"/blog/titulo-del-articulo","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"}],"routeData":{"route":"/blog/what-you-need-to-know-about-photography","isIndex":false,"type":"page","pattern":"^\\/blog\\/what-you-need-to-know-about-photography\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"what-you-need-to-know-about-photography","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/what-you-need-to-know-about-photography.md","pathname":"/blog/what-you-need-to-know-about-photography","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"}],"routeData":{"route":"/blog/why-a-balloon-is-a-flexible-bag","isIndex":false,"type":"page","pattern":"^\\/blog\\/why-a-balloon-is-a-flexible-bag\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"why-a-balloon-is-a-flexible-bag","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/why-a-balloon-is-a-flexible-bag.md","pathname":"/blog/why-a-balloon-is-a-flexible-bag","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"}],"routeData":{"route":"/blog/why-a-balloon-is-a-flexible-bag-that-can-be-inflated-with-a-gas","isIndex":false,"type":"page","pattern":"^\\/blog\\/why-a-balloon-is-a-flexible-bag-that-can-be-inflated-with-a-gas\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"why-a-balloon-is-a-flexible-bag-that-can-be-inflated-with-a-gas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/why-a-balloon-is-a-flexible-bag-that-can-be-inflated-with-a-gas.md","pathname":"/blog/why-a-balloon-is-a-flexible-bag-that-can-be-inflated-with-a-gas","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n"}],"routeData":{"route":"/elements","isIndex":false,"type":"page","pattern":"^\\/elements\\/?$","segments":[[{"content":"elements","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/elements.astro","pathname":"/elements","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"}],"routeData":{"route":"/es/about","isIndex":false,"type":"page","pattern":"^\\/es\\/about\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/es/about.astro","pathname":"/es/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"}],"routeData":{"route":"/es/articles/[id]","isIndex":false,"type":"page","pattern":"^\\/es\\/articles\\/([^/]+?)\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}],[{"content":"articles","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/es/articles/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n"}],"routeData":{"route":"/es/elements","isIndex":false,"type":"page","pattern":"^\\/es\\/elements\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}],[{"content":"elements","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/es/elements.astro","pathname":"/es/elements","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n"}],"routeData":{"route":"/es","isIndex":true,"type":"page","pattern":"^\\/es\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/es/index.astro","pathname":"/es","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DqR2iBSn.js"}],"styles":[{"type":"external","src":"/_astro/about.BVk812Rx.css"},{"type":"inline","content":"@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Mulish Variable;font-style:normal;font-display:swap;font-weight:200 1000;src:url(/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/albert/Sites/curso-astro-2024/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/albert/Sites/curso-astro-2024/src/pages/es/about.astro",{"propagation":"none","containsHead":true}],["/Users/albert/Sites/curso-astro-2024/src/pages/elements.astro",{"propagation":"in-tree","containsHead":true}],["/Users/albert/Sites/curso-astro-2024/src/pages/es/elements.astro",{"propagation":"in-tree","containsHead":true}],["/Users/albert/Sites/curso-astro-2024/src/pages/es/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/albert/Sites/curso-astro-2024/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/albert/Sites/curso-astro-2024/src/pages/blog/banana-is-the-best-meal-packages-in-the-UK-spark-outrage-online.md",{"propagation":"none","containsHead":true}],["/Users/albert/Sites/curso-astro-2024/src/pages/blog/become-a-morning-person-with-the-help-of-alarm-clock.md",{"propagation":"none","containsHead":true}],["/Users/albert/Sites/curso-astro-2024/src/pages/blog/how-to-make-toys-from-old-olarpaper.md",{"propagation":"none","containsHead":true}],["/Users/albert/Sites/curso-astro-2024/src/pages/blog/titulo-del-articulo.md",{"propagation":"none","containsHead":true}],["/Users/albert/Sites/curso-astro-2024/src/pages/blog/what-you-need-to-know-about-photography.md",{"propagation":"none","containsHead":true}],["/Users/albert/Sites/curso-astro-2024/src/pages/blog/why-a-balloon-is-a-flexible-bag-that-can-be-inflated-with-a-gas.md",{"propagation":"none","containsHead":true}],["/Users/albert/Sites/curso-astro-2024/src/pages/blog/why-a-balloon-is-a-flexible-bag.md",{"propagation":"none","containsHead":true}],["/Users/albert/Sites/curso-astro-2024/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/albert/Sites/curso-astro-2024/src/pages/articles/[id].astro",{"propagation":"in-tree","containsHead":true}],["/Users/albert/Sites/curso-astro-2024/src/pages/es/articles/[id].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/articles/[id]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/es/articles/[id]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/albert/Sites/curso-astro-2024/src/components/Elements.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/elements@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/es/elements@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/albert/Sites/curso-astro-2024/src/components/Card.astro",{"propagation":"in-tree","containsHead":false}],["/Users/albert/Sites/curso-astro-2024/src/components/Home.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/es/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/api/articles.json.js":"chunks/pages/articles_DBbKcg6a.mjs","/src/pages/blog/become-a-morning-person-with-the-help-of-alarm-clock.md":"chunks/pages/become-a-morning-person-with-the-help-of-alarm-clock_Ci_9EPOM.mjs","/node_modules/.pnpm/astro@4.4.1/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_BDb-Dcgj.mjs","/src/pages/blog/how-to-make-toys-from-old-olarpaper.md":"chunks/pages/how-to-make-toys-from-old-olarpaper_BC1Smtn0.mjs","/src/pages/blog/titulo-del-articulo.md":"chunks/pages/titulo-del-articulo_DgUXmMta.mjs","/src/pages/blog/what-you-need-to-know-about-photography.md":"chunks/pages/what-you-need-to-know-about-photography__eyBnnnP.mjs","/src/pages/blog/why-a-balloon-is-a-flexible-bag-that-can-be-inflated-with-a-gas.md":"chunks/pages/why-a-balloon-is-a-flexible-bag-that-can-be-inflated-with-a-gas_DvCizbAb.mjs","/src/pages/blog/why-a-balloon-is-a-flexible-bag.md":"chunks/pages/why-a-balloon-is-a-flexible-bag_BcuGO5pc.mjs","\u0000@astrojs-manifest":"manifest_Dt0ESwd1.mjs","/Users/albert/Sites/curso-astro-2024/node_modules/.pnpm/@astrojs+react@3.0.10_@types+react-dom@18.2.19_@types+react@18.2.57_react-dom@18.2.0_react@18.2.0_vite@5.1.4/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_C1YIWAGb.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.4.1/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_CHUesdh7.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_DpG0OVF5.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_DYVQSo5V.mjs","\u0000@astro-page:src/pages/api/article/[id]@_@json.js":"chunks/_id__ork29Ypv.mjs","\u0000@astro-page:src/pages/api/articles@_@json.js":"chunks/articles_DxsA5YKU.mjs","\u0000@astro-page:src/pages/articles/[id]@_@astro":"chunks/_id__CKW32FcZ.mjs","\u0000@astro-page:src/pages/blog/banana-is-the-best-meal-packages-in-the-UK-spark-outrage-online@_@md":"chunks/banana-is-the-best-meal-packages-in-the-UK-spark-outrage-online_DDF-1g2G.mjs","\u0000@astro-page:src/pages/blog/become-a-morning-person-with-the-help-of-alarm-clock@_@md":"chunks/become-a-morning-person-with-the-help-of-alarm-clock_DLoP8x9H.mjs","\u0000@astro-page:src/pages/blog/how-to-make-toys-from-old-olarpaper@_@md":"chunks/how-to-make-toys-from-old-olarpaper_CMvBHHnj.mjs","\u0000@astro-page:src/pages/blog/titulo-del-articulo@_@md":"chunks/titulo-del-articulo_B-VPUtBr.mjs","\u0000@astro-page:src/pages/blog/what-you-need-to-know-about-photography@_@md":"chunks/what-you-need-to-know-about-photography_Etn6Mbjy.mjs","\u0000@astro-page:src/pages/blog/why-a-balloon-is-a-flexible-bag@_@md":"chunks/why-a-balloon-is-a-flexible-bag_DxInc_PN.mjs","\u0000@astro-page:src/pages/blog/why-a-balloon-is-a-flexible-bag-that-can-be-inflated-with-a-gas@_@md":"chunks/why-a-balloon-is-a-flexible-bag-that-can-be-inflated-with-a-gas_B0BDnKZp.mjs","\u0000@astro-page:src/pages/elements@_@astro":"chunks/elements_CUT2_Yor.mjs","\u0000@astro-page:src/pages/es/about@_@astro":"chunks/about_CdKWFCG-.mjs","\u0000@astro-page:src/pages/es/articles/[id]@_@astro":"chunks/_id__BBexEBOM.mjs","\u0000@astro-page:src/pages/es/elements@_@astro":"chunks/elements_BA78JSjI.mjs","\u0000@astro-page:src/pages/es/index@_@astro":"chunks/index_C01IAGS3.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_nuPzkaHy.mjs","@components/Accordion.jsx":"_astro/Accordion.DA-kj_OM.js","@components/Accordion.vue":"_astro/Accordion.GMiIjtbP.js","/astro/hoisted.js?q=0":"_astro/hoisted.DqR2iBSn.js","@astrojs/vue/client.js":"_astro/client.D91WY35r.js","@astrojs/react/client.js":"_astro/client.D9Vng9vH.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/mulish-latin-ext-wght-normal.DFSbZYTr.woff2","/_astro/mulish-cyrillic-ext-wght-normal.CAYBFnPz.woff2","/_astro/mulish-latin-wght-normal.D4u9DX0e.woff2","/_astro/mulish-cyrillic-wght-normal.BBXUw45Z.woff2","/_astro/mulish-vietnamese-wght-normal.DIaBEqcE.woff2","/_astro/author.BuwJRqq2.webp","/_astro/about.BVk812Rx.css","/favicon.svg","/_astro/Accordion.DA-kj_OM.js","/_astro/Accordion.GMiIjtbP.js","/_astro/client.D91WY35r.js","/_astro/client.D9Vng9vH.js","/_astro/hoisted.DqR2iBSn.js","/_astro/index.NEDEFKed.js","/_astro/runtime-core.esm-bundler.DrKk4qcb.js","/images/01.webp","/images/02.webp","/images/03.webp","/images/04.webp","/images/05.webp","/images/06.webp","/images/screenshot.png","/fonts/guardar-aqui-las-fuentes.txt"],"i18n":{"routing":"pathname-prefix-other-locales","locales":["es","en"],"defaultLocale":"en","domainLookupTable":{}},"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
