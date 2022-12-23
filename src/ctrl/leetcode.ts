import "@logseq/libs";
import Leetcode from "leetcode-api-ts";
import { LeetCodeEndPoint, ProblemLight } from "../model/leetcode";
import { renderDifficultyTag, pageSplit } from "./utils";

async function getLoginedLeetcodeInstance(
  name: string,
  pwd: string,
  endPoint: LeetCodeEndPoint
) {
  const instance = await Leetcode.build(name, pwd, endPoint as any);
  return instance;
}

async function loadAllProblems(leetcode) {
  const problems: Array<any> = await leetcode.getAllProblems();
  const problems2: Array<ProblemLight> = problems
    .filter((v) => v.id < 100)
    .sort((a, b) => (a.id > b.id ? 1 : -1))
    .map((data) => {
      return {
        ...data,
        content: `${data.id}. ${data.title}`,
        tag: renderDifficultyTag(data.difficulty),
      };
    }) as any;

  return pageSplit(problems2, 50);
}

async function getLtcIns() {
  const ltc = await getLoginedLeetcodeInstance(
    logseq.settings?.ltcName || "",
    logseq.settings?.ltcPwd || "",
    logseq.settings?.ltcEndPoint ? 1 : 0
  );
  return ltc;
}

export { getLoginedLeetcodeInstance, loadAllProblems, getLtcIns };
