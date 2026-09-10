# Independent exact arithmetic, derived from problem statements, not task.answer.
from decimal import Decimal as D
from fractions import Fraction as F
import json,subprocess
qs=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {QUESTS} from './js/content.js';console.log(JSON.stringify(QUESTS))"]))
by={q['id']:q for q in qs};cases=[]
def add(q,i,v):
 t=by['c6-'+q]['tasks'][i-1]
 values=v if isinstance(v,list) else [v]
 a=t['answer'] if isinstance(t['answer'],list) else [t['answer']]
 assert len(values)==len(a),(q,i,a,values)
 for x,y in zip(a,values):assert D(str(x).replace(',','.'))==D(str(y)),(q,i,x,y)
 cases.append({'key':t['key'],'expected':[str(x) for x in values] if isinstance(v,list) else str(v)})
add('v1',3,D(7)+D(8)/1000);add('v1',4,[D(2)/10,D(7)/1000]);add('v3',2,[7*5,D(7)/20]);add('v3',3,D(37)/1000)
add('f1',2,D('3.0')+D(7)/100);add('f1',5,(D('1.406')+D('1.408'))/2)
add('f3',1,D('12.304').quantize(D('.1')));add('f3',2,D('4.999').quantize(D('.01')))
add('h1',2,[D('.037')*1000,D(7045)/1000]);add('h1',4,D('1.5')*1000-875)
add('h5',1,D('1.35')*60);add('h5',3,[D('.025')*10000,D('.037')*1000])
add('a1',1,D('3.4')+D('.56'));add('a1',2,[8,6,0,D('14.307')+D('2.86')]);add('a1',3,[int((8+5)/10),int((7+6+1)/10),D('4.78')+D('2.65')]);add('a1',5,D('12.304')+D('2.86')+D('.095'))
add('a4',2,D('5.04')-D('2.095'));cost=D('4.85')+D('6.75')+D('3.60');add('a4',3,[cost,cost-15])
add('s1',1,D('6.4')-D('2.075'));assert D(7)+D(9)/10+D(9)/100+D(14)/1000==D('8.004');add('s1',2,[7,9,9,14,D('8.004')-D('.975')]);add('s1',4,[D('16.145')+D('3.87')])
add('s4',1,D('3.075')+D('8.4'));out=D('2.86')+D('.975');add('s4',3,[out,out+D('5.4')])
add('m1',1,D(7)*D('.35'));add('m1',2,[D('.037')*100,D('103.207')/100]);add('m1',3,5*D('1.406'))
add('m2',1,D('1.6')*D('.5'));add('m2',2,[124*6,124*30,124*36,2+2,D('1.24')*D('.36')]);add('m2',5,12*D('1.99'))
add('d1',1,D('2.8')/4);add('d1',2,[18//6,7%6,12%6,D('18.72')/6]);add('d1',3,[0,5%7,D('7.056')/7]);add('d1',5,D('12.5')/8)
add('d2',1,[D('4.368')*10,D('1.2')*10,43%12,76%12,D('4.368')/D('1.2')]);add('d2',3,int(D('2.3')//D('.18')))
add('k1',2,D('4.5')/6-D('.28'));add('k1',4,[D('4.8')-D('1.2')/3,(D('4.8')-D('1.2'))/3]);add('k1',5,3*4*D('.85')-D('8.4'))
add('k4',1,[6*1+1,6*D('1.25')+D('.8')]);add('k4',2,(-F('8.3')//F('2.4'))*-1)
add('master-village',1,(D('.704')+D('.705'))/2);add('master-forest',1,D('2.35')-D('.005'))
add('master-harbor',1,[D('.012')*1000-D('8.4'),int(D('8.4')//D('.15'))]);add('master-harbor',2,12*60+5-int(D('1.4')*60)-18-10*60)
add('master-market',1,(D('18.4')-D('2.7'))/2);goods=list(map(D,['2.85','3.65','4.20','1.95']));drop=min(x for x in goods if sum(goods)-x<=10);add('master-market',3,[drop,10-(sum(goods)-drop)])
add('master-cliffs',1,D('4.075')*2+D('2.85'))
add('master-mill',1,[D('2.4')*D('1.5'),(D('2.4')/2)*(D('1.5')*3)]);add('master-mill',2,D('9.375')/D('12.5'))
add('master-cave',1,[int(D('3.4')//D('.28')),D('3.4')%D('.28')]);add('master-cave',2,(D('6.5')+D('1.75'))*D('.4'))
count=-(-F(18)*F('.35')//F('1.5'));add('master-castle',1,[count,D(count)*D('1.85')]);price=min(D('5.10')*k+D('1.85')*(8-3*k) for k in range(3));add('master-castle',3,price)
open('tests/exact-arithmetic-oracles.json','w').write(json.dumps(cases,ensure_ascii=False,indent=2))
print(len(cases),'numeric/worksheet/number-line answers independently checked with Decimal/Fraction.')
