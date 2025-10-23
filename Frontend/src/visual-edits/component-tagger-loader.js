"use strict";

// No-op loader for Turbopack: returns source unchanged.
// This satisfies the custom loader path referenced in next.config.ts.
module.exports = function componentTaggerLoader(source) {
  return source;
};



