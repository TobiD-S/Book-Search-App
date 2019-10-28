$(document).ready(function() {
    var item, title, author, publisher, bookLink, bookImg, bookIsbn;
    var outputList = document.getElementById("list-output");
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q="
    var placeHldr = '<img src="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjR547RhrDlAhVYAGMBHUHqDxQQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Ftoppsta.com%252Fblog%252Fview%252Fworld-book-day%26psig%3DAOvVaw2cGBGgPhZIN5jjRGOPrmMX%26ust%3D1571839856789657&psig=AOvVaw2cGBGgPhZIN5jjRGOPrmMX&ust=1571839856789657">'
    var searchData;

    // listener for search button
    $("#search").click(function() {
        outputList.innerHTML = "",
            searchData = $("#search-box").val();
        // handling empty search input field
        if (searchData === "" || searchData === null) {
            displayError();
        } else {
            $.ajax({
                url: bookUrl + searchData,
                dataType: "json",
                success: function(res) {
                    console.log(res)
                    if (response.totalItem === 0) {
                        alert("No results for this search");
                    } else {
                        $("title").animate({ 'margin-top: 10px' }, 1000);
                        $(".book-list").css('visibility', "visible");
                        displayResults(response);
                    }
                }
                error: function() {
                    alert("Something went wrong...<br>" + "Try another keyword");
                }
            });
        }
        $("#search-box").val("");
    });

    /*
    function to display results in index.html
    @param res
    */
    function displayResults(res) {
        for (var i = 0; i < res.items.length; i += 2) {
            item = res.items[i];
            title1 = item.volumeInfo.title;
            author1 = item.volumeInfo.author;
            bookLink1 = item.volumeInfo.previewLink;
            publisher1 = item.volumeInfo.publisher;
            bookIsbn1 = item.volumeInfo.industryIdentifiers[1].identifier;
            bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

            item2 = res.items[i + 1];
            title2 = item2.volumeInfo.title;
            author2 = item2.volumeInfo.author;
            bookLink2 = item2.volumeInfo.previewLink
            publisher2 = item2.volumeInfo.publisher;
            bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier;
            bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr;

            // output to output list
            outputList.innerHTML += '<div class="row mt-4">' +
                formatOutput(bookImg1, title1, author1, publisher1, bookLink1, bookIsbn1);
            formatOutput(bookImg2, title2, author2, publisher2, bookLink2, bookIsbn2);
            '</div>';

            console.log(outputList);
        }
    }

    /*
    template for bootstrap cards
    */
    function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn) {
        var viewerUrl = 'book.html?isbn= ' + bookIsbn;
        var htmlCard = '<div class="col-lg-6"> <
        div class = "card"
        style = "" >
            <
            div class = "row no-gutters" >
            <
            div class = "col-md-4" >
            <
            img src = "${bookImg}"
        class = "card-img"
        alt = "..." >
            <
            /div> <
        div class = "col-md-8" >
            <
            div class = "card-body" >
            <
            h5 class = "card-title" > $ { title } < /h5> <
        p class = "card-text" > Author: $ { author } < /p> <
        p class = "card-text" > Publisher: $ { publisher } < /p> <
        a target = "_blank"
        href = "${viewUrl}"
        class = "btn btn-secondary" > Read Book < /a> < /
        div > <
            /div> < /
        div > < /div > < /div > '
        return htmlCard;

    }
}
});
const searchView = {
    init() {
        this.searchBar = document.querySelector('#search-bar');
        this.searchBtn = document.querySelector('#search-btn');

        // Search listeners
        this.searchBar.addEventListener('keypress', event => {
            (event.keyCode === 13 && event.target.value !== '') && controller.searchNRender(event.target.value);
        });

        this.searchBtn.addEventListener('click', () => {
            (this.searchBar.value !== '') && controller.searchNRender(this.searchBar.value);
        });
    }
}
const resultsData = {
    init() {
        this.allResults = []; // Array to store all unique results
        this.results = {}; // Object to store results for individual searches
    },

    setResults(res, term = null) {
        if (!term) {
            this.allResults = res;
        } else {
            this.results[term] = res;
        }
    },

    getResults(term = null) {
        return (!term ? this.allResults : this.results[term]);
    }
}

const resultsView = {
        init() {
            this.resultsElement = document.querySelector('.results');
            this.resultsArea = document.querySelector('#results-area');
        },

        render(list) {
            // Create a fragment and append 'li' elements containing book entries to fragment to prevent frequent updates on DOM
            let fragment = document.createDocumentFragment();

            // Generate html for each book entry and append to fragment
            list.forEach(item => {
                        let bookData = item.volumeInfo;
                        const bookItem = document.createElement('li');
                        bookItem.className = 'book-item';
                        // Generate html for book cover
                        let cover = '';
                        if (bookData.imageLinks && bookData.imageLinks.thumbnail) {
                            const img = `<a title="Preview Link" href=${bookData.previewLink} target="_blank"><img class="thumbimg" src=${bookData.imageLinks.thumbnail} alt=${`${bookData.title} book image`}></a>`;
    const link = `<a class="preview" title="Preview Link" href=${bookData.previewLink} target="_blank"><i class="fas fa-eye"></i></a>`;
    cover = `<div class="image-div">
                  ${img}
                  ${link}
                  </div>`;
  }
  else {
    cover = `<div class="image-div backup">
                <p class="cover-backup">Cover Image Unavailable</p>
              </div>`
  }
  // Generate html for title, subtitle, and authors
  const title = `<a class="title ellipsis" href=${bookData.previewLink} title="${bookData.title}" target="_blank">${bookData.title}</a>`;
  let subtitleProp = bookData.subtitle ? bookData.subtitle : ' ';
  const subtitle = `<p class="subtitle ellipsis" title="${subtitleProp}">${subtitleProp}</p>`
  let authorsProp = bookData.authors ? bookData.authors.join(', ') : '';
  const authors = `<p class="author ellipsis" title="${authorsProp}">${authorsProp}</p>`
  // Add book data to book entry
  bookItem.innerHTML = `${cover}
                        ${title}
                        ${subtitle}
                        ${authors}`;
  fragment.append(bookItem);
});
this.resultsElement.innerHTML = '';
this.resultsElement.appendChild(fragment);
},

// Renders an error message
// Previous results are retained in results area while error message is rendered on the top
showError(msg) {
const newError = document.createElement('p');
newError.className = 'error';
newError.innerHTML = msg;
this.resultsArea.insertBefore(newError, this.resultsArea.children[1]);
},

clearError() {
this.resultsArea.removeChild(document.querySelector('.error'));
}

}