import React, { useRef, useState, useEffect } from 'react';

// Define the structure for our ambient sounds
interface AmbientSound {
  id: string;
  name: string;
  path: string;
}

const sounds: AmbientSound[] = [
  { id: 'arctic-wind', name: 'Arctic Wind', path: '/sounds/arctic-wind.mp3' },
  { id: 'soft-rain', name: 'Soft Rain', path: '/sounds/soft-rain.mp3' },
  { id: 'coffee-shop', name: 'Coffee Shop', path: '/sounds/coffee-shop.mp3' },
  { id: 'keyboard', name: 'Keyboard Clicking', path: '/sounds/keyboard.mp3' },
];

const AmbientSoundMixer: React.FC = () => {
  // Use a map to store references to audio elements
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  // Use state to manage volumes, defaulting to 0
  const [volumes, setVolumes] = useState<Record<string, number>>(() => {
    const initialVolumes: Record<string, number> = {};
    sounds.forEach(sound => {
      initialVolumes[sound.id] = 0;
    });
    return initialVolumes;
  });

  // Function to handle volume change from a slider
  const handleVolumeChange = (id: string, volume: number) => {
    const audio = audioRefs.current.get(id);
    if (audio) {
      audio.volume = volume;
      // If volume is > 0 and the track is paused, play it.
      if (volume > 0 && audio.paused) {
        audio.play().catch(error => console.error(`Error playing ${id}:`, error));
      }
      // If volume is 0, pause the track to save resources.
      if (volume === 0) {
        audio.pause();
      }
    }
    setVolumes(prev => ({ ...prev, [id]: volume }));
  };

  useEffect(() => {
    // Initialize audio elements
    sounds.forEach(sound => {
      const audio = new Audio(sound.path);
      audio.loop = true; // Ensure seamless looping
      audioRefs.current.set(sound.id, audio);
    });

    // Cleanup function to pause all audio when the component unmounts
    return () => {
      audioRefs.current.forEach(audio => {
        audio.pause();
        audio.src = ''; // Release memory
      });
    };
  }, []);

  return (
    <div className="bg-card-background backdrop-blur-md border border-border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold mb-3 text-text">Ambient Mixer</h3>
      <div className="space-y-4">
        {sounds.map(sound => (
          <div key={sound.id}>
            <label htmlFor={sound.id} className="block text-sm font-medium text-text">
              {sound.name}
            </label>
            <input
              type="range"
              id={sound.id}
              min="0"
              max="1"
              step="0.01"
              value={volumes[sound.id]}
              onChange={(e) => handleVolumeChange(sound.id, parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmbientSoundMixer;
