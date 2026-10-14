"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, summary, [role='button']";

export function CursorOrbit() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const supportsPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!cursor || !supportsPointer.matches || prefersReducedMotion.matches) return;

    let frame = 0;
    let targetX = -40;
    let targetY = -40;
    let currentX = targetX;
    let currentY = targetY;
    let hasMoved = false;

    const animate = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!hasMoved) {
        currentX = targetX;
        currentY = targetY;
        cursor.dataset.visible = "true";
        hasMoved = true;
      }
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;
      cursor.dataset.active = target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR)) ? "true" : "false";
    };

    const handlePointerDown = () => { cursor.dataset.pressed = "true"; };
    const handlePointerUp = () => { cursor.dataset.pressed = "false"; };
    const handlePointerLeave = () => { cursor.dataset.visible = "false"; };
    const handlePointerEnter = () => {
      if (hasMoved) cursor.dataset.visible = "true";
    };

    frame = window.requestAnimationFrame(animate);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    document.documentElement.addEventListener("mouseenter", handlePointerEnter);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      document.documentElement.removeEventListener("mouseenter", handlePointerEnter);
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor-orbit" aria-hidden="true">
      <span className="cursor-orbit-ring" />
      <span className="cursor-orbit-core" />
    </div>
  );
}
