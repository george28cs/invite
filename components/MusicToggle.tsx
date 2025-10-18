"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FiMusic, FiVolumeX } from "react-icons/fi";

type MusicToggleProps = {
  src: string;
};

const ToggleButton = styled.button<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.2rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid rgba(255, 255, 255, 0.55);
  background: ${({ $isActive }) =>
    $isActive ? "rgba(255, 255, 255, 0.3)" : "rgba(182, 120, 122, 0.45)"};
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.75rem;
  transition: transform 180ms ease, background-color 180ms ease,
    border-color 180ms ease;
  backdrop-filter: blur(12px);

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    border-color: rgba(255, 255, 255, 0.75);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  font-size: 1.1rem;
`;

export default function MusicToggle({ src }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const onCanPlay = () => setIsReady(true);
    audio.addEventListener("canplaythrough", onCanPlay);

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", onCanPlay);
      audioRef.current = null;
    };
  }, [src]);

  const handleToggle = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!isPlaying) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("No se pudo reproducir el audio:", error);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <ToggleButton
      type="button"
      onClick={handleToggle}
      $isActive={isPlaying}
      disabled={!isReady}
      aria-pressed={isPlaying}
    >
      <IconWrapper>{isPlaying ? <FiVolumeX /> : <FiMusic />}</IconWrapper>
      {isPlaying ? "Silenciar" : "Reproducir"}
    </ToggleButton>
  );
}
