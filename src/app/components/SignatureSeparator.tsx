type SignatureSeparatorProps = {
  secondary?: boolean;
};

const binaryCode = "1011001 1101010 1001110 1110001 1011011 1100101 1001101 1110011";

export function SignatureSeparator({ secondary = false }: SignatureSeparatorProps) {
  return (
    <div className={`signature-separator ${secondary ? "is-secondary" : ""}`} aria-hidden="true">
      <span className="signature-separator__triangle" />
      <span className="signature-separator__code">{binaryCode}</span>
      <span className="signature-separator__stripes" />
      <span className="signature-separator__triangle is-end" />
    </div>
  );
}
