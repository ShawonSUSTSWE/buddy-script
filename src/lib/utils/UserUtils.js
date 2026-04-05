export const getRandomAvatarUrl = () => {
  const num = Math.floor(Math.random() * 12) + 1;
  return `/assets/images/img${num}.png`;
};

export const timeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (seconds < 3600)
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;

  const hours = Math.floor(seconds / 3600);
  if (seconds < 86400) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;

  const days = Math.floor(seconds / 86400);
  if (seconds < 604800) return `${days} ${days === 1 ? "day" : "days"} ago`;

  return date.toLocaleDateString();
};
