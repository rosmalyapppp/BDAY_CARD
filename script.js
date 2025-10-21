let isPlaying = false;

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    if (pageId === 'calendar') generateCalendar();
}

function toggleMusic() {
    const disc = document.querySelector('.music-disc');
    const playIcon = document.getElementById('playIcon');
    const music = document.getElementById('bgMusic');
    
     if (!music.paused) {
    music.pause();
    disc.classList.remove('playing');
    playIcon.textContent = '▶';
    console.log("⏸ Music stopped");
  } 
  // kalau musik lagi mati → play
  else {
    music.volume = 0.7;
    music.play()
      .then(() => {
        disc.classList.add('playing');
        playIcon.textContent = '⏸';
        console.log("🎵 Music playing");
      })
      .catch(err => {
        console.warn("⚠️ Play blocked by browser:", err);
        alert("Please click once more to start the music 🎶");
      });
  }
}
    

function blowCandles() {
    const wishMessage = document.getElementById('wishMessage');
   wishMessage.textContent = '💫 Your wish has been made! May all your dreams come true! 💫';
    wishMessage.classList.remove('opacity-0');
    wishMessage.classList.add('opacity-100', 'text-black-500');

    setTimeout(() => {
        wishMessage.innerHTML = '🎊 Happy Birthday! 🎊';
        wishMessage.classList.add('text-black-150');
    }, 2000);
}

function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const birthdayDate = document.getElementById('birthdayDate');
    const today = new Date();

    birthdayDate.textContent = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarGrid.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'h-12';
        calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day flex items-center justify-center';
        
        if (day === 20) {
            dayCell.classList.add('bg-gradient-to-r', 'from-pink-400', 'to-purple-500', 'text-black', 'text-xl', 'font-bold');
            dayCell.innerHTML = `${day} 🎂`;

            dayCell.addEventListener('click', () => {
                const todayText = document.querySelector('#birthdayDate + div') || document.getElementById('birthdayDate');
                todayText.textContent = "🐣 생일 축하합니다 🐣";
            });
        } else {
            dayCell.textContent = day;
        }

        calendarGrid.appendChild(dayCell);
    }
}

function playWish(wishNumber) {
    const messages = [
        "A surprise message just for you! ✨",
        "Birthday blessings coming your way! 🌈",
    ];

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    overlay.innerHTML = `
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center max-w-md mx-4">
            <div class="text-6xl mb-4">🎥</div>
            <h3 class="text-2xl font-bold text-white mb-4">Playing Message ${wishNumber}</h3>
            <p class="text-white/90 mb-6">${messages[wishNumber - 1]}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);

    setTimeout(() => {
        if (overlay.parentElement) {
            overlay.remove();
        }
    }, 3000);
}


function openLetter1() {
  showPage('letter1');
}

function openLetter2() {
  showPage('letter2');
}



document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(".nav-btn, .menu-box");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const pageId = btn.dataset.page;
      console.log("Navigating to:", pageId);
      showPage(pageId);
    });
  });
});



















