/*
 * Copyright (c) 2015 TechnologyAdvice
 */

import regex from './lib/regex'

const types = {
  /**
   * Array of availble regex's
   */
  regexes: Object.keys(regex),

  /**
   * Array of native dataType names
   */
  native: [ 'boolean', 'null', 'undefined', 'number', 'string', 'object', 'array' ],

  /**
   * Add (or override) type in the lib
   * @param {String} name The name of the type
   * @param {String} rgx The regex for the type
   */
  add: (name, rgx) => {
    regex[name] = rgx
    types.regexes.push(name)
  },

  /**
   * Process basic type validation
   * @param {String} type The type to check
   * @param {*} val The value to check
   * @returns {Boolean}
   */
  check: (type, val) => {
    const typeName = type.toString()
    if (types.native.includes(typeName)) {
      if (typeName === 'array') return Array.isArray(val)
      if (typeName === 'null') return val === null
      return typeof val === typeName
    } else if (types.regexes.includes(typeName)) {
      return regex[typeName].test(val)
    }
    throw new Error(`Invalid type specification: ${typeName}`)
  }
}

export default types
