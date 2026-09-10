import {writeFileSync} from 'node:fs';
import {QUESTS, REGIONS} from '../js/content.js';
import {lessonById} from '../js/lessons.js';
import {taskIdFor} from '../teacher-dashboard/shared/save-schema.js';
const catalog={version:'kommaland-content-4.1',topics:REGIONS.map(r=>({topicId:r.id,title:r.topic,place:r.name})),quests:QUESTS.map(q=>({questId:q.id,topicId:q.region,title:q.title,kind:q.challenge?'challenge':'regular'})),tasks:QUESTS.flatMap(q=>q.tasks.map((t,i)=>({taskId:taskIdFor(q,i),questId:q.id,topicId:q.region,skillId:t.lesson||'other',skillTitle:lessonById(t.lesson)?.title||'Wiederholen',type:t.type,title:t.text}))) };
writeFileSync(new URL('../teacher-dashboard/shared/catalog.js',import.meta.url),'// Generated from existing content; NO answers. Run node tools/build-catalog.mjs after content changes.\nexport const CATALOG = '+JSON.stringify(catalog,null,2)+';\n');
