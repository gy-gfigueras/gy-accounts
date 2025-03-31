export const copyToClipboard = (content: string) => {
  return new Promise((resolve, reject) => {
    navigator.clipboard
      .writeText(content)
      .then(resolve)
      .catch((error) => reject(error));
  });
};
