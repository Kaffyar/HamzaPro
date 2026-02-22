type ContrastMaskLayerProps = {
  isAnimating: boolean;
  isContrasted: boolean;
};

export function ContrastMaskLayer({ isAnimating, isContrasted }: ContrastMaskLayerProps) {
  return (
    <div
      className={`contrast-mask ${isAnimating ? "is-animating" : ""} ${isContrasted ? "is-contrasted" : ""}`}
      aria-hidden="true"
    />
  );
}
