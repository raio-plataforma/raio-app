export const titleize = (text) => {
  if (text != "") {
    try {
      var words = String(text).toLowerCase().split(" ");
      for (var a = 0; a < words.length; a++) {
        var w = words[a];
        words[a] = w[0].toUpperCase() + w.slice(1);
      }
      return words.join(" ");
    } catch (error) {
      console.error(error);
    }
  }
}