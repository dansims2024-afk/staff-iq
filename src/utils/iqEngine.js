export const calculateStaffIQ = (metrics, weights) => {
  const { skills, experience, culture } = metrics;
  const { wSkills, wExp, wCulture } = weights;

  const total = (skills * wSkills) + (experience * wExp) + (culture * wCulture);
  return Math.round(total);
};

export const getScoreClass = (score) => {
  if (score >= 90) return 'bg-emerald-50 text-emerald-600 border-emerald-100';
  if (score >= 75) return 'bg-indigo-50 text-indigo-600 border-indigo-100';
  return 'bg-slate-50 text-slate-500 border-slate-200';
};
