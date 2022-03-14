import clipboardCopy from 'clipboard-copy';

const handleConditionalShare = (origin, path, type, id) => {
  if (path.includes('done-recipes')
  || path.includes('in-progress')) {
    clipboardCopy(`${origin}/${type}s/${id}`);
  } else {
    clipboardCopy(`${origin}${path}`);
  }
};

export default handleConditionalShare;
