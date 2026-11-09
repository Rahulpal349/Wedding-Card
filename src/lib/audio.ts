/**
 * Web Audio API synthesized soft auspicious wedding chime.
 * Generates an authentic resonant brass bell tone with gentle harmonic decay.
 * Zero external audio files required (0 KB network load, 100% reliable).
 */

let audioCtx: AudioContext | null = null;

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
    audioCtx.resume();
  }
  return audioCtx;
}

export function playAuspiciousChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Harmonic bell frequencies (Pentatonic Auspicious Chord: C5, E5, G5, C6)
    const harmonics = [
      { freq: 523.25, gain: 0.25, decay: 2.8 },
      { freq: 659.25, gain: 0.18, decay: 2.4 },
      { freq: 783.99, gain: 0.14, decay: 2.0 },
      { freq: 1046.5, gain: 0.08, decay: 1.6 },
      { freq: 1318.5, gain: 0.04, decay: 1.2 },
    ];

    harmonics.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Fast initial attack (chime hit) and slow exponential decay
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(gain, now + 0.03);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch {
    // Graceful fallback if Web Audio is unsupported or restricted
  }
}

