import {TeacherDB} from './database.js';
import {importFiles} from './importer.js';
self.onmessage=async({data})=>{
 try{const db=new TeacherDB(data.databaseName);const result=await importFiles(data.files,db,p=>postMessage({type:'progress',progress:p}));postMessage({type:'done',result});}
 catch(error){postMessage({type:'error',message:error.message||'Import fehlgeschlagen.'});}
};
