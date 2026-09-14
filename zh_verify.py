
import json
data=json.load(open('/root/smartlaser/data/products_complete.json',encoding='utf-8'))
en={d['_linkGroup']:d for d in data if d['_locale']=='en'}
zh={d['_linkGroup']:d for d in data if d['_locale']=='zh'}
print('EN groups:', sorted(en.keys()))
print('ZH groups:', sorted(zh.keys()))
SKIP={18,24}
print()
print('grp  order_en order_zh  zh_short zh_full zh_specs zh_name')
for g in sorted(zh.keys()):
    z=zh[g]; e=en.get(g)
    oe = e['order'] if e else '-'
    sp=z.get('specs')
    if isinstance(sp,str):
        try: import json as J; sp=J.loads(sp)
        except: sp=None
    nspec=len(sp) if isinstance(sp,list) else 0
    flag=''
    if g in SKIP: flag=' <SKIP (no EN base)>'
    print(f"{g:3}  {str(oe):>7}  {z['order']:>7}   {len(z.get('shortDescription') or ''):>6} {len(z.get('fullDescription') or ''):>6} {nspec:>7}   {z['name'][:28]}{flag}")
