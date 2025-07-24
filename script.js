// Confetti Animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');

    // Play confetti sprinkling sound IMMEDIATELY
    playConfettiSprinkleSound();

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confettiContainer.appendChild(confetti);

        // Play individual confetti sounds immediately for first few pieces
        if (i < 10) {
            playTinyConfettiSound();
        }

        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// Firecracker Animation
function createFirecrackers() {
    const colors = ['#ff4500', '#ff6347', '#ffd700', '#ff69b4', '#00ff00', '#00bfff', '#ff1493'];

    // Play immediate firecracker sounds
    for (let j = 0; j < 5; j++) {
        playFireworkSound();
        playSparkleSound();
    }

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const firecracker = document.createElement('div');
            firecracker.className = 'firecracker';
            firecracker.style.left = Math.random() * 100 + 'vw';
            firecracker.style.top = Math.random() * 50 + 20 + 'vh';
            firecracker.style.background = colors[Math.floor(Math.random() * colors.length)];
            firecracker.style.boxShadow = `0 0 20px ${colors[Math.floor(Math.random() * colors.length)]}`;
            document.body.appendChild(firecracker);

            // Create sparkles around firecracker
            createSparkles(firecracker.style.left, firecracker.style.top);

            // Remove firecracker after animation
            setTimeout(() => {
                if (firecracker.parentNode) {
                    firecracker.parentNode.removeChild(firecracker);
                }
            }, 2000);
        }, i * 200);
    }
}

// Sparkle Animation
function createSparkles(x, y) {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = x;
        sparkle.style.top = y;
        sparkle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`;
        document.body.appendChild(sparkle);

        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
    }
}

// Global audio context for better performance
let globalAudioContext = null;

// Initialize audio context
function initAudioContext() {
    if (!globalAudioContext) {
        try {
            globalAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio not supported');
            return null;
        }
    }

    if (globalAudioContext.state === 'suspended') {
        globalAudioContext.resume();
    }

    return globalAudioContext;
}

// Enhanced Sound Effects (Web Audio API)
function playSound(frequency, duration, type = 'sine', volume = 0.3) {
    const audioContext = initAudioContext();
    if (!audioContext) return;

    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
        console.log('Sound playback failed');
    }
}

// Birthday Song Melody
function playBirthdayMelody() {
    const notes = [
        { freq: 262, time: 0, duration: 0.5 }, // C
        { freq: 262, time: 0.5, duration: 0.3 }, // C
        { freq: 294, time: 0.8, duration: 0.7 }, // D
        { freq: 262, time: 1.5, duration: 0.7 }, // C
        { freq: 349, time: 2.2, duration: 0.7 }, // F
        { freq: 330, time: 2.9, duration: 1.4 }, // E
        { freq: 262, time: 4.5, duration: 0.5 }, // C
        { freq: 262, time: 5, duration: 0.3 }, // C
        { freq: 294, time: 5.3, duration: 0.7 }, // D
        { freq: 262, time: 6, duration: 0.7 }, // C
        { freq: 392, time: 6.7, duration: 0.7 }, // G
        { freq: 349, time: 7.4, duration: 1.4 }, // F
    ];

    notes.forEach(note => {
        setTimeout(() => {
            playSound(note.freq, note.duration, 'sine', 0.4);
        }, note.time * 1000);
    });
}

// Firework Explosion Sound
function playFireworkSound() {
    // Whoosh sound
    playSound(100, 0.3, 'sawtooth', 0.2);
    setTimeout(() => {
        // Explosion sound
        playSound(80 + Math.random() * 200, 0.5, 'square', 0.3);
        // Sparkle sounds
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                playSound(800 + Math.random() * 400, 0.1, 'sine', 0.1);
            }, i * 50);
        }
    }, 300);
}

// Balloon Pop Sound
function playBalloonPop() {
    playSound(150 + Math.random() * 100, 0.1, 'square', 0.4);
    setTimeout(() => {
        playSound(80, 0.05, 'triangle', 0.2);
    }, 50);
}

// Enhanced Confetti Sounds
function playConfettiSound() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            playSound(600 + Math.random() * 400, 0.05, 'triangle', 0.1);
        }, i * 30);
    }
}

// Confetti Sprinkling Sound (like gentle rain)
function playConfettiSprinkleSound() {
    // Play multiple immediate sounds
    for (let i = 0; i < 10; i++) {
        playSound(800 + Math.random() * 600, 0.08, 'triangle', 0.08);
    }

    // Gentle whoosh sound
    playSound(300, 1.5, 'sawtooth', 0.05);

    // Sparkly overlay - play immediately
    for (let i = 0; i < 8; i++) {
        playSound(1200 + Math.random() * 800, 0.04, 'sine', 0.06);
    }

    // Additional delayed sounds for continuation
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            playSound(800 + Math.random() * 600, 0.08, 'triangle', 0.08);
        }, i * 150);
    }
}

// Individual tiny confetti piece sound
function playTinyConfettiSound() {
    if (Math.random() < 0.3) { // Only play for 30% of confetti pieces
        playSound(900 + Math.random() * 400, 0.03, 'triangle', 0.04);
    }
}

// Sparkle Twinkle Sound
function playSparkleSound() {
    playSound(1200 + Math.random() * 800, 0.2, 'sine', 0.15);
    setTimeout(() => {
        playSound(1500 + Math.random() * 500, 0.1, 'sine', 0.1);
    }, 10);
}

// Celebration Fanfare
function playCelebrationFanfare() {
    const fanfare = [
        { freq: 523, time: 0, duration: 0.3 }, // C5
        { freq: 659, time: 0.2, duration: 0.3 }, // E5
        { freq: 784, time: 0.4, duration: 0.3 }, // G5
        { freq: 1047, time: 0.6, duration: 0.5 }, // C6
        { freq: 784, time: 1.1, duration: 0.2 }, // G5
        { freq: 1047, time: 1.3, duration: 0.7 }, // C6
    ];

    fanfare.forEach(note => {
        setTimeout(() => {
            playSound(note.freq, note.duration, 'triangle', 0.4);
        }, note.time * 1000);
    });
}

// Cake Candle Blow Sound
function playCandleBlowSound() {
    // Wind sound effect
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            playSound(200 + Math.random() * 100, 0.1, 'sawtooth', 0.1);
        }, i * 50);
    }
}

// Celebration Balloons with Pop Effect
function createCelebrationBalloons() {
    const balloonColors = ['#ff69b4', '#ffd700', '#ff1493', '#00bfff', '#00ff00', '#ff6347'];

    // Play immediate balloon pop sounds
    for (let j = 0; j < 8; j++) {
        playBalloonPop();
    }

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon-pop';
            balloon.style.left = Math.random() * 90 + 5 + 'vw';
            balloon.innerHTML = `
                <svg width="50" height="70" viewBox="0 0 50 70">
                    <ellipse cx="25" cy="20" rx="20" ry="25" fill="${balloonColors[Math.floor(Math.random() * balloonColors.length)]}" stroke="#fff" stroke-width="3"/>
                    <line x1="25" y1="45" x2="25" y2="65" stroke="#8b4513" stroke-width="3"/>
                    <polygon points="23,65 27,65 25,70" fill="#8b4513"/>
                </svg>
            `;
            document.body.appendChild(balloon);

            // Remove balloon after animation
            setTimeout(() => {
                if (balloon.parentNode) {
                    balloon.parentNode.removeChild(balloon);
                }
            }, 3000);
        }, i * 200);
    }
}

// Fullscreen Fireworks Display
function createFullscreenFireworks() {
    const overlay = document.getElementById('fullscreen-overlay');
    overlay.style.display = 'flex';

    // Create multiple firework bursts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFireworkBurst(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.1
            );

            // Play firework sound
            playFireworkSound();
        }, i * 300);
    }

    // Hide overlay after celebration
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 8000);
}

// Individual Firework Burst
function createFireworkBurst(x, y) {
    const colors = ['#ff4500', '#ff6347', '#ffd700', '#ff69b4', '#00ff00', '#00bfff', '#ff1493', '#ffffff'];

    for (let i = 0; i < 12; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        firework.style.background = colors[Math.floor(Math.random() * colors.length)];
        firework.style.boxShadow = `0 0 20px ${colors[Math.floor(Math.random() * colors.length)]}`;

        const angle = (i / 12) * 2 * Math.PI;
        const distance = 100 + Math.random() * 100;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;

        firework.style.transform = `translate(${endX - x}px, ${endY - y}px)`;

        document.getElementById('fullscreen-overlay').appendChild(firework);

        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, 2000);
    }
}

// Text-to-Speech Function
function speakBirthdayMessage() {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        speechSynthesis.cancel();

        // Wait for voices to load if needed
        const speakMessage = () => {
            const utterance = new SpeechSynthesisUtterance("Happy Birthday Shivangi!");

            // Configure voice settings for loud, clear speech
            utterance.volume = 1.0; // Maximum volume
            utterance.rate = 0.9; // Clear speaking rate
            utterance.pitch = 1.1; // Slightly higher pitch for celebration

            // Try to use a female voice if available
            const voices = speechSynthesis.getVoices();
            const femaleVoice = voices.find(voice =>
                voice.name.toLowerCase().includes('female') ||
                voice.name.toLowerCase().includes('woman') ||
                voice.name.toLowerCase().includes('zira') ||
                voice.name.toLowerCase().includes('hazel') ||
                voice.name.toLowerCase().includes('samantha') ||
                voice.name.toLowerCase().includes('susan')
            );

            if (femaleVoice) {
                utterance.voice = femaleVoice;
            }

            // Add event listeners for debugging
            utterance.onstart = () => console.log('Speech started');
            utterance.onend = () => console.log('Speech ended');
            utterance.onerror = (e) => console.log('Speech error:', e);

            // Speak the message in English only
            speechSynthesis.speak(utterance);
        };

        // Ensure voices are loaded before trying to speak
        if (speechSynthesis.getVoices().length === 0) {
            speechSynthesis.onvoiceschanged = speakMessage;
        } else {
            speakMessage();
        }
    } else {
        console.warn("Text-to-speech not supported in this browser.");
    }
}

// Event Listener for the celebration button
document.addEventListener('DOMContentLoaded', () => {
    const celebrateBtn = document.getElementById('celebrateBtn');
    if (celebrateBtn) {
        celebrateBtn.addEventListener('click', () => {
            // Initialize audio context on user gesture
            initAudioContext();

            createConfetti();
            createFirecrackers();
            createCelebrationBalloons();
            createFullscreenFireworks();
            playBirthdayMelody();
            playCelebrationFanfare();
            playCandleBlowSound();
            speakBirthdayMessage();
        });
    }
});
