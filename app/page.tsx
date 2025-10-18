"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { EventJsonLd } from "next-seo";
import {
  FiCalendar,
  FiFeather,
  FiHeart,
  FiImage,
  FiMapPin,
  FiSend,
} from "react-icons/fi";
import Cover from "@/components/sections/Cover";
import CountdownTimer from "@/components/CountdownTimer";
import IntroOverlay from "@/components/IntroOverlay";
import { galaEventJsonLd } from "@/lib/seo";

const ScrollContainer = styled.div<{ $locked: boolean }>`
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  background: rgba(255, 242, 246, 0.65);
  pointer-events: ${({ $locked }) => ($locked ? "none" : "auto")};
  filter: ${({ $locked }) => ($locked ? "blur(8px) brightness(0.85)" : "none")};
  transition: filter 0.6s ease;

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

const CarouselWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
`;

const CarouselViewport = styled.div`
  display: flex;
  gap: clamp(1rem, 4vw, 1.75rem);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 0.5rem clamp(0.5rem, 5vw, 2rem) 1rem 0;
  -webkit-overflow-scrolling: touch;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.6) 8%,
    rgba(0, 0, 0, 0.8) 92%,
    transparent 100%
  );

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.18);
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(183, 120, 122, 0.45);
    border-radius: 999px;
  }
`;

const CarouselSlide = styled.div`
  flex: 0 0 clamp(220px, 68vw, 320px);
  scroll-snap-align: center;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(183, 120, 122, 0.2);
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadow.soft};
  padding: clamp(1.25rem, 4vw, 1.75rem);
  display: grid;
  gap: 0.85rem;

  @media (min-width: 900px) {
    flex: 0 0 clamp(260px, 32vw, 320px);
  }
`;

const SlideIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  background: rgba(183, 120, 122, 0.12);
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.35rem;
`;

const SlideTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: clamp(1.3rem, 4vw, 1.6rem);
  letter-spacing: 0.05em;
`;

const SlideDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`;

const SlideTag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.9rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.highlight};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const VenueGrid = styled.div`
  display: grid;
  gap: clamp(1.5rem, 5vw, 2.5rem);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const VenueCard = styled.div`
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(183, 120, 122, 0.2);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: clamp(1.5rem, 5vw, 2rem);
  display: grid;
  gap: 0.85rem;
  box-shadow: ${({ theme }) => theme.shadow.soft};
`;

const VenueIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  background: rgba(183, 120, 122, 0.15);
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.4rem;
`;

const VenueTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: clamp(1.3rem, 4vw, 1.6rem);
  letter-spacing: 0.05em;
`;

const VenueDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.65;
`;

const VenueDetail = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const VenueMap = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  min-height: clamp(220px, 35vw, 320px);
  background: linear-gradient(
      140deg,
      rgba(255, 255, 255, 0.08),
      rgba(183, 120, 122, 0.12)
    ),
    url("/mapa-hacienda.jpg") center / cover no-repeat;
  border: 1px solid rgba(183, 120, 122, 0.22);
  box-shadow: ${({ theme }) => theme.shadow.soft};
`;

const MapOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 238, 243, 0.2),
    rgba(255, 209, 222, 0.28)
  );
`;

const MapLabel = styled.div`
  position: absolute;
  bottom: clamp(1rem, 4vw, 1.75rem);
  left: clamp(1rem, 6vw, 2.25rem);
  background: rgba(255, 255, 255, 0.9);
  color: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.75rem 1.2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
`;

const MapPulse = styled.span`
  display: inline-flex;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accent};
  box-shadow:
    0 0 0 0 rgba(183, 120, 122, 0.6),
    0 0 0 8px rgba(183, 120, 122, 0);
  animation: pulse 2.8s infinite ease-out;

  @keyframes pulse {
    0% {
      box-shadow:
        0 0 0 0 rgba(183, 120, 122, 0.8),
        0 0 0 0 rgba(183, 120, 122, 0.1);
    }
    70% {
      box-shadow:
        0 0 0 8px rgba(183, 120, 122, 0),
        0 0 0 18px rgba(183, 120, 122, 0);
    }
    100% {
      box-shadow:
        0 0 0 0 rgba(183, 120, 122, 0),
        0 0 0 0 rgba(183, 120, 122, 0);
    }
  }
`;

const AUDIO_SRC = "/audio/ambient.mp3";

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  const [audioInitializing, setAudioInitializing] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const setupAudio = useCallback(() => {
    if (audioRef.current) {
      return audioRef.current;
    }

    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = "auto";

    const handleReady = () => {
      setAudioReady(true);
      audio.removeEventListener("canplaythrough", handleReady);
      audio.removeEventListener("loadeddata", handleReady);
    };

    audio.addEventListener("canplaythrough", handleReady);
    audio.addEventListener("loadeddata", handleReady);

    if (audio.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      setAudioReady(true);
    }

    audioRef.current = audio;
    return audio;
  }, []);

  const playAudio = useCallback(async () => {
    const audio = setupAudio();
    setAudioInitializing(true);
    try {
      await audio.play();
      setIsAudioPlaying(true);
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("No se pudo reproducir el audio:", error);
      return false;
    } finally {
      setAudioInitializing(false);
    }
  }, [setupAudio]);

  const handleToggleAudio = useCallback(async () => {
    const audio = setupAudio();
    if (isAudioPlaying) {
      audio.pause();
      setIsAudioPlaying(false);
      return;
    }
    await playAudio();
  }, [isAudioPlaying, playAudio, setupAudio]);

  const handleUnlock = useCallback(async () => {
    const success = await playAudio();
    if (success) {
      setShowOverlay(false);
    }
  }, [playAudio]);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleIsReady = audioReady && !audioInitializing;
  const galleryPreview = [
    {
      title: "Brillos de la víspera",
      description:
        "Capturas de los detalles dorados, la joyería y los destellos que preparan el ambiente.",
      tag: "Próximamente",
    },
    {
      title: "Retratos con alma",
      description:
        "Una serie íntima de retratos de Valentina y su familia, llenos de emoción genuina.",
      tag: "Producción en curso",
    },
    {
      title: "Instantáneas de amistad",
      description:
        "Momentos espontáneos con el cortejo y amistades que acompañan el gran día.",
      tag: "Edición fina",
    },
    {
      title: "Escenarios de ensueño",
      description:
        "Planos del set floral y las luces cálidas que darán vida a la velada.",
      tag: "Set en preparación",
    },
  ];

  return (
    <>
      <IntroOverlay
        isVisible={showOverlay}
        onUnlock={handleUnlock}
        isAudioInitializing={audioInitializing}
      />
      <ScrollContainer $locked={showOverlay}>
        <EventJsonLd {...galaEventJsonLd} />

        <Cover
          honoree="Valentina García"
          date="28 de diciembre de 2025 · Recepción 6:30 pm · Inicio 7:00 pm"
          location="Hacienda San Felipe, Querétaro"
          onToggleAudio={handleToggleAudio}
          audioReady={toggleIsReady}
          audioPlaying={isAudioPlaying}
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
            experiencia digital para compartirte toda la emoción, los detalles
            del evento y el ambiente que podrás disfrutar en esta gala.
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
            Sincroniza tu noche con nosotros. Estos son los momentos clave que
            no querrás perderte.
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

        <Section>
          <SectionTitle>Sesión fotográfica</SectionTitle>
          <SectionIntro>
            Estamos creando un carrusel con la magia detrás de cámaras: colores rosa empolvado,
            luz cálida y la emoción previa al gran estreno. Muy pronto podrás deslizar y descubrir
            cada escena.
          </SectionIntro>

          <CarouselWrapper>
            <CarouselViewport aria-label="Avance de la sesión fotográfica">
              {galleryPreview.map((item) => (
                <CarouselSlide key={item.title}>
                  <SlideIcon>
                    <FiImage />
                  </SlideIcon>
                  <SlideTitle>{item.title}</SlideTitle>
                  <SlideDescription>{item.description}</SlideDescription>
                  <SlideTag>{item.tag}</SlideTag>
                </CarouselSlide>
              ))}
            </CarouselViewport>
          </CarouselWrapper>
        </Section>

        <Section>
          <SectionTitle>El lugar nos espera</SectionTitle>
          <SectionIntro>
            La Hacienda San Felipe envuelve cada rincón con jardines encantados, arquitecturas coloniales y luces cálidas que abrazan la noche. Aquí se tejen recuerdos de fiesta en un ambiente sofisticado y acogedor.
          </SectionIntro>

          <VenueGrid>
            <VenueCard>
              <VenueIcon>
                <FiMapPin />
              </VenueIcon>
              <VenueTitle>Hacienda San Felipe</VenueTitle>
              <VenueDescription>
                Un oasis en Querétaro con arcos de cantera, patios de ensueño y salones que juegan con la luz para crear escenas memorables. Nos recibe con un aire romántico y elegante.
              </VenueDescription>
              <VenueDetail>Camino a la Hacienda 120 · Querétaro, MX</VenueDetail>
              <VenueDetail>Coordenadas: 20.5885° N · 100.3898° W</VenueDetail>
            </VenueCard>

            <VenueCard>
              <VenueIcon>
                <FiFeather />
              </VenueIcon>
              <VenueTitle>Ambiente & atmósfera</VenueTitle>
              <VenueDescription>
                Flores en tonos rosa empolvado, destellos dorados y una iluminación cálida acompañan cada espacio. Prepárate para vivir un recorrido sensorial desde la recepción hasta el último baile.
              </VenueDescription>
              <VenueDetail>Vestimenta: Etiqueta formal · Paleta nude, rose gold, metálicos suaves</VenueDetail>
            </VenueCard>
          </VenueGrid>

          <VenueMap>
            <MapOverlay />
            <MapLabel>
              <MapPulse />
              Ver ubicación en Maps
            </MapLabel>
          </VenueMap>
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
    </>
  );
}
