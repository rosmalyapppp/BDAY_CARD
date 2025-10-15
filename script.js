let isPlaying = false;

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    document.getElementById(pageId).classList.add('active');

    if (pageId === 'calendar') {
        generateCalendar();
    }
}

function toggleMusic() {
    const disc = document.querySelector('.music-disc');
    const playIcon = document.getElementById('playIcon');
    
    isPlaying = !isPlaying;
    if (isPlaying) {
        disc.classList.add('playing');
        playIcon.textContent = '⏸';
    } else {
        disc.classList.remove('playing');
        playIcon.textContent = '▶';
    }
}

function blowCandles() {
    const wishMessage = document.getElementById('wishMessage');
    wishMessage.textContent = '🌟 Your wish has been made! May all your dreams come true! 🌟';
    wishMessage.classList.remove('opacity-0');
    wishMessage.classList.add('opacity-100');

    setTimeout(() => {
        wishMessage.innerHTML = '✨🎉 Happy Birthday! 🎉✨';
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
        dayCell.className = 'h-12 flex items-center justify-center text-white rounded-lg';
        
        if (day === today.getDate()) {
            dayCell.className += ' bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl';
            dayCell.innerHTML = `${day} 🎂`;
        } else {
            dayCell.className += ' bg-white/10 hover:bg-white/20 transition-colors cursor-pointer';
            dayCell.textContent = day;
        }

        calendarGrid.appendChild(dayCell);
    }
}

function playWish(wishNumber) {
    const messages = [
        "Playing heartfelt message from your loving family! 💕",
        "Your friends have something special to say! 🎉",
        "A surprise message just for you! ✨",
        "Birthday blessings coming your way! 🌈",
        "Time to dream big - this message will inspire you! ⭐",
        "Let the celebration begin with this special message! 🎊"
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

document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
});

