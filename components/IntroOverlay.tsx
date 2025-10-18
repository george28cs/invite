"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { MotionProps, Variants } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { FiPlay } from "react-icons/fi";

type IntroOverlayProps = {
  isVisible: boolean;
  onUnlock: () => void;
  isAudioInitializing: boolean;
};

const twinkle = keyframes`
  0% { opacity: 0; transform: translate3d(0, 0, 0) scale(0.6); }
  50% { opacity: 0.85; transform: translate3d(0, -12px, 0) scale(1.05); }
  100% { opacity: 0; transform: translate3d(0, 0, 0) scale(0.8); }
`;

const Overlay = styled(motion.div)<MotionProps>`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 20% 20%, rgba(255, 220, 235, 0.6), transparent 55%),
    radial-gradient(circle at 80% 15%, rgba(255, 182, 216, 0.35), transparent 45%),
    linear-gradient(180deg, rgba(59, 36, 44, 0.95) 0%, rgba(43, 25, 31, 0.92) 100%);
  padding: clamp(2rem, 6vw, 4rem);
  overflow: hidden;
`;

const FairyWrapper = styled.div`
  position: relative;
  display: grid;
  gap: 2rem;
  place-items: center;
  color: #fdeef5;
  text-align: center;
`;

const FairySvg = styled.svg`
  width: clamp(260px, 65vw, 360px);
  height: auto;
  filter: drop-shadow(0 0 22px rgba(255, 215, 232, 0.55));
`;

const GlowEllipse = styled.ellipse`
  opacity: 0.35;
  filter: blur(20px);
  animation: pulse 4.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 0.2;
      transform: scale(1);
    }
    50% {
      opacity: 0.45;
      transform: scale(1.05);
    }
  }
`;

const FairyWingShape = styled.path`
  fill: url(#wingGradient);
  stroke: rgba(255, 224, 239, 0.6);
  stroke-width: 1.2;
  opacity: 0.88;
`;

const FairySilhouette = styled(motion.path)`
  fill: url(#fairyGradient);
  stroke: rgba(255, 230, 242, 0.45);
  stroke-width: 1.35;
  opacity: 0.95;
  filter: drop-shadow(0 0 18px rgba(255, 217, 235, 0.55));
`;

const FairyTrail = styled(motion.path)`
  fill: none;
  stroke: rgba(255, 225, 240, 0.55);
  stroke-width: 1.25;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 320;
  stroke-dashoffset: 320;
`;

const Slogan = styled.p`
  font-size: clamp(1rem, 3vw, 1.25rem);
  max-width: 28rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const UnlockButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.8rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: linear-gradient(
    135deg,
    rgba(255, 202, 221, 0.85),
    rgba(214, 159, 177, 0.85)
  );
  color: #3c222b;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.85rem;
  box-shadow: 0 18px 40px -25px rgba(59, 24, 33, 0.9);
  transition: transform 180ms ease, box-shadow 180ms ease,
    border-color 180ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.75);
    box-shadow: 0 18px 28px -18px rgba(59, 24, 33, 0.8);
  }

  &:disabled {
    opacity: 0.65;
    cursor: wait;
    transform: none;
  }
`;

const Sparkles = styled.span<{ $delay: number; $left: number; $top: number; $size: number }>`
  position: absolute;
  top: ${({ $top }) => `${$top}%`};
  left: ${({ $left }) => `${$left}%`};
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border-radius: 999px;
  background: linear-gradient(
    145deg,
    rgba(255, 224, 239, 0.9),
    rgba(255, 200, 228, 0.7)
  );
  box-shadow:
    0 0 6px rgba(255, 208, 230, 0.75),
    0 0 18px rgba(255, 200, 228, 0.45);
  filter: blur(0.6px);
  animation: ${twinkle} 3.8s ease-in-out ${({ $delay }) => `${$delay}s`}
    infinite;
`;

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

export default function IntroOverlay({
  isVisible,
  onUnlock,
  isAudioInitializing,
}: IntroOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible ? (
        <Overlay
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <FairyWrapper>
            <FairySvg viewBox="0 0 400 300">
              <defs>
                <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 244, 250, 0.9)" />
                  <stop offset="50%" stopColor="rgba(250, 212, 227, 0.65)" />
                  <stop offset="100%" stopColor="rgba(240, 180, 205, 0.5)" />
                </linearGradient>
                <radialGradient id="sparkGradient">
                  <stop offset="0%" stopColor="rgba(255, 230, 246, 0.9)" />
                  <stop offset="100%" stopColor="rgba(255, 230, 246, 0)" />
                </radialGradient>
                <linearGradient id="fairyGradient" x1="35%" y1="0%" x2="70%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 242, 249, 0.95)" />
                  <stop offset="55%" stopColor="rgba(243, 192, 210, 0.85)" />
                  <stop offset="100%" stopColor="rgba(214, 156, 181, 0.75)" />
                </linearGradient>
              </defs>
              <GlowEllipse cx="200" cy="180" rx="110" ry="70" fill="url(#sparkGradient)" />
              <FairyTrail
                d="M75 180 C 110 120, 180 90, 200 60 C 220 30, 260 15, 310 55"
                initial={{ strokeDashoffset: 320, opacity: 0 }}
                animate={{ strokeDashoffset: [320, 0, -320], opacity: [0, 0.65, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.g
                transform="matrix(1.3333333,0,0,-1.3333333,299.57493,276.7624)"
                style={{ transformOrigin: "200px 150px" }}
                animate={{ rotate: [0, 2.2, 0, -1.8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <FairyWingShape d="m 0,0 c -0.237,0 -0.472,0.099 -0.639,0.292 -0.451,0.519 -43.699,49.677 -90.041,45.403 11.069,-1.534 32.938,-5.837 39.579,-16.425 8.819,-14.064 6.395,-21.115 6.288,-21.408 -0.161,-0.438 -0.647,-0.665 -1.086,-0.503 -0.438,0.16 -0.663,0.646 -0.503,1.085 0.021,0.059 2.178,6.676 -6.133,19.927 -8.378,13.36 -44.406,16.347 -44.769,16.375 -0.421,0.033 -0.753,0.372 -0.778,0.792 -0.025,0.422 0.264,0.798 0.677,0.881 25.99,5.236 51.278,-7.303 67.919,-18.743 C -11.514,15.318 0.519,1.538 0.639,1.4 0.945,1.048 0.907,0.513 0.554,0.207 0.394,0.068 0.196,0 0,0" />
              </motion.g>
              <motion.g
                transform="matrix(1.3333333,0,0,-1.3333333,170.29227,216.56107)"
                style={{ transformOrigin: "200px 150px" }}
                animate={{ rotate: [0, -2.4, 0, 2.1, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <FairyWingShape d="m 0,0 c -0.113,0 -0.227,0.022 -0.337,0.07 -0.428,0.187 -0.625,0.685 -0.438,1.114 5.545,12.74 16.296,23.893 32.866,34.097 6.302,3.881 12.954,7.377 19.387,10.758 7.38,3.879 15.012,7.89 22.111,12.484 4.698,3.039 10.619,7.256 14.742,12.927 4.174,5.742 5.925,12.367 4.802,18.176 -1.275,6.6 -6.541,11.864 -12.521,12.517 -0.464,0.051 -0.8,0.469 -0.749,0.933 0.051,0.465 0.478,0.791 0.933,0.749 6.699,-0.732 12.586,-6.568 13.998,-13.878 C 96.005,83.679 94.148,76.575 89.7,70.456 85.413,64.559 79.329,60.222 74.509,57.102 67.345,52.468 59.679,48.438 52.265,44.541 45.857,41.173 39.231,37.691 32.978,33.841 16.712,23.824 6.179,12.921 0.776,0.508 0.637,0.19 0.326,0 0,0" />
              </motion.g>
              <FairyTrail
                d="m 0,0 c 0.072,0 0.144,-0.009 0.215,-0.028 0.332,-0.087 0.578,-0.365 0.624,-0.705 0.354,-2.629 2.072,-5.08 4.837,-6.902 1.672,-1.114 3.651,-1.946 5.726,-2.41 5.037,-1.109 10.375,-0.546 16.843,0.641 0.724,0.134 1.449,0.272 2.174,0.41 4.422,0.842 8.978,1.708 13.527,1.722 C 37.219,2.13 29.744,11.865 20.737,20.127 10.342,29.656 -0.932,36.149 -12.77,39.426 c -1.024,0.282 -2.016,0.532 -2.948,0.743 -9.442,2.157 -19.155,2.229 -28.093,0.211 -0.612,-0.134 -1.219,-0.283 -1.826,-0.441 -0.414,-0.107 -0.848,0.113 -1.003,0.516 -0.153,0.403 0.02,0.857 0.403,1.054 0.53,0.274 1.033,0.533 1.545,0.786 4.795,2.388 9.824,4.497 14.944,6.266 12.006,4.163 24.452,6.506 36.993,6.965 2.794,0.112 5.627,0.12 8.417,0.026 1.38,-0.044 2.772,-0.11 4.169,-0.176 7.189,-0.341 14.622,-0.693 21.219,1.968 6.893,2.777 12.203,8.788 13.858,15.689 1.549,6.439 -0.061,13.379 -4.416,19.039 -0.144,0.188 -0.204,0.426 -0.163,0.66 0.041,0.233 0.176,0.439 0.375,0.567 6.916,4.454 8.35,12.525 8.589,16.938 0.171,3.148 -0.062,6.357 -0.286,9.46 -0.24,3.304 -0.487,6.72 -0.263,10.133 0.576,8.802 4.352,17.492 10.664,24.592 -2.566,1.103 -5.916,1.308 -9.385,0.548 -3.714,-0.809 -7.138,-2.52 -10.327,-4.203 -10.405,-5.495 -20.462,-11.992 -29.89,-19.308 -27.901,-21.62 -50.583,-50.403 -65.597,-83.237 -1.359,-2.955 -2.697,-6.062 -3.977,-9.236 l -0.035,-0.085 c -0.182,-0.451 -0.363,-0.903 -0.537,-1.345 -0.065,-0.169 -0.13,-0.34 -0.197,-0.512 8.048,-3.564 13.25,-11.057 16.904,-17.251 0.523,-0.882 1.041,-1.774 1.562,-2.669 3.958,-6.808 8.051,-13.848 15.012,-18.12 2.88,-1.767 5.734,-2.682 8.484,-2.717 0.694,-0.012 1.412,0.052 2.133,0.181 2.454,0.432 4.556,1.598 5.768,3.197 C -0.512,-0.121 -0.261,0 0,0"
                transform="matrix(1.3333333,0,0,-1.3333333,238.7612,264.76173)"
                style={{ strokeDasharray: 520 }}
                initial={{ strokeDashoffset: 320 }}
                animate={{ strokeDashoffset: [320, 0, -320] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              />
              <FairySilhouette
                d="M 0,0 -0.12,0.18 C 0.17,0.35 0.42,0.55 0.61,0.76 0.39,0.51 0.19,0.25 0,0 L 5.58,-8.75 -4.65,-8.82 C -3.92,-6.23 -2.53,-3.22 0,0 m 38.65,-91.21 c -2.58,3.56 -10.91,2.41 -15.22,8.01 -4.3,5.59 -4.15,9.85 -9.83,10.68 -4.11,0.59 -9.83,-2.8 -12.66,-4.71 -3.21,1.13 -6.77,2.57 -10.55,4.16 -1.32,3.87 -2.79,7.39 -4.44,10.37 -0.25,0.45 -0.5,0.89 -0.77,1.3 0.78,0.41 1.55,0.83 2.3,1.26 1.83,-2.91 4.02,-5.59 6.53,-7.95 3.86,3.83 6.9,8.47 8.91,13.51 0.84,-0.78 1.71,-1.49 2.63,-2.15 5.69,-4.09 12.81,-6.15 19.8,-5.72 -2.38,16.72 -12.19,32.22 -26.21,41.59 -0.1,0.1 -0.2,0.2 -0.3,0.3 l 16.14,-1.77 c 4.1,-0.44 7.77,1.58 8.17,6.18 0.03,0.26 0.03,0.52 0.03,0.78 0,0.57 -0.05,1.11 -0.16,1.62 -0.02,0.36 -0.1,0.69 -0.23,0.97 L 6.34,24.18 C 5.65,25.67 4.41,26.69 2.92,27.28 1.15,31.04 -0.75,36.42 0,40.5 c 0.8,-2.19 3.24,-3.77 5.57,-3.37 -1.51,0.56 -2.02,2.58 -1.5,4.1 0.53,1.52 1.78,2.65 2.96,3.75 3.47,3.21 6.81,6.7 8.95,10.93 0.02,0.05 0.05,0.11 0.07,0.16 0.87,-1.69 2.74,-2.89 4.65,-2.75 -0.69,1.49 -0.3,3.26 0.48,4.71 0.77,1.45 1.89,2.67 2.78,4.04 1.92,2.98 2.71,6.68 2.15,10.17 -0.55,3.5 -2.44,6.77 -5.18,9.01 -2.46,2 -5.77,3.17 -8.85,2.4 -2.76,-0.68 -5.1,-3.25 -5.18,-6.04 -1.82,2.34 -4.65,3.89 -7.62,4.11 -3.45,0.27 -6.9,-1.16 -10.33,-0.68 -1.82,0.25 -3.68,1.02 -5.43,0.46 -1.88,-0.6 -2.99,-2.61 -3.26,-4.57 -0.3,-2.18 0.26,-4.44 1.47,-6.28 -1.41,-1.35 -3.13,-3.32 -4.43,-5.8 -0.51,-0.96 -0.95,-2 -1.28,-3.12 -0.01,-0.1 -0.04,-0.21 -0.07,-0.3 -0.27,-0.95 0.42,-2.11 0.34,-3.16 0,-0.01 -0.02,-0.04 -0.01,-0.06 -0.01,-0.2 -0.01,-0.39 -0.04,-0.6 0.01,-0.08 0,-0.17 0,-0.27 -0.03,-1.25 -0.66,-2.53 -0.83,-4.09 0,-0.03 -0.01,-0.04 -0.01,-0.07 -0.25,-2.41 0.42,-4.77 1.76,-6.79 3.46,-5.23 4.09,-8.13 6.72,-8.55 0.35,-0.06 0.73,-0.06 1.14,-0.04 0.15,0 0.28,0.02 0.43,0.03 0.47,0.05 0.96,0.15 1.5,0.29 0.05,0.01 0.1,0.02 0.16,0.04 -0.28,-1.89 -1.1,-3.68 -2.3,-5.16 l -1.34,0.11 c -0.32,0 -0.66,-0.02 -0.99,-0.06 l -34.22,-5.02 -21.98,27.93 c -0.19,0.23 -0.41,0.44 -0.65,0.62 l 0.04,0.08 c -0.36,0.33 -0.7,0.68 -0.9,1 -0.62,0.94 -1.11,1.97 -1.76,2.89 -1.56,2.22 -3.96,3.65 -6.3,5.02 -1.33,0.79 -2.68,1.59 -4.02,2.37 -0.26,0.16 -0.6,0.32 -0.86,0.14 -0.21,-0.14 -0.24,-0.43 -0.23,-0.68 0.02,-1.45 0.66,-2.88 1.71,-3.87 0.54,-0.52 1.18,-0.92 1.65,-1.49 0.33,-0.43 0.56,-1.01 0.5,-1.55 l -0.01,0.01 c -0.35,-0.81 -1.42,-1.02 -2.3,-1.01 -2.75,0.01 -5.49,0.91 -7.73,2.51 -0.46,0.33 -0.9,0.7 -1.42,0.96 -0.5,0.26 -1.09,0.4 -1.65,0.25 -0.56,-0.13 -1.03,-0.63 -1.04,-1.21 l 0.62,-0.33 c -0.99,0.22 -2.11,-0.14 -2.76,-0.92 l 0.08,-0.06 c 1.55,-0.93 3.08,-1.87 4.62,-2.8 -0.07,-0.02 -0.14,-0.06 -0.19,-0.12 -0.11,-0.13 -0.12,-0.33 -0.02,-0.48 0.05,-0.09 0.13,-0.15 0.21,-0.2 0.65,-0.47 1.27,-0.93 1.9,-1.4 0.25,-1.17 1.17,-2.13 2.24,-2.69 1.1,-0.6 2.34,-0.84 3.57,-1.07 2.32,-0.46 4.64,-0.91 6.97,-1.35 l 19.09,-31.13 c 0.88,-1.41 2.03,-2.53 3.34,-3.19 0.95,-0.82 1.96,-1.35 2.83,-1.34 l 21.25,-0.08 c -0.97,-1.92 -1.59,-3.76 -1.85,-5.43 -0.48,-2.97 0.53,-5.28 2.81,-7 -2.04,-10.01 -0.95,-18.31 0.72,-24.22 -6.48,-0.79 -12.76,-3.23 -18.07,-7.04 -6.18,-4.43 -11.01,-10.71 -13.73,-17.81 1.66,-0.63 3.37,-1.11 5.11,-1.44 l -10.33,-8.17 c -1.42,-0.66 -2.65,-1.51 -3.73,-2.5 -0.82,-0.75 -1.49,-1.57 -2.04,-2.44 -0.02,-0.02 -0.04,-0.05 -0.06,-0.08 -3.14,-4.04 -3.19,-9.86 0.21,-13.98 1.06,-1.29 2.37,-2.3 3.82,-2.99 1.4,-0.88 3.02,-1.5 4.82,-1.76 l 35.6,-5.46 23.85,-48.02 c 0.08,-0.17 0.18,-0.34 0.29,-0.5 2.66,-6.16 8.55,-19.63 10.47,-23.02 2.51,-4.44 3.84,-13.44 3.84,-13.44 1.42,-0.78 5.02,1.68 6.44,5.84 1.43,4.16 -4.31,10.31 -2.21,17.05 2.11,6.74 5.67,9.06 3.08,14.18 -1.88,3.71 -7.94,6.43 -11.13,7.66 -2.73,9.65 -5.04,23.29 -8.02,36.16 l 6.14,-0.94 c 0.18,-0.02 0.35,-0.04 0.53,-0.05 h 0.02 c 6.57,-1.36 20.99,-4.3 24.88,-4.68 5.06,-0.51 13.19,-4.6 13.19,-4.6 1.47,0.72 1.52,5.07 -1.06,8.63"
                transform="matrix(1.3333333,0,0,-1.3333333,193.60347,201.46)"
                initial={{ opacity: 0.95 }}
                animate={{ opacity: [0.9, 0.98, 0.9] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </FairySvg>
            {[
              { delay: 0, left: 18, top: 14, size: 9 },
              { delay: 0.5, left: 28, top: 22, size: 11 },
              { delay: 0.9, left: 38, top: 12, size: 8 },
              { delay: 1.4, left: 48, top: 26, size: 10 },
              { delay: 1.9, left: 58, top: 16, size: 9 },
              { delay: 2.4, left: 68, top: 24, size: 12 },
              { delay: 3, left: 78, top: 18, size: 9 },
              { delay: 3.5, left: 86, top: 28, size: 11 },
              { delay: 4.1, left: 24, top: 32, size: 7 },
              { delay: 4.6, left: 72, top: 32, size: 8 },
            ].map((sparkle) => (
              <Sparkles
                key={`${sparkle.delay}-${sparkle.left}-${sparkle.top}`}
                $delay={sparkle.delay}
                $left={sparkle.left}
                $top={sparkle.top}
                $size={sparkle.size}
              />
            ))}
            <Slogan>
              Una brisa mágica cubre la noche. Toca para abrir las alas y entrar
              al encanto.
            </Slogan>
            <UnlockButton
              type="button"
              onClick={onUnlock}
              disabled={isAudioInitializing}
            >
              <FiPlay />
              Ingresar
            </UnlockButton>
          </FairyWrapper>
        </Overlay>
      ) : null}
    </AnimatePresence>
  );
}
