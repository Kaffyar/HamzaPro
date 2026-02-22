import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { addMediaQueryChangeListener, removeMediaQueryChangeListener } from "../hooks/mediaQueryListener";

const BASE_ROTATION = 20;
const INTERACTIVE_SELECTOR =
  'a[href], button, [role="button"], input[type="button"], input[type="submit"]';

const CURSOR_COLORS = {
  fill: "#E2C27A",
  fillAlt: "#D4A24D",
  highlight: "#FFF3D6",
  outline: "#6F4D1C",
};

function calculateRotate(fromX: number, fromY: number, to: Element | null) {
  if (!to) return BASE_ROTATION;

  const rect = to.getBoundingClientRect();
  const toCenterX = rect.left + rect.width / 2;
  const toCenterY = rect.top + rect.height / 2;

  const radians = Math.atan2(toCenterX - fromX, toCenterY - fromY);
  const degree = (radians * (180 / Math.PI) * -1) + 180;
  return degree + BASE_ROTATION;
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(BASE_ROTATION);
  const [isPointer, setIsPointer] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const syncEnabledState = () => {
      const canUseCustomCursor = mediaQuery.matches;
      setIsEnabled(canUseCustomCursor);
      root.classList.toggle("custom-cursor-active", canUseCustomCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePosition({ x, y });
      setIsVisible(true);

      const target =
        e.target instanceof Element
          ? e.target.closest(INTERACTIVE_SELECTOR)
          : null;

      setIsPointer(Boolean(target));
      setRotation(calculateRotate(x, y, target));
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        setIsVisible(false);
      }
    };

    syncEnabledState();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);
    addMediaQueryChangeListener(mediaQuery, syncEnabledState);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      removeMediaQueryChangeListener(mediaQuery, syncEnabledState);
      root.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!isEnabled || !isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] select-none"
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 6,
        filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.4))",
      }}
      animate={{
        scale: isPointer ? 1.06 : 1,
      }}
      transition={{ type: "spring", stiffness: 340, damping: 24 }}
    >
      <motion.svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        style={{ display: "block", transformOrigin: "50% 50%" }}
      >
        <polygon
          fill={CURSOR_COLORS.fillAlt}
          points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6"
        />
        <polygon
          fill={CURSOR_COLORS.highlight}
          points="17.3,21.6 13.7,23.1 9,12 12.7,10.5"
        />
        <rect
          x="12.5"
          y="13.6"
          transform="matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)"
          width="2"
          height="8"
          fill={CURSOR_COLORS.outline}
          opacity="0.7"
        />
        <polygon
          fill={CURSOR_COLORS.fill}
          points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5"
        />
      </motion.svg>
    </motion.div>
  );
}
