"""Curriculum-6 UI regression. Chromium / source bundle / in-memory storage only."""
import asyncio,json,shutil
from pathlib import Path
from playwright.async_api import async_playwright
from browser_harness import load,helper
ROOT=Path(__file__).resolve().parents[1];ART=ROOT/'test-artifacts/v6';ART.mkdir(parents=True,exist_ok=True)
FILL=r'''(wrong=false)=>{
 const d=__kommaland,s=d.session,t=s.q.tasks[s.index];
 const click=sel=>{const b=document.querySelector(sel);if(!b)throw Error('Missing '+sel+' at '+t.key);b.click();};
 const type=v=>{for(const ch of String(v).replace('.',','))click('[data-key="'+ch+'"]');};
 if(t.type==='number'){for(let guard=0;s.answer.length&&guard<22;guard++)click('[data-key="⌫"]');if(s.answer.length)throw Error('Cannot clear '+t.key+' '+d.mode+' solved '+s.solved);type(wrong?'9999':t.answer);}
 else if(t.type==='work')for(let i=0;i<t.answer.length;i++){click('[data-work-field="'+i+'"]');for(let guard=0;s.answer[i].length&&guard<22;guard++)click('[data-key="⌫"]');if(s.answer[i].length)throw Error('Cannot clear field '+t.key+' '+d.mode+' '+s.solved);type(wrong&&i===0?'9999':t.answer[i]);}
 else if(t.type==='choice'||t.type==='error')click('[data-'+(t.type==='error'?'error':'choice')+'="'+(wrong?(t.answer+1)%(t.options?.length||t.steps.length):t.answer)+'"]');
 else if(t.type==='multi'){for(const i of [...s.answer])click('[data-choice="'+i+'"]');for(const i of wrong?[0]:t.answer)click('[data-choice="'+i+'"]');}
 else if(t.type==='match')for(let j=0;j<t.answer.length;j++){click('.drag-bank [data-drag-token="'+t.answer[j]+'"]');click('[data-drop-slot="'+j+'"]');}
 else if(t.type==='order'||t.type==='argument')for(const i of t.answer)click('[data-order="'+i+'"]');
 else if(t.type==='mark')for(let i=0;i<t.answer;i++)click('#markMore');
 else if(t.type==='line'){const el=document.querySelector('#lineRange');el.value=Math.round((Number(t.answer)-t.start)/t.step);el.dispatchEvent(new Event('input',{bubbles:true}));}
 else throw Error('Unknown '+t.type);
 if(document.querySelector('#checkTask').disabled)throw Error('Not ready '+t.key);
}'''
async def main():
 report={'environment':'Chromium/SwiftShader under Xvfb; source bundle set_content; world drawn manually between UI checks; in-memory localStorage/IndexedDB; no native Safari/offline claim','cases':[],'errors':[]}
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path=shutil.which('chromium'),headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
  page=await browser.new_page(viewport={'width':1180,'height':820},device_scale_factor=1,has_touch=True)
  page.on('pageerror',lambda e:report['errors'].append(str(e)))
  page.on('console',lambda m:print(m.text,flush=True) if m.type=='log' else None)
  await load(page,freezeRendering=True);await page.locator('#welcomeStart').click();await page.locator('#srlPlanSkip').click()
  await page.evaluate('()=>{window.fillCorrect='+FILL+';}')
  result=await page.evaluate('''async()=>{
   const d=__kommaland,types={},cards=[];let count=0;d.state.settings.reducedMotion=true;d.world.sync(d.state);
   for(const q of d.content.QUESTS){
    d.close();d.showQuestIntro(q);document.getElementById('beginQuest').click();
    for(let n=0;n<q.tasks.length;n++){
     if(d.mode==='lesson'){cards.push(q.tasks[n].lesson);document.getElementById('knowledgeDone').click();}
     if(d.mode!=='task'||d.session.index!==n)throw Error('Unexpected '+q.id+':'+n+' mode '+d.mode);
     const t=q.tasks[n];fillCorrect();document.getElementById('checkTask').click();
     if(!d.session.solved)throw Error('Rejected '+t.key+' '+JSON.stringify(d.session.answer));
     count++;types[t.type]=(types[t.type]||0)+1;document.getElementById('checkTask').click();
    }
    if(d.mode!=='build')throw Error('Missing animation '+q.id+' '+d.mode);
    d.world.updateBuild(d.world.building.start+5);if(!d.state.completed[q.id])throw Error('Missing completion');
    document.getElementById('backWorld').click();await d.learning.flush();console.log('Complete '+q.id+' ('+count+')');
   }
   return {quests:Object.keys(d.state.completed).length,tasks:count,types,automaticCards:cards.length,adornments:d.world.adornments.every(a=>a.mesh.visible&&a.rainbow.visible)};
  }''')
  assert result['quests']==24 and result['tasks']==101 and result['adornments'];report['cases'].append({'fullPlaythrough':result})
  print('PLAYTHROUGH',result,flush=True)
  (ART/'complete-state.json').write_text(json.dumps(await page.evaluate('__kommaland.state'),ensure_ascii=False))
  await page.evaluate('''()=>{const d=__kommaland;d.close();d.world.teleport(0,29);__renderOnce(d.world.time)}''');await page.screenshot(path=str(ART/'welt.png'))
  # Open written calculation through normal task steps, preserving handwritten alternatives on paper.
  await page.evaluate('''()=>{const d=__kommaland;d.close();d.showQuestIntro(d.content.QUESTS.find(q=>q.id==='c6-a1'));document.getElementById('beginQuest').click();fillCorrect();document.getElementById('checkTask').click();document.getElementById('checkTask').click();}''')
  print('Opened worksheet',await page.evaluate('__kommaland.mode'),flush=True)
  await page.locator('[data-work-field="0"]').tap();await page.locator('[data-key="8"]').tap()
  assert await page.evaluate('__kommaland.session.answer[0]')=='8'
  await page.screenshot(path=str(ART/'schriftlich.png'))
  await page.evaluate("""()=>{const saved=JSON.stringify(__kommaland.session.answer);for(const id of ['taskInfo','knowledgeExample','exampleBack','knowledgeDone']){const b=document.getElementById(id);if(!b)throw Error('Missing help button '+id);b.click();console.log('Help action '+id+' mode '+__kommaland.mode);}if(JSON.stringify(__kommaland.session.answer)!==saved)throw Error('Help reset answer');}""")
  report['cases'].append({'workPointerAndHelpRoundtrip':'one digit entered by actual tap; preserved across knowledge/example'})
  # Single wrong worksheet cell cannot pass, correct answer restores normal flow.
  await page.evaluate('fillCorrect(true)');await page.evaluate("document.getElementById('checkTask').click()");assert not await page.evaluate('__kommaland.session.solved')
  await page.evaluate('fillCorrect()');await page.evaluate("document.getElementById('checkTask').click()");assert await page.evaluate('__kommaland.session.solved')
  print('WORK PASSED',flush=True)
  # Fresh source test without normal tasks being required.
  await page.evaluate('''()=>{const d=__kommaland;d.close();d.startGateTest('village','forest')}''')
  assert await page.locator('#taskInfo,#taskExample,#taskHint,#taskStrategy').count()==0
  await page.evaluate('fillCorrect(true)');await page.evaluate("document.getElementById('checkTask').click()")
  await page.evaluate('''()=>{let guard=0;while(__kommaland.mode==='task'&&guard++<10){fillCorrect();document.getElementById('checkTask').click();}}''')
  assert await page.evaluate('__kommaland.mode')=='gate-result'
  await page.screenshot(path=str(ART/'pruefungsbericht.png'))
  assert await page.evaluate('__kommaland.state.exams["village>forest"].passed.length')==2
  await page.evaluate("document.getElementById('retryExam').click()");assert await page.evaluate('__kommaland.session.q.tasks.length')==1
  await page.evaluate('fillCorrect()');await page.evaluate("document.getElementById('checkTask').click()")
  await page.evaluate('''()=>{const w=__kommaland.world;if(w.gateOpening)w.updateGateOpening(w.gateOpening.start+5);}''')
  assert await page.evaluate('!!__kommaland.state.mastery.village');report['cases'].append({'shortExam':'3 tasks, 2 retained; only failed concept repeated; no live aids; opens gate'})
  # Export validation includes active and historical catalog but only 101 active tasks.
  export=await page.evaluate('async()=>__kommaland.learning.exportSave(true)')
  (ART/'test-speicherstand.json').write_text(json.dumps(export,ensure_ascii=False))
  report['cases'].append({'export':{'schema':export['schemaVersion'],'events':len(export['events']),'activeTasks':sum(t.get('active',True) for t in export['catalog']['tasks'])}})
  assert export['schemaVersion']==3
  assert not report['errors'],report['errors'];await browser.close()
 (ROOT/'tests/content-browser-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2))
if __name__=='__main__':asyncio.run(main())
