import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
from browser_harness import prepare,ROOT
ART=ROOT/'test-artifacts/analytics';ART.mkdir(parents=True,exist_ok=True)
async def main():
 report={'environment':'Chromium SwiftShader with set_content; in-memory localStorage and IndexedDB API test adapter; workers disabled by harness','errors':[],'checks':[]}
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
  page=await browser.new_page(viewport={'width':1440,'height':1000},device_scale_factor=1)
  page.on('pageerror',lambda e: report['errors'].append(str(e)))
  await prepare(page)
  await page.screenshot(path=str(ART/'lehrkraefte-leer.png'),full_page=True)
  await page.locator('[data-action="demo"]').click()
  await page.wait_for_function('window.__teacher?.report?.rows.length===12',timeout=30000)
  await page.screenshot(path=str(ART/'klassenuebersicht.png'),full_page=True)
  report['checks'].append('12 synthetic learners shown in isolated demo')
  await page.locator('#nav [data-nav="students"]').click();await page.wait_for_selector('#learnerTable')
  await page.locator('#studentSearch').fill('Ada');assert await page.locator('#learnerTable tbody tr').count()==1
  report['checks'].append('Name filter')
  await page.locator('#learnerTable [data-student]').click();await page.wait_for_selector('.detail-tabs')
  await page.screenshot(path=str(ART/'schuelerdetail.png'),full_page=True)
  await page.locator('[data-detailtab="quests"]').click();await page.locator('.task-detail').first.locator('summary').click()
  report['checks'].append('Task attempt/help detail')
  await page.locator('[data-detailtab="timeline"]').click();assert await page.locator('.timeline-list li').count()>0
  await page.screenshot(path=str(ART/'zeitleiste-person.png'),full_page=True)
  await page.locator('#nav [data-nav="timeline"]').click();await page.wait_for_selector('.history-chart');await page.screenshot(path=str(ART/'klassenverlauf.png'),full_page=True)
  report['checks'].append('Class time history')
  await page.locator('#compareDates').click();await page.wait_for_selector('#comparison table')
  await page.locator('#nav [data-nav="settings"]').count() # settings link lives footer
  await page.locator('.sidebar-settings').click();await page.wait_for_selector('#backupAll')
  await page.set_viewport_size({'width':820,'height':1180});await page.screenshot(path=str(ART/'tablet-hochformat.png'),full_page=True)
  assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth')
  report['checks'].append('820px portrait without page-level horizontal overflow')
  await page.close()
  page=await browser.new_page(viewport={'width':1180,'height':820},has_touch=True)
  page.on('pageerror',lambda e: report['errors'].append(str(e)))
  await prepare(page,student=True)
  await page.wait_for_selector('#studentName')
  await page.locator('#saveStudentName').click();assert await page.locator('#profileError').inner_text()
  await page.locator('#studentName').fill('Test · Mila')
  await page.screenshot(path=str(ART/'schueler-name.png'))
  await page.locator('#saveStudentName').click();await page.wait_for_selector('#welcomeStart');await page.locator('#welcomeStart').click()
  report['checks'].append('Student startup requires a name')
  await page.evaluate("__kommaland.showQuestIntro(__kommaland.content.QUESTS[0])")
  await page.locator('#beginQuest').click();await page.wait_for_timeout(100)
  if await page.locator('#knowledgeDone').count():await page.locator('#knowledgeDone').click()
  await page.locator('#taskHint').click();await page.wait_for_timeout(50)
  await page.locator('#taskExample').click();await page.locator('#exampleNext').click();await page.locator('#exampleBack').click()
  await page.evaluate("()=>{const d=__kommaland;d.session.answer='999';document.querySelector('#checkTask').disabled=false;document.querySelector('#checkTask').click();}")
  await page.evaluate("()=>{const d=__kommaland;d.session.answer=d.session.q.tasks[d.session.index].answer;document.querySelector('#checkTask').disabled=false;document.querySelector('#checkTask').click();}")
  await page.evaluate("__kommaland.learning.lastTick=performance.now()-1500;__kommaland.learning.tick()")
  save=await page.evaluate('()=>__kommaland.learning.exportSave(true)')
  (ART/'test-schueler-export.json').write_text(json.dumps(save,ensure_ascii=False,indent=2))
  assert save['studentName']=='Test · Mila';assert sum(e['type']=='task_attempt' for e in save['events'])==2
  assert sum(e['type']=='example_opened' for e in save['events'])==1
  assert sum(e['type']=='hint_opened' and not e['data'].get('resumed') for e in save['events'])==1
  assert save['sessions'][-1]['finishedAt']
  report['checks'].append('Student export includes 2 attempts, 1 hint, 1 example and closed session')
  print(json.dumps(report,indent=2));(ART/'browser-smoke-results.json').write_text(json.dumps(report,indent=2))
  await browser.close()
asyncio.run(main())
