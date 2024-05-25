"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import tailwindConfig from '../../tailwind.config'; // Assurez-vous du bon chemin

type AnimatedButtonProps = {
  text?: string;
  horizontalPadding?: number;
  verticalPadding?: number;
  backgroundColor?: string;
  textColor?: string;
  backgroundShadeColor?: string;
  outlineBorder?: boolean;
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  text = "Click",
  horizontalPadding = 6,
  verticalPadding = 3,
  backgroundColor = tailwindConfig.theme.extend.colors.primary, // Utilise la couleur depuis la config
  backgroundShadeColor = tailwindConfig.theme.extend.colors['primary-shade'],
  textColor = "white",
  outlineBorder = false
}: AnimatedButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleTapStart = () => {
    setIsPressed(true);
    console.log('tapped');
  };

  const handleTapEnd = () => {
    setIsPressed(false);
    console.log('untapped');
  };

  return (
    <motion.button
      onTapStart={handleTapStart}
      onTapCancel={handleTapEnd}
      onTap={handleTapEnd}
      whileHover={{ scale: 0.95, y: 2 }}
      whileTap={{ scale: 0.9, y: 4 }}
      style={{
        padding: `${verticalPadding * 0.25}rem ${horizontalPadding * 0.25}rem`,
        backgroundColor: backgroundColor,
        color: textColor,
        borderRadius: '0.5rem',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.15)',
        border: outlineBorder ? '2px solid' : 'none',
        borderBottom: isPressed ? '2px solid ' + backgroundShadeColor : '4px solid ' + backgroundShadeColor,
      }}
    >
      {text}
    </motion.button>
  );
};

export default AnimatedButton;
