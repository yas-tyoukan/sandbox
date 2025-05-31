import { create } from "zustand";

interface AudioState {
  backgroundMusic: HTMLAudioElement | null;
  hitSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;
  jumpSound: HTMLAudioElement | null;
  teleportSound: HTMLAudioElement | null;
  laserSound: HTMLAudioElement | null;
  isMuted: boolean;
  
  // Setter functions
  setBackgroundMusic: (music: HTMLAudioElement) => void;
  setHitSound: (sound: HTMLAudioElement) => void;
  setSuccessSound: (sound: HTMLAudioElement) => void;
  setJumpSound: (sound: HTMLAudioElement) => void;
  setTeleportSound: (sound: HTMLAudioElement) => void;
  setLaserSound: (sound: HTMLAudioElement) => void;
  
  // Control functions
  toggleMute: () => void;
  playHit: () => void;
  playSuccess: () => void;
  playJump: () => void;
  playTeleport: () => void;
  playLaser: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  backgroundMusic: null,
  hitSound: null,
  successSound: null,
  jumpSound: null,
  teleportSound: null,
  laserSound: null,
  isMuted: false,
  
  setBackgroundMusic: (music) => set({ backgroundMusic: music }),
  setHitSound: (sound) => set({ hitSound: sound }),
  setSuccessSound: (sound) => set({ successSound: sound }),
  setJumpSound: (sound) => set({ jumpSound: sound }),
  setTeleportSound: (sound) => set({ teleportSound: sound }),
  setLaserSound: (sound) => set({ laserSound: sound }),
  
  toggleMute: () => {
    const { isMuted } = get();
    set({ isMuted: !isMuted });
  },
  
  playHit: () => {
    const { hitSound, isMuted } = get();
    if (hitSound && !isMuted) {
      hitSound.currentTime = 0;
      hitSound.play().catch(console.error);
    }
  },
  
  playSuccess: () => {
    const { successSound, isMuted } = get();
    if (successSound && !isMuted) {
      successSound.currentTime = 0;
      successSound.play().catch(console.error);
    }
  },
  
  playJump: () => {
    const { jumpSound, isMuted } = get();
    if (jumpSound && !isMuted) {
      jumpSound.currentTime = 0;
      jumpSound.play().catch(console.error);
    }
  },
  
  playTeleport: () => {
    const { teleportSound, isMuted } = get();
    if (teleportSound && !isMuted) {
      teleportSound.currentTime = 0;
      teleportSound.play().catch(console.error);
    }
  },
  
  playLaser: () => {
    const { laserSound, isMuted } = get();
    if (laserSound && !isMuted) {
      laserSound.currentTime = 0;
      laserSound.play().catch(console.error);
    }
  }
}));