chrome.action.onClicked.addListener(function () {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      var activeTabUrl = tabs[0].url;
      var _id;
      var _embed_link;
      if (checkYouTubeUrl(activeTabUrl) == "Playlist") {
        _id = extractPlaylistId(activeTabUrl);
        _embed_link = "https://www.youtube.com/embed/videoseries?list=" + _id;
      } else if (checkYouTubeUrl(activeTabUrl) == "Video") {
        _id = extractVideoId(activeTabUrl);
        _embed_link = "https://www.youtube.com/embed/" + _id;
      }

      var currentTab = tabs[0];
      var newIndex = currentTab.index + 1;

      chrome.tabs.create({
        index: newIndex,
        url: _embed_link,
      });
    }
  );
});

function extractVideoId(url) {
  var regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return null;
  }
}

function extractPlaylistId(url) {
  // Regular expression pattern to match YouTube playlist URLs
  var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;

  // Extract playlist ID using regular expression match
  var match = url.match(regExp);

  // If a match is found, return the playlist ID (group 2)
  if (match && match[2]) {
    return match[2];
  } else {
    // Return null if no match is found
    return null;
  }
}

function checkYouTubeUrl(url) {
  // Regular expression pattern to match YouTube playlist URLs
  var playlistRegExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;

  // Regular expression pattern to match YouTube video URLs
  var videoRegExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|v=)([^#\&\?]*).*/;

  // Check if the URL matches the playlist pattern
  var isPlaylist = playlistRegExp.test(url);

  // Check if the URL matches the video pattern
  var isVideo = videoRegExp.test(url);

  if (isPlaylist) {
    return "Playlist";
  } else if (isVideo) {
    return "Video";
  } else {
    return "Unknown";
  }
}
