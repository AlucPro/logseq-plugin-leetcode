import Problem from "leetcode-api-ts/dist/lib/problem";
import { ProblemLight, ltcHot100Ids } from "../model/leetcode";
import { loadAllProblems } from "../ctrl/leetcode";

async function renderProblemDetailInPage(pageID: string, problemSlug: string) {
  const detail = new Problem(problemSlug);
  await detail.detail();
  const ctnt = detail.content;
  await logseq.Editor.appendBlockInPage(pageID, ctnt as any);
}

async function renderProblemDetailInBlock(blockUUID: string, slug: string) {
  const detail = new Problem(slug);
  await detail.detail();
  const ctnt = detail.content || "empty content";
  await logseq.Editor.insertBlock(blockUUID, ctnt);
}

function getProblemListViewData(
  allproblems: Record<string, ProblemLight[]>,
  key: string
) {
  const needCreatePage: any[] = [];
  const newProblemBlocksData = allproblems[key].map((it) => {
    let content = it.content;
    if ([0, 1].indexOf(it.status) > -1 || ltcHot100Ids.indexOf(it.id) > -1) {
      content = `[[${content}]]`;
      const p = logseq.Editor.getPage(it.content);
      console.log({ p });
      needCreatePage.push(it);
    }
    return {
      content: `${content} ${it.tag}`,
    };
  });
  return { needCreatePage, newProblemBlocksData };
}

async function renderProblemListPage(
  allproblems: Record<string, ProblemLight[]>
) {
  Object.keys(allproblems).map(async (k) => {
    const newBlock = await logseq.Editor.appendBlockInPage(k, "## Problme Set");
    const { needCreatePage, newProblemBlocksData } = getProblemListViewData(
      allproblems,
      k
    );
    await logseq.Editor.insertBatchBlock(
      newBlock?.uuid as any,
      newProblemBlocksData,
      {
        sibling: false,
      }
    );
    needCreatePage.forEach(async (p) => {
      await renderProblemDetailInPage(p.content, p.slug);
    });
  });
}

async function renderOverviewPage(blockUUID: string, ltc: any) {
  const targetBlock: any = await logseq.Editor.insertBlock(
    blockUUID,
    "## Fetching leetcode problems to logseq ...",
    { before: true }
  );

  // get leetcode data
  let allproblems = await loadAllProblems(ltc);

  // render data
  await logseq.Editor.insertBatchBlock(
    targetBlock.uuid,
    Object.keys(allproblems).map((it) => ({
      content: `[[${it}]]`,
    })),
    {
      sibling: false,
    }
  );

  await logseq.Editor.updateBlock(
    targetBlock.uuid,
    `## Leetcode updated at - ${new Date().toLocaleString()}`
  );
  return { allproblems };
}

export {
  renderProblemDetailInPage,
  getProblemListViewData,
  renderProblemListPage,
  renderOverviewPage,
  renderProblemDetailInBlock,
};
