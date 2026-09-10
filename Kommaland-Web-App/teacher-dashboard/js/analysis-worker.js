import {TeacherDB} from './database.js';
import {report} from './report.js';
self.onmessage=async({data})=>{const db=new TeacherDB(data.databaseName);try{const result=await report(db,data.options);postMessage({id:data.id,result});}catch(e){postMessage({id:data.id,error:e.message});}finally{try{(await db.ready).close();}catch{}}};
