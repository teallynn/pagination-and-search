
let $students = $('.student-list').children('li');
console.log($students.length);
let currentPage = 1;
let numberPages = 1;
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
function appendPageLinks() {
  showPage(1);
  numberPages = Math.ceil($students.length/10);
  console.log(numberPages);
  for (let i = 0; i < numberPages; i += 1) {
    addPageButton(i + 1);
  }
  addButtonListeners()
}

//
function searchList() {

}


// Event Listeners for prev/next buttons to move back/forward through page
$('#previous').click(function() {
  currentPage -=1;
  if (currentPage > 0) {
    showPage(currentPage);
  }
});

$('#next').click(function() {
  currentPage +=1;
  if (currentPage <= numberPages) {
    showPage(currentPage);
  }
});


appendPageLinks();
