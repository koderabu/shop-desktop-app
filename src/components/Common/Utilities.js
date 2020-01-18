export default class Utilities {
    static wait(ms) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(ms)
          }, ms )
        })
    }
    
    static _loadImageProcess(src, remote = false){
      return new Promise(resolve => {
          var image = new Image();
          image.onload = function() {
              resolve(image);
          };
          image.crossOrigin = "Anonymous";
          image.src = (remote)? ("https://cors-anywhere.herokuapp.com/" + src) : (src);
      });
  }
}