export default () => new Promise((resolve) => {
  setTimeout((initialOn = true) => {
    resolve(initialOn);
    return initialOn;
  })
});
