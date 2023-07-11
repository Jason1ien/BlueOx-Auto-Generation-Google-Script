// FUNCTION TO GENERATE A NEW TEMPLATE
// MUST CHANGE THE FUNCTION NAME BUT DO NOT MODIFY FOLDER
function change_name1(folder) {
    // REPLACE with the ID of the template
    const templateID = 'REPLACE';

    // Open the source presentation
    var sourcePresentation = SlidesApp.openById(templateID);

    // REPLACE with the name of the template
    var newPresentation = SlidesApp.create(filename + "REPLACE");

    // Remove the initial starting slide that is created from the new project
    var initialSlide = newPresentation.getSlides().pop();
    initialSlide.remove();

    // Get the source slides
    var sourceSlides = sourcePresentation.getSlides();

    // Copy the rest of the slides to the new presentation
    for (var i = 0; i < sourceSlides.length; i++) {
        var sourceSlide = sourceSlides[i];

        // Copy the source slide
        var newSlide = sourceSlide.duplicate();

        // Remove the extra source slide generated
        sourceSlide.remove();

        // Insert the new slide to the new presentation
        newPresentation.insertSlide(i, newSlide);

    }

    // Modify if different keywords are used to auto fill data entries
    var keyword = "XXX_CLIENT_Project"; // Replace with the keyword you want to replace
    var replacement = filename;
    var keywordClient = "CLIENT: XXXX";
    var clientReplacement = clientName;
    var keywordProjectName = "PROJECT NAME: XXXX";
    var projectNameReplacement = projectName;
    var keywordProjectNumber = "PROJECT NUMBER: XXX";
    var numReplacement = projectNumber;

    // Find and replace all occurrences of the keyword in the new document
    var slides = newPresentation.getSlides();

    slides.forEach(function (slide) {
        slide.replaceAllText(keyword, replacement);
        slide.replaceAllText(keywordClient, clientReplacement);
        slide.replaceAllText(keywordProjectName, projectNameReplacement);
        slide.replaceAllText(keywordProjectNumber, numReplacement);
    })

    // Move the created slides into the wanted Foldedr
    var id = newPresentation.getId();
    var slide = DriveApp.getFileById(id);
    slide.moveTo(folder);

    Logger.log("Generated new Slides URL: " + newPresentation.getUrl());

}
