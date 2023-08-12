let aTagsDiv = document.createElement("div");
aTagsDiv.setAttribute("id", "aTags");

document.querySelector("body").append(aTagsDiv);

document.body.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "x") {
    navigator.clipboard.readText().then((copiedText) => {
      aTags.innerHTML = copiedText;

      let urlQuery = document.querySelector("#aTags a").getAttribute("href");

      document.getElementById("link").value =
        "https://live.cr7streams.tk/p/live.html?" + urlQuery;

      console.log("linkCopied");
    });
  }
});
