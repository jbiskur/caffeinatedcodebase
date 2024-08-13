const fs = require("node:fs");

const translations = JSON.parse(fs.readFileSync("translations/en.json", "utf8"));

const typings = `
export interface Translations {
${Object.keys(translations).map((key) => {
  return `  "${key}": string;`;
}
).join("\n")}
}
`;

fs.writeFileSync("src/types/translations.d.ts", typings);
