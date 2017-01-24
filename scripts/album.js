// Example album
var albumPicasso = {
	title: 'The Colors',
	artist: 'Pablo Picasso',
	label: 'Cubism',
	year: '1881',
	albumArtUrl: 'assets/images/album_covers/01.png',
	songs: [
		{ title: 'Blue', duration: '4:26' },
		{ title: 'Green', duration: '3:14' },
		{ title: 'Red', duration: '5:01' },
		{ title: 'Pink', duration: '3:21' },
		{ title: 'Magenta', duration: '2:15' },
	]
};

// Another example
var albumMarconi = {
 	title: 'The Telephone',
 	artist: 'Guglielmo Marconi',
 	label: 'EM',
 	year: '1909',
 	albumArtUrl: 'assets/images/album_covers/20.png',
 	songs: [
     	{ title: 'Hello, Operator?', duration: '1:01' },
     	{ title: 'Ring, ring, ring', duration: '5:01' },
     	{ title: 'Fits in your pocket', duration: '3:21'},
     	{ title: 'Can you hear me now?', duration: '3:14' },
     	{ title: 'Wrong phone number', duration: '2:15'}
     ]
 };

// create the album information
var createSongRow = function(songNumber, songName, songLength){
	var template = 
			'<tr class="album-view-song-item">'
			//	store song number data for event
			+	'<td class="song-item-number" data-song-number="'+ songNumber +'">'+ songNumber +'</td>'
			+	'<td class="song-item-title">'+ songName +'</td>'
			+	'<td class="song-item-duration">'+ songLength +'</td>'
				+ '</tr>'
				;
				
				return $(template);
}

// set the current album
var setCurrentAlbum = function(album){
	
    // select html elements 
    var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
	
	
	  // replace text nodes
	  $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
	
	  // clear album song list
	  $albumSongList.empty();
	
	  // go through all from album and insert into html
	  for(var i = 0; i < album.songs.length;i++){
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
	}
};


var findParentByClassName = function(element, targetClass) {
		// if element passed in
    if (element) {
				// store the parent 
        var currentParent = element.parentElement;
				// class of current parent != target Class param
				//and is not null
        while (currentParent.className != targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};
	
var clickHandler = function(targetElement){
	
	var songItem = getSongItem(targetElement);
	
	 if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
       
   // revert back to play button  
   }else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
       
	// song not active song, set new song to pause
	} else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }
};

//elements we will be adding listeners to
// store the first class in container
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

    

// create a play & pause button
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 // Store state of playing songs
var currentlyPlayingSong = null;

// when window loads
window.onload = function(){
	// make album picasso
	setCurrentAlbum(albumPicasso);
	
	songListContainer.addEventListener('mouseover', function(event){
		// only target individual song rows during event delegation
		// where the mouseover happens, only target that element with the parent element ==
		if (event.target.parentElement.className == 'album-view-song-item'){
        
			// change the content from the number to the play button's inner html
			// query selector to pnly return a single element with class
			  event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
        
        //song that mouse is over
        var songItem = getSongItem(event.target);
        
        // if not currently playing, pause it
        if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong){
            songItem.innerHTML = pauseButtonTemplate;
        }
		}
	});
	for (var i = 0; i < songRows.length; i++) {
		songRows[i].addEventListener('mouseleave', function(event){
        // 
        var songItem = getSongItem(event.target);
        var songItemNumber = songItem.getAttribute('data-song-number');
 
        // check mouse leaving not current song
        // if it is, change it
        if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songItemNumber;
             }
    });
    songRows[i].addEventListener('click', function(event){
           // Event handler call
          clickHandler(event.target);
    });
	}
}

	




































