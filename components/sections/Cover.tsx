"use client";

import { motion } from "framer-motion";
import styled from "styled-components";
import { FiChevronDown } from "react-icons/fi";
import MusicToggle from "@/components/MusicToggle";

type CoverProps = {
  honoree: string;
  date: string;
  location: string;
  onToggleAudio: () => void;
  audioReady: boolean;
  audioPlaying: boolean;
};

const CoverWrapper = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 6vw, 4rem);
  text-align: center;
  color: #ffffff;
  background:
    linear-gradient(
      180deg,
      rgba(183, 120, 122, 0.75) 0%,
      rgba(189, 127, 136, 0.65) 40%,
      rgba(61, 42, 47, 0.85) 100%
    ),
    url("/cover-placeholder.jpg") center / cover no-repeat;
`;

const Heading = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.serif ?? theme.fonts.sans};
  font-size: clamp(2.75rem, 7.5vw, 4.75rem);
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Tagline = styled(motion.p)`
  margin-top: 1.25rem;
  font-size: 1rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Details = styled(motion.div)`
  margin-top: clamp(1.5rem, 4vw, 2.5rem);
  display: grid;
  gap: 0.5rem;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const MusicWrapper = styled.div`
  margin-top: clamp(2rem, 5vw, 3rem);
`;

const ScrollHint = styled(motion.div)`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.85;
`;

export default function Cover({
  honoree,
  date,
  location,
  onToggleAudio,
  audioReady,
  audioPlaying,
}: CoverProps) {
  return (
    <CoverWrapper>
      <motion.span
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        ¡Estás invitado!
      </motion.span>

      <div>
        <Heading
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          {honoree}
        </Heading>

        <Tagline
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          Celebración inolvidable
        </Tagline>

        <Details
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <span>{date}</span>
          <span>{location}</span>
        </Details>

        <MusicWrapper>
          <MusicToggle
            isReady={audioReady}
            isPlaying={audioPlaying}
            onToggle={onToggleAudio}
          />
        </MusicWrapper>
      </div>

      <ScrollHint
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        Desliza
        <FiChevronDown size={22} />
      </ScrollHint>
    </CoverWrapper>
  );
}
