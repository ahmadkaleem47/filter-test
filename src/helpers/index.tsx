import moment from "moment";

export const CheckPriceError = (range: [Number, Number]) => {
  const min = range?.[0] || 0;
  const max = range?.[1] || 0;

  const allowedMin: Number = 0;
  const allowedMax: Number = 1000;

  if (min < allowedMin || min > allowedMax) {
    return `Minimum price should be between ${allowedMin} and ${allowedMax}.`;
  }

  if (max < allowedMin || max > allowedMax) {
    return `Maximum price should be between ${allowedMin} and ${allowedMax}.`;
  }

  if (min > max) {
    return `Minimum price cannot be greater than maximum price.`;
  }

  return null;
};

export const CheckDateError = (range: [number, number]) => {
  const minDate = "1900-01-01";
  const maxDate = moment().format("YYYY-MM-DD");
  const startDate = moment(range[0]);
  const endDate = moment(range[1]);

  if (!startDate.isValid() || !endDate.isValid()) {
    return "One or both dates are invalid.";
  }

  if (startDate.isBefore(minDate)) {
    return `Start date must not be before ${minDate}.`;
  }

  if (endDate.isAfter(maxDate)) {
    return `End date must not be after ${maxDate}.`;
  }

  if (startDate.isAfter(endDate)) {
    return "Start date must not be after the end date.";
  }

  return null;
};
