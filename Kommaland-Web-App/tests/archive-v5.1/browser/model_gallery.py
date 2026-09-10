"""Render every quest model at three stages with one fixed orthographic camera.
This isolated model audit complements the normal-distance world screenshots.
"""
import asyncio,shutil,json
from pathlib import Path
from playwright.async_api import async_playwright
from browser_harness import load
ROOT=Path(__file__).resolve().parents[1];ART=ROOT/'test-artifacts'/'models';ART.mkdir(parents=True,exist_ok=True)
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(executable_path=shutil.which('chromium'),headless=False,args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
  page=await browser.new_page(viewport={'width':1200,'height':360})
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  await load(page);await page.locator('#welcomeStart').click()
  kinds=await page.evaluate('''()=>{const d=__kommaland;d.world.update=()=>0;d.world.teleport(0,30);d.renderer.meshes.forEach(m=>m.visible=false);d.renderer.height=8.8;d.renderer.setCamera([0,2.0,0]);d.renderer.mesh(new __testModules.engine.Geometry().box(0,-.18,0,100,.25,100,'#e4e4ce'));return [...new Set(d.content.QUESTS.map(q=>q.kind))].map(kind=>{const q=d.content.QUESTS.find(q=>q.kind===kind);return {kind,region:q.region,title:q.title}});}''')
  await page.add_style_tag(content='''#hud,#tracker,#arrival,#worldLabels,#joystick,.joystick-label,#bottomHint,.interact-wrap,#saveStatus,.save-indicator,#toast,#saveDot,#saveLabel,.vignette{display:none!important}#loading{display:none!important}.audit-title{position:absolute;top:14px;left:25px;margin:0;font:600 16px ui-rounded,system-ui;color:#3e574b;z-index:60}.audit-labels{position:absolute;bottom:14px;left:12%;right:12%;display:flex;justify-content:space-around;z-index:60;font:600 13px ui-rounded,system-ui;color:#395045;pointer-events:none}.audit-labels span{width:32%;text-align:center}''')
  await page.evaluate('''()=>{document.body.insertAdjacentHTML('beforeend','<h1 class="audit-title"></h1><div class="audit-labels"><span>Noch offen</span><span>In Arbeit</span><span>Abgeschlossen</span></div>');window.auditMeshes=[];}''')
  for item in kinds:
   await page.evaluate('''item=>{const d=__kommaland,r=d.renderer;for(const m of auditMeshes)m.visible=false;auditMeshes=[];document.querySelector('.audit-title').textContent=item.title+' · '+item.kind;for(let s=0;s<3;s++){const k=(s-1)*8;const mesh=r.mesh(__testModules.world.questGeometry(item.kind,s,item.region),{x:r.right[0]*k,z:r.right[2]*k});auditMeshes.push(mesh);}r.render(0);}''',item)
   await page.wait_for_timeout(80);await page.screenshot(path=str(ART/f'{item["kind"]}.png'))
  assert not errors,errors
  await browser.close()
 (ROOT/'tests/model-gallery-results.json').write_text(json.dumps({'modelTypes':len(kinds),'renderedStates':len(kinds)*3,'cameraHeight':8.8,'viewport':[1200,360],'models':kinds,'errors':errors},ensure_ascii=False,indent=2))
 print('Rendered',len(kinds),'types in all three stages; no page errors.')
asyncio.run(main())
