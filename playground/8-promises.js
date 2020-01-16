// To create a promise we use:
// Promises take one single argument, a function or a call back function

const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // If things went well we call resolve, if not we call reject.
    // we pass to resolve and to reject a single value.
    // resolve("This is a good result");
    // reject("This is an error!");
    resolve("This is resolve!");
  }, 2000);
});

// .then allows us to register what to do if things went well.
doWorkPromise
  .then(result => {
    console.log("Success!", result);
  })
  .catch(error => {
    console.log("Error!", error);
    // catch is triggered where the promise is rejected.
  });


