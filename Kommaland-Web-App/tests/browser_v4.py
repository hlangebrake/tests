"""Browser UI regression using Chromium/SwiftShader and the local in-memory harness.
The managed browser disallows HTTP navigation; storage is simulated. This is NOT
an iPad, Safari, persistence, service-worker installation or offline-restart test.
Run: xvfb-run -a python3 tests/browser_v4.py
"""
import asyncio,json,shutil
from pathlib import Path
from playwright.async_api import async_playwright
from browser_harness import load
ROOT=Path(__file__).resolve().parents[1]
ART=ROOT/'test-artifacts';ART.mkdir(exist_ok=True)
FILL_JS=r'''(wrong=false)=>{
 const d=__kommaland,s=d.session,t=s.q.tasks[s.index];
 const click=sel=>{const b=document.querySelector(sel);if(!b)throw Error('Missing '+sel+' at '+t.key);b.click();};
 if(t.type==='number')for(const ch of wrong?'9999':String(t.answer).replace('.',','))click('[data-key="'+ch+'"]');
 else if(t.type==='choice'||t.type==='error')click('[data-'+(t.type==='error'?'error':'choice')+'="'+(wrong?(t.answer+1)%(t.options?.length||t.steps.length):t.answer)+'"]');
 else if(t.type==='multi')for(const i of wrong?[0]:t.answer)click('[data-choice="'+i+'"]');
 else if(t.type==='match')for(let j=0;j<t.answer.length;j++){click('.drag-bank [data-drag-token="'+t.answer[j]+'"]');click('[data-drop-slot="'+j+'"]');}
 else if(t.type==='order'||t.type==='argument')for(const i of t.answer)click('[data-order="'+i+'"]');
 else if(t.type==='mark')for(let i=0;i<t.answer;i++)click('#markMore');
 else if(t.type==='line'){const el=document.querySelector('#lineRange');el.value=Math.round((Number(t.answer)-t.start)/t.step);el.dispatchEvent(new Event('input',{bubbles:true}));}
 else throw Error('Unknown '+t.type);
 if(document.querySelector('#checkTask').disabled)throw Error('Not ready '+t.key);
}'''
async def main():
 report={'environment':'Chromium with SwiftShader, headful under Xvfb; bundled local source in set_content; in-memory localStorage', 'cases':[], 'errors':[]}
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path=shutil.which('chromium'),headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
  page=await browser.new_page(viewport={'width':1180,'height':820},device_scale_factor=1,has_touch=True)
  page.on('pageerror',lambda e:report['errors'].append(str(e)))
  await load(page)
  await page.locator('#welcomeStart').click()
  await page.evaluate('() => {window.fillCorrect='+FILL_JS+';}')
  await page.wait_for_timeout(200)
  await page.screenshot(path=str(ART/'funkeldorf.png'))
  # Quiet locked pins, unlisted challenges, early override.
  res=await page.evaluate('''()=>{const d=__kommaland;return {opacity:getComputedStyle(document.querySelector('.world-label.locked:not(.near)')).opacity,hidden:d.world.objects.filter(o=>o.q?.challenge).every(o=>o.hidden)}}''')
  assert float(res['opacity'])<.2 and res['hidden'];report['cases'].append({'quietFuturePins':res})
  await page.evaluate('''()=>{const d=__kommaland,o=d.world.objects.find(o=>o.id==='v2');d.world.teleport(o.x-2,o.z+2);d.interact(o)}''')
  assert await page.locator('#ignoreLocked').count()==1
  await page.locator('#ignoreLocked').click();assert await page.locator('#beginQuest').count()==1
  await page.locator('#beginQuest').click();await page.locator('#knowledgeDone').click()
  # Actual pointer drag: first numeric name to correct digit. This also captures a real UI screenshot.
  await page.wait_for_timeout(400)
  ans=await page.evaluate('__kommaland.session.q.tasks[__kommaland.session.index].answer')
  source=page.locator(f'.drag-bank [data-drag-token="{ans[0]}"]');target=page.locator('[data-drop-slot="0"]')
  await source.scroll_into_view_if_needed();a=await source.bounding_box();b=await target.bounding_box()
  await page.mouse.move(a['x']+a['width']/2,a['y']+a['height']/2);await page.mouse.down();await page.mouse.move(b['x']+b['width']/2,b['y']+b['height']/2,steps=14);await page.mouse.up()
  assert await page.evaluate('__kommaland.session.answer[0]')==ans[0]
  await page.screenshot(path=str(ART/'stellenwerte-ziehen.png'))
  # Also exercise a genuine emulated finger drag, not only a mouse-generated PointerEvent.
  source=page.locator(f'.drag-bank [data-drag-token="{ans[1]}"]');target=page.locator('[data-drop-slot="1"]')
  a=await source.bounding_box();b=await target.bounding_box();x=a['x']+a['width']/2;y=a['y']+a['height']/2;tx=b['x']+b['width']/2;ty=b['y']+b['height']/2
  cdp=await page.context.new_cdp_session(page)
  await cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
  for i in range(1,13):await cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x+(tx-x)*i/12,'y':y+(ty-y)*i/12}]})
  await cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
  assert await page.evaluate('__kommaland.session.answer[1]')==ans[1]
  # Keyboard alternative for the third place-value label.
  await page.wait_for_timeout(350)
  await page.locator(f'.drag-bank [data-drag-token="{ans[2]}"]').focus();await page.keyboard.press('Enter')
  await page.locator('[data-drop-slot="2"]').focus();await page.keyboard.press('Enter')
  assert await page.evaluate('__kommaland.session.answer')==ans
  report['cases'].append({'warningOverrideAndPointerDrag':'pass; mouse drag, CDP touch drag and keyboard matching'})
  # Preserve matching answers through knowledge/example modal roundtrip.
  await page.locator('#taskInfo').click();await page.locator('#knowledgeExample').click();await page.locator('#exampleBack').click();await page.locator('#knowledgeDone').click()
  assert await page.evaluate('__kommaland.session.answer[0]')==ans[0]
  await page.evaluate('__kommaland.close()')
  # Early test warning + no aids + incorrect round + pause and continuation.
  await page.evaluate('''()=>{const d=__kommaland,g=d.world.gates.find(g=>g.from==='village'&&g.to==='forest');d.world.teleport(g.x-g.normal.x*3,g.z-g.normal.z*3);d.showGateIntro(g)}''')
  assert await page.locator('.exam-warning').count()==1
  await page.screenshot(path=str(ART/'wegpruefung-start.png'))
  await page.locator('#beginGate').click()
  assert await page.locator('#taskInfo,#taskExample,#taskHint,#showSolution').count()==0
  await page.evaluate('fillCorrect(true)');await page.locator('#checkTask').click()
  assert await page.locator('.feedback').count()==0
  assert await page.evaluate('__kommaland.session.index')==1
  await page.locator('#pauseExam').click()
  assert await page.evaluate('__kommaland.state.exams["village>forest"].index')==1
  await page.evaluate('__kommaland.startGateTest("village","forest")')
  assert await page.evaluate('__kommaland.session.index')==1
  await page.evaluate('''()=>{let i=0;while(__kommaland.mode==='task'&&i++<100){fillCorrect();document.getElementById('checkTask').click();}if(i>100)throw Error('Exam loop');}''')
  assert await page.evaluate('__kommaland.mode')=='gate-result'
  assert await page.evaluate('Object.keys(__kommaland.state.mastery).length')==0
  assert await page.evaluate('__kommaland.state.exams["village>forest"].passed.length')==18
  await page.screenshot(path=str(ART/'pruefergebnis.png'))
  await page.locator('#retryExam').click()
  assert await page.evaluate('__kommaland.session.q.tasks.length')==1
  await page.evaluate('fillCorrect()');await page.locator('#checkTask').click()
  assert await page.evaluate('__kommaland.mode')=='gatebuild'
  # Capture a true intermediate animation state by explicit simulation time.
  await page.evaluate('''()=>{const w=__kommaland.world;w.updateGateOpening(w.gateOpening.start+1.45);__kommaland.renderer.render(w.time);}''')
  await page.screenshot(path=str(ART/'tor-oeffnet.png'))
  await page.wait_for_function('__kommaland.mode==="gate-success"',timeout=30000)
  assert await page.evaluate('!!__kommaland.state.mastery.village')
  await page.locator('#gateStay').click()
  report['cases'].append({'examRound':'19 items, 18 correct retained, one failed concept retried; all correct opens gate; no inline feedback or aids'})
  # Tap/keyboard canonical correct answers through every ordinary and advanced quest.
  result=await page.evaluate('''()=>{
   const d=__kommaland,types={},groups=new Set();let count=0,lessons=0;
   d.state.settings.reducedMotion=true;d.world.sync(d.state);
   for(const q of d.content.QUESTS){
    d.close();d.showQuestIntro(q);document.getElementById('beginQuest').click();
    for(let n=0;n<q.tasks.length;n++){
     if(d.mode==='lesson'){lessons++;document.getElementById('knowledgeDone').click();}
     if(d.mode!=='task')throw Error('Expected task '+q.id+':'+n+' got '+d.mode);
     const t=q.tasks[n];if(d.session.index!==n)throw Error('Wrong step '+q.id);
     fillCorrect();document.getElementById('checkTask').click();if(!d.session.solved)throw Error('Rejected '+q.id+':'+n+' '+JSON.stringify(d.session.answer));
     count++;types[t.type]=(types[t.type]||0)+1;
     document.getElementById('checkTask').click();
    }
    if(d.mode!=='build')throw Error('Missing commit animation '+q.id);
    d.world.updateBuild(d.world.building.start+5);
    if(d.mode!=='success'||!d.state.completed[q.id])throw Error('Missing success '+q.id);
    document.getElementById('backWorld').click();
   }
   return {quests:Object.keys(d.state.completed).length,tasks:count,types,automaticKnowledgeCards:lessons,adornments:d.world.adornments.every(a=>a.mesh.visible&&a.rainbow.visible)};
  }''')
  assert result['quests']==45 and result['tasks']==393 and result['adornments'];report['cases'].append({'fullPlaythrough':result})
  await page.evaluate('''()=>{const d=__kommaland;d.world.teleport(0,29);d.renderer.render(d.world.time)}''');await page.wait_for_timeout(400)
  await page.screenshot(path=str(ART/'meisterdorf.png'))
  # New error/argument/grid/sparse line controls and responsive states.
  for typ in ['error','argument','mark','line']:
   await page.evaluate('''typ=>{const d=__kommaland;d.close();const q=d.content.QUESTS.find(q=>q.challenge&&q.tasks.some(t=>t.type===typ));d.showQuestIntro(q);document.getElementById('beginQuest').click();d.session.index=q.tasks.findIndex(t=>t.type===typ);const t=q.tasks[d.session.index];d.session.answer=['argument','order'].includes(t.type)?[]:null;d.session.solved=false;d.showTask();}''',typ)
   if typ=='line':
    assert await page.locator('#lineDrawing text').count()==2
    await page.locator('#linePlus').click();assert await page.locator('#lineOutput').inner_text()=='Markierung gesetzt'
   if typ=='mark':
    await page.locator('[data-mark-cell="4"]').tap();assert await page.evaluate('__kommaland.session.answer.includes(4)')
   await page.screenshot(path=str(ART/f'aufgabe-{typ}.png'))
  report['cases'].append({'nineAnswerTypesAndSparseLine':'pass; marking tested with actual touchscreen tap'})
  # Import/export is a local JSON roundtrip, not a genuine browser persistence test.
  await page.evaluate('''()=>{const d=__kommaland,m=__testModules;const text=JSON.stringify(d.state),imported=m.state.parseSave(text);if(JSON.stringify(imported.completed)!==JSON.stringify(d.state.completed))throw Error('Save mismatch');if(!imported.mastery.village)throw Error('Seal lost');d.setState(imported);}''')
  report['cases'].append({'JSONRoundtrip':'completed quests, mastery and decorations restored'})
  for width,height in [(1024,768),(820,1180),(768,1024)]:
   await page.set_viewport_size({'width':width,'height':height});await page.wait_for_timeout(180)
   for typ in ['match','argument','mark']:
    await page.evaluate('''typ=>{const d=__kommaland;d.close();const q=d.content.QUESTS.find(q=>q.challenge&&q.tasks.some(t=>t.type===typ));d.showQuestIntro(q);document.getElementById('beginQuest').click();d.session.index=q.tasks.findIndex(t=>t.type===typ);const t=q.tasks[d.session.index];d.session.answer=t.type==='match'?Array(t.items.length).fill(null):t.type==='argument'?[]:null;d.session.solved=false;d.showTask();}''',typ)
    bounds=await page.evaluate('''()=>{const p=document.getElementById('panel'),b=p.getBoundingClientRect(),f=p.querySelector('.panel-foot').getBoundingClientRect(),body=p.querySelector('.panel-body');return {x:b.x,right:b.right,bottom:b.bottom,footer:f.bottom,overflow:body.scrollWidth-body.clientWidth,viewport:innerHeight}}''')
    assert bounds['x']>=0 and bounds['right']<=width+1 and bounds['footer']<=height and bounds['overflow']<3,(width,height,typ,bounds)
   report['cases'].append({'viewport':[width,height],'allThreeComplexWidgets':'no horizontal overflow; footer remains within viewport'})
  assert not report['errors'],report['errors']
  await browser.close()
 (ROOT/'tests/browser-v4-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 print(json.dumps(report,ensure_ascii=False,indent=2))
asyncio.run(main())
