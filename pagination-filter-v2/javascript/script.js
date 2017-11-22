
let $students = $('.student-list').children('li');
console.log($students.length);

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
      console.log($(this));
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

function addButtonListeners() {
  let $buttons = $('.page-links').children('button');
  $buttons.each(function(i) {
    $(this).click(function() {
      showPage(i + 1);
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
  let numberPages = Math.ceil($students.length/10);
  console.log(numberPages);
  for (let i = 0; i < numberPages; i += 1) {
    addPageButton(i + 1);
  }
  addButtonListeners()
}

//
function searchList() {

}

appendPageLinks();
