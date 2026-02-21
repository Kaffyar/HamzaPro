export function ScanlineEffect() {
  return (
    <>
      {/* Subtle scanline effect */}
      <div
        className="fixed inset-0 pointer-events-none z-[5] opacity-[0.02]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(245, 158, 11, 0.03) 2px, rgba(245, 158, 11, 0.03) 4px)",
        }}
      />
      
      {/* Vignette effect */}
      <div
        className="fixed inset-0 pointer-events-none z-[5]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(11, 10, 8, 0.5) 100%)",
        }}
      />
    </>
  );
}
