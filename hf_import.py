
import json, requests, os, time
BASE='http://127.0.0.1:1337'
TOK=os.environ['TOK']
H={'Authorization':f'Bearer {TOK}','Content-Type':'application/json'}

data=json.load(open('/root/smartlaser/data/products_complete.json',encoding='utf-8'))
TARGET=[18,24]

# group -> {locale: record}
by=dict()
for d in data:
    if d['_linkGroup'] in TARGET:
        by.setdefault(d['_linkGroup'],{})[d['_locale']]=d

# image media id per group (from server uploads)
files=requests.get(f'{BASE}/api/upload/files?pagination[pageSize]=200',headers=H).json()
arr=files if isinstance(files,list) else files.get('results',[])
img_of={}
for f in arr:
    nm=f.get('name','')
    if nm.startswith('p18'): img_of[18]=f['id']
    if nm.startswith('p24'): img_of[24]=f['id']
print('img_of:', img_of)

created=0
for order_i, g in enumerate(TARGET, start=1):
    recs=by[g]
    vi=recs['vi']
    body={'data':{
        'name':vi['name'],
        'description':vi.get('shortDescription') or vi.get('fullDescription') or '',
        'mediaType':'image',
        'order':order_i,
        'isActive':True,
        'locale':'vi',
        'publishedAt':'2026-08-29T00:00:00.000Z',
    }}
    if g in img_of: body['data']['mainImage']=img_of[g]
    r=requests.post(f'{BASE}/api/homepage-features',json=body,headers=H)
    if r.status_code!=200:
        print('FAIL vi grp',g,r.status_code,r.text[:200]); continue
    hid=r.json()['data']['id']
    created+=1
    print(f'created vi grp{g} id{hid}')
    # localizations zh, en
    for loc in ['zh','en']:
        d=recs.get(loc)
        if not d: continue
        lb={
            'name':d['name'],
            'description':d.get('shortDescription') or d.get('fullDescription') or '',
            'locale':loc,
        }
        rr=requests.post(f'{BASE}/api/homepage-features/{hid}/localizations',json=lb,headers=H)
        if rr.status_code in (200,201):
            print(f'  linked {loc} grp{g}')
        else:
            print(f'  FAIL {loc} grp{g}',rr.status_code,rr.text[:150])
        time.sleep(0.2)

# publish all
v=requests.get(f'{BASE}/api/homepage-features?locale=all&publicationState=preview&pagination[pageSize]=100',headers=H).json()['data']
pub=0
for p in v:
    if not p['attributes'].get('publishedAt'):
        loc=p['attributes'].get('locale','vi')
        u=requests.put(f"{BASE}/api/homepage-features/{p['id']}?locale={loc}",json={'data':{'publishedAt':'2026-08-29T00:00:00.000Z'}},headers=H)
        if u.status_code==200: pub+=1
print('published:',pub)

for loc in ['vi','zh','en']:
    pc=requests.get(f'{BASE}/api/homepage-features?locale={loc}&pagination[pageSize]=100')
    print(f'PUBLIC {loc} total:', pc.json().get('meta',{}).get('pagination',{}).get('total'))
