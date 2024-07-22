import actionTypes from "../actionType";
export default function generateCandidateMoves({ newCandidateMoves }) {
  return {
    type: actionTypes.CANDIDATE_MOVE,
    payload: { newCandidateMoves },
  };
}
