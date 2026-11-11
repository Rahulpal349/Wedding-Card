import { event } from '../../content/event';

/**
 * Audio manager for:
 * 1. Hindi Wedding Song / Shehnai background music
 * 2. Auspicious synthesized brass bell temple chime
 */

let audioCtx: AudioContext | null = null;
let bgMusicAudio: HTMLAudioElement | null = null;
let isMusicPlaying = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playAuspiciousChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const harmonics = [
      { freq: 523.25, gain: 0.22, decay: 2.8 },
      { freq: 659.25, gain: 0.16, decay: 2.4 },
      { freq: 783.99, gain: 0.12, decay: 2.0 },
      { freq: 1046.5, gain: 0.08, decay: 1.6 },
    ];

    harmonics.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(gain, now + 0.03);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + decay);
    });
  } catch {}
}

export function getWeddingAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!bgMusicAudio) {
    const src = event.music?.src || '/audio/hindi-wedding-song.mp3';
    bgMusicAudio = new Audio(src);
    bgMusicAudio.loop = true;
    bgMusicAudio.preload = 'auto';
    bgMusicAudio.volume = 0.65;

    bgMusicAudio.addEventListener('play', () => {
      isMusicPlaying = true;
      dispatchMusicState(true);
    });

    bgMusicAudio.addEventListener('pause', () => {
      isMusicPlaying = false;
      dispatchMusicState(false);
    });

    bgMusicAudio.addEventListener('ended', () => {
      isMusicPlaying = false;
      dispatchMusicState(false);
    });
  }
  return bgMusicAudio;
}

function dispatchMusicState(playing: boolean) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('wedding-music-changed', {
      detail: { playing, soundEnabled: playing },
    })
  );
}

export function playWeddingMusic(): Promise<void> {
  const audio = getWeddingAudio();
  if (!audio) return Promise.resolve();

  // Try resuming AudioContext if any
  try {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  } catch {}

  audio.volume = 0.05;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    return playPromise
      .then(() => {
        isMusicPlaying = true;
        dispatchMusicState(true);
        // Smoothly ramp volume to 0.65
        let vol = 0.05;
        const fadeInterval = setInterval(() => {
          vol += 0.05;
          if (vol >= 0.65) {
            audio.volume = 0.65;
            clearInterval(fadeInterval);
          } else {
            audio.volume = vol;
          }
        }, 80);
      })
      .catch((err) => {
        console.warn('Wedding audio play prevented by browser policy:', err);
        isMusicPlaying = false;
        dispatchMusicState(false);
      });
  }
  return Promise.resolve();
}

export function pauseWeddingMusic(): void {
  const audio = getWeddingAudio();
  if (!audio) return;
  audio.pause();
  isMusicPlaying = false;
  dispatchMusicState(false);
}

export function toggleWeddingMusic(): boolean {
  const audio = getWeddingAudio();
  if (!audio) return false;

  if (audio.paused) {
    playWeddingMusic();
    return true;
  } else {
    pauseWeddingMusic();
    return false;
  }
}

export function isWeddingMusicActive(): boolean {
  if (!bgMusicAudio) return false;
  return !bgMusicAudio.paused;
}
