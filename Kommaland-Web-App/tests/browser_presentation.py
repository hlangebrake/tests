"""Presentation integration tests on the actual DOM and local WebGL renderer.
Uses the documented in-memory source harness, NOT Safari or persistent browser storage.
Run with xvfb-run -a python3 tests/browser_presentation.py.
"""
import asyncio,shutil,json
from pathlib import Path
from playwright.async_api import async_playwright
from browser_harness import load
from browser_actions import FILL_JS
ROOT=Path(__file__).resolve().parents[1];ART=ROOT/'test-artifacts';ART.mkdir(exist_ok=True)
async def main():
 report={'environment':'Chromium/SwiftShader under Xvfb; local source bundle and simulated localStorage','cases':[],'errors':[]}
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path=shutil.which('chromium'),headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
  page=await browser.new_page(viewport={'width':1180,'height':820},has_touch=True)
  page.on('pageerror',lambda e:report['errors'].append(str(e)))
  await load(page);await page.locator('#welcomeStart').click()
  await page.evaluate('() => {window.fillCorrect='+FILL_JS+';}')
  # The nonconsecutive repeated thought in the fountain is the primary regression.
  await page.evaluate('''()=>{const d=__kommaland;d.showQuestIntro(d.content.QUESTS.find(q=>q.id==='v1'));document.getElementById('beginQuest').click();}''')
  assert await page.evaluate('__kommaland.mode')=='lesson'
  assert await page.evaluate('__kommaland.state.progress.v1.shownLessons')==['places-tenths']
  await page.locator('#knowledgeDone').click()
  assert await page.locator('#taskInfo').inner_text()=='Wissen anzeigen'
  # Wrong answers and reading do not produce a partial model.
  await page.evaluate('''()=>{const d=__kommaland,o=d.world.objects.find(o=>o.id==='v1');if(o.visualStage!==0)throw Error('Reading repaired');const t=d.session.q.tasks[0];document.querySelector('[data-choice="'+((t.answer+1)%t.options.length)+'"]').click();document.getElementById('checkTask').click();if(o.visualStage!==0)throw Error('Mistake repaired');}''')
  await page.evaluate('fillCorrect()');await page.locator('#checkTask').click()
  assert await page.evaluate('__kommaland.session.solved')
  assert await page.evaluate('__kommaland.world.objects.find(o=>o.id==="v1").visualStage')==1
  await page.locator('#checkTask').click()
  assert await page.evaluate('__kommaland.mode')=='task'
  # Re-open knowledge and example, then return without losing the current choice.
  await page.evaluate('fillCorrect()')
  answer=await page.evaluate('__kommaland.session.answer')
  await page.locator('#taskInfo').click();await page.locator('#knowledgeExample').click();await page.locator('#exampleBack').click();await page.locator('#knowledgeDone').click()
  assert await page.evaluate('__kommaland.session.answer')==answer
  await page.locator('#checkTask').click();await page.locator('#checkTask').click()
  assert await page.evaluate('__kommaland.mode')=='task'
  await page.evaluate('fillCorrect()');await page.locator('#checkTask').click();await page.locator('#checkTask').click()
  assert await page.evaluate('__kommaland.mode')=='lesson'
  assert await page.evaluate('__kommaland.session.index')==3
  await page.locator('#knowledgeDone').click()
  for _ in range(3):
   await page.evaluate('fillCorrect()');await page.locator('#checkTask').click();await page.locator('#checkTask').click()
  assert await page.evaluate('__kommaland.session.index')==6
  assert await page.evaluate('__kommaland.mode')=='task'
  await page.screenshot(path=str(ART/'wissen-auf-abruf.png'))
  report['cases'].append('Fountain: one introduction per distinct thought; repeated thought at step 7 skipped, new thought at step 4 retained; manual knowledge/example roundtrip preserves answer.')
  # A JSON roundtrip has precisely the same task index and known-lesson set.
  saved=await page.evaluate('JSON.stringify(__kommaland.state)')
  await page.evaluate('''txt=>{const d=__kommaland;d.close();d.setState(__testModules.state.parseSave(txt));d.showQuestIntro(d.content.QUESTS.find(q=>q.id==='v1'));document.getElementById('beginQuest').click();}''',saved)
  assert await page.evaluate('__kommaland.mode')=='task'
  assert await page.evaluate('__kommaland.session.index')==6
  # Resolve the remaining items, but do not confirm the quest yet.
  for i in range(3):
   await page.evaluate('fillCorrect()');await page.locator('#checkTask').click()
   if i<2:await page.locator('#checkTask').click()
  assert await page.evaluate('__kommaland.state.progress.v1.ready')
  assert await page.evaluate('__kommaland.world.objects.find(o=>o.id==="v1").visualStage')==1
  assert not await page.evaluate('!!__kommaland.state.completed.v1')
  saved=await page.evaluate('JSON.stringify(__kommaland.state)')
  await page.evaluate('''txt=>{const d=__kommaland;d.close();d.setState(__testModules.state.parseSave(txt));d.showQuestIntro(d.content.QUESTS.find(q=>q.id==='v1'));document.getElementById('beginQuest').click();}''',saved)
  assert await page.locator('#checkTask').inner_text()=='Quest abschließen'
  await page.locator('#checkTask').click()
  assert await page.evaluate('__kommaland.world.building.source===__kommaland.world.building.object.working')
  await page.wait_for_function('__kommaland.mode==="success"',timeout=20000)
  assert await page.evaluate('__kommaland.world.objects.find(o=>o.id==="v1").models.map(m=>m.visible)')==[False,False,True]
  await page.locator('#backWorld').click()
  report['cases'].append('Mid-quest and ready JSON roundtrips; only explicit completion commits; live animation begins at working model and ends at final model.')
  # Reading at the intro is not followed by the identical automatic introduction.
  await page.evaluate('''()=>{const d=__kommaland;d.showQuestIntro(d.content.QUESTS.find(q=>q.id==='v0a'));}''')
  await page.locator('#introInfo').click();await page.locator('#knowledgeDone').click();await page.locator('#beginQuest').click()
  assert await page.evaluate('__kommaland.mode')=='task'
  assert await page.evaluate('__kommaland.state.progress.v0a.step')==0
  report['cases'].append('Intro preview is not repeated immediately; no solved step or competency awarded.')
  # Real initialization from the exported state in a second isolated page.
  snapshot=await page.evaluate('JSON.parse(JSON.stringify(__kommaland.state))')
  other=await browser.new_page(viewport={'width':1024,'height':768},has_touch=True)
  other.on('pageerror',lambda e:report['errors'].append(str(e)))
  await load(other,snapshot)
  await other.evaluate('''()=>{const d=__kommaland;d.showQuestIntro(d.content.QUESTS.find(q=>q.id==='v0a'));document.getElementById('beginQuest').click();}''')
  assert await other.evaluate('__kommaland.mode')=='task'
  await other.close()
  report['cases'].append('Fresh app initialization from exported schema-3 state preserves introduced knowledge at unsolved step 0 (storage simulated).')
  # Legacy mid-step knowledge and genuinely new step boundary.
  for step,expected in [(2,'task'),(3,'lesson')]:
   await page.evaluate('''step=>{const d=__kommaland,s=__testModules.state.defaultState();s.tutorial=true;s.progress.v0c={step,mistakes:0,hints:0};d.close();d.setState(s);d.showQuestIntro(d.content.QUESTS.find(q=>q.id==='v0c'));document.getElementById('beginQuest').click();}''',step)
   assert await page.evaluate('__kommaland.mode')==expected
  report['cases'].append('Legacy save without new metadata: continued thought skipped at step 2; new hundredths writing introduced at step 3.')
  # A near-duplicate summary is suppressed only when both prerequisite thoughts were introduced.
  introSteps=await page.evaluate('''()=>{const d=__kommaland;d.close();d.setState(__testModules.state.defaultState());const q=d.content.QUESTS.find(q=>q.id==='m2');d.showQuestIntro(q);document.getElementById('beginQuest').click();const steps=[];for(let i=0;i<q.tasks.length;i++){if(d.mode==='lesson'){steps.push(i);document.getElementById('knowledgeDone').click();}fillCorrect();document.getElementById('checkTask').click();if(i<q.tasks.length-1)document.getElementById('checkTask').click();}return steps;}''')
  assert introSteps==[0,3,6,12],introSteps
  report['cases'].append('Rectangle quest: new half/area/decimal-product/factor effects introduced at steps 1/4/7/13; already-covered summary at step 10 skipped.')
  # Knowledge footer remains usable at tablet sizes, both normal and large text.
  layouts=[]
  for width,height in [(1180,820),(1024,768),(820,1180),(768,1024)]:
   await page.set_viewport_size({'width':width,'height':height})
   for large in [False,True]:
    await page.evaluate('''large=>{const d=__kommaland;d.close();d.state.settings.largeText=large;document.documentElement.style.setProperty('--text-scale',large?'1.15':'1');d.showQuestIntro(d.content.QUESTS.find(q=>q.id==='v1'));document.getElementById('beginQuest').click();if(d.mode==='lesson')document.getElementById('knowledgeDone').click();}''',large)
    bounds=await page.evaluate('''()=>{const p=document.getElementById('panel'),f=p.querySelector('.panel-foot'),b=f.getBoundingClientRect(),i=document.getElementById('taskInfo').getBoundingClientRect();return {overflow:p.scrollWidth-p.clientWidth,footer:b.bottom,button:[i.left,i.top,i.right,i.bottom],width:innerWidth,height:innerHeight}}''')
    assert bounds['overflow']<3 and bounds['footer']<=height+1 and bounds['button'][0]>=0 and bounds['button'][2]<=width and bounds['button'][3]<=height,(width,height,large,bounds)
    layouts.append({'size':[width,height],'largeText':large,'status':'pass'})
  report['cases'].append({'footerLayouts':layouts})
  await page.set_viewport_size({'width':1180,'height':820})
  # Screenshots from the live world, fixed normal camera distance in all three states.
  await page.evaluate('''()=>{const d=__kommaland;d.close();d.setState(__testModules.state.defaultState());document.documentElement.style.setProperty('--text-scale','1');d.world.teleport(-1,21);d.world.camera=[-1,1.5,19];}''')
  for stage,name in [(0,'anfang'),(1,'in-arbeit'),(2,'fertig')]:
   await page.evaluate('''stage=>{const d=__kommaland;for(const q of d.content.QUESTS.filter(q=>q.region==='village'&&!q.challenge)){delete d.state.progress[q.id];delete d.state.completed[q.id];if(stage===1)d.state.progress[q.id]={step:1,mistakes:0,hints:0};if(stage===2)d.state.completed[q.id]={mistakes:0,hints:0,at:d.state.createdAt};}d.world.sync(d.state);d.updateHUD();}''',stage)
   await page.wait_for_timeout(650);await page.screenshot(path=str(ART/f'dorf-{name}.png'))
  assert not report['errors'],report['errors']
  await browser.close()
 (ROOT/'tests/browser-presentation-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2))
asyncio.run(main())
