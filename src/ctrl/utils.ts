import { LtcDifficultyTag } from "../model/leetcode";

// difficulty tag
const difficultyTagMap = {
  0: LtcDifficultyTag.Easy,
  1: LtcDifficultyTag.Mid,
  2: LtcDifficultyTag.Hard,
};
const renderDifficultyTag = (difficulty: number) => {
  return difficultyTagMap[difficulty] || "";
};

// page split
// 将连续 id 的数组，按 limit 进行分页，并以 map 的形式返回
function pageSplit<T>(arr: T, limit: number) {
  const m: Record<string, any[]> = {};
  const titlePrefix = "Leetcode problem";
  const getTitle = (i: number) => {
    const page = Math.floor(i / limit);
    const start = page * limit + 1;
    const end = (page + 1) * limit;
    return `${titlePrefix} ${start}-${end}`;
  };
  (arr as any).forEach((v: any, i: number) => {
    const title = getTitle(i);
    m[title] ? m[title].push(v) : (m[title] = [v]);
  });
  return m as Record<string, T>;
}

const delay = (t = 100) => new Promise((r) => setTimeout(r, t));

export { renderDifficultyTag, pageSplit, delay };
