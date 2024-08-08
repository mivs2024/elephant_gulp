const $playerMedia = document.querySelector('#player-media');
const $video = document.querySelector('#player-media video');

export function play(){
    $video.play()
}

export function pause(){
    $video.pause()
}
if ($playerMedia && $video) {
    const playerElements = {
        playBtn: $playerMedia.querySelector('.player__controls-play'),
        muteBtn: $playerMedia.querySelector('.player__controls-mute'),
        time: $playerMedia.querySelector('.player__controls-time'),
        progressBar: $playerMedia.querySelector('.player__progressbar'),
        progressThumb: $playerMedia.querySelector('.player__progressbar-thumb'),
        progress: $playerMedia.querySelector('.player__progressbar-progress'),
        buffered: $playerMedia.querySelector('.player__progressbar-buffered')
    }

    let isDragging = false




    $video.addEventListener('loadedmetadata', function () {

        const duration = $video.duration;
        const currentTime = $video.currentTime;
        playerElements.time.textContent = formatTime(currentTime) + " / " + formatTime(duration);

       
        playerElements.progress.style.width = `0%`
        playerElements.buffered.style.width = `0%`
        playerElements.progressThumb.style.left = `0%`

    });

  

    $video.addEventListener('timeupdate', function (e) {
        const currentTime = $video.currentTime;
        const duration = $video.duration;
        const len = $video.buffered.length
     
        if(len>0){
            const buffered = $video.buffered.end(len - 1)
            playerElements.buffered.style.width = `${calcProcent(buffered, duration)}%`

        }
       

        playerElements.time.textContent = formatTime(currentTime) + " / " + formatTime(duration);

        playerElements.progress.style.width = `${calcProcent(currentTime, duration)}%`
        playerElements.progressThumb.style.left = `${calcProcent(currentTime, duration)}%`
    });



    playerElements.playBtn.addEventListener('click', (e) => {

        if ($video.paused) {
            $playerMedia.classList.add('played')
            $playerMedia.classList.remove('paused')
            $video.play();
        } else {
            $playerMedia.classList.remove('played')
            $playerMedia.classList.add('paused')
            $video.pause();
        }


    })

    playerElements.muteBtn.addEventListener('click', (e) => {

        if ($video.muted) {
            $playerMedia.classList.add('unmuted')
            $playerMedia.classList.remove('muted')
            $video.muted = false;
        } else {
            $playerMedia.classList.remove('unmuted')
            $playerMedia.classList.add('muted')
            $video.muted = true;
        }


    })

    playerElements.progressBar.addEventListener('mousedown', (e) => {
        updateCurrentTime(e.clientX)
        isDragging = true
    })

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            updateCurrentTime(e.clientX);
        }

    });


    document.addEventListener('mouseup', function (e) {
        isDragging = false
    })

    const updateCurrentTime = (clientX) => {
        const rect = playerElements.progressBar.getBoundingClientRect()

        if (rect) {
            const currentBarPosition = clientX - rect.left
            const newTime = (currentBarPosition / rect.width) * $video.duration

            playerElements.time.textContent = formatTime(newTime) + " / " + formatTime($video.duration);
            playerElements.progress.style.width = `${calcProcent(newTime, $video.duration)}%`
            playerElements.progressThumb.style.left = `${calcProcent(newTime, $video.duration)}%`

            $video.currentTime = newTime


        }
    }
}

const calcProcent = (time, totalTime) => {
    return Math.floor((100 * time) / totalTime)
}

const formatTime = (time, format = 'colon') => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    if (format === 'dot') {
        return minutes + ' мин. ' + seconds + ' сек.'
    }

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

function init() {
    if ($playerMedia && $video) {
      
        $playerMedia.classList.remove('paused')
        $playerMedia.classList.add('played')
        // $video.play();

        $playerMedia.classList.add('muted')
        $playerMedia.classList.remove('unmuted')
        $video.muted = true;
    }
}



init()

