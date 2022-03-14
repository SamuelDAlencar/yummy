import clipboardCopy from 'clipboard-copy';

const handleConditionalShare = (origin, path, type, id) => {
  if (id) {
    clipboardCopy(`${origin}${type}/${id}`);
  } else {
    clipboardCopy(`${origin}${path}`);
  }
};

export default handleConditionalShare;
