// Initial Variables
let $students = $('.student-list').children('li');
let currentPage = 1;
let numberPages = 1;
let searchTerm = '';

// Add a div to contain page buttons to the HTML doc
$('.page').append('<button id="previous">Previous</button>');

// Add a previous button to the HTML doc
$('.page').append('<div class="page-links"></div>');

// Add a next buttom to the HTML doc
$('.page').append('<button id="next">Next</button>');

// Event listener for previous button to move back through pages
$('#previous').click(function() {
  if (currentPage > 1) {
    currentPage -=1;
    showPage(currentPage);
  }
});
// Event listener for next button to move forward through pages
$('#next').click(function() {
  if (currentPage < numberPages) {
    currentPage +=1;
    showPage(currentPage);
  }
});

// Add a search bar to the HTML document
$('h2').after('<div class="student-search"></div>');
$('.student-search').append('<input id="search" type="text" placeholder="Search (lowercase)...">');
$('.student-search').append('<button id="search-button">Search</button>');

/**************************************************************************
 * If no search resuts are returned a message and back button are displayed
 * When the back button is click the message and element buttons are removed
 * and the user is returned to the original list
***************************************************************************
*/
function showNoResults() {
  $('.student-item').hide();
  let noResults = '<p class="no-results">No students matched your search. Click back to return to student list</p>';
  $('.student-list').before(noResults).show();
  let backButton = '<button class="back">Back</button>';
  $('.student-list').before(backButton);
  $('.back').click(function() {
    $('.no-results').remove();
    $('.back').remove();
    $students = $('.student-list').children('li');
    appendPageLinks($students);
  });
}

/**************************************************************************
 * Takes input from the search bar and returns all students whose name or
 * email contains the search value.
***************************************************************************
*/
function searchList(input) {
  searchTerm = input;
  $students = $('h3:contains(' +searchTerm+')').closest('li');
  $students.add($('span:contains('+searchTerm+')').closest('li'));
  if ($students.length === 0) {
    showNoResults();
    };
  appendPageLinks($students);
  currentPage = 1;
}

/**************************************************************************
 * Hides all items on the page and then displays only 10 that correspond to
 * the selected page number.
***************************************************************************
*/
function showPage(number) {
  $('.student-item').hide();
  let pageNumber = number;
  let indexEnd = (pageNumber * 10);
  let indexStart = indexEnd - 10;
  $students.each(function(i) {
    if (i >= indexStart && i < indexEnd) {
      $(this).show();
    }
  });
}

/**************************************************************************
 * Creates a new button and adds it to the 'page-links' div #{param} number
 * will be the text displayed on the button.
***************************************************************************
*/
function addPageButton(number) {
  let newButton = '<button class="page-button" id="' + number + '">' + number + '</button>'
  $('.page-links').append(newButton);
}

/**************************************************************************
 * Iterates over the existing page buttons and adds an event listener to
 * call the showPage function on that page number.
***************************************************************************
*/
function addButtonListeners() {
  let $buttons = $('.page-links').children('button');
  $buttons.each(function(i) {
    $(this).click(function() {
      showPage(i + 1);
      currentPage = i + 1;
    });
  });
}

/**************************************************************************
 * Calculates how many pages are needed depending on the number of items
 * present and creates that many labeled buttons at the bottom of the page.
***************************************************************************
*/
function appendPageLinks(studentList) {
  $('.page-links').empty();
  showPage(1);
  numberPages = Math.ceil(studentList.length/10);
  for (let i = 0; i < numberPages; i += 1) {
    addPageButton(i + 1);
  }
  addButtonListeners()
}


appendPageLinks($students);

// Event listener for the search button
$('#search-button').click(function() {
  searchList($('#search').val());
});
