import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin";
const LtcSetting: SettingSchemaDesc[] = [
  {
    key: "ltcName",
    type: "string",
    title: "Leetcode Username(id)",
    description: "Input your leetcode username(id)",
    default: "",
  },
  {
    key: "ltcPwd",
    type: "string",
    title: "Leetcode Password",
    description: "Input your leetcode password",
    default: "",
  },
  {
    key: "ltcEndPoint",
    type: "boolean",
    title: "Using CN Accout",
    description: "false is global / true is cn",
    default: false,
  },
];

export { LtcSetting };
