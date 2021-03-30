/* eslint-disable @typescript-eslint/no-var-requires */
const SourceMapConsumer = require('source-map').SourceMapConsumer;
const fetch = require('node-fetch');

const gitToken = '38997da76f75c772cf8384512f2c8f2d57efa9c3';

export const translate = async (sourceUrl) => {
  const result = { originalFile: '', originalLines: [] };

  let line = 0;
  let column = 0;
  let match;
  if ((match = sourceUrl.match(/^(.*?)(\:[0-9]+)(\:[0-9]+|$)/))) {
    sourceUrl = match[1];
    line = parseInt(match[2].slice(1), 10);
    if (match[3]) column = parseInt(match[3].slice(1), 10);
  }

  const response = await fetch(sourceUrl);
  const source = await response.text();

  if (
    (match = /(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"`]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^\*]+?)[ \t]*(?:\*\/){1}[ \t]*$)/i.exec(
      source,
    ))
  ) {
    const sourceMapUrl = match[1];

    let gitOwner, gitRepo;
    if ((match = /\/repos\/(.*?)\/(.*?)\/contents/i.exec(sourceMapUrl))) {
      gitOwner = match[1];
      gitRepo = match[2];
    }

    const res = await fetch(sourceMapUrl, {
      headers: {
        Authorization: `token ${gitToken}`,
        Accept: 'application/vnd.github.v3.raw',
        'User-Agent': `User-Agent: ${gitOwner}/${gitRepo} (curl v7.47.0)`,
      },
    });
    const sourceMap = await res.json();

    const smc = await new SourceMapConsumer(sourceMap);
    const origpos = smc.originalPositionFor({ line: line, column: column });
    const origposSource = origpos.source
      .replace('webpack:///.', '')
      .replace('webpack://', '');

    result.originalFile = `${origposSource}:${origpos.line}:${origpos.column}`;

    const contentIndex = sourceMap.sources
      .map((s) => s.replace('webpack:///.', '').replace('webpack://', ''))
      .indexOf(origposSource);

    const body = sourceMap.sourcesContent[contentIndex];
    const lines = body.split('\n');

    const originalLines = [];
    for (let i = origpos.line - 4; i <= origpos.line + 2; i++) {
      if (lines[i]) {
        originalLines.push({ code: lines[i], isError: origpos.line - 1 === i });
      }
    }

    result.originalLines = originalLines;
  }

  return result;
};
