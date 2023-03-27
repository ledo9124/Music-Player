
const dashBoard = document.querySelector('.dashboard');
const playlist = document.querySelector('.playlist');
const nameSong = document.querySelector('.name-song');
const cdThumb = document.querySelector('.img');
const audio = document.querySelector('#audio');
const cd = document.querySelector('.img');


const app = {
    currentIndex : 0,
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
    baseLength : function() {
        window.addEventListener('resize', () => {
            let withdashboard = 0;
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
        const cdWWidth = cd.offsetWidth;

        document.querySelector('.container').onscroll = function(){
            const scrollTop = window.scrollY || document.querySelector('.container').scrollTop;
            const newCdWWidth = cdWWidth -scrollTop;
            cd.style.width = newCdWWidth > 0 ? newCdWWidth + 'px' : 0;
            cd.style.height =  newCdWWidth > 0 ? newCdWWidth + 'px' : 0;
            cd.style.opacity = newCdWWidth / cdWWidth;
        }
    },
    loadCurrentSong: function() {
        nameSong.textContent = this.currentSong.name;
        const htmls = this.songs.map(song => {
            return `
                <div class="bg-layer"></div>
                <img src="${this.currentSong.image}" alt="">
            `
        });
        cdThumb.innerHTML = htmls.join('');
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