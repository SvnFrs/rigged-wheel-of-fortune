"use client";

import { useRef } from "react";
import { useEffect } from "react";

export default function AnimatedHeader() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLHeadingElement;
      const dataValue = target.dataset.value || "";
      let iterations = 0;

      const interval = setInterval(() => {
        if (headingRef.current) {
          headingRef.current.innerHTML = dataValue
            .split("")
            .map((letter, index) => {
              if (index < iterations) {
                return dataValue[index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
        }

        if (iterations >= dataValue.length) {
          clearInterval(interval);
        }
        iterations += 1 / 3;
      }, 30);
    };

    const heading = headingRef.current;
    if (heading) {
      heading.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      if (heading) {
        heading.removeEventListener("mouseover", handleMouseOver);
      }
    };
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8" ref={headingRef} data-value="Fcoder hên xui">
        Fcoder hên xui
      </h1>
    </div>
  );
}
