enum LeetCodeEndPoint {
  EN = 0,
  CN = 1,
}

enum ProblemStatus {
  "Accept" = 0,
  "Not Accept" = 1,
  "Not Start" = 2,
}

enum LtcDifficultyTag {
  Easy = "#ltc_easy",
  Mid = "#ltc_mid",
  Hard = "#ltc_hard",
}

enum SubmissionStatus {
  "Accepted" = 0,
  "Compile Error" = 1,
  "Wrong Answer" = 2,
  "Time Limit Exceeded" = 3,
}

const ltcHot100Ids = [
  1, 2, 3, 4, 5, 10, 11, 15, 17, 19, 20, 21, 22, 23, 31, 32, 33, 34, 39, 42, 46,
  48, 49, 53, 55, 56, 62, 64, 70, 72, 75, 76, 78, 79, 84, 85, 94, 96, 98, 101,
  102, 104, 105, 114, 121, 124, 128, 136, 139, 141, 142, 146, 148, 152, 155,
  160, 169, 198, 200, 206, 207, 208, 215, 221, 226, 234, 236, 238, 239, 240,
  253, 279, 283, 287, 297, 300, 301, 309, 312, 322, 337, 338, 347, 394, 399,
  406, 416, 437, 438, 448, 461, 494, 538, 543, 560, 581, 617, 621, 647, 739,
];

interface ProblemLight {
  id: number;
  title: string;
  slug: string;
  difficulty: number;
  content: string;
  tag: string;
  status: number;
}

export {
  LeetCodeEndPoint,
  LtcDifficultyTag,
  ProblemStatus,
  SubmissionStatus,
  ltcHot100Ids,
  ProblemLight,
};
