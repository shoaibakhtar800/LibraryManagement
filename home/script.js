function handleSearch(value) {
    var searchQuery = document.getElementById('searchInput').value;

    var encodedSearchQuery = encodeURIComponent(searchQuery);

    // var url = '../booklist/index.html?search=' + encodedSearchQuery + 'query=' + value;
    var url = `../booklist/index.html?search=${encodedSearchQuery}`;

    // Redirect the user to the other page
    window.location.href = url;
}
