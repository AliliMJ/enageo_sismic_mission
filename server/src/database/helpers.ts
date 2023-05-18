function schemaOf(obj: any) {
  const result: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'object' && value !== null) {
        result[key] = schemaOf(value);
      } else {
        result[key] = typeof value;
      }
    }
  }
  return result;
}

function matchSchema(schema: any, pattern: any) {
  for (const key in pattern) {
    if (pattern.hasOwnProperty(key)) {
      const patternValue = pattern[key];
      const schemaValue = schema[key];

      if (typeof patternValue !== 'string') {
        if (typeof schemaValue === 'string') return false;
        if (!matchSchema(schemaValue, patternValue)) return false;
      } else if (schemaValue !== patternValue) {
        return false;
      }
    }
  }
  return true;
}

export { matchSchema, schemaOf };
