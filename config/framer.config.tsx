const FramerConfig = {
    initial: { opacity: 0, x: -50, y: 0 },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
    transition: { 
        type: 'linear', 
        duration: 0.3
    }
}

export default FramerConfig;