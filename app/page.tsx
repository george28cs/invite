"use client";
import styled from "styled-components";
import { EventJsonLd } from "next-seo";
import {
  FiCalendar,
  FiFeather,
  FiHeart,
  FiImage,
  FiSend,
} from "react-icons/fi";
import Cover from "@/components/sections/Cover";
import CountdownTimer from "@/components/CountdownTimer";
import { galaEventJsonLd } from "@/lib/seo";

const ScrollContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  background: rgba(255, 242, 246, 0.65);

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Section = styled.section<{ $tone?: "light" | "dark" }>`
  min-height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(1.75rem, 5vw, 2.75rem);
  padding: clamp(2.75rem, 10vw, 4rem) clamp(1.75rem, 8vw, 4rem);
  background: ${({ $tone, theme }) =>
    $tone === "dark"
      ? `linear-gradient(180deg, rgba(61, 42, 47, 0.95) 0%, rgba(75, 49, 54, 0.9) 100%)`
      : `linear-gradient(180deg, rgba(255, 245, 247, 0.95) 0%, rgba(255, 231, 238, 0.88) 100%)`};
  color: ${({ $tone }) => ($tone === "dark" ? "#f8fafc" : "inherit")};
  --intro-color: ${({ $tone, theme }) =>
    $tone === "dark" ? "rgba(253, 231, 237, 0.82)" : theme.colors.muted};
  --chip-bg: ${({ $tone, theme }) =>
    $tone === "dark" ? "rgba(255, 255, 255, 0.16)" : theme.colors.highlight};
  --chip-color: ${({ $tone, theme }) =>
    $tone === "dark" ? "#fdebec" : theme.colors.accent};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: clamp(2rem, 6vw, 3rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SectionIntro = styled.p`
  max-width: 36rem;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--intro-color);
`;

const HighlightCard = styled.div`
  display: grid;
  gap: 0.75rem;
  padding: clamp(1.5rem, 5vw, 2.25rem);
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(183, 120, 122, 0.2);
  backdrop-filter: blur(12px);
  box-shadow: ${({ theme }) => theme.shadow.soft};
`;

const Timeline = styled.ul`
  display: grid;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TimelineItem = styled.li`
  display: grid;
  gap: 0.4rem;
  padding: 1rem 1.25rem;
  border-left: 3px solid rgba(183, 120, 122, 0.28);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -0.85rem;
    top: 1.1rem;
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 6px rgba(183, 120, 122, 0.16);
  }
`;

const TimelineTitle = styled.span`
  font-weight: 600;
  letter-spacing: 0.04em;
`;

const TimelineDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.muted};
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: var(--chip-bg);
  color: var(--chip-color);
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  align-self: flex-start;
  padding: 0.85rem 1.8rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid transparent;
  background: ${({ theme }) => theme.colors.accent};
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: transform 160ms ease, box-shadow 160ms ease,
    background-color 160ms ease;
  box-shadow: ${({ theme }) => theme.shadow.soft};

  &:hover {
    transform: translateY(-1px);
    background: #8f4d58;
  }
`;

const IconCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 999px;
  background: var(--chip-bg);
  color: var(--chip-color);
`;

export default function Home() {
  return (
    <ScrollContainer>
      <EventJsonLd {...galaEventJsonLd} />

      <Cover
        honoree="Valentina García"
        date="28 de diciembre de 2025 · Recepción 6:30 pm · Inicio 7:00 pm"
        location="Hacienda San Felipe, Querétaro"
        musicSrc="/audio/ambient.mp3"
      />

      <Section $tone="dark">
        <SectionTitle>Cuenta regresiva</SectionTitle>
        <SectionIntro>
          Cada latido nos acerca a esa noche que brillará en tonos rose gold.
          Prepárate para vivir un momento inolvidable junto a Valentina.
        </SectionIntro>
        <CountdownTimer targetDate="2025-12-28T19:00:00-06:00" />
      </Section>

      <Section>
        <SectionTitle>Una noche para recordar</SectionTitle>
        <SectionIntro>
          Acompáñanos a celebrar un capítulo muy especial. Diseñamos esta
          experiencia digital para compartirte toda la emoción, los detalles del
          evento y el ambiente que podrás disfrutar en esta gala.
        </SectionIntro>

        <HighlightCard>
          <ChipRow>
            <Chip>
              <FiHeart /> Dress code elegante
            </Chip>
            <Chip>
              <FiFeather /> Magia y sorpresas
            </Chip>
            <Chip>
              <FiImage /> Photo booth
            </Chip>
          </ChipRow>
          <p>
            Desde la recepción hasta el último baile, cada momento ha sido
            cuidadosamente planeado para que vivas una experiencia encantadora.
          </p>
        </HighlightCard>
      </Section>

      <Section $tone="light">
        <SectionTitle>Itinerario</SectionTitle>
        <SectionIntro>
          Sincroniza tu noche con nosotros. Estos son los momentos clave que no
          querrás perderte.
        </SectionIntro>

        <Timeline>
          <TimelineItem>
            <TimelineTitle>18:30 · Recepción y bienvenida</TimelineTitle>
            <TimelineDescription>
              Te esperamos con cocteles y un ensamble en vivo para comenzar con
              el pie derecho.
            </TimelineDescription>
          </TimelineItem>
          <TimelineItem>
            <TimelineTitle>19:00 · Apertura de la gala</TimelineTitle>
            <TimelineDescription>
              Presentación oficial de Valentina y palabras especiales para dar
              inicio a la celebración.
            </TimelineDescription>
          </TimelineItem>
          <TimelineItem>
            <TimelineTitle>20:30 · Cena de gala</TimelineTitle>
            <TimelineDescription>
              Un menú de tres tiempos inspirado en sabores contemporáneos, ideal
              para brindar juntos.
            </TimelineDescription>
          </TimelineItem>
          <TimelineItem>
            <TimelineTitle>22:00 · Vals y fiesta</TimelineTitle>
            <TimelineDescription>
              DJ en vivo, cabina 360 y estaciones interactivas para seguir
              celebrando hasta la madrugada.
            </TimelineDescription>
          </TimelineItem>
        </Timeline>
      </Section>

      <Section $tone="dark">
        <SectionTitle>Confirma tu presencia</SectionTitle>
        <SectionIntro>
          Queremos preparar todo a tu medida. Haznos saber si nos acompañarás y
          cuéntanos cualquier detalle que debamos considerar.
        </SectionIntro>

        <ChipRow>
          <Chip>
            <IconCircle>
              <FiCalendar />
            </IconCircle>
            RSVP antes del 30 de noviembre
          </Chip>
        </ChipRow>

        <CTAButton href="/confirmar">
          Confirmar asistencia
          <FiSend />
        </CTAButton>
      </Section>
    </ScrollContainer>
  );
}
