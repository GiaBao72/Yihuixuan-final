
import json
data=json.load(open('/root/smartlaser/data/products_complete.json',encoding='utf-8'))
en=[d for d in data if d['_locale']=='en']
vi=[d for d in data if d['_locale']=='vi']
eng=sorted(set(d['_linkGroup'] for d in en))
vig=sorted(set(d['_linkGroup'] for d in vi))
print('EN groups:', eng)
print('VI groups:', vig)
print()
SKIP={18,24}
print('%-4s %-8s %-8s %-8s %-8s %s' % ('grp','vi_short','vi_full','vi_specs','skip?','vi_name'))
vimap={d['_linkGroup']:d for d in vi}
for g in eng:
    d=vimap.get(g)
    if not d:
        print('%-4d MISSING VI' % g); continue
    specs=d.get('specs')
    if isinstance(specs,str):
        try: import json as j; specs=j.loads(specs)
        except: specs=None
    ns=len(specs) if isinstance(specs,list) else 0
    sk='SKIP' if g in SKIP else ''
    print('%-4d %-8d %-8d %-8d %-8s %s' % (g, len(d.get('shortDescription') or ''), len(d.get('fullDescription') or ''), ns, sk, d['name'][:40]))
