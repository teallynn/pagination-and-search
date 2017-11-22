
let $studentArray = $('.student-list').children();
console.log($studentArray.length);

/**************************************************************************
 * Hides all items on the page and then displays only 10 that correspond to
 * the selected page number.
***************************************************************************
*/
function showPage(number) {
  $('.student-item').hide();
  let pageNumber = number;
  let indexEnd = (pageNumber * 10);
  let indexStart = indexEnd - 11;
  for (i = indexStart; i < indexEnd; i += 1) {
    $studentArray[i].show();
  }

}

/**************************************************************************
 * Creates a new button and adds it to the 'page-links' div #{param} number
 * will be the text displayed on the button.
***************************************************************************
*/
function addPageButton(number) {
  let newButton = '<button class="page-button">' + number + '</button>'
  $('.page-links').append(newButton);
}

/**************************************************************************
 * Calculates how many pages are needed depending on the number of items
 * present and creates that many labeled buttons at the bottom of the page.
***************************************************************************
*/
function appendPageLinks() {
  let numberPages = Math.ceil($studentArray.length/10);
  console.log(numberPages);
  for (let i = 0; i < numberPages; i += 1) {
    addPageButton(i + 1);
  }
}

//
function searchList() {

}

appendPageLinks();
showPage(1);
