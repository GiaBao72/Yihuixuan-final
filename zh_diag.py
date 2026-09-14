
import json, requests, os
BASE='http://127.0.0.1:1337'
TOK=os.environ['TOK']
H={'Authorization':f'Bearer {TOK}','Content-Type':'application/json'}

en=requests.get(f'{BASE}/api/products?locale=en&pagination[pageSize]=100&populate=mainImage',headers=H).json()['data']
print('EN count:', len(en))
print('EN orders:', sorted([p["attributes"]["order"] for p in en]))
en_with_img=[(p["attributes"]["order"], (p["attributes"].get("mainImage") or {}).get("data")) for p in en]
print('EN order->hasImg sample:', [(o, bool(m)) for o,m in en_with_img][:8])

zh=requests.get(f'{BASE}/api/products?locale=zh&pagination[pageSize]=100',headers=H).json()['data']
print('ZH count:', len(zh))
print('ZH orders:', sorted([p["attributes"]["order"] for p in zh]))
