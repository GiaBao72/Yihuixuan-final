
import json, requests, os, time
BASE='http://127.0.0.1:1337'
TOK=os.environ['TOK']
H={'Authorization':f'Bearer {TOK}','Content-Type':'application/json'}

CAT={
 'marking':   {'vi':'Danh dau laser','zh':'jiguang dabiao','en':'Laser Marking'},
 'skinning':  {'vi':'Boc vo day','zh':'jiguang boxian','en':'Wire Stripping'},
 'welding':   {'vi':'Han laser','zh':'jiguang hanjie','en':'Laser Welding'},
 'cutting':   {'vi':'Cat laser','zh':'jiguang qiege','en':'Laser Cutting'},
 'automation':{'vi':'Tu dong hoa','zh':'zidonghua shebei','en':'Automation Equipment'},
}
# real unicode values
CAT['marking']['vi']='\u0110\u00e1nh d\u1ea5u laser'
CAT['marking']['zh']='\u6fc0\u5149\u6253\u6807'
CAT['skinning']['vi']='B\u00f3c v\u1ecf d\u00e2y'
CAT['skinning']['zh']='\u6fc0\u5149\u5265\u7ebf'
CAT['welding']['vi']='H\u00e0n laser'
CAT['welding']['zh']='\u6fc0\u5149\u710a\u63a5'
CAT['cutting']['vi']='C\u1eaft laser'
CAT['cutting']['zh']='\u6fc0\u5149\u5207\u5272'
CAT['automation']['vi']='T\u1ef1 \u0111\u1ed9ng h\u00f3a'
CAT['automation']['zh']='\u81ea\u52a8\u5316\u8bbe\u5907'

G2C={1:'marking',2:'marking',3:'marking',4:'marking',5:'automation',
 6:'skinning',7:'skinning',8:'skinning',9:'skinning',
 10:'welding',11:'welding',12:'welding',13:'welding',14:'welding',
 15:'welding',16:'welding',17:'welding',19:'welding',20:'cutting'}

data=json.load(open('/root/smartlaser/data/products_complete.json',encoding='utf-8'))
en_name2grp={d['name'].strip():d['_linkGroup'] for d in data if d['_locale']=='en'}

# EN products with localizations
srv=requests.get(f'{BASE}/api/products?locale=en&pagination[pageSize]=200&populate=localizations',headers=H).json()['data']
print('EN products:',len(srv))

done=0
for pr in srv:
    a=pr['attributes']
    g=en_name2grp.get(a['name'].strip())
    if g is None or g not in G2C:
        print('skip (no cat):', a['name'][:40]); continue
    key=G2C[g]
    # EN row
    r=requests.put(f"{BASE}/api/products/{pr['id']}?locale=en",json={'data':{'category':CAT[key]['en']}},headers=H)
    if r.status_code==200: done+=1
    else: print('FAIL en',pr['id'],r.status_code,r.text[:100])
    # localized rows
    for l in a.get('localizations',{}).get('data',[]):
        loc=l['attributes'].get('locale')
        if loc in ('vi','zh'):
            rr=requests.put(f"{BASE}/api/products/{l['id']}?locale={loc}",json={'data':{'category':CAT[key][loc]}},headers=H)
            if rr.status_code==200: done+=1
            else: print('FAIL',loc,l['id'],rr.status_code,rr.text[:100])
    time.sleep(0.1)
print('category rows updated:',done)

for loc in ('vi','zh','en'):
    d=requests.get(f'{BASE}/api/products?locale={loc}&pagination[pageSize]=100&fields[0]=name&fields[1]=category',headers=H).json()['data']
    from collections import Counter
    cnt=Counter(x['attributes'].get('category') for x in d)
    print(loc, dict(cnt))
