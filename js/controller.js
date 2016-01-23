var app = angular.module("gmd", []);

app.controller("gmdCtrl", function($scope) {
  $scope.searchResults = [];
  $scope.songs = [];
  /*$scope.songs = [
    {name:"Move Together", artist:"James Bay", album:"haha"},
    {name:"I See Fire", artist:"Ed Sheeran", album:"X"},
    {name:"Move Together", artist:"James Bay", album:"haha"},
    {name:"I See Fire", artist:"Ed Sheeran", album:"X"},
    {name:"Move Together", artist:"James Bay", album:"haha"},
    {name:"I See Fire", artist:"Ed Sheeran", album:"X"},
    {name:"Move Together", artist:"James Bay", album:"haha"},
    {name:"I See Fire", artist:"Ed Sheeran", album:"X"},
    {name:"Move Together", artist:"James Bay", album:"haha"},
    {name:"I See Fire", artist:"Ed Sheeran", album:"X"},
    {name:"Move Together", artist:"James Bay", album:"haha"},
    {name:"I See Fire", artist:"Ed Sheeran", album:"X"},
    {name:"Move Together", artist:"James Bay", album:"haha"},
    {name:"I See Fire", artist:"Ed Sheeran", album:"X"},
    {name:"Move Together", artist:"James Bay", album:"haha"},
    {name:"I See Fire", artist:"Ed Sheeran", album:"X"}
  ];*/
  
  $("#search-button").click(function() {
    $scope.searchResults = [];
    var query = $("#search-input")[0].value;
    query = query.split(" ").join("%20");
    if(query.length > 0) {
      $.get("https://api.spotify.com/v1/search?q=" + query + "&type=track").then(function(data) {
        console.log(data);
        var length = data.tracks.items.length;
        for(var i = 0; i < length; i++) {
          var artists = data.tracks.items[i].artists[0].name;
          var artistNo = data.tracks.items[i].artists.length;
          for(var j = 1; j < artistNo; j++) {
            if(artistNo > 2) artists += ", ";
            else artists += " ";
            if(j == artistNo - 1) artists += "and "
            artists += data.tracks.items[i].artists[j].name;
          }
          console.log(data.tracks.item);
          $scope.$apply(function() {
            $scope.searchResults.push({
              id: data.tracks.items[i].id,
              name: data.tracks.items[i].name,
              artist: artists,
              album: data.tracks.items[i].album.name
            });
          });
        }
      });
    }
  });
  
  $scope.clickSearchRow = function() {
    $scope.songs.push({name:this.songInfo.name, artist:this.songInfo.artist, album:this.songInfo.album, votes:0});
    $scope.searchResults = [];
    $("#search-input")[0].value = "";
  };
  
  $scope.upvote = function() {
    this.songInfo.votes++;
  };
});