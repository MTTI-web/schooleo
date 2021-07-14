const changeCursor = (element, cursorType) => {
  console.log('Cursor type:', cursorType);
  if (cursorType === 'default') {
    element.style.cursor = 'pointer';
  }
};

export default changeCursor;
