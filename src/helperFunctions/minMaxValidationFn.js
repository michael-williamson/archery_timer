export const minMaxValidationFn = (min, max, input) => {
  return input > max || input < min ? true : false;
};
