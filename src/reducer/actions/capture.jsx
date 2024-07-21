export default function capturePiece({ newCapturedList, capturerColor }) {
  return {
    type: "CAPTURE_PIECE",
    payload: { newCapturedList, capturerColor },
  };
}
