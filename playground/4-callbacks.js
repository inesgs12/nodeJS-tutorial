const doWorKCallback = callback => {
  //simulate a delay using setTimeout
  setTimeout(() => {
    // callback("This is my error!", undefined);
    // With callback the order in which we call the callback is important, the first one is the error and the second one is the result.
    callback(undefined, "This is the result if succesful");
  }, 2000); // wait 2,000 milliseconds (2 sec)
};

doWorKCallback((error, result) => {
  if (error) {
    return console.log(error);
  }

  console.log(result);
});
