/** Static release check; does not replace an HTTP/Safari/Service Worker device test. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {QUESTS} from '../js/content.js';
import {LESSONS} from '../js/lessons.js';
import {APP_VERSION} from '../teacher-dashboard/shared/save-schema.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
assert.equal(pkg.version,APP_VERSION);
const files=['sw.js',...fs.readdirSync(path.join(root,'js')).filter(n=>n.endsWith('.js')).map(n=>'js/'+n),...fs.readdirSync(path.join(root,'tools')).filter(n=>n.endsWith('.mjs')).map(n=>'tools/'+n)];
let imports=0;
for(const file of files){
 execFileSync(process.execPath,['--check',path.join(root,file)],{stdio:'pipe'});
 const text=fs.readFileSync(path.join(root,file),'utf8');
 for(const m of text.matchAll(/(?:from\s*|import\s*\(\s*)['"](\.[^'"]+)['"]/g)){
  assert.ok(fs.existsSync(path.resolve(root,path.dirname(file),m[1])),file+' → '+m[1]);imports++;
 }
}
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
assert.ok(sw.includes("CACHE_PREFIX+'v"+APP_VERSION+"'"));
const cacheFiles=JSON.parse(sw.match(/const FILES=(\[[^;]+\]);/)[1].replaceAll("'",'"'));
for(const name of cacheFiles)assert.ok(fs.existsSync(path.join(root,name==='./'?'index.html':name)),name);
const runtimeCount=fs.readdirSync(path.join(root,'js')).filter(n=>n.endsWith('.js')).length;
for(const required of ['./js/learning-flow.js','./js/quest-models.js'])assert.ok(cacheFiles.includes(required));
const lock=JSON.parse(fs.readFileSync(path.join(root,'tests/content-lock.json'),'utf8'));
for(const [name,expected] of Object.entries(lock)){
 const file=path.join(root,name);assert.equal(createHash('sha256').update(fs.readFileSync(file)).digest('hex'),expected,name);
}
const verification=fs.readFileSync(path.join(root,'tests/VERIFIKATION-5.2.txt'),'utf8');
assert.match(verification,/Gesamt: 176 PASS, 0 FAIL/);
assert.match(verification,/Schüler-App: PASS; keine pageerrors/);
assert.match(verification,/Lehrkräfte-Dashboard: PASS; keine pageerrors/);
const nodeCount=176;
const result={version:pkg.version,syntaxCheckedFiles:files.length,relativeModuleImportsChecked:imports,javascriptRuntimeModules:runtimeCount,serviceWorkerFileEntries:cacheFiles.length,quests:QUESTS.length,tasks:QUESTS.reduce((n,q)=>n+q.tasks.length,0),lessons:Object.keys(LESSONS).length,modelTypes:new Set(QUESTS.map(q=>q.kind)).size,nodeTests:nodeCount,browserBootSmokesWithoutPageErrors:2,contentLocks:'pass',status:'pass',limits:'Static checks, 176 Node tests and Chromium/Xvfb boot smokes; no complete 5.2 browser E2E, physical iPad/Safari or real offline installation test.'};
fs.writeFileSync(path.join(root,'tests/release-check.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
