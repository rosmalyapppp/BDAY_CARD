let isPlaying = false;
let audioContext;
let currentNote = 0;
let noteTimeout;

const happyBirthdayMelody notes (frequencies in Hz)
        const happyBirthdayMelody = [
            { freq: 261.63, duration: 0.5 }, // C4 - Hap-
            { freq: 261.63, duration: 0.5 }, // C4 - py
            { freq: 293.66, duration: 1.0 }, // D4 - Birth-
            { freq: 261.63, duration: 1.0 }, // C4 - day
            { freq: 349.23, duration: 1.0 }, // F4 - to
            { freq: 329.63, duration: 2.0 }, // E4 - you
            
            { freq: 261.63, duration: 0.5 }, // C4 - Hap-
            { freq: 261.63, duration: 0.5 }, // C4 - py
            { freq: 293.66, duration: 1.0 }, // D4 - Birth-
            { freq: 261.63, duration: 1.0 }, // C4 - day
            { freq: 392.00, duration: 1.0 }, // G4 - to
            { freq: 349.23, duration: 2.0 }, // F4 - you
            
            { freq: 261.63, duration: 0.5 }, // C4 - Hap-
            { freq: 261.63, duration: 0.5 }, // C4 - py
            { freq: 523.25, duration: 1.0 }, // C5 - Birth-
            { freq: 440.00, duration: 1.0 }, // A4 - day
            { freq: 349.23, duration: 1.0 }, // F4 - dear
            { freq: 329.63, duration: 1.0 }, // E4 - [name]
            { freq: 293.66, duration: 2.0 }, // D4 - 
  
            { freq: 466.16, duration: 0.5 }, // Bb4 - Hap-
            { freq: 466.16, duration: 0.5 }, // Bb4 - py
            { freq: 440.00, duration: 1.0 }, // A4 - Birth-
            { freq: 349.23, duration: 1.0 }, // F4 - day
            { freq: 392.00, duration: 1.0 }, // G4 - to
            { freq: 349.23, duration: 2.0 }  // F4 - you
        ];


function createAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

function playNote(frequency, duration) {
            const ctx = createAudioContext();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
            
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + duration);
        }
 
        function playHappyBirthday() {
            if (currentNote >= happyBirthdayMelody.length) {
                currentNote = 0;
            }
            
            const note = happyBirthdayMelody[currentNote];
            playNote(note.freq, note.duration);
            
            currentNote++;
            
            if (isPlaying && currentNote < happyBirthdayMelody.length) {
                noteTimeout = setTimeout(playHappyBirthday, note.duration * 500);
            } else if (isPlaying && currentNote >= happyBirthdayMelody.length) {
                // Loop the song
                currentNote = 0;
                noteTimeout = setTimeout(playHappyBirthday, 1000);
            }
        }
        
  function stopHappyBirthday() {
            if (noteTimeout) {
                clearTimeout(noteTimeout);
                noteTimeout = null;
            }
            currentNote = 0;
        }
        
        function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update nav buttons
            const navButtons = document.querySelectorAll('.nav-btn');
            navButtons.forEach(btn => btn.classList.remove('bg-white/40'));
            event.target.classList.add('bg-white/40');
            
   // Initialize calendar if calendar page is shown
            if (pageId === 'calendar') {
                generateCalendar();
            }
            
            // Restart cake animation if cake page is shown
            if (pageId === 'cake') {
                restartCakeAnimation();
            }
        }
        
        function restartCakeAnimation() {
            const cakeElements = document.querySelectorAll('.cake-base, .cake-middle, .cake-top, .candle');
            cakeElements.forEach(element => {
                element.style.animation = 'none';
                element.offsetHeight; // Trigger reflow
                element.style.animation = null;
            });
        }
        
 function toggleMusic() {
            const disc = document.querySelector('.music-disc');
            const playIcon = document.getElementById('playIcon');
            
            isPlaying = !isPlaying;
            
            if (isPlaying) {
                disc.classList.add('playing');
                playIcon.textContent = '⏸';
                playHappyBirthday();
            } else {
                disc.classList.remove('playing');
                playIcon.textContent = '▶';
                stopHappyBirthday();
            }
        }
        
        function blowCandles() {
            const flames = document.querySelectorAll('.flame');
            const wishMessage = document.getElementById('wishMessage');
            
        // Hide all flames
            flames.forEach(flame => {
                flame.style.opacity = '0';
                flame.style.transform = 'scale(0)';
            });
            
            wishMessage.textContent = '🌟 Your wish has been made! May all your dreams come true! 🌟';
            wishMessage.classList.remove('opacity-0');
            wishMessage.classList.add('opacity-100');
            
            // Add some sparkle effect
            setTimeout(() => {
                wishMessage.innerHTML = '✨🎉 Happy Birthday! 🎉✨';
            }, 2000);
            
            // Relight candles after 5 seconds
            setTimeout(() => {
                flames.forEach(flame => {
                    flame.style.opacity = '1';
                    flame.style.transform = 'scale(1)';
                });
            }, 5000);
        }
        
        function generateCalendar() {
            const calendarGrid = document.getElementById('calendarGrid');
            const birthdayDate = document.getElementById('birthdayDate');
            const today = new Date();
            
            // Set birthday date display
            birthdayDate.textContent = today.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            // Generate calendar for current month
            const year = today.getFullYear();
            const month = today.getMonth();
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            calendarGrid.innerHTML = '';
            
            // Add empty cells for days before the first day of the month
            for (let i = 0; i < firstDay; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.className = 'h-12';
                calendarGrid.appendChild(emptyCell);
            }
            
            // Add days of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'h-12 flex items-center justify-center text-purple-800 rounded-lg';
                
                if (day === today.getDate()) {
                    dayCell.className += ' bg-gradient-to-r from-yellow-300 to-pink-300 text-purple-800 font-bold text-xl';
                    dayCell.innerHTML = ${day} 🎂;
                } else {
                    dayCell.className += ' bg-white/20 hover:bg-white/30 transition-colors cursor-pointer';
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
            
            // Create a temporary message overlay
            const overlay = document.createElement('div');
            overlay.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
            overlay.innerHTML = `
                <div class="pastel-card rounded-2xl p-8 text-center max-w-md mx-4">
                    <div class="text-6xl mb-4">🎥</div>
                    <h3 class="text-2xl font-bold text-purple-800 mb-4">Playing Message ${wishNumber}</h3>
                    <p class="text-purple-700 mb-6">${messages[wishNumber - 1]}</p>
                    <button onclick="this.parentElement.parentElement.remove()" class="pastel-button px-6 py-2 rounded-lg transition-colors">
                        Close
                    </button>
                </div>
            `;
            
            document.body.appendChild(overlay);
            
            // Auto-close after 3 seconds
            setTimeout(() => {
                if (overlay.parentElement) {
                    overlay.remove();
                }
            }, 3000);
        }
        
        // Initialize the app
        document.addEventListener('DOMContentLoaded', function() {
            generateCalendar();
        });
