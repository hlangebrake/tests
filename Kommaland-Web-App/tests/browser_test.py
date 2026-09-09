"""UI regression suite. Run: xvfb-run -a python tests/browser_test.py.
Managed-browser-safe offline harness, real DOM/WebGL, memory-backed storage.
Not a substitute for a physical Safari/iPad, installation or offline restart test.
"""
import asyncio,json,os,shutil
from pathlib import Path
from playwright.async_api import async_playwright
from browser_harness import load
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'test-artifacts';OUT.mkdir(exist_ok=True)

ANSWER_JS='''() => {
 const a=__kommaland,s=a.session,t=s.q.tasks[s.index];
 if(t.type==='number')for(const k of String(t.answer).replace('.',','))document.querySelector(`[data-key="${k}"]`).click();
 if(t.type==='choice')document.querySelector(`[data-choice="${t.answer}"]`).click();
 if(t.type==='multi')for(const i of t.answer)document.querySelector(`[data-choice="${i}"]`).click();
 if(t.type==='order')for(const i of t.answer)document.querySelector(`[data-order="${i}"]`).click();
 if(t.type==='classify')t.answer.forEach((c,r)=>document.querySelector(`[data-row="${r}"][data-category="${c}"]`).click());
 if(t.type==='line'){const input=document.getElementById('lineRange');input.value=Math.round((Number(t.answer)-t.start)/t.step);input.dispatchEvent(new Event('input',{bubbles:true}));}
 if(document.getElementById('checkTask').disabled)throw new Error('Disabled answer '+s.q.id+':'+s.index);
 document.getElementById('checkTask').click();if(!a.session.solved)throw new Error('Wrong '+s.q.id+':'+s.index+':'+s.answer);
}'''

async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium'),headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
  page=await browser.new_page(viewport={'width':1180,'height':820},device_scale_factor=1,has_touch=True,accept_downloads=True)
  page.set_default_timeout(10000)
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  print('LOADING',flush=True);await load(page);print('LOADED',flush=True);await page.wait_for_function('window.__kommaland');await page.click('#welcomeStart')
  await page.wait_for_timeout(600);await page.screenshot(path=str(OUT/'landscape.png'))
  # A genuine pointer click and navigation into the first quest.
  await page.click('[data-object="v0a"]');await page.wait_for_selector('#beginQuest',timeout=30000)
  assert await page.locator('#panelTitle').inner_text()=='Eine Laterne in der Mitte'
  await page.click('#beginQuest');assert await page.evaluate('__kommaland.mode')=='lesson'
  await page.screenshot(path=str(OUT/'first-lesson.png'))
  await page.click('#knowledgeExample');assert await page.locator('.worked-step:not(.not-yet)').count()==1
  await page.click('#exampleNext');await page.click('#exampleNext');assert await page.locator('.worked-step:not(.not-yet)').count()==3
  await page.screenshot(path=str(OUT/'worked-example.png'))
  await page.click('#exampleNext');assert await page.evaluate('__kommaland.mode')=='lesson'
  await page.click('#knowledgeDone');await page.click('[data-choice="0"]');await page.click('#checkTask')
  print('WRONG FEEDBACK',flush=True);assert await page.locator('.feedback.wrong').count()==1
  await page.click('#taskHint');assert await page.locator('.hint-box').count()==1
  await page.evaluate(ANSWER_JS);await page.click('#checkTask')
  print('FIRST TASK OK',flush=True)
  for index in [1,2]:
   print('FIRST',index,flush=True)
   assert await page.evaluate('__kommaland.mode')=='lesson';await page.click('#knowledgeDone');await page.evaluate(ANSWER_JS)
   if index==1:await page.click('#checkTask')
  assert await page.evaluate('__kommaland.state.progress.v0a.ready && !__kommaland.state.completed.v0a')
  assert await page.evaluate("!__kommaland.world.objects.find(o=>o.id==='v0a').after.visible")
  print('READY',flush=True)
  ready=await page.evaluate('JSON.parse(JSON.stringify(__kommaland.state))')
  # Reload simulation: ready is restored without a second answer or a premature build.
  check=await browser.new_page(viewport={'width':1180,'height':820})
  print('SECOND PAGE',flush=True);await load(check,ready);print('SECOND LOADED',flush=True);await check.evaluate("__kommaland.showQuestIntro(__testModules.content.questById('v0a'))");await check.click('#beginQuest')
  assert await check.evaluate("__kommaland.mode==='task'&&__kommaland.session.solved&&!__kommaland.state.completed.v0a")
  assert await check.evaluate('__kommaland.state.stats.correct')==3
  await check.close();print('RELOAD OK',flush=True);await page.bring_to_front()
  # Full real-time construction at the requested explicit commit point.
  await page.click('#checkTask');assert await page.evaluate('__kommaland.mode')=='build'
  assert await page.locator('#overlay').is_hidden();assert await page.locator('#buildNotice').is_visible()
  assert await page.evaluate('!!__kommaland.state.completed.v0a && !__kommaland.state.progress.v0a')
  await page.wait_for_timeout(800);await page.screenshot(path=str(OUT/'construction.png'))
  await page.wait_for_function("__kommaland.mode==='success'",timeout=30000);await page.click('#backWorld')
  # Reduced-motion setting is changed using the real menu, not by altering quest state.
  await page.click('#menuButton');await page.click('#toggleMotion');await page.click('#menuDone')
  log=['v0a'];tasks=3;formats={'choice'};help_checked=False
  while len(log)<37:
   q=await page.evaluate('''()=>__testModules.content.QUESTS.find(q=>!__kommaland.state.completed[q.id]&&__testModules.content.questUnlocked(q,__kommaland.state.completed))''')
   assert q,'Blocked curriculum'
   qid=q['id']
   await page.evaluate('''id=>{const a=__kommaland;a.close();const o=a.world.objects.find(o=>o.id===id);a.world.teleport(o.x+o.radius+1.1,o.z);a.interact(o);}''',qid)
   await page.wait_for_selector('#beginQuest');await page.click('#beginQuest')
   for index,t in enumerate(q['tasks']):
    assert await page.evaluate('__kommaland.mode')=='lesson',f'No prerequisite card {qid}:{index}'
    await page.click('#knowledgeDone');formats.add(t['type'])
    if t['type']=='number' and not help_checked:
     # Opening either help type must preserve a typed answer and add no attempt.
     await page.click('[data-key="8"]');await page.click('[data-key=","]');await page.click('[data-key="2"]')
     before=await page.evaluate('JSON.stringify(__kommaland.state.stats)')
     await page.click('#taskInfo');await page.click('#knowledgeExample');await page.click('#exampleNext');await page.click('#exampleBack')
     assert await page.evaluate('__kommaland.mode')=='lesson'
     await page.click('#knowledgeDone');assert await page.locator('#numberAnswer').input_value()=='8,2'
     await page.click('#taskExample');await page.click('#exampleNext');await page.click('#exampleNext');await page.click('#exampleNext')
     assert await page.locator('#numberAnswer').input_value()=='8,2'
     assert await page.evaluate('JSON.stringify(__kommaland.state.stats)')==before
     await page.screenshot(path=str(OUT/'task-with-help.png'))
     for _ in range(3):await page.click('[data-key="⌫"]')
     help_checked=True
    await page.evaluate(ANSWER_JS);tasks+=1
    if index==len(q['tasks'])-1:
     assert await page.evaluate('id=>!!__kommaland.state.progress[id]?.ready&&!__kommaland.state.completed[id]',qid)
     assert await page.evaluate("id=>!__kommaland.world.objects.find(o=>o.id===id).after.visible",qid)
    await page.click('#checkTask')
   await page.wait_for_function("__kommaland.mode==='success'",timeout=30000)
   assert await page.evaluate("id=>{const o=__kommaland.world.objects.find(o=>o.id===id);return !!__kommaland.state.completed[id]&&o.after.visible&&!o.before.visible&&!__kommaland.world.building;}",qid)
   log.append(qid);print('QUEST',qid,len(log),flush=True)
   await page.click('#backWorld')
  assert tasks==122;assert len(formats)==6
  result=await page.evaluate('''()=>{__testModules.state.validateState(__kommaland.state);return {completed:Object.keys(__kommaland.state.completed).length,stats:__kommaland.state.stats,glError:__kommaland.renderer.gl.getError()};}''')
  result.update({'tasks':tasks,'order':log,'formats':sorted(formats)})
  await page.screenshot(path=str(OUT/'castle.png'))
  # Task / knowledge / example / map layouts across tablet viewports, including large text.
  layouts=[]
  for width,height in [(1180,820),(1024,768),(768,1024),(820,1180)]:
   await page.set_viewport_size({'width':width,'height':height});await page.wait_for_timeout(120)
   await page.click('#menuButton')
   if not await page.evaluate('__kommaland.state.settings.largeText'):await page.click('#toggleText')
   await page.click('#menuDone')
   await page.evaluate("__kommaland.showQuestIntro(__testModules.content.questById('m2'))");await page.click('#beginQuest')
   for panel,nextbutton in [('lesson','#knowledgeExample'),('example','#exampleBack'),('lesson','#knowledgeDone'),('task',None)]:
    m=await page.evaluate('''()=>{const r=document.getElementById('panel').getBoundingClientRect(),body=document.querySelector('.panel-body');return {mode:__kommaland.mode,w:innerWidth,h:innerHeight,panel:{x:r.x,y:r.y,w:r.width,h:r.height},overflowX:document.documentElement.scrollWidth>innerWidth,bodyOverflowX:body.scrollWidth>body.clientWidth+1,footerFits:document.querySelector('.panel-foot').getBoundingClientRect().bottom<=innerHeight};}''')
    assert not m['overflowX'] and not m['bodyOverflowX'] and m['footerFits'],m
    assert m['panel']['y']>=0 and m['panel']['y']+m['panel']['h']<=height+1,m
    layouts.append(m)
    if panel=='task' and width==768:await page.screenshot(path=str(OUT/'portrait-task.png'))
    if nextbutton:await page.click(nextbutton)
   await page.evaluate("__kommaland.showMap('village')")
   m=await page.evaluate('''()=>({mode:__kommaland.mode,w:innerWidth,h:innerHeight,overflowX:document.documentElement.scrollWidth>innerWidth,footerFits:document.getElementById('walkInfo').getBoundingClientRect().bottom<=innerHeight})''')
   assert not m['overflowX'] and m['footerFits'];layouts.append(m)
   if width==1180:await page.screenshot(path=str(OUT/'map.png'))
   await page.click('#closePanel')
  # Export really creates a JSON file; corrupt import cannot erase the game.
  await page.click('#menuButton')
  async with page.expect_download() as dl:await page.click('#exportSave')
  downloaded=await dl.value;dest=OUT/'exported-save.json';await downloaded.save_as(dest)
  exported=json.loads(dest.read_text());assert len(exported['completed'])==37;assert exported['schemaVersion']==2
  await page.locator('#importFile').set_input_files({'name':'broken.json','mimeType':'application/json','buffer':b'{bad'})
  await page.wait_for_timeout(100);assert await page.evaluate('Object.keys(__kommaland.state.completed).length')==37
  raw=await page.evaluate('JSON.stringify(__testModules.state.defaultState())')
  await page.locator('#importFile').set_input_files({'name':'new.json','mimeType':'application/json','buffer':raw.encode()})
  await page.wait_for_selector('#confirmAction');assert await page.evaluate('Object.keys(__kommaland.state.completed).length')==37
  await page.click('#confirmAction');assert await page.evaluate('Object.keys(__kommaland.state.completed).length')==0
  await page.click('#menuButton');await page.click('#previousSave');await page.click('#confirmAction')
  assert await page.evaluate('Object.keys(__kommaland.state.completed).length')==37
  # Legacy import is explicit about restarted partial tasks and preserves old buildings.
  old=json.loads(raw);old['schemaVersion']=1;old['tutorial']=True;old['completed']={'v1':{'mistakes':0,'hints':0,'at':old['createdAt']}};old['progress']={'v2':{'step':1,'mistakes':0,'hints':0}}
  await page.click('#menuButton');await page.locator('#importFile').set_input_files({'name':'old.json','mimeType':'application/json','buffer':json.dumps(old).encode()})
  await page.wait_for_selector('#confirmAction');assert 'Version 1' in await page.locator('.confirm-text').inner_text()
  await page.click('#confirmAction');assert await page.evaluate("!!__kommaland.state.completed.v1&&!__kommaland.state.completed.v0a&&Object.keys(__kommaland.state.progress).length===0&&__kommaland.state.activeQuest==='v0a'")
  await page.click('#menuButton');await page.click('#previousSave');await page.click('#confirmAction')
  assert await page.evaluate('Object.keys(__kommaland.state.completed).length')==37
  await page.evaluate("__kommaland.showQuestIntro(__testModules.content.questById('v1'))");await page.click('#beginQuest')
  assert await page.evaluate('__kommaland.session.replay');await page.evaluate('__kommaland.close();__kommaland.encounter()');await page.click('#skipEncounter')
  assert await page.evaluate('__kommaland.mode')==''
  await page.set_viewport_size({'width':1180,'height':820});await page.evaluate('__kommaland.world.teleport(0,30)');await page.wait_for_timeout(700)
  await page.screenshot(path=str(OUT/'completed-village.png'))
  assert not errors,errors;assert result['glError']==0
  report={'playthrough':result,'layouts':layouts,'errors':errors,'firstQuest':'actual pointer navigation, wrong-answer feedback, ready reload, explicit commit, real-time 2.65s build','remainingBuilds':'reduced-motion setting (0.25s)','help':'stepwise example; nested knowledge/example return; typed input preserved; no extra attempts','save':'JSON download, corrupt import preserved, valid import confirmed, rollback, schema-1 migration','environment':f'{browser.version}; headed Chromium/Xvfb, WebGL SwiftShader; offline module harness; memory-backed localStorage substitute'}
  (OUT/'browser-results.json').write_text(json.dumps(report,indent=2,ensure_ascii=False));(ROOT/'tests/browser-results.json').write_text(json.dumps(report,indent=2,ensure_ascii=False))
  print('PASS',json.dumps(result,ensure_ascii=False),flush=True);await browser.close()
asyncio.run(main())
