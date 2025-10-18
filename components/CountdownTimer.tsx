"use client";

import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { FiClock } from "react-icons/fi";

type CountdownTimerProps = {
  targetDate: string;
};

type TimeLeft = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const CountdownCard = styled.div`
  width: 100%;
  padding: clamp(1.5rem, 6vw, 2.5rem);
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.22),
    rgba(246, 194, 203, 0.22)
  );
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(18px);
  display: grid;
  gap: 1.5rem;
  justify-items: center;
  color: #fdf2f7;
  text-align: center;
`;

const Header = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const ClockIcon = styled.span`
  display: inline-flex;
  font-size: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(68px, 1fr));
  gap: clamp(0.45rem, 2.5vw, 1.1rem);
  width: 100%;

  @media (max-width: 420px) {
    grid-template-columns: repeat(2, minmax(90px, 1fr));
    row-gap: clamp(0.4rem, 3vw, 0.75rem);
    column-gap: clamp(0.4rem, 4vw, 0.8rem);
  }
`;

const Segment = styled.div`
  padding: 0.75rem 0.55rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.24);
  border: 1px solid rgba(255, 255, 255, 0.35);
  display: grid;
  gap: 0.35rem;

  @media (max-width: 420px) {
    padding: 0.7rem 0.5rem;
    gap: 0.28rem;
  }
`;

const Value = styled.span`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: clamp(1.2rem, 6vw, 2.6rem);
  line-height: 1;
`;

const Label = styled.span`
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.85;
`;

const CelebrationMessage = styled.p`
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fde8ed;
`;

const formatNumber = (value: number) => value.toString().padStart(2, "0");

const calculateTimeLeft = (target: number): TimeLeft => {
  const total = target - Date.now();

  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
};

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const targetTimestamp = useMemo(
    () => new Date(targetDate).getTime(),
    [targetDate],
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    if (Number.isNaN(targetTimestamp)) {
      return;
    }

    setTimeLeft(calculateTimeLeft(targetTimestamp));

    const interval = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTimestamp));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetTimestamp]);

  if (Number.isNaN(targetTimestamp)) {
    return null;
  }

  const isCounting = timeLeft && timeLeft.total > 0;

  return (
    <CountdownCard aria-live="polite">
      {timeLeft ? (
        isCounting ? (
          <>
            <Header>
              <ClockIcon>
                <FiClock />
              </ClockIcon>
              Falta muy poco
            </Header>
            <Grid>
              <Segment>
                <Value>{formatNumber(timeLeft.days)}</Value>
                <Label>Días</Label>
              </Segment>
              <Segment>
                <Value>{formatNumber(timeLeft.hours)}</Value>
                <Label>Horas</Label>
              </Segment>
              <Segment>
                <Value>{formatNumber(timeLeft.minutes)}</Value>
                <Label>Min</Label>
              </Segment>
              <Segment>
                <Value>{formatNumber(timeLeft.seconds)}</Value>
                <Label>Seg</Label>
              </Segment>
            </Grid>
          </>
        ) : (
          <CelebrationMessage>
            ¡La celebración ha comenzado!
          </CelebrationMessage>
        )
      ) : (
        <>
          <Header>
            <ClockIcon>
              <FiClock />
            </ClockIcon>
            Ajustando tiempo
          </Header>
          <Grid>
            <Segment>
              <Value>--</Value>
              <Label>Días</Label>
            </Segment>
            <Segment>
              <Value>--</Value>
              <Label>Horas</Label>
            </Segment>
            <Segment>
              <Value>--</Value>
              <Label>Min</Label>
            </Segment>
            <Segment>
              <Value>--</Value>
              <Label>Seg</Label>
            </Segment>
          </Grid>
        </>
      )}
    </CountdownCard>
  );
}
