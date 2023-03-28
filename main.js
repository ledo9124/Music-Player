
const dashBoard = document.querySelector('.dashboard');
const playlist = document.querySelector('.playlist');
const nameSong = document.querySelector('.name-song');
const cdThumb = document.querySelector('.img');
const audio = document.querySelector('#audio');
const btnPlayPause = document.querySelector('.play-pause');
const progress = document.querySelector('#progress');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const repeatBtn = document.querySelector('.repeat');
const radomBtn = document.querySelector('.radom');

const app = {
    currentIndex : 0,
    isPlaying : false,
    isRadom : false,
    isRepeat : false,

    songs : [
        {
            id : 1,
            name : 'Legends Never Die',
            path : './asset/music/Legends_Never_Die.mp3',
            image : './asset/img/song1.png'
        },
        {
            id : 2,
            name : 'Payphone',
            path : './asset/music/Payphone.mp3',
            image : './asset/img/song2.png'
        },
        {
            id : 3,
            name : 'Attention',
            path : './asset/music/Attention.mp3',
            image : './asset/img/song3.png'
        },
        {
            id : 4,
            name : 'Death Bed',
            path : './asset/music/Death_Bed.mp3',
            image : './asset/img/song4.png'
        },
        {
            id : 5,
            name : 'Let Me Down Slowly',
            path : './asset/music/Let_Me_Down_Slowly.mp3',
            image : './asset/img/song5.png'
        },
        {
            id : 6,
            name : 'We Don\'t Talk Anymore',
            path : './asset/music/We_dont_talk_anymore.mp3',
            image : './asset/img/song6.png'
        },
        {
            id : 7,
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
        document.querySelectorAll('.song')[0].classList.add('active');
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
        const cdWWidth = cdThumb.offsetWidth;
        //Xử lý cd / dừng
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause();
        //Xử lý cd
        document.querySelector('.container').onscroll = function(){
            const scrollTop = window.scrollY || document.querySelector('.container').scrollTop;
            const newCdWWidth = cdWWidth -scrollTop;
            cdThumb.style.width = newCdWWidth > 0 ? newCdWWidth + 'px' : 0;
            cdThumb.style.height =  newCdWWidth > 0 ? newCdWWidth + 'px' : 0;
            cdThumb.style.opacity = newCdWWidth / cdWWidth;
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
            cdThumb.classList.add('active');
            cdThumbAnimate.play();
        }

        //Khi song bị pause
        audio.onpause = function() {
            _This.isPlaying = false;
            btnPlayPause.classList.remove('active');
            cdThumb.classList.remove('active');
            cdThumbAnimate.pause();
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

        //Khi next song
        nextBtn.onclick = function() {
            if (_This.isRadom) {
                _This.radomSong();
            }else {
                _This.nextSong();
            }
            audio.play();
        }
        //Khi prev
        prevBtn.onclick = function() {
            if (_This.isRadom) {
                _This.radomSong();
            }else {
                _This.prevSong();
            }
            audio.play();
        }

        //Bật tắt sử lý radom song
        radomBtn.onclick = function () {
            _This.isRadom = !_This.isRadom;
            radomBtn.classList.toggle('active' , _This.isRadom);
        }

        //Xử lý khi repeat song
        repeatBtn.onclick = function() {
            _This.isRepeat = !_This.isRepeat;
            repeatBtn.classList.toggle('active' , _This.isRepeat);
        }

        //Khi hết song
        audio.onended = function () {
            setTimeout(() => {
                if (_This.isRepeat) {
                    audio.play();
                }else {
                    nextBtn.click();
                }
            }, 1000)
        }

    },
    loadCurrentSong: function() {
        nameSong.textContent = this.currentSong.name;
        const htmls = `
        <div class="bg-layer"></div>
        <img src="${this.currentSong.image}" alt="">`;
        cdThumb.innerHTML = htmls;
        audio.src = this.currentSong.path;
        const song = document.querySelectorAll('.song');
        document.querySelector('.song.active').classList.remove('active');
        song[this.currentIndex].classList.add('active');
    },

    nextSong : function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    repeated : [],
    radomSong : function() {
        let newIndex;
        let isIndexRepeat = false;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
            isIndexRepeat = this.repeated.some((index) => {
                return index == newIndex;
            })
            if (this.repeated.length == this.songs.length) {
                this.repeated.splice(0 , this.songs.length -1);
            }
        } while (newIndex === this.currentIndex || isIndexRepeat == true);
        this.repeated.push(newIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    strat : function() {
        this.defineProperties();

        this.baseLength();

        this.handleEvents();

        this.render();
        
        this.loadCurrentSong();
    }
};
  
app.strat();