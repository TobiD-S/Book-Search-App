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