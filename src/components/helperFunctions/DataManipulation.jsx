import { formatDistanceToNow, format } from "date-fns";

const CalculateTimeAgo = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

const FormatDate = (date) => {
  return format(new Date(date), 'yyyy MMMM d, EEEE h:mm a');
};

export {CalculateTimeAgo, FormatDate};
