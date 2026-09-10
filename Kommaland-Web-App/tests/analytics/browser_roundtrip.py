import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
from browser_harness import prepare,ROOT
ART=ROOT/'test-artifacts/analytics'
async def main():
 report={'environment':'Chromium under Xvfb; bundled source and in-memory storage test adapter, no real persistence','errors':[],'checks':[]}
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
  page=await browser.new_page(viewport={'width':1180,'height':820},has_touch=True)
  page.on('pageerror',lambda e:report['errors'].append(str(e)))
  await prepare(page,student=True)
  await page.locator('#studentName').fill('Testperson · Robin');await page.locator('#saveStudentName').click();await page.locator('#welcomeStart').click()
  await page.evaluate('__kommaland.showQuestIntro(__kommaland.content.QUESTS[0])');await page.locator('#beginQuest').click()
  if await page.locator('#knowledgeDone').count():await page.locator('#knowledgeDone').click()
  await page.evaluate("()=>{__kommaland.session.answer='9999';document.querySelector('#checkTask').disabled=false;document.querySelector('#checkTask').click();}")
  await page.locator('#taskHint').click()
  await page.evaluate('__kommaland.learning.lastTick=performance.now()-1000;__kommaland.learning.tick()')
  await page.locator('#closePanel').click()
  await page.evaluate('__kommaland.showMenu()')
  async with page.expect_download() as dl:
   await page.locator('#exportSave').click()
  download=await dl.value;await download.save_as(ART/'robin-erster-export.json')
  first=json.loads((ART/'robin-erster-export.json').read_text())
  assert download.suggested_filename.startswith('Kommaland_Speicherstand_Testperson_Robin_')
  assert first['studentName']=='Testperson · Robin';assert len([e for e in first['events'] if e['type']=='task_attempt'])==1
  report['checks'].append('Actual export button produces JSON with safe student filename')
  # Simulated reload: data persisted by production API is serialized from the TEST adapter.
  await page.evaluate('__kommaland.learning.flush()');seed=await page.evaluate('__testDB.dump()');state=await page.evaluate('__kommaland.state')
  before_id=first['studentId'];before_run=next(e['taskRunId'] for e in first['events'] if e['type']=='task_attempt')
  await page.close();page=await browser.new_page(viewport={'width':1180,'height':820});page.on('pageerror',lambda e:report['errors'].append(str(e)))
  await prepare(page,student=True,state=state,seed=seed)
  assert await page.locator('#studentName').count()==0
  await page.evaluate('__kommaland.showQuestIntro(__kommaland.content.QUESTS[0])');await page.locator('#beginQuest').click()
  if await page.locator('#knowledgeDone').count():await page.locator('#knowledgeDone').click()
  assert await page.evaluate('__kommaland.session.logTaskRunId')==before_run
  await page.evaluate("()=>{const d=__kommaland;d.session.answer=d.session.q.tasks[d.session.index].answer;document.querySelector('#checkTask').disabled=false;document.querySelector('#checkTask').click();}")
  await page.locator('#closePanel').click();await page.evaluate('__kommaland.showMenu()')
  async with page.expect_download() as dl:
   await page.locator('#finishLearning').click()
  download=await dl.value;await download.save_as(ART/'robin-zweiter-export.json');second=json.loads((ART/'robin-zweiter-export.json').read_text())
  assert second['studentId']==before_id
  attempts=[e for e in second['events'] if e['type']=='task_attempt'];assert len(attempts)==2;assert [e['data']['attemptNumber'] for e in attempts]==[1,2];assert second['sessions'][-1]['finishedAt']
  await page.screenshot(path=str(ART/'lerneinheit-abschliessen.png'))
  report['checks'].append('Resume retains identity and taskRunId, second answer is attempt 2; unit finish closes session')
  await page.close()
  # Actual file-input import path (production UI / database adapter).
  page=await browser.new_page(viewport={'width':1440,'height':1000});page.on('pageerror',lambda e:report['errors'].append(str(e)))
  await prepare(page)
  await page.locator('#fileInput').set_input_files([str(ART/'robin-erster-export.json'),str(ART/'robin-zweiter-export.json'),str(ART/'robin-erster-export.json')])
  await page.wait_for_selector('#finishImport:not([hidden])')
  assert '1 vollständig vorhanden' in await page.locator('#importResults').inner_text()
  await page.screenshot(path=str(ART/'importbericht.png'),full_page=True)
  await page.locator('#finishImport').click();await page.wait_for_function('__teacher.report.rows.length===1')
  assert await page.evaluate('__teacher.db.all("events").then(xs=>xs.length)')==len(second['events'])
  await page.locator('#nav [data-nav="students"]').click();await page.wait_for_selector('#learnerTable [data-student]');await page.locator('#learnerTable [data-student]').click();await page.wait_for_selector('.detail-tabs')
  await page.locator('[data-detailtab="quests"]').click();assert await page.locator('.task-detail').count()>=1
  report['checks'].append('UI multi-import older + newer + repeated file yields one student and no duplicate events')
  seed=await page.evaluate('__testDB.dump()');await page.close();page=await browser.new_page(viewport={'width':1440,'height':1000})
  await prepare(page,seed=seed);await page.wait_for_function('__teacher.report.rows.length===1')
  assert await page.evaluate('__teacher.report.rows[0].regular.attempts')==2
  report['checks'].append('Dashboard reload via serialized TEST storage keeps the same attempt count')
  await page.close();page=await browser.new_page(viewport={'width':1180,'height':820});page.on('pageerror',lambda e:report['errors'].append(str(e)))
  await prepare(page,student=True)
  await page.locator('#studentName').fill('Testperson · Importziel');await page.locator('#saveStudentName').click();await page.locator('#welcomeStart').click()
  await page.evaluate('__kommaland.showMenu()');await page.locator('#importFile').set_input_files(str(ART/'robin-zweiter-export.json'));await page.wait_for_selector('#confirmAction');await page.locator('#confirmAction').click()
  await page.wait_for_function('__kommaland.state.learner.studentId === '+json.dumps(before_id)+' && __kommaland.mode!=="learning-loading"')
  loaded=await page.evaluate('()=>__kommaland.learning.exportSave(false)')
  assert loaded['studentId']==before_id;assert len([e for e in loaded['events'] if e['type']=='task_attempt'])==2
  report['checks'].append('Student file-input import on another profile adopts the original ID and complete event history')
  await page.evaluate('()=>{__kommaland.state.learner.studentName="";__kommaland.exportSave(false);}')
  await page.wait_for_selector('#studentName');await page.locator('#studentName').fill('Testperson · Robin neu')
  async with page.expect_download() as dl:await page.locator('#saveStudentName').click()
  download=await dl.value;await download.save_as(ART/'robin-name-nachgetragen.json');renamed=json.loads((ART/'robin-name-nachgetragen.json').read_text())
  assert renamed['studentId']==before_id;assert renamed['studentName']=='Testperson · Robin neu'
  report['checks'].append('Export with missing name waits for profile input, then resumes with unchanged studentId')
  assert not report['errors'],report['errors']
  print(json.dumps(report,indent=2));(ART/'browser-roundtrip-results.json').write_text(json.dumps(report,indent=2));await browser.close()
asyncio.run(main())
