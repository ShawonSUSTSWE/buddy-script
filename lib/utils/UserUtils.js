export const getRandomAvatarUrl = () => {
  const num = Math.floor(Math.random() * 12) + 1;
  return `/assets/images/img${num}.png`;
};
