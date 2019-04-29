export const FIVE_TO_THIRTY_MINUTES = "FIVE_TO_THIRTY_MINUTES";
export const THIRTY_TO_SIXTY_MINUTES = "THIRTY_TO_SIXTY_MINUTES";
export const ONE_TO_FIVE_HOURS = "ONE_TO_FIVE_HOURS";
export const FIVE_TO_EIGHT_HOURS = "FIVE_TO_EIGHT_HOURS";
export const EIGHT_PLUS_HOURS = "EIGHT_PLUS_HOURS";

export const PERIODS = [
  FIVE_TO_THIRTY_MINUTES,
  THIRTY_TO_SIXTY_MINUTES,
  ONE_TO_FIVE_HOURS,
  FIVE_TO_EIGHT_HOURS,
  EIGHT_PLUS_HOURS
];

export const BACKGROUND_COLORS = {
  [FIVE_TO_THIRTY_MINUTES]: "#4caf50",
  [THIRTY_TO_SIXTY_MINUTES]: "#e53935",
  [ONE_TO_FIVE_HOURS]: "#007bff",
  [FIVE_TO_EIGHT_HOURS]: "#fb8c00",
  [EIGHT_PLUS_HOURS]: "#9c27b0"
};

export const BORDER_COLORS = {
  [FIVE_TO_THIRTY_MINUTES]: "rgba(76,175,80,0.5)",
  [THIRTY_TO_SIXTY_MINUTES]: "rgba(229, 57, 53,0.5)",
  [ONE_TO_FIVE_HOURS]: "rgba(0, 123, 255, 0.5)",
  [FIVE_TO_EIGHT_HOURS]: "rgba(251, 140, 0,0.5)",
  [EIGHT_PLUS_HOURS]: "rgba(156, 39, 176, 0.5)"
};

export const LABELS = {
  [FIVE_TO_THIRTY_MINUTES]: "5-30 mins",
  [THIRTY_TO_SIXTY_MINUTES]: "30-60 mins",
  [ONE_TO_FIVE_HOURS]: "1-5 hours",
  [FIVE_TO_EIGHT_HOURS]: "5-8 hours",
  [EIGHT_PLUS_HOURS]: "8+ hours"
};

export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// TIMES

export const DAILY = "DAILY";
export const WEEKLY = "WEEKLY";
export const OCCASIONAL = "OCCASIONAL";
export const FIRST_TIME = "FIRST_TIME";
export const YESTERDAY = "YESTERDAY";

export const TIMES = [DAILY, WEEKLY, OCCASIONAL, FIRST_TIME, YESTERDAY];
export const TIMES_LABELS = [
  "Daily",
  "Weekly",
  "Occasional",
  "First Time",
  "Yesterday"
];
