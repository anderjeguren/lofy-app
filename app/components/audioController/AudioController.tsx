// app/components/AudioController.tsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./AudioController.module.css";

type Track = {
  title: string;
  src: string;
};

const AudioController: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [tracks, setTracks]= useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  useEffect(() => {
    const fetchTracks = async () => {
        try{
            const response = await fetch('api/tracks');
            const data = await response.json();
            setTracks(data);
        } catch(error){
            console.error('Error loading tracks:', error);
        }
    }
    fetchTracks();
  }, [])

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle volume change
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  // Update progress bar as audio plays
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  // Seek through the track
  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = (audioRef.current.duration / 100) * newProgress;
    }
    setProgress(newProgress);
  };

  // Move to the next track
  const playNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  };

  // Move to the previous track
  const playPreviousTrack = () => {
    const previousIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(previousIndex);
    setIsPlaying(true);
  };

  // Play the selected track whenever the track index changes
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load(); // Load new track
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex, isPlaying]);

  return (
    <div className={styles.audioController}>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex].src} // Dynamic track source
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNextTrack} // Auto-play next track when current one ends
      />

      {/* Display the current track title */}
      <div className={styles.trackInfo}>
        <p>{tracks[currentTrackIndex].title}</p>
      </div>

      {/* Play/Pause Button */}
      <button onClick={togglePlayPause} className={styles.playPauseButton}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      {/* Previous and Next Buttons */}
      <button onClick={playPreviousTrack} className={styles.prevButton}>Previous</button>
      <button onClick={playNextTrack} className={styles.nextButton}>Next</button>

      {/* Volume Slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className={styles.volumeSlider}
      />

      {/* Progress Bar */}
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={progress}
        onChange={handleProgressChange}
        className={styles.progressBar}
      />
    </div>
  );
};

export default AudioController;
