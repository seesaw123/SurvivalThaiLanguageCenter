import { ALPHABET } from './content.js';

// Fisher–Yates: shuffle copies, preserving the shared alphabet data.
export function shuffle(items, random = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function createRound(random = Math.random) {
  return shuffle(ALPHABET, random).slice(0, 15).map((target) => ({
    target,
    options: shuffle([target, ...shuffle(ALPHABET.filter((letter) => letter.g !== target.g), random).slice(0, 3)], random),
  }));
}

export const initialGame = { phase: 'intro', round: [], index: 0, results: [], deadline: 0, now: 0, advanceAt: 0 };

function resolve(state, chosen, now) {
  const target = state.round[state.index].target;
  return { ...state, phase: 'feedback', now, advanceAt: now + 3000,
    results: [...state.results, { target, chosen, correct: chosen === target.g }] };
}

export function gameReducer(state, action) {
  if (action.type === 'start') return { ...initialGame, phase: 'question', round: action.round, deadline: action.now + 5000, now: action.now };
  if (action.type === 'answer' && state.phase === 'question') {
    return resolve(state, action.now >= state.deadline ? null : action.chosen, action.now);
  }
  if (action.type !== 'tick') return state;
  if (state.phase === 'question') {
    return action.now >= state.deadline ? resolve(state, null, action.now) : { ...state, now: action.now };
  }
  if (state.phase === 'feedback') {
    if (action.now < state.advanceAt) return { ...state, now: action.now };
    if (state.index === state.round.length - 1) return { ...state, phase: 'done', now: action.now };
    return { ...state, phase: 'question', index: state.index + 1, deadline: action.now + 5000, now: action.now };
  }
  return state;
}
