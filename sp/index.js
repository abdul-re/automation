// Function to save the entered URL to local storage
function saveUrl() {
  const newUrl = document.getElementById("newUrlInput").value;

  if (newUrl) {
    // Retrieve existing URLs from local storage or initialize an empty array
    const storedUrls = JSON.parse(localStorage.getItem("urls")) || [];

    // Add the new URL to the array
    storedUrls.push(newUrl);

    // Save the updated array back to local storage
    localStorage.setItem("urls", JSON.stringify(storedUrls));

    // Update the radio inputs
    updateRadioInputs();
    document.getElementById("newUrlInput").value = "";
  }
}

// Function to update the radio inputs based on stored URLs
function updateRadioInputs() {
  const urlRadioContainer = $("#urlRadioContainer");
  const storedUrls = JSON.parse(localStorage.getItem("urls")) || [];
  const selectedUrl = localStorage.getItem("selectedUrl");

  urlRadioContainer.empty();

  storedUrls.forEach((url, index) => {
    const isChecked = url === selectedUrl;
    const urlSelect = $(`
        <div class="form-check">
          <input class="form-check-input" type="radio" name="urlRadioGroup" id="flexRadioDefault${
            index + 1
          }" value="${url}" ${isChecked ? "checked" : ""}>
          <label class="form-check-label" for="flexRadioDefault${index + 1}">
            ${url}
          </label>
        </div>
      `).appendTo(urlRadioContainer);
  });

  // Attach a change event handler to the radio buttons
  $(".form-check-input").on("change", function () {
    const selectedUrl = $(this).val();
    localStorage.setItem("selectedUrl", selectedUrl);
    console.log(selectedUrl);
  });
}

// Function to remove all stored URLs and update radio inputs
function removeAllRadios() {
  localStorage.removeItem("urls");
  localStorage.removeItem("selectedUrl");
  updateRadioInputs();
}

// Call the updateRadioInputs function on page load to initialize the radio inputs
updateRadioInputs();

$.ajax({
  url: "https://sportea.online/v1/api.php?key=a38088a3a9ba7c256f6580413927a274",
  method: "GET",
  dataType: "json",
})
  .done(function (data) {
    // ... (rest of your code remains unchanged)
  })
  .fail(function () {
    console.error("Request failed");
  });

function copyToClipboard(ch_Id, title) {
  let copyUrl = encodeURI(
    `https://sg.shora-streams.cf/p/sp1.html?ch=${ch_Id}&match=${title}`
  );

  window.navigator.clipboard.writeText(copyUrl);
}

$.ajax({
  url: "https://sportea.online/v1/api.php?key=a38088a3a9ba7c256f6580413927a274",
  method: "GET",
  dataType: "json",
})
  .done(function (data) {
    const schedule = data[0].schedule;
    const displayDiv = $("#display");

    Object.keys(schedule).forEach((sport) => {
      const card = $('<div class="card m-5 bg-body-tertiary"></div>');
      const cardHeader = $(`<div class="card-header"></div>`).text(
        sport.toUpperCase()
      );
      const cardBody = $('<div class="card-body"></div>');
      const sportTable = $('<table class="table table-striped"></table>');

      displayDiv.append(card.append(cardHeader, cardBody.append(sportTable)));

      const tableHead = $("<thead></thead>").appendTo(sportTable);
      const headerRow = $("<tr></tr>").appendTo(tableHead);

      headerRow.append("<th>#</th>");
      headerRow.append("<th>Event Time</th>");
      headerRow.append("<th>Teams</th>");
      headerRow.append("<th>Channel ID</th>");

      const tableBody = $("<tbody></tbody>").appendTo(sportTable);

      schedule[sport].forEach((event, index) => {
        const eventRow = $("<tr></tr>").appendTo(tableBody);

        eventRow.append(`<td> ${index + 1}</td>`);

        const eventTime = new Date(event.event_time * 1000);
        const formattedTime = eventTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        eventRow.append("<td>" + formattedTime + "</td>");
        eventRow.append(
          `<td> <span class="cursor-pointer" onclick="copyToClipboard('${event.channel_id}', '${event.teams}')"> ${event.teams}
              </span></td>`
        );

        eventRow.append("<td>" + event.channel_id + "</td>");

        $(".cursor-pointer").click(function () {
          $(this).addClass("text-danger");
        });
      });
    });
  })
  .fail(function () {
    console.error("Request failed");
  });

function copyToClipboard(ch_Id, title) {
  let copyUrl = encodeURI(
    `${localStorage.getItem("selectedUrl")}?ch=${ch_Id}&match=${title}`
  );

  window.navigator.clipboard.writeText(copyUrl);
}
