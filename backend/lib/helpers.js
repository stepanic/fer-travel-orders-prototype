// Check if string is in array of strings
function isInArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

// Only console.log if --verbose option is present
function verboseLog() {
  if (isInArray('--verbose', process.argv)) {
    var _logs = 1 <= arguments.length ? [].slice.call(arguments, 0) : [];
    for (var i = 0; i < _logs.length; i++) {
      console.log(_logs[i]);
    }
  }
}

// String to JSON without errors
function noErrorsStringToJSON(str) {
    var json = null;
    try {
        json = JSON.parse(str);
    } catch (e) {
        return undefined;
    }
    return json;
}

// Module exports
module.exports = {
  inArray: isInArray,
  verbose: verboseLog,
  parseJSON: noErrorsStringToJSON
}
