function _safeStringifyReplacer(seen: WeakSet<object>) {
  return function (_: string, value: object) {
    if (value === null || typeof value !== 'object') {
      if (typeof value === 'bigint') return (value as bigint).toString();
      return value;
    }

    if (seen.has(value)) {
      return '[Circular]';
    }

    seen.add(value);

    const newValue: Record<string, any> = Array.isArray(value) ? [] : {};
    for (const [key2, value2] of Object.entries(value)) {
      newValue[key2] = _safeStringifyReplacer(seen)(key2, value2);
    }

    seen.delete(value);

    return newValue;
  };
}

export function safeStringify(obj: unknown, space?: string | number) {
  const seen = new WeakSet();
  return JSON.stringify(obj, _safeStringifyReplacer(seen), space);
}
