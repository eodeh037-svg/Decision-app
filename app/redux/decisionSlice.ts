import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DecisionState = {
  options: string[];
  result: string | null;
  reason: string | null;
};

const initialState: DecisionState = {
  options: [],
  result: null,
  reason: null,
};

// 🔥 Reason generator
const generateReason = (option: string) => {
  const reasons = [
    `“${option}” gives you the best balance right now.`,
    `It seems like “${option}” fits your current situation.`,
    `“${option}” stands out as the smartest choice.`,
    `Based on your options, “${option}” is the most practical.`,
    `“${option}” aligns well with what you need.`,
    `This choice gives you the highest chance of satisfaction.`,
  ];

  return reasons[Math.floor(Math.random() * reasons.length)];
};

const decisionSlice = createSlice({
  name: 'decision',
  initialState,
  reducers: {
    addOption: (state, action: PayloadAction<string>) => {
      state.options.push(action.payload);
    },

    removeOption: (state, action: PayloadAction<number>) => {
      state.options.splice(action.payload, 1);
    },

    pickRandom: (state) => {
      if (state.options.length === 0) return;

      const random =
        state.options[Math.floor(Math.random() * state.options.length)];

      state.result = random;
      state.reason = generateReason(random); // ✅ ADD THIS
    },

    setAll: (state, action: PayloadAction<DecisionState>) => {
      state.options = action.payload.options || [];
      state.result = action.payload.result || null;
      state.reason = action.payload.reason || null;
    },
  },
});

export const { addOption, removeOption, pickRandom, setAll } =
  decisionSlice.actions;

export default decisionSlice.reducer;