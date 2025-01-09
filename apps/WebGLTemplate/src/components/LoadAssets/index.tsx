import { IMAGES } from '@/assets/images';
import { loadFull } from 'tsparticles';
import { ISourceOptions } from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { motion } from 'framer-motion';
import { memo, useEffect, useMemo, useState, type FC } from 'react';

interface LoadAssetsProps {
  progress: number;
  showCoinParticles?: boolean;
}

const particlesOptions: ISourceOptions = {
  emitters: {
    position: {
      x: 50, // canvas 50%
      y: 70, // canvas 70%
    },
    rate: {
      quantity: 1, // x coins per seconds
      delay: 0.15, // delay time per emit
    },
    life: {
      duration: 3,
      count: Infinity,
    },
  },
  particles: {
    move: {
      decay: 0.05,
      direction: 'top',
      enable: true,
      gravity: {
        enable: true,
      },
      outModes: {
        top: 'none',
        default: 'destroy',
      },
      speed: {
        min: 50,
        max: 100,
      },
    },
    number: {
      value: 0, // initial number of coins
    },
    opacity: {
      value: 1,
    },
    rotate: {
      value: {
        min: 0,
        max: 360,
      },
      direction: 'random',
      animation: {
        enable: true,
        speed: 15,
      },
    },
    tilt: {
      enable: false, // tilt effect
    },
    size: {
      value: 15,
      animation: {
        enable: false,
      },
    },
    roll: {
      enable: false,
    },
    wobble: {
      distance: 30,
      enable: true,
      speed: {
        min: -7,
        max: 7,
      },
    },
    shape: {
      type: ['image'],
      options: {
        image: [
          {
            src: IMAGES.COIN,
            width: 156,
            height: 170,
          },
        ],
      },
    },
  },
  responsive: [
    {
      maxWidth: 1024,
      options: {
        particles: {
          move: {
            speed: {
              min: 33,
              max: 66,
            },
          },
        },
      },
    },
  ],
};

const CoinParticles: FC = memo(() => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(loadFull).then(() => setInit(true));
  }, []);

  if (init) return <Particles className="relative z-1" id="tsparticles" options={particlesOptions} />;
  return null;
});

const LoadAssets: FC<LoadAssetsProps> = ({ progress, showCoinParticles = true }) => {
  return (
    <motion.div
      className="flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-150 z-1"
      style={{
        backgroundImage: 'linear-gradient(159deg, #7900FF 5.51%, #BC2DFF 104.89%)',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.img
        src={IMAGES.COIN}
        alt="logo.png"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="w-120px h-120px absolute z-1 top-20vh object-contain"
      />
      {showCoinParticles && <CoinParticles />}
      <img src={IMAGES.LOADING_BG} alt="YescoinBG" className="w-full h-full absolute top-0 left-0" />
      <div
        className="relative mt-80vh z-1 h-4 overflow-hidden rounded-full w-[60%]"
        style={{
          backgroundImage: 'linear-gradient(0deg, #D8E1EC -22.58%, #B3C3D8 87.1%)',
        }}
      >
        <motion.div
          className="h-full w-full flex-1"
          initial={{ x: 0 }}
          animate={{ x: -100 + progress }}
          style={{
            backgroundImage: 'linear-gradient(0deg, #FFAF00 -16.13%, #FFD700 100%)',
          }}
        />
      </div>
    </motion.div>
  );
};

export default LoadAssets;
