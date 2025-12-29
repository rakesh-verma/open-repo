window.guideBridge.getData({
        async: true,
        success: function(guideResultObject) {
            var dataXml = guideResultObject.data;
            $.ajax({
                type: "POST",
                url: endPointUrl,
                data: {
                    'jcr:data': dataXml
                },
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                cache: false,
                dataType: 'json',
                complete: function() {
                    console.log('.submit');
                },
                error: function(xhr) {
                    console.log(xhr.responseText); //This message is sent from the submission servlet
                },
                success: function(xhr) {
                    sessionStorage.setItem("confirmation-reference-number", xhr.caseId);
                    var urlformat = "/content/astrazeneca-champion/country/lang/confirmationPage.html";
                    var confirCountyCode = sessionStorage.getItem("countryCode");
                    var confirLangCode = sessionStorage.getItem("langCode");
                    var fallbackCountry = (confirCountyCode) ? confirCountyCode : "us";
                    var fallbackLang = (confirLangCode) ? confirLangCode : "en";
                    urlformat = urlformat.replace("country", fallbackCountry).replace("lang", fallbackLang);
                    window.location.href = urlformat + "?country=" + confirCountyCode + "&lang=" + confirLangCode;
                }
            });
        },
        error: function(guideResultObject) {
            console.log(guideResultObject.responseText); //This message is sent from the submission servlet
        }
    });