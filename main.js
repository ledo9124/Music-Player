

const playlist = document.querySelector('.playlist');

const app = {
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


    strat : function() {
        this.render();

        
    }


};
  

app.strat();