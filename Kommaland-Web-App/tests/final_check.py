"""Fast final-source regression: all quest DOM flows and reduced-motion builds."""
import asyncio,json,os,shutil
from pathlib import Path
from playwright.async_api import async_playwright
from browser_harness import load
ROOT=Path(__file__).resolve().parents[1]
(ROOT/'test-artifacts').mkdir(exist_ok=True)
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium'),headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
  page=await b.new_page(viewport={'width':1180,'height':820});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  await load(page);await page.click('#welcomeStart')
  await page.screenshot(path=str(ROOT/'test-artifacts/landscape-final.png'))
  await page.click('#menuButton');assert 'KOMMALAND 3.0' in await page.locator('.section-tag').inner_text()
  await page.click('#toggleMotion');await page.click('#toggleEco');await page.click('#menuDone')
  result=await page.evaluate('''async()=>{
   const app=__kommaland,content=__testModules.content;let n=0;const log=[];const need=(v,m)=>{if(!v)throw new Error(m)};
   while(Object.keys(app.state.completed).length<content.QUESTS.length){
    const q=content.QUESTS.find(q=>!app.state.completed[q.id]&&content.questUnlocked(q,app.state.completed));need(q,'Prerequisite deadlock');
    app.close();const o=app.world.objects.find(o=>o.id===q.id);app.world.teleport(o.x+o.radius+1.1,o.z);app.interact(o);need(app.mode==='intro','Intro '+q.id);document.getElementById('beginQuest').click();
    for(let i=0;i<q.tasks.length;i++){
     need(app.mode==='lesson','Knowledge '+q.id+':'+i);document.getElementById('knowledgeDone').click();const t=q.tasks[i];
     if(t.type==='number')for(const k of String(t.answer).replace('.',','))document.querySelector(`[data-key="${k}"]`).click();
     if(t.type==='choice')document.querySelector(`[data-choice="${t.answer}"]`).click();
     if(t.type==='multi')for(const j of t.answer)document.querySelector(`[data-choice="${j}"]`).click();
     if(t.type==='order')for(const j of t.answer)document.querySelector(`[data-order="${j}"]`).click();
     if(t.type==='classify')t.answer.forEach((c,r)=>document.querySelector(`[data-row="${r}"][data-category="${c}"]`).click());
     if(t.type==='line'){const e=document.getElementById('lineRange');e.value=Math.round((Number(t.answer)-t.start)/t.step);e.dispatchEvent(new Event('input',{bubbles:true}));}
     document.getElementById('checkTask').click();need(app.session.solved,'Answer '+q.id+':'+i);n++;
     if(i===q.tasks.length-1)need(!app.state.completed[q.id]&&app.state.progress[q.id].ready&&!o.after.visible,'Premature build '+q.id);
     document.getElementById('checkTask').click();
    }
    need(app.mode==='build','No build '+q.id);const begin=performance.now();
    while(app.mode==='build'){await new Promise(r=>setTimeout(r,40));need(performance.now()-begin<15000,'Build timeout '+q.id);}
    need(app.mode==='success'&&o.after.visible&&!o.before.visible,'No success '+q.id);log.push(q.id);document.getElementById('backWorld').click();
   }
   return {completed:Object.keys(app.state.completed).length,tasks:n,stats:app.state.stats,order:log,glError:app.renderer.gl.getError()};
  }''')
  assert result['completed']==37 and result['tasks']==122 and result['glError']==0 and not errors
  # Current-source visual examples, including the revised equal-size wording.
  await page.evaluate("__kommaland.close();__kommaland.world.teleport(0,30);__kommaland.showQuestIntro(__testModules.content.questById('v0a'))")
  await page.click('#beginQuest');await page.screenshot(path=str(ROOT/'test-artifacts/first-lesson-final.png'))
  await page.click('#knowledgeExample');await page.click('#exampleNext');await page.click('#exampleNext')
  await page.screenshot(path=str(ROOT/'test-artifacts/worked-example-final.png'))
  result.update({'errors':errors,'environment':'Chromium '+b.version+'; Xvfb; WebGL SwiftShader; offline harness; in-memory localStorage','method':'all 37 quest paths through DOM events; all builds completed by actual reduced-motion animation timer; Eco mode'})
  (ROOT/'tests/final-source-results.json').write_text(json.dumps(result,indent=2,ensure_ascii=False));print(json.dumps(result,ensure_ascii=False),flush=True)
  await b.close()
asyncio.run(main())
