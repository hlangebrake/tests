// Diagnostic workload, not an iPad benchmark. Uses the same in-memory IDB test adapter.
import fs from 'node:fs';
import {installMemoryIDB} from './memory-idb.js';
import {makeDemoSave} from '../../teacher-dashboard/js/demo.js';
import {TeacherDB} from '../../teacher-dashboard/js/database.js';
import {report} from '../../teacher-dashboard/js/report.js';
installMemoryIDB();const db=new TeacherDB('stress:100');let events=0;const begin=performance.now();
for(let i=0;i<100;i++){const s=makeDemoSave(i);events+=s.events.length;await db.merge(s,'synthetic-'+i+'.json');}
const imported=performance.now(),r=await report(db),end=performance.now();
if(r.rows.length!==100)throw new Error('Missing students');
const out={environment:'Node; production modules, in-memory IndexedDB test adapter',students:100,events,importSeconds:+((imported-begin)/1000).toFixed(2),summarySeconds:+((end-imported)/1000).toFixed(2),residentMemoryMiB:Math.round(process.memoryUsage().rss/1048576)};
fs.writeFileSync(new URL('../../test-artifacts/analytics/stress-results.json',import.meta.url),JSON.stringify(out,null,2));console.log(out);
