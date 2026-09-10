"""Current-source v6 visual/SRL/import regression; in-memory stores, manually drawn background."""
import asyncio,json,shutil,sys
from pathlib import Path
from playwright.async_api import async_playwright
from browser_harness import load,helper
from content_browser import FILL
ROOT=Path(__file__).resolve().parents[1];ART=ROOT/'test-artifacts/v6';ART.mkdir(parents=True,exist_ok=True)
async def main():
 report={'environment':'Chromium source bundle, SwiftShader manually drawn background, emulated touch and localStorage/IndexedDB; no physical iPad/Safari/native database/offline verification','cases':[],'errors':[]}
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path=shutil.which('chromium'),headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
  page=await browser.new_page(viewport={'width':1180,'height':820},has_touch=True);page.on('pageerror',lambda e:report['errors'].append(str(e)))
  await load(page,freezeRendering=True);await page.evaluate("()=>{document.getElementById('welcomeStart').click();document.getElementById('srlPlanSkip').click();window.fillCorrect="+FILL+";window.__realNow=Date.now.bind(Date);window.__shift=0;Date.now=()=>__realNow()+__shift;}")
  await page.evaluate("()=>{const d=__kommaland;d.showQuestIntro(d.content.QUESTS[0]);document.getElementById('beginQuest').click();document.getElementById('knowledgeDone').click();for(let i=0;i<3;i++){document.getElementById('taskHint').click();document.getElementById('taskHint').click();}}")
  for i in range(3):
   await page.evaluate("()=>{fillCorrect(true);document.getElementById('checkTask').click();}")
   assert await page.evaluate('__kommaland.mode')==('srl-review' if i==2 else 'task')
  assert '3 Tipp-Aufrufe' in await page.locator('.evidence-note').inner_text()
  await page.evaluate("()=>{document.querySelector('[data-review-action=hint]').click();document.getElementById('toast').classList.remove('show');}")
  await page.screenshot(path=str(ART/'strategierueckschau.png'))
  await page.evaluate("document.getElementById('srlReviewNext').click()")
  strategies=await page.locator('[data-srl-choice]').evaluate_all('(els)=>els.map(e=>e.dataset.srlChoice)');assert strategies.index('hint')>strategies.index('example')
  await page.evaluate("document.querySelector('[data-srl-choice=check]').click()")
  assert 'letzter abgegebener Versuch' in await page.locator('.evidence-note').inner_text()
  assert await page.evaluate('__kommaland.regulation.budget().used')==1
  await page.evaluate('()=>{fillCorrect();document.getElementById("checkTask").click();}')
  report['cases'].append('Third repeated error -> optional retrospective then one action; 3 existing hint opens shown; used hint is not the first recommendation; actual last answer is available in RAM; two screens count as one automatic interruption.')
  print('SRL task passed',flush=True)
  # Distinct failed rounds outside an exam, after the common cooldown.
  await page.evaluate("()=>{__kommaland.close();__shift+=300100;__kommaland.startGateTest('village','forest');}")
  for round in range(2):
   assert await page.locator('#taskInfo,#taskExample,#taskHint,#taskStrategy').count()==0
   await page.evaluate("()=>{let n=0;while(__kommaland.mode==='task'&&n++<10){fillCorrect(true);document.getElementById('checkTask').click();}}")
   mode=await page.evaluate('__kommaland.mode');assert mode==('gate-result' if round==0 else 'srl-review'),(round,mode)
   if round==0:await page.evaluate("document.getElementById('retryExam').click()")
  await page.evaluate("document.getElementById('srlReviewNext').click()")
  assert await page.evaluate('__kommaland.mode')=='srl-exam-strategy'
  await page.locator('#srlExamSkill').select_option('c6-fractions')
  await page.evaluate("document.querySelector('[data-srl-choice=knowledge]').click()")
  assert await page.locator('[data-lab]').get_attribute('data-lab')=='c6-fractions'
  assert await page.evaluate('__kommaland.regulation.budget().used')==2
  await page.evaluate("document.getElementById('knowledgeDone').click()")
  assert await page.evaluate('__kommaland.mode')=='gate-result'
  report['cases'].append('Repeated failed 3-item exams prompt only after round 2, no aids during test; chosen fraction prerequisite opens the correct explanation outside test; return restores report; shared cap now two.')
  print('SRL exam passed',flush=True)
  # Audit every actual interactive renderer, including inherited optional cards.
  labs=await page.evaluate(r'''()=>{
   const app=__kommaland,vm=__testModules['visual-models'],v=__testModules.visuals;let changes=0;const rows=[];
   for(const id of Object.keys(vm.LABS)){
    v.clearLabMemory();app.showKnowledge(id);let host=document.querySelector('[data-lab]');if(!host)throw Error('Missing '+id);
    const snap=()=>host.querySelector('.lab-stage').innerHTML+host.querySelector('.lab-output').textContent,initial=snap();let changed=false;
    for(const inp of [...host.querySelectorAll('input[data-lab-field]')])for(const x of [inp.min,inp.max]){const e=host.querySelector('[data-lab-field="'+inp.dataset.labField+'"]');e.value=x;e.dispatchEvent(new Event('input',{bubbles:true}));changed||=snap()!==initial;changes++;}
    for(const sel of [...host.querySelectorAll('select[data-lab-field]')])for(const opt of [...sel.options]){const e=host.querySelector('[data-lab-field="'+sel.dataset.labField+'"]');e.value=opt.value;e.dispatchEvent(new Event('change',{bubbles:true}));changed||=snap()!==initial;changes++;}
    if(!changed)for(const old of [...host.querySelectorAll('[data-lab-action]')].filter(e=>!['reset','select-digit','select-order'].includes(e.dataset.labAction))){const e=[...host.querySelectorAll('[data-lab-action]')].find(e=>e.dataset.labAction===old.dataset.labAction&&e.dataset.value===old.dataset.value);if(e){e.click();changes++;changed||=snap()!==initial;}}
    if(!changed)throw Error('Not interactive '+id);if(/NaN|undefined|Infinity/.test(host.textContent))throw Error('Bad math render '+id);
    host.querySelector('[data-lab-action=reset]').click();if(snap()!==initial)throw Error('Reset '+id);rows.push(id);
   }return {count:rows.length,changes};}''')
  assert labs['count']==107;report['cases'].append({'interactiveKnowledge':labs})
  await page.evaluate("__kommaland.showKnowledge('c6-periodic')");await page.screenshot(path=str(ART/'periodisch.png'))
  await page.evaluate("__kommaland.showKnowledge('c6-place')");assert '12,304' in await page.locator('.lab-output').inner_text();await page.screenshot(path=str(ART/'stellenwerte.png'))
  print('Labs passed',labs,flush=True)
  # Whole table, not step-by-step task confirmations. Select deliberately late task for layout.
  await page.evaluate("()=>{const d=__kommaland;d.close();d.showQuestIntro(d.content.QUESTS.find(q=>q.id==='c6-s1'));document.getElementById('beginQuest').click();if(d.mode==='lesson')document.getElementById('knowledgeDone').click();fillCorrect();document.getElementById('checkTask').click();document.getElementById('checkTask').click();}")
  if await page.evaluate('__kommaland.mode')=='lesson':await page.evaluate("document.getElementById('knowledgeDone').click()")
  for w,h in [(1180,820),(1024,768),(820,1180),(768,1024),(390,844)]:
   await page.set_viewport_size({'width':w,'height':h})
   state=await page.evaluate("()=>{const b=document.querySelector('.panel-body'),f=document.querySelector('.panel-foot');return {overflow:b.scrollWidth-b.clientWidth,footer:f.getBoundingClientRect().bottom,height:innerHeight,fields:[...document.querySelectorAll('[data-work-field]')].map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height}))}}")
   assert state['overflow']<=2 and state['footer']<=h+1,(w,state);assert all(x['w']>=43 and x['h']>=43 for x in state['fields']),(w,state);report['cases'].append({'worksheetLayout':[w,h],**state})
  await page.set_viewport_size({'width':1180,'height':820});await page.screenshot(path=str(ART/'entbuendeln.png'))
  save=await page.evaluate('async()=>__kommaland.learning.exportSave(true)');(ART/'srl-speicherstand.json').write_text(json.dumps(save,ensure_ascii=False))
  assert save['schemaVersion']==3
  assert len([e for e in save['events'] if e['type']=='srl_strategy_review'])==2
  # Full teacher UI imports current export via actual file input; duplicate is idempotent.
  teacher=await browser.new_page(viewport={'width':1280,'height':900});teacher.on('pageerror',lambda e:report['errors'].append(str(e)));await helper.prepare(teacher)
  complete=json.loads((ART/'test-speicherstand.json').read_text())
  await teacher.locator('#fileInput').set_input_files([{'name':'Synthetisch_Arbeitsweg.json','mimeType':'application/json','buffer':json.dumps(save).encode()},{'name':'Synthetisch_Vollstaendig.json','mimeType':'application/json','buffer':json.dumps(complete).encode()}])
  await teacher.wait_for_selector('#finishImport:not([hidden])');await teacher.locator('#finishImport').click()
  count=await teacher.evaluate('(async()=>(await __teacher.db.all("events")).length)()');assert count==len(save['events'])+len(complete['events'])
  await teacher.screenshot(path=str(ART/'lehrkraft.png'))
  await teacher.locator('#fileInput').set_input_files({'name':'Gleicher_Stand.json','mimeType':'application/json','buffer':json.dumps(save).encode()});await teacher.wait_for_selector('#finishImport:not([hidden])')
  assert count==await teacher.evaluate('(async()=>(await __teacher.db.all("events")).length)()');await teacher.locator('#finishImport').click()
  report['cases'].append({'teacherImport':'Two exact student exports imported through file input. Repeated same file: unchanged events. Schema3 with strategy retrospective accepted.','events':count})
  assert not report['errors'],report['errors'];await browser.close()
 (ROOT/'tests/integration6-browser-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2))
if __name__=='__main__':asyncio.run(main())
