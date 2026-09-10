"""Compatibility wrapper for existing game regression tests.
Uses isolated source rendering and IN-MEMORY storage; not native persistence.
"""
import importlib.util
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('analytics_browser_harness',ROOT/'tests/analytics/browser_harness.py')
helper=importlib.util.module_from_spec(spec);spec.loader.exec_module(helper)
async def load(page,state=None,freezeRendering=False):
 await helper.prepare(page,student=True,state=state)
 if freezeRendering:
  await page.evaluate("()=>{const r=__kommaland.renderer;window.__renderOnce=r.render.bind(r);__renderOnce(__kommaland.world.time);r.render=()=>{};}")
 await page.evaluate('window.__testModules=Object.fromEntries(Object.entries(__modules).filter(([k])=>k.startsWith("js/")).map(([k,v])=>[k.slice(3,-3),v]));')
 if await page.locator('#studentName').count():
  await page.locator('#studentName').fill('Testperson · Regression')
  await page.locator('#saveStudentName').click()
  await page.wait_for_timeout(150)
