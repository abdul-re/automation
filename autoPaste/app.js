document.getElementById("YayinURL").addEventListener("click", function () {
  navigator.clipboard.readText().then(function (copiedText) {
    document.getElementById("YayinURL").value = copiedText
    document.querySelector('button').click()
  });
});
