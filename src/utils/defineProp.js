function defineProperty(object, name, value) {
  Object.defineProperty(object, name, {
      enumerable: true,
      value: value,
      writable: false,
  });
}

export default defineProperty;