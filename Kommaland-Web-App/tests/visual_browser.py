"""Current-source browser test: Xvfb/Chromium/SwiftShader; transparent in-memory
module harness, because HTTP browser navigation is administratively blocked here.
No deployed server or physical iPad/Safari is claimed by this test.
"""
import asyncio,json,shutil
from pathlib import Path
from playwright.async_api import async_playwright
from browser_harness import load
ROOT=Path(__file__).resolve().parents[1];ART=ROOT/'test-artifacts';ART.mkdir(exist_ok=True)
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path=shutil.which('chromium'),headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
  context=await b.new_context(viewport={'width':1180,'height':820},has_touch=True)
  page=await context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  await load(page);print('LOADED',flush=True);await page.click('#welcomeStart');await page.wait_for_timeout(5000);print('START',flush=True)
  data=await page.evaluate('''()=>{
   const app=__kommaland,vm=__testModules['visual-models'],visuals=__testModules.visuals;const need=(v,m)=>{if(!v)throw Error(m)};
   const before=JSON.stringify({completed:app.state.completed,progress:app.state.progress,stats:app.state.stats});let changes=0;const cards=[];
   for(const id of Object.keys(vm.LABS)){
    visuals.clearLabMemory();app.showKnowledge(id);const host=document.querySelector('[data-lab]');need(host&&host.dataset.lab===id,'Card '+id);
    const snapshot=()=>host.querySelector('.lab-stage').innerHTML+host.querySelector('.lab-output').textContent;
    const initial=snapshot(),result=host.querySelector('.lab-output').textContent;let changed=false;
    for(const input of [...host.querySelectorAll('input[data-lab-field]')])for(const v of [input.min,input.max]){
     const revision=host.dataset.revision;input.value=v;input.dispatchEvent(new Event('input',{bubbles:true}));need(host.dataset.revision!==revision,'Input '+id);changed ||=snapshot()!==initial;changes++;
    }
    for(const select of [...host.querySelectorAll('select[data-lab-field]')])for(const option of [...select.options]){
     const current=host.querySelector(`[data-lab-field="${select.dataset.labField}"]`);current.value=option.value;current.dispatchEvent(new Event('change',{bubbles:true}));changes++;changed ||=snapshot()!==initial;
    }
    if(!changed){
     const buttons=[...host.querySelectorAll('[data-lab-action]')].filter(e=>!['reset','select-digit','select-order'].includes(e.dataset.labAction));
     for(const old of buttons){const el=[...host.querySelectorAll('[data-lab-action]')].find(e=>e.dataset.labAction===old.dataset.labAction&&e.dataset.value===old.dataset.value);if(el){el.click();changes++;changed ||=snapshot()!==initial;}}
    }
    need(changed,'No actual change '+id);need(!/NaN|undefined|Infinity/.test(host.textContent+host.innerHTML),'Non-finite '+id);
    host.querySelector('[data-lab-action="reset"]').click();need(snapshot()===initial,'Reset '+id);
    for(const rect of host.querySelectorAll('svg rect'))need(+rect.getAttribute('width')>=0&&+rect.getAttribute('height')>=0,'Negative geometry '+id);
    cards.push({id,result,interactive:true});
   }
   need(before===JSON.stringify({completed:app.state.completed,progress:app.state.progress,stats:app.state.stats}),'Exploration changed quest progress');
   return {cards,changes,untouchedProgress:true};
  }''')
  print('ALL CARDS',len(data['cards']),data['changes'],flush=True)
  async def point(x,y):
   return await page.locator('.lab-stage svg').evaluate('(el,p)=>{const pt=el.createSVGPoint();pt.x=p[0];pt.y=p[1];const q=pt.matrixTransform(el.getScreenCTM());return {x:q.x,y:q.y}}',[x,y])
  async def drag(x1,y1,x2,y2):
   a=await point(x1,y1);z=await point(x2,y2);await page.mouse.move(a['x'],a['y']);await page.mouse.down();await page.mouse.move(z['x'],z['y'],steps=12);await page.mouse.up()
  await page.evaluate("__kommaland.showKnowledge('line-tenths')")
  await drag(232,87,424,87);assert '0,8' in await page.locator('.lab-output').inner_text()
  await page.evaluate("__kommaland.showKnowledge('rectangle-decimal')")
  await drag(301,222,211,102);assert '0,40 m²' in await page.locator('.lab-output').inner_text()
  await page.evaluate("__kommaland.showKnowledge('write-hundred')")
  old=await page.locator('[data-lab-field="n"]').input_value();pt=await point(199,27);await page.touchscreen.tap(pt['x'],pt['y']);new=await page.locator('[data-lab-field="n"]').input_value();assert old!=new
  await drag(199,153,361,153)
  value=await page.locator('[data-lab-field="n"]').input_value();assert value=='33',value
  await page.locator('[data-lab-field="n"]').focus();await page.keyboard.press('ArrowRight');assert await page.locator('[data-lab-field="n"]').input_value()=='34'
  await page.locator('[data-lab-action="increase"]').tap();assert await page.locator('[data-lab-field="n"]').input_value()=='35'
  print('DRAGS DONE',flush=True)
  data['directInteractions']=['Pointer number line','Pointer rectangle corner','Touch paint cell','Paint row / pointer capture','Keyboard range','Touch + button']
  await page.evaluate("__kommaland.close();__kommaland.showQuestIntro(__testModules.content.questById('v0a'))")
  print('QUEST INTRO',flush=True);await page.click('#beginQuest');await page.click('[data-lab-action="set-n"][data-value="0"]');await page.click('#knowledgeExample');await page.click('#exampleBack');assert 'Zwei Ganze' in await page.locator('.lab-result strong').inner_text()
  await page.click('#knowledgeDone');assert await page.evaluate('__kommaland.mode')=='task'
  print('TASK',await page.locator('.panel-body').inner_text(),flush=True);await page.locator('[data-choice="1"]').click();before=await page.evaluate('JSON.stringify(__kommaland.session.answer)')
  await page.locator('#taskInfo').click();await page.click('#knowledgeDone');assert before==await page.evaluate('JSON.stringify(__kommaland.session.answer)');data['helpReturnPreservesAnswer']=True
  await page.evaluate("__kommaland.close();__kommaland.showInfo('village',0)")
  await page.select_option('#infoTopic','10');assert await page.locator('[data-lab]').get_attribute('data-lab')=='equal-zeros';data['infoSignHasLab']=True
  print('HELP DONE',flush=True)
  sizes=[(1180,820),(1024,768),(820,1180),(768,1024),(390,844)];layout=[]
  for width,height in sizes:
   print('LAYOUT',width,height,flush=True);await page.set_viewport_size({'width':width,'height':height})
   for id in ['between','fraction-quarter','rectangle-decimal','subtract-thousand','divide-leftover','operations','fraction-thousand']:
    await page.evaluate('(id)=>__kommaland.showKnowledge(id)',id)
    d=await page.evaluate('''()=>{const host=document.querySelector('.math-lab'),panel=document.querySelector('#panel'),body=panel.querySelector('.panel-body'),foot=panel.querySelector('.panel-foot');return {overflow:host.scrollWidth-host.clientWidth,bodyOverflow:body.scrollWidth-body.clientWidth,footer:foot.getBoundingClientRect().bottom,viewport:innerHeight,smallButtons:[...host.querySelectorAll('button,input[type=range],select')].filter(e=>{const r=e.getBoundingClientRect();return r.height<43.5||r.width<43.5}).map(e=>e.outerHTML.slice(0,150)),scroll:body.scrollHeight>body.clientHeight}}''')
    assert d['overflow']<=2 and d['bodyOverflow']<=2,(id,width,d);assert d['footer']<=height,(id,width,d);assert not d['smallButtons'],(id,width,d)
    layout.append({'width':width,'height':height,'id':id,**d})
   await page.evaluate("__kommaland.showKnowledge('fraction-quarter')");await page.screenshot(path=str(ART/f'tablet-{width}x{height}.png'))
  await page.set_viewport_size({'width':1180,'height':820})
  for id,name in [('fraction-quarter','viertel'),('rectangle-decimal','rechteck'),('subtract-whole','entbuendeln'),('fraction-thousand','tausendstel'),('time-quarter','zeit'),('round-near','runden')]:
   await page.evaluate('(id)=>__kommaland.showKnowledge(id)',id)
   if id=='subtract-whole':await page.locator('[data-lab-action="stage-next"]').click();await page.locator('[data-lab-action="stage-next"]').click()
   await page.screenshot(path=str(ART/(name+'.png')))
  data.update({'layouts':layout,'errors':errors,'browser':b.version,'environment':'Chromium / Xvfb / SwiftShader / in-memory module harness; simulated touchscreen. No physical iPad or Safari.'})
  assert not errors,errors
  (ROOT/'tests/visual-browser-results.json').write_text(json.dumps(data,ensure_ascii=False,indent=2));print(json.dumps({'cards':len(data['cards']),'changes':data['changes'],'layouts':len(layout),'errors':errors},ensure_ascii=False),flush=True)
  await b.close()
asyncio.run(main())
