import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

// Helper Selebrasi Standard (Klaim EXP / Kirim Rating)
export const triggerRewardConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.7 },
  });
};

// Helper Selebrasi Spesial (Naik Level)
export const triggerLevelUpSelebration = (newLevel, expGained) => {
  // Firework effect
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };
  frame();

  toast.success(`🎉 LEVEL UP! Kamu sekarang Level ${newLevel} (+${expGained} EXP)`, {
    duration: 5000,
    style: {
      borderRadius: '12px',
      background: '#1e293b',
      color: '#fff',
      fontWeight: 'bold',
    },
  });
};