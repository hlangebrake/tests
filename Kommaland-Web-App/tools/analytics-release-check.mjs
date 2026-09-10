/** Static release checks: paths, standalone dashboard graph and absence of remote runtime calls. */
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const runtime=[...walk(path.join(root,'js')),...walk(path.join(root,'teacher-dashboard')).filter(f=>f.endsWith('.js')&&!f.includes('/vendor/'))];let imports=0;
for(const file of runtime){const text=fs.readFileSync(file,'utf8');for(const m of text.matchAll(/(?:from\s*|import\s*)['"](\.[^'"]+)['"]/g)){const target=path.resolve(path.dirname(file),m[1]);if(!fs.existsSync(target))throw new Error('Missing import '+target);if(file.includes('/teacher-dashboard/')&&!target.startsWith(path.join(root,'teacher-dashboard')+path.sep))throw new Error('Dashboard depends on parent '+file);imports++;}}
const teacher=walk(path.join(root,'teacher-dashboard/js')).filter(f=>f.endsWith('.js'));
for(const f of teacher){const s=fs.readFileSync(f,'utf8');if(/\b(fetch\s*\(|XMLHttpRequest|sendBeacon\s*\(|WebSocket\s*\()/.test(s))throw new Error('Unexpected network data API '+f);}
const output={runtimeModules:runtime.length,localImportsChecked:imports,standaloneDashboard:true,noRuntimeDataNetworkCalls:true};console.log(output);fs.writeFileSync(path.join(root,'tests/analytics-release-results.json'),JSON.stringify(output,null,2));
