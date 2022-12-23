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
  logseq.provideModel({
    async renderLeetCodePage() {
      if (!settingCheck()) return;
      if (loading) return;

      const pageName = "Leetcode All Problems";
      logseq.App.pushState("page", { name: pageName });
      await delay(300);
      loading = true;

      try {
        const ltc = await getLtcIns();
        const { allproblems } = await renderOverviewPage(pageName, ltc);
        await renderProblemListPage(allproblems);
      } catch (e) {
        logseq.App.showMsg(e.toString(), "warning");
        console.error(e);
      } finally {
        loading = false;
      }
    },
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

  logseq.App.registerUIItem("toolbar", {
    key: "logseq-leetcode",
    template: `
      <a data-on-click="renderLeetCodePage"
         class="button">
        <i class="ti ti-smile"></i>
      </a>
    `,
  });
}

// bootstrap
logseq.ready(main).catch(console.error);
