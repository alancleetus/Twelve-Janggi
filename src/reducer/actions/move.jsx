export default function makeNewMove({ newPosition }) {
  return {
    type: "NEW_MOVE",
    payload: { newPosition },
  };
}
