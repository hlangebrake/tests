from pathlib import Path
import re,json
ROOT=Path(__file__).resolve().parents[1]
def bundle():
 modules=[]
 for name in ['engine','content','terrain','lessons','math','state','world','ui','app']:
  src=(ROOT/f'js/{name}.js').read_text()
  reexports=re.findall(r"export\s*\{([^}]+)\}\s*from\s*['\"]\./[^'\"]+['\"];?",src)
  src=re.sub(r"export\s*\{[^}]+\}\s*from\s*['\"]\./[^'\"]+['\"];?",'',src)
  exports=re.findall(r'export\s+(?:const|let|class|function)\s+(\w+)',src)
  for group in reexports: exports.extend(x.strip() for x in group.split(','))
  src=re.sub(r"import\s*\{([^}]+)\}\s*from\s*['\"]\./([^'\"]+)\.js['\"];?",lambda m:'const {'+m[1].replace(' as ',':')+'} = __modules['+json.dumps(m[2])+'];',src)
  src=re.sub(r'\bexport\s+(?=const|let|class|function)','',src)
  src=src.replace('import.meta.url',"'http://127.0.0.1:8765/js/app.js'")
  src=src.replace("new URLSearchParams(location.search).get('debug')==='1'",'true')
  modules.append('__modules['+json.dumps(name)+'] = (()=>{\n'+src+'\nreturn {'+','.join(exports)+'};})();')
 return 'const __modules = {};\n'+ '\n'.join(modules)+'\nwindow.__testModules=__modules;'
async def load(page,state=None):
 html=(ROOT/'index.html').read_text()
 html=re.sub(r'<script type="module">.*?</script>','',html,flags=re.S)
 html=re.sub(r'<link\b[^>]*>','',html)
 html=html.replace('</head>','<style>'+ (ROOT/'styles.css').read_text()+'</style></head>')
 await page.set_content(html,wait_until='domcontentloaded')
 await page.evaluate('''() => { const data = new Map(); Object.defineProperty(window,'localStorage',{value:{getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k),clear:()=>data.clear()}, configurable:true}); }''')
 if state:await page.evaluate('(s)=>localStorage.setItem("kommaland:v1:",JSON.stringify(s))',state)
 await page.evaluate(bundle())
 await page.wait_for_timeout(900)
