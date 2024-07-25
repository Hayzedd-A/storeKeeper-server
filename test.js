const uniqid = require("uniqid");

console.log(uniqid.time());

const values = [
  [
    "lz100koa",
    "f34e1278-e43b-48de-8ea3-8ef556518da2",
    "lyiaexr5",
    33,
    19.99,
    "2024-07-25T08:15:20.744Z",
    "c3ed702a-913c-4e3f-81c6-5e2d6afe1f80",
  ],
  [
    "lz100koe",
    "f34e1278-e43b-48de-8ea3-8ef556518da2",
    "lyiaexra",
    29,
    129.99,
    "2024-07-25T08:15:20.744Z",
    "c3ed702a-913c-4e3f-81c6-5e2d6afe1f80",
  ],
];

let queryValues = values.map(item => {
  return `(${item})`;
});

console.log(queryValues);
