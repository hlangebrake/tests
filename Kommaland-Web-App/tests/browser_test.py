import asyncio,json,os,shutil
from pathlib import Path
from playwright.async_api import async_playwright
from browser_harness import load
OUT=Path(__file__).resolve().parents[1]/'test-artifacts'
OUT.mkdir(exist_ok=True)
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium') or None,headless=True,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
  page=await browser.new_page(viewport={'width':1180,'height':820},device_scale_factor=1,has_touch=True)
  page.set_default_timeout(7000)
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  await load(page);await page.click('#welcomeStart');await page.click('#interactButton')
  assert await page.locator('#panelTitle').inner_text()=='Was ist eine Dezimalzahl?'
  await page.screenshot(path=str(OUT/'info.png'))
  await page.click('#closePanel');await page.click('[data-object="v1"]');print('after tap',await page.evaluate('({p:__kommaland.world.player,path:__kommaland.world.path,target:__kommaland.world.targetObject?.id})'));await page.wait_for_timeout(2200)
  await page.wait_for_selector('#beginQuest',timeout=12000)
  await page.click('#beginQuest')
  await page.click('[data-choice="0"]');await page.click('#checkTask');assert await page.locator('.feedback.wrong').count()==1
  await page.click('[data-choice="1"]');await page.click('#checkTask');assert await page.locator('.feedback.correct').count()==1
  await page.click('#checkTask');await page.click('[data-key="0"]');await page.click('[data-key=","]');await page.click('[data-key="0"]');await page.click('[data-key="6"]')
  await page.click('#taskInfo');await page.click('#closePanel');assert await page.locator('#numberAnswer').input_value()=='0,06'
  await page.screenshot(path=str(OUT/'task.png'))
  await page.click('#checkTask');await page.click('#checkTask');await page.click('[data-choice="1"]');await page.click('#checkTask');await page.click('#checkTask');await page.click('#backWorld')
  # The rest of the 99 tasks use DOM events; answers are not written directly into game state.
  result=await page.evaluate('''() => {
   const app=__kommaland,content=__testModules.content,log=[];let tasks=3;
   const need=(test,msg)=>{if(!test)throw new Error(msg);};
   for(const q of content.QUESTS.filter(q=>q.id!=='v1')){
    app.close();const o=app.world.objects.find(o=>o.id===q.id);app.world.teleport(o.x+o.radius+1.1,o.z);app.interact(o);
    need(app.mode==='intro','intro '+q.id+' '+app.mode);document.getElementById('beginQuest').click();
    q.tasks.forEach((t,index)=>{
     need(app.mode==='task','task '+q.id+':'+index);
     if(t.type==='number')for(const k of String(t.answer).replace('.',','))document.querySelector(`[data-key="${k}"]`).click();
     if(t.type==='choice')document.querySelector(`[data-choice="${t.answer}"]`).click();
     if(t.type==='multi')for(const i of t.answer)document.querySelector(`[data-choice="${i}"]`).click();
     if(t.type==='order')for(const i of t.answer)document.querySelector(`[data-order="${i}"]`).click();
     if(t.type==='classify')t.answer.forEach((c,r)=>document.querySelector(`[data-row="${r}"][data-category="${c}"]`).click());
     if(t.type==='line'){const input=document.getElementById('lineRange');input.value=Math.round((Number(t.answer)-t.start)/t.step);input.dispatchEvent(new Event('input',{bubbles:true}));}
     need(!document.getElementById('checkTask').disabled,'disabled '+q.id+':'+index);
     document.getElementById('checkTask').click();need(app.session.solved,'wrong '+q.id+':'+index+':'+app.session.answer);tasks++;
     document.getElementById('checkTask').click();
    });
    need(app.mode==='success','success '+q.id);need(!!app.state.completed[q.id],'save '+q.id);need(o.after.visible&&!o.before.visible,'world state '+q.id);log.push(q.id);
   }
   __testModules.state.validateState(app.state);
   return {completed:Object.keys(app.state.completed).length,tasks,quests:log,stats:app.state.stats,glError:app.renderer.gl.getError(),position:app.world.player};
  }''')
  print('PLAYTHROUGH',json.dumps(result,ensure_ascii=False));await page.screenshot(path=str(OUT/'final.png'))
  await page.click('#backWorld');await page.wait_for_timeout(600);await page.screenshot(path=str(OUT/'castle.png'))
  # Map and menu layout at each iPad-sized viewport.
  layout=[]
  for width,height in [(1180,820),(1024,768),(768,1024),(820,1180)]:
   await page.set_viewport_size({'width':width,'height':height});await page.wait_for_timeout(150)
   await page.evaluate("__kommaland.showMap('village')");await page.wait_for_timeout(100)
   metrics=await page.evaluate('''()=>{const p=document.getElementById('panel').getBoundingClientRect(),b=document.querySelector('.panel-body');return {width:innerWidth,height:innerHeight,panel:{x:p.x,y:p.y,w:p.width,h:p.height},overflowX:document.documentElement.scrollWidth>innerWidth,bodyOverflowX:b.scrollWidth>b.clientWidth,buttonsVisible:document.getElementById('walkInfo').getBoundingClientRect().bottom<=innerHeight};}''');layout.append(metrics)
   if width==1180:await page.screenshot(path=str(OUT/'map.png'))
   if width==768:await page.screenshot(path=str(OUT/'portrait-map.png'))
   await page.click('#closePanel');await page.click('#menuButton')
   assert await page.locator('#menuDone').is_visible();await page.click('#closePanel')
  print('LAYOUT',json.dumps(layout))
  # Import confirmation: invalid input must preserve the current completed state.
  await page.click('#menuButton');old=await page.evaluate('JSON.stringify(__kommaland.state)')
  await page.locator('#importFile').set_input_files({'name':'broken.json','mimeType':'application/json','buffer':b'{bad'})
  assert await page.evaluate('Object.keys(__kommaland.state.completed).length')==33
  assert await page.evaluate('__kommaland.mode')=='menu'
  raw=await page.evaluate('JSON.stringify(__testModules.state.defaultState())')
  await page.locator('#importFile').set_input_files({'name':'new.json','mimeType':'application/json','buffer':raw.encode()})
  await page.wait_for_timeout(100);assert await page.locator('#confirmAction').count()==1
  await page.click('#confirmAction');assert await page.evaluate('Object.keys(__kommaland.state.completed).length')==0
  await page.click('#menuButton');await page.click('#previousSave');await page.click('#confirmAction');assert await page.evaluate('Object.keys(__kommaland.state.completed).length')==33
  # Replay does not add rewards or erase success. Rare encounter is skippable.
  await page.evaluate("__kommaland.showQuestIntro(__testModules.content.questById('v1'))")
  await page.click('#beginQuest');assert await page.evaluate('__kommaland.session.replay')
  await page.click('#closePanel');await page.evaluate('__kommaland.encounter()');await page.click('#skipEncounter');assert await page.evaluate('__kommaland.mode')==''
  await page.set_viewport_size({'width':1180,'height':820});await page.evaluate('__kommaland.world.teleport(0,30)');await page.wait_for_timeout(450)
  await page.screenshot(path=str(OUT/'completed-village.png'))
  print('ERRORS',errors);assert not errors
  (OUT/'browser-results.json').write_text(json.dumps({'playthrough':result,'layouts':layout,'errors':errors,'import':'invalid-preserved, valid-confirmed, rollback-restored','environment':'Chromium 144, Xvfb, WebGL; injected module test harness; memory-backed localStorage substitute'},indent=2,ensure_ascii=False))
  await browser.close()
asyncio.run(main())
