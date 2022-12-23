function settingCheck() {
  if (!logseq.settings?.ltcName || !logseq.settings?.ltcPwd) {
    logseq.App.showMsg(
      "Please input your leetcode account in settings/plugins",
      "warning"
    );
    return false;
  }
  return true;
}

export { settingCheck };
