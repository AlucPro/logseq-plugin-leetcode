import "@logseq/libs";
import { LSPluginBaseInfo } from "@logseq/libs/dist/LSPlugin";
import { delay } from "./src/ctrl/utils";
import { LtcSetting } from "./src/model/setting";
import { settingCheck } from "./src/ctrl/setting";
import { getLtcIns } from "./src/ctrl/leetcode";
import {
  renderProblemListPage,
  renderOverviewPage,
  renderProblemDetailInBlock,
} from "./src/view/leetcode";
/**
 * main entry
 * @param baseInfo
 */
function main(baseInfo: LSPluginBaseInfo) {
  logseq.useSettingsSchema(LtcSetting);
  let loading = false;

  logseq.Editor.registerSlashCommand("ltc all problems", async () => {
    const b = await logseq.Editor.getCurrentBlock();
    if (!b) {
      logseq.App.showMsg("empty block", "warning");
      return;
    }
    const { uuid } = b;

    if (!settingCheck()) return;
    if (loading) return;

    await delay(300);
    loading = true;

    try {
      const ltc = await getLtcIns();
      const { allproblems } = await renderOverviewPage(uuid, ltc);
      await renderProblemListPage(allproblems);
    } catch (e) {
      logseq.App.showMsg(e.toString(), "warning");
      console.error(e);
    } finally {
      loading = false;
    }
  });

  logseq.Editor.registerSlashCommand("ltc problem fetch", async () => {
    const b = await logseq.Editor.getCurrentBlock();
    if (!b) {
      logseq.App.showMsg("empty block", "warning");
      return;
    }

    try {
      const { content, uuid } = b;
      const slug = (content || "").trim();
      if (!slug) {
        logseq.App.showMsg("please input problem slug", "warning");
        return;
      }

      renderProblemDetailInBlock(uuid, slug);
    } catch (e) {
      logseq.App.showMsg(e.toString(), "warning");
      console.error(e);
    }
  });
}

// bootstrap
logseq.ready(main).catch(console.error);
