
const dashBoard = document.querySelector('.dashboard');
const playlist = document.querySelector('.playlist');
const nameSong = document.querySelector('.name-song');
const cdThumb = document.querySelector('.img');
const audio = document.querySelector('#audio');
const cd = document.querySelector('.img');
const btnPlayPause = document.querySelector('.play-pause');
const progress = document.querySelector('#progress');

const app = {
    currentIndex : 0,
    isPlaying : false,
    songs : [
        {
            name : 'Legends Never Die',
            path : './asset/music/Legends_Never_Die.mp3',
            image : './asset/img/song1.png'
        },
        {
            name : 'Payphone',
            path : './asset/music/Payphone.mp3',
            image : './asset/img/song2.png'
        },
        {
            name : 'Attention',
            path : './asset/music/Attention.mp3',
            image : './asset/img/song3.png'
        },
        {
            name : 'Death Bed',
            path : './asset/music/Death_Bed.mp3',
            image : './asset/img/song4.png'
        },
        {
            name : 'Let Me Down Slowly',
            path : './asset/music/Let_Me_Down_Slowly.mp3',
            image : './asset/img/song5.png'
        },
        {
            name : 'We Don\'t Talk Anymore',
            path : './asset/music/We_dont_talk_anymore.mp3',
            image : './asset/img/song6.png'
        },
        {
            name : 'Rather Be',
            path : './asset/music/Rather_Be.mp3',
            image : './asset/img/song7.png'
        }
    ],
    render: function() {
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
                <img class="thumb" src="${song.image}" alt="${song.name}">
                <div class="body"><div class="title">${song.name}</div></div>
                <div class="option"><i class="fa-solid fa-ellipsis"></i></div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('');
    },
    //Xử lý kích thước dashboard
    baseLength : function() {
        let withdashboard;
        let heightdashboard;
        window.addEventListener('load' , () => {
            heightdashboard = (window.innerHeight/2) -355;
            dashBoard.style.top = heightdashboard + 'px';
            withdashboard = (window.innerWidth/2) - 200;
            dashBoard.style.left = withdashboard + 'px';
            dashBoard.style.right = withdashboard + 'px';
        })
        window.addEventListener('resize' , () => {
            heightdashboard = (window.innerHeight/2) -355;
            dashBoard.style.top = heightdashboard + 'px';
            withdashboard = (window.innerWidth/2) - 200;
            dashBoard.style.left = withdashboard + 'px';
            dashBoard.style.right = withdashboard + 'px';
        });
    },
    defineProperties : function() {
        Object.defineProperty(this , 'currentSong' , {
            get: function () {
                return this.songs[this.currentIndex]
            }   
        }) 
    },
    handleEvents : function(){
        const _This = this;
        //Xử lý cd
        const cdWWidth = cd.offsetWidth;
        document.querySelector('.container').onscroll = function(){
            const scrollTop = window.scrollY || document.querySelector('.container').scrollTop;
            const newCdWWidth = cdWWidth -scrollTop;
            cd.style.width = newCdWWidth > 0 ? newCdWWidth + 'px' : 0;
            cd.style.height =  newCdWWidth > 0 ? newCdWWidth + 'px' : 0;
            cd.style.opacity = newCdWWidth / cdWWidth;
        }
        //Xử lý play-pause
        btnPlayPause.onclick = function() {
            if (_This.isPlaying == false){
                audio.play();
            }else {
                audio.pause();
            }
            
        }

        // Khi song play
        audio.onplay = function() {
            _This.isPlaying = true;
            btnPlayPause.classList.add('active');
        }

        //Khi song bị pause
        audio.onpause = function() {
            _This.isPlaying = false;
            btnPlayPause.classList.remove('active');
        }

        //Xử lý tiến độ song thay đổi
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        }

        //Khi tua song
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }


    },
    loadCurrentSong: function() {
        nameSong.textContent = this.currentSong.name;
        const htmls = `
        <div class="bg-layer"></div>
        <img src="${this.currentSong.image}" alt="">`;
        cdThumb.innerHTML = htmls;
        audio.src = this.currentSong.path;
    },
    strat : function() {
        this.defineProperties();

        this.baseLength();

        this.handleEvents();

        this.loadCurrentSong();

        this.render();
    }


};
  

app.strat();