function generateTitleSlides() {
  // Insert URL for spreadsheet source, make sure this includes the '/edit at the end
  var dataSpreadsheetUrl = "URL"; 
  
  // create a reference to the spreadsheet
  var ss = SpreadsheetApp.openByUrl(dataSpreadsheetUrl);
  var pp = "URL";
  // now we make another for this slide deck
  var deck = SlidesApp.openByUrl(pp);
  
  // and now we get down to naming the particular sheet where our data lives. This is why we name our sheets, folks. 
  // get in the habit
  var sheet = ss.getSheetByName('Sheet1');
  
  // testing just use a few rows, change the ranges to match your data
  //var conference = sheet.getRange('F2:F29').getValues(); 
  
  // for real use them all, change to represent the range in your sheet
  // These are all the conference items
  var conference = sheet.getRange("A2:J29").getValues();
  
  // uncomment for a first test to peek at data
  Logger.log(conference);

  // get all the slides
  var slides = deck.getSlides();
  
  // get the slide with the template
  var templateSlide = slides[0];
  
  // current length of the slide deck
  var presLength = slides.length;
  
  // loop through the conference data, each item is a session
  conference.forEach(function(session){
    // proceed if we have data and it is not a cell that contains a string that marks a gap in the schedule
    // (this was specific to the structure of this spreadsheet, most will not have it)
    if(session[0] && session[0]!='(break)'){
    
      // these map to the columns of the sheet that have the data we want
      var number = session[0];
      var tracker = session[1];
      var status = session[2];
      var priority = session[3];
      var title = session[4];
      var assign = session[5];
      var start = session[6];
      var end = session[7];
      var realted = session[8];
      var descr = session[9];

      templateSlide.duplicate(); //duplicate the template page
      slides = deck.getSlides(); //update the slides array for indexes and length
      newSlide = slides[2]; // declare the new page to update
    
     // I guess shapes are the names for all elements in a slide?
     var shapes = (newSlide.getShapes());
       shapes.forEach(function(shape){
         // replace the placeholders with real content
         shape.getText().replaceAllText('{{title}}',title);
         shape.getText().replaceAllText('{{priority}}',priority);
         shape.getText().replaceAllText('{{status}}',status);
         shape.getText().replaceAllText('{{assign}}',assign);
         shape.getText().replaceAllText('{{related}}',realted);
         shape.getText().replaceAllText('{{start}}',start);
         shape.getText().replaceAllText('{{end}}',end);
         shape.getText().replaceAllText('{{tracker}}',tracker);
         shape.getText().replaceAllText('{{number}}',number);
         shape.getText().replaceAllText('{{descr}}',descr);
      }); 
      
     // update the slides, move the new one to the end (I think, Alan did not fiddle here)
     presLength = slides.length; 
     newSlide.move(presLength); 
      
    } // end our conditional statement
  }); //close our loop of conference sessions
  
  

// Remove the template slide (I left the template in in case I messed up)
// templateSlide.remove();
  
}
