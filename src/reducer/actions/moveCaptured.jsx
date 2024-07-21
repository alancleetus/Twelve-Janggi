export default function moveCaptured({ newCapturedList, actorColor }) {
  return {
    type: "USE_CAPTURED",
    payload: { newCapturedList, actorColor },
  };
}
