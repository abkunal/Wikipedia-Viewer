var articles = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srprop=snippet&callback=?&srsearch=%QUERY',
    wildcard: '%QUERY',
    filter: function(json){
      console.log(json);
      var array = json.query.search;
      var arr = [];
      for (var i = 0; i < array.length; i++){
        arr.push(array[i].title);
      }
      console.log(arr);
      return arr;
    }
  }
});

$('.typeahead').typeahead(null, {
  name: 'articles',
  source: articles
});

$("document").ready(function(){
  // when search button is clicked
  $("button").on("click", function doit(){
    // get the name of article
    var article = $("#article").val();
    
    // create link for the json data
    // callback=? is added at the end to allow for cross-domain requests
    var api ="https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srprop=snippet&srsearch=" + encodeURIComponent(article) + "&callback=?";
    
    $.getJSON(api, function(json){
 
      var html = "";
      //console.log(json.query.search);
      for (var key in json.query.search){
          //console.log(json.query.search[key].title);
        var direct = json.query.search[key];
        html += "<a style='text-decoration:none' target='_blank' href=https://en.wikipedia.org/wiki/" + encodeURIComponent(direct.title) + ">" + "<div class='well col-xs-offset-1 col-xs-10 col-sm-offset-1 col-sm-10'>";
        html += "<h3 style='color: black'>" + direct.title  + "</h3><br>";
        html += "<p style='color: black'>" + direct.snippet + "</p>";
        html += "</div></a><br>";
      }
      $(".message").html(html);
    });
  });
});