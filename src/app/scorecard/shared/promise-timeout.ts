// export const promiseTimeout = function(ms, promise){
  
//     // Create a promise that rejects in <ms> milliseconds
//     let timeout = new Promise((resolve, reject) => {
//       let id = setTimeout(() => {
//         clearTimeout(id);
//         reject('Timed out in '+ ms + 'ms.')
//       }, ms)
//     })