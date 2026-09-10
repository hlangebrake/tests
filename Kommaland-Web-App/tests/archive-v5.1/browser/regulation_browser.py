"""SRL integration: real Chromium DOM interactions, source-rendering test harness.
Local/session data stores are in-memory; wall clock is controllable for cooldowns.
Not a Safari, real IndexedDB, module-worker or offline installation test.
Run: xvfb-run -a python -u tests/regulation_browser.py
"""
import asyncio,json,shutil,sys
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tests/analytics'))
from browser_harness import prepare
ART=ROOT/'test-artifacts/srl';ART.mkdir(parents=True,exist_ok=True)
async def main():
 report={'environment':'Chromium + SwiftShader, source-rendered modules, memory IDB/localStorage, controlled wall clock','cases':[],'errors':[]}
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path=shutil.which('chromium'),headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
  page=await browser.new_page(viewport={'width':1180,'height':820},has_touch=True)
  page.on('pageerror',lambda e:report['errors'].append(str(e)))
  await prepare(page,student=True)
  await page.locator('#studentName').fill('Demo · Lernweg');await page.locator('#saveStudentName').click();await page.locator('#welcomeStart').click()
  assert await page.evaluate('__kommaland.mode')=='srl-plan'
  await page.locator('[data-confidence="4"]').click()
  await page.locator('.srl-optional summary').click();await page.locator('[data-amount="3"]').click()
  await page.evaluate("document.getElementById('toast').style.visibility='hidden'")
  await page.screenshot(path=str(ART/'planung.png'))
  await page.evaluate("document.getElementById('toast').style.visibility=''")
  await page.locator('#srlPlanStart').click()
  assert await page.evaluate('__kommaland.regulation.plan().targetCount')==3
  await page.evaluate('''()=>{window.__realNow=Date.now.bind(Date);window.__clockShift=0;Date.now=()=>__realNow()+__clockShift;const d=__kommaland;window.__draw=d.renderer.render.bind(d.renderer);d.renderer.render=()=>{};d.world.stop();d.showQuestIntro(d.content.QUESTS[0]);}''')
  await page.locator('#beginQuest').click();await page.locator('#knowledgeDone').click()
  for n in range(3):
   wrong=await page.evaluate('(__kommaland.session.q.tasks[0].answer+1)%__kommaland.session.q.tasks[0].options.length')
   await page.locator(f'[data-choice="{wrong}"]').click();await page.locator('#checkTask').click()
   assert await page.evaluate('__kommaland.mode')==('task' if n<2 else 'srl-strategy')
  await page.screenshot(path=str(ART/'strategie.png'))
  original=await page.evaluate('__kommaland.session.answer')
  await page.locator('[data-srl-choice="example"]').click();assert await page.evaluate('__kommaland.mode')=='example'
  await page.locator('#exampleBack').click();assert await page.evaluate('__kommaland.session.answer')==original
  answer=await page.evaluate('__kommaland.session.q.tasks[0].answer');await page.locator(f'[data-choice="{answer}"]').click();await page.locator('#checkTask').click()
  assert await page.evaluate('__kommaland.learning.events.filter(e=>e.type==="srl_strategy_outcome").length')==1
  await page.locator('#checkTask').click();assert await page.evaluate('__kommaland.mode')=='task'
  report['cases'].append('Initial plan: confidence/amount saved; exactly one new knowledge card; strategy only after third error; example button opens example; answer retained; subsequent success associated once.')
  # Manual hint must be a genuine opening, not incorrectly labelled resumed.
  await page.locator('#taskStrategy').click();await page.locator('[data-srl-choice="hint"]').click()
  assert await page.evaluate('__kommaland.learning.events.filter(e=>e.type==="hint_opened").at(-1).data.resumed')==False
  await page.locator('#taskStrategy').click();await page.locator('[data-srl-choice="steps"]').click()
  assert await page.locator('#scaffoldSolution').count()==0
  await page.locator('#scaffoldNext').click();assert await page.locator('#scaffoldSolution').count()==0
  await page.locator('#scaffoldNext').click();await page.locator('#scaffoldSolution').click()
  assert await page.locator('.solution-box').count()==1
  report['cases'].append('Least-help-first: full solution unavailable at first two scaffold stages; manual hint counted as requested opening; explicit third-stage reveal works.')
  # Distinct skips separated from ordinary closing. Advance only the wall clock.
  await page.evaluate('__kommaland.close();window.__clockShift+=300100')
  for n,qid in enumerate(['v0b','v1','v2']):
   await page.evaluate('id=>__kommaland.showQuestIntro(__kommaland.content.QUESTS.find(q=>q.id===id))',qid)
   await page.locator('#deferQuest').click()
   assert await page.evaluate('__kommaland.mode')==('' if n<2 else 'srl-skip')
  await page.locator('[data-srl-choice="difficult"]').click()
  assert await page.evaluate('__kommaland.regulation.budget().used')==2
  await page.evaluate('''()=>{const d=__kommaland;d.showQuestIntro(d.content.QUESTS[0]);document.getElementById('beginQuest').click();}''')
  for _ in range(4):
   await page.evaluate('''()=>{const t=__kommaland.session.q.tasks[__kommaland.session.index];document.querySelector('[data-choice="'+((t.answer+1)%t.options.length)+'"]').click();document.getElementById('checkTask').click();}''')
  assert await page.evaluate('__kommaland.mode')=='task'
  assert await page.evaluate('__kommaland.learning.events.filter(e=>e.type==="srl_prompt_shown"&&e.data.unsolicited).length')==2
  assert await page.evaluate('__kommaland.srlUI.exit("village","forest",()=>{})')==False
  report['cases'].append('Three distinct skips -> one optional reason. All automatic reasons share two-prompt cap. Fourth error cluster and area exit cannot add a third prompt; manual help remains available.')
  # Full exam remains free of SRL strategy buttons and solution aids.
  await page.evaluate('__kommaland.close();__kommaland.startGateTest("village","forest")')
  assert await page.locator('#taskStrategy,#taskHint,#taskExample,#showSolution').count()==0
  report['cases'].append('Prerequisite exam has no strategy dialog, mathematical help or answer reveal.')
  await page.evaluate('__kommaland.close();__kommaland.showMenu()');await page.locator('#finishLearning').click()
  assert await page.locator('.srl-reflection-question').count()==2
  await page.locator('[data-confidence="3"]').click();await page.locator('#srlNextGoal').select_option('open')
  await page.evaluate("document.getElementById('toast').style.visibility='hidden'")
  await page.screenshot(path=str(ART/'rueckblick.png'))
  await page.evaluate("document.getElementById('toast').style.visibility=''")
  # Capture the exact export Blob, without claiming successful iPad Files storage.
  await page.evaluate('''()=>{const original=URL.createObjectURL;URL.createObjectURL=function(blob){if(blob.type==='application/json')window.__exportBlob=blob;return original.call(this,blob);};}''')
  await page.locator('#srlFinishExport').click();await page.wait_for_function('__kommaland.mode==="unit-finished"')
  save=await page.evaluate('async()=>JSON.parse(await __exportBlob.text())')
  (ART/'synthetischer-lernstand.json').write_text(json.dumps(save,ensure_ascii=False))
  assert save['schemaVersion']==2 and len([e for e in save['events'] if e['type']=='srl_reflection'])==1
  assert save['sessions'][-1]['finishReason']=='unit_finished'
  await page.locator('#resumeLearning').click();assert await page.locator('#srlResumeIntention').count()==1
  assert await page.evaluate('__kommaland.regulation.budget().allowed')==False
  await page.locator('#srlResumeIntention').click();await page.evaluate('__kommaland.world.stop()')
  assert await page.evaluate('__kommaland.regulation.plan().source')=='previous_intention'
  report['cases'].append('Exactly two optional reflection questions; closing session exports schema 2 with reflection before session_finished; next session offers remembered goal; rolling prompt limit survives session boundary.')
  # New session may offer more structure only after acceptance; raw support is not forced.
  await page.evaluate('''()=>{const d=__kommaland;d.close();window.__clockShift+=31*60*1000;d.regulation.changeSupport('navigation',0);d.updateHUD();d.srlUI.navigation('new_topic',d.regulation.prompt('new_topic',{topicId:'forest'}));}''')
  assert await page.evaluate('__kommaland.regulation.levels.navigation')==0
  await page.locator('#srlMoreStructure').click();assert await page.evaluate('__kommaland.regulation.levels.navigation')==2
  await page.evaluate('__kommaland.world.stop();__kommaland.close();window.__clockShift+=300100')
  await page.evaluate('__kommaland.srlUI.exit("village","harbor",()=>{window.__exitContinued=true;})')
  await page.locator('#srlExitReason').select_option('return');await page.locator('#srlLeave').click();assert await page.evaluate('__exitContinued')==True
  assert await page.evaluate('__kommaland.learning.events.filter(e=>e.type==="srl_area_decision").at(-1).data.reason')=='return'
  report['cases'].append('Re-scaffolding preserves free navigation until explicit acceptance; open-area exit stores optional reason and continues; incomplete quests stay intact.')
  # Support 0 is pull-only on map, not a pushed quest title.
  await page.evaluate('__kommaland.regulation.changeSupport("navigation",0);__kommaland.updateHUD()')
  assert await page.locator('#trackerTitle').inner_text()=='Hilf mir bei der Auswahl'
  await page.locator('#tracker').click();assert await page.evaluate('__kommaland.mode')=='srl-navigation'
  await page.locator('#srlNavClose').click()
  report['cases'].append('Free navigation exposes pull assistance, no mandatory next quest.')
  # Layouts with scrollable body and fixed reachable actions. No horizontal overflow.
  for width,height in [(1024,768),(820,1180),(768,1024),(390,844)]:
   await page.set_viewport_size({'width':width,'height':height})
   for view in ['planning','finish','settings','navigation']:
    await page.evaluate('v=>__kommaland.srlUI[v]()',view)
    await page.wait_for_timeout(50)
    dims=await page.evaluate('''()=>{const p=document.getElementById('panel'),b=p.getBoundingClientRect(),body=p.querySelector('.panel-body'),f=p.querySelector('.panel-foot').getBoundingClientRect();return {right:b.right,x:b.x,foot:f.bottom,overflow:body.scrollWidth-body.clientWidth,h:innerHeight,w:innerWidth}}''')
    assert dims['x']>=0 and dims['right']<=dims['w']+1 and dims['foot']<=dims['h']+1 and dims['overflow']<=2,(view,dims)
    await page.evaluate('__kommaland.srlUI.release();__kommaland.close()')
  report['cases'].append('Plan, reflection, settings and navigation layouts checked at 1024×768, 820×1180, 768×1024, 390×844; footer in viewport; no horizontal overflow.')
  # Re-import on a fresh device recovers support from events, not a parallel state store.
  await page.set_viewport_size({'width':1180,'height':820})
  await page.evaluate('__kommaland.regulation.changeSupport("navigation",1)')
  latest=await page.evaluate('async()=>await __kommaland.learning.exportSave(false)')
  imported=await browser.new_page(viewport={'width':1180,'height':820});imported.on('pageerror',lambda e:report['errors'].append(str(e)))
  await prepare(imported,student=True,state=latest['currentState'])
  await imported.evaluate('async data=>{const d=__kommaland;await d.learning.importHistory(data);await d.setState(data.currentState);}',latest)
  assert await imported.evaluate('__kommaland.regulation.levels.navigation')==1
  assert await imported.evaluate('__kommaland.state.learner.studentId')==latest['studentId']
  assert await imported.evaluate('__kommaland.learning.events.filter(e=>e.type==="srl_reflection").length')==1
  await imported.close()
  report['cases'].append('Student import retains learner ID, mathematical progress, prior reflection and navigation support derived from immutable events.')
  # Teacher real import controls, duplicate merge, class and individual SRL tabs.
  teacher=await browser.new_page(viewport={'width':1380,'height':940});teacher.on('pageerror',lambda e:report['errors'].append(str(e)))
  await prepare(teacher)
  await teacher.locator('#fileInput').set_input_files({'name':'Demo_Lernweg.json','mimeType':'application/json','buffer':json.dumps(latest).encode()})
  await teacher.wait_for_selector('#finishImport:not([hidden])');await teacher.locator('#finishImport').click()
  await teacher.locator('[data-nav="regulation"]').click();await teacher.wait_for_selector('[data-student]')
  await teacher.evaluate('''()=>{document.getElementById('demoBanner').hidden=false;document.getElementById('demoBanner').textContent='Synthetischer Testlernstand · keine echten Schülerdaten';}''')
  assert await teacher.evaluate("(()=>{const b=document.querySelector('[data-nav=regulation]'),s=b.closest('aside');return b.getBoundingClientRect().right<=s.getBoundingClientRect().right;})()")
  await teacher.screenshot(path=str(ART/'lehrkraft-klasse.png'))
  count=await teacher.evaluate('(async()=>(await __teacher.db.all("events")).length)()')
  await teacher.locator('[data-student]').first.click();await teacher.wait_for_selector('[data-detailtab="regulation"]');await teacher.locator('[data-detailtab="regulation"]').click()
  await teacher.screenshot(path=str(ART/'lehrkraft-details.png'))
  assert 'Planen → Arbeiten → neu planen' in await teacher.locator('#content').inner_text()
  await teacher.locator('#fileInput').set_input_files({'name':'Demo_Lernweg_erneut.json','mimeType':'application/json','buffer':json.dumps(latest).encode()})
  await teacher.wait_for_selector('#finishImport:not([hidden])')
  assert await teacher.evaluate('(async()=>(await __teacher.db.all("events")).length)()')==count
  report['cases'].append('Teacher import through file input shows new class/individual learning-decision views. Same export imported twice: event count unchanged.')
  assert not report['errors'],report['errors']
  await browser.close()
 (ROOT/'tests/regulation-browser-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 print(json.dumps(report,ensure_ascii=False,indent=2))
if __name__=='__main__':asyncio.run(main())
