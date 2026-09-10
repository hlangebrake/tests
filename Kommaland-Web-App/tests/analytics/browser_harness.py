"""TEST ONLY. Policy-constrained Chromium cannot navigate to HTTP or file URLs here.
Render source modules with set_content, emulate IndexedDB and localStorage in memory.
No real persistence, worker, Service Worker, iPad or Safari claim is made.
"""
from pathlib import Path
import re,json
ROOT=Path(__file__).resolve().parents[2]
IMPORT=re.compile(r'(^|\n)\s*import\s+\{([^}]+)\}\s*from\s*[\'"]([^\'"]+)[\'"];?',re.M)
SIDE=re.compile(r'(^|\n)\s*import\s*[\'"]([^\'"]+)[\'"];?',re.M)
REEXPORT=re.compile(r'export\s*\{([^}]+)\}\s*from\s*[\'"]([^\'"]+)[\'"];?')
def bundle(entry):
 modules=[];seen=set()
 def walk(path):
  path=path.resolve();key=str(path.relative_to(ROOT));
  if key in seen:return
  seen.add(key);src=path.read_text()
  imports=list(IMPORT.finditer(src));reexports=list(REEXPORT.finditer(src))
  for m in imports:walk(path.parent/m[3])
  for m in reexports:walk(path.parent/m[2])
  exports={n:n for n in re.findall(r'export\s+(?:async\s+)?(?:const|let|class|function\*?)\s+(\w+)',src)}
  def imp(m):
   dep=str((path.parent/m[3]).resolve().relative_to(ROOT));return '\nconst {'+re.sub(r'\s+as\s+',':',m[2])+'}=__modules['+json.dumps(dep)+'];'
  src=IMPORT.sub(imp,src)
  def reexp(m):
   dep=str((path.parent/m[2]).resolve().relative_to(ROOT))
   for n in m[1].split(','):exports[n.strip()]=n.strip()+':__modules['+json.dumps(dep)+'].'+n.strip()
   return ''
  src=REEXPORT.sub(reexp,src);src=SIDE.sub('',src)
  src=re.sub(r'\bexport\s+(?=(?:async\s+)?(?:const|let|class|function))','',src)
  src=src.replace('import.meta.url',json.dumps('https://kommaland.local/'+key))
  src=src.replace("new URLSearchParams(location.search).get('debug')==='1'",'true')
  modules.append('__modules['+json.dumps(key)+']=(()=>{\n'+src+'\nreturn {'+','.join(exports.values())+'};})();')
 walk(ROOT/entry)
 return 'window.__modules={};\n'+ '\n'.join(modules)
async def prepare(page,student=False,state=None,seed=None):
 html=(ROOT/('index.html' if student else 'teacher-dashboard/index.html')).read_text()
 html=re.sub(r'<script\b[^>]*>.*?</script>','',html,flags=re.S)
 html=re.sub(r'<link\b[^>]*>','',html)
 html=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]*>','',html)
 css=(ROOT/('styles.css' if student else 'teacher-dashboard/css/styles.css')).read_text()
 html=html.replace('</head>','<style>'+css+'</style></head>')
 await page.set_content(html,wait_until='domcontentloaded')
 await page.evaluate('''()=>{const data=new Map();Object.defineProperty(window,'localStorage',{value:{getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k),clear:()=>data.clear()},configurable:true});window.__localData=data;Object.defineProperty(window,'Worker',{value:undefined,configurable:true});}''')
 fake=(ROOT/'tests/analytics/memory-idb.js').read_text().replace('export function','function')
 await page.evaluate(fake+'\nwindow.__testDB=installMemoryIDB(globalThis,'+json.dumps(seed or [])+');')
 if state:await page.evaluate('(s)=>localStorage.setItem("kommaland:v1:",JSON.stringify(s))',state)
 await page.evaluate((ROOT/'teacher-dashboard/vendor/jszip.min.js').read_text())
 await page.evaluate(bundle('js/app.js' if student else 'teacher-dashboard/js/app.js'))
 await page.wait_for_timeout(1000 if student else 300)
