/**
 * submitData
 * @name submitData
 * @param {object} field
 * @param {scope} globals
 */
function submitData(globals) {
    console.log("starting.....");
  var formData = globals.functions.exportData();

    $.ajax({
        type: "POST",
        url: "/content/myformsite/us/en/requests/bacform",
        data: {
            "formdata": formData
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        cache: false,
        dataType: "json",

        success: function (response) {
            console.log("Form submitted successfully");
            sessionStorage.setItem(
                "confirmation-reference-number",
                "12345"
            );
        },

        error: function (xhr) {
            console.error("Submission failed:", xhr.responseText);
        },

        complete: function () {
            console.log("submit complete");
        }
    });

}
