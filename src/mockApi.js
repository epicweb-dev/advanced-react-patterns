export default (throwError = false) => new Promise((resolve, reject) => {
  setTimeout((initialOn = true, error = 'Something went wrong while fetching the toggle state') => {
    if(!throwError) {
      resolve(initialOn);
      return initialOn;
    } else {
      reject(error);
      return error;
    }
  }, 1000)
});
