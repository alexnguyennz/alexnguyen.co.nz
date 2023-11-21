import { m, LazyMotion, domAnimation, useInView } from "framer-motion";
import { useRef } from "react";

export function Fade({
  delay,
  children,
}: {
  delay?: number;
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
  });

  const fadeVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        animate={inView ? "animate" : "initial"}
        initial={false}
        transition={{
          duration: 0.6,
          delay: delay ?? 0.1,
        }}
        variants={fadeVariants}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
