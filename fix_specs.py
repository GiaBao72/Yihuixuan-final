# -*- coding: utf-8 -*-
import json, requests, os
BASE='http://127.0.0.1:1337'
TOK=os.environ['TOK']
H={'Authorization':f'Bearer {TOK}','Content-Type':'application/json'}

HEADING={'vi':'Th\u00f4ng s\u1ed1 k\u1ef9 thu\u1eadt','zh':'\u6280\u672f\u53c2\u6570','en':'Specifications'}

# exact value replacements (VN -> localized). Applied to zh and en only.
ZH={
 'Gi\u00f3':'\u98ce\u51b7',
 'N\u01b0\u1edbc':'\u6c34\u51b7',
 'Gi\u00f3 / N\u01b0\u1edbc':'\u98ce\u51b7 / \u6c34\u51b7',
 'S\u1ee3i quang':'\u5149\u7ea4',
 'Li\u00ean t\u1ee5c / Xung':'\u8fde\u7eed / \u8109\u51b2',
 'Camera':'\u76f8\u673a',
 'H\u1ed3ng ngo\u1ea1i / CCD':'\u7ea2\u5916 / CCD',
 'H\u1ed3ng ngo\u1ea1i / Camera CCD':'\u7ea2\u5916 / CCD\u76f8\u673a',
 '\u0110\u00f4i v\u1ecb tr\u00ed ch\u00e2n \u0111\u1ea1p':'\u53cc\u5de5\u4f4d\u811a\u8e0f',
 '\u0110\u00f4i v\u1ecb tr\u00ed, ti\u1ebfn l\u00f9i':'\u53cc\u5de5\u4f4d\uff0c\u524d\u540e',
 'Tr\u1ee5c XYZ':'XYZ\u8f74',
 'PC + Card \u0111i\u1ec1u khi\u1ec3n PLC':'PC + PLC\u63a7\u5236\u5361',
 'PC + Card \u0111i\u1ec1u khi\u1ec3n t\u1eebng b\u01b0\u1edbc':'PC + \u6b65\u8fdb\u63a7\u5236\u5361',
 'Camera \u0111\u1ed3ng tr\u1ee5c':'\u540c\u8f74\u76f8\u673a',
 'Tr\u00f2n, ch\u1eef nh\u1eadt, vu\u00f4ng, elip, tuy\u1ebfn t\u00ednh; c\u00f3 th\u1ec3 t\u00f9y ch\u1ec9nh':'\u5706\u5f62\u3001\u77e9\u5f62\u3001\u65b9\u5f62\u3001\u692d\u5706\u3001\u7ebf\u6027\uff1b\u53ef\u5b9a\u5236',
 'Tr\u00f2n, vu\u00f4ng, ch\u1eef nh\u1eadt, elip, tuy\u1ebfn t\u00ednh; t\u00f9y ch\u1ec9nh':'\u5706\u5f62\u3001\u65b9\u5f62\u3001\u77e9\u5f62\u3001\u692d\u5706\u3001\u7ebf\u6027\uff1b\u53ef\u5b9a\u5236',
 'D\u00e0i \u00b15, \u00b110%':'\u957f\u5ea6 \u00b15, \u00b110%',
 '250mm / \u0110\u01a1n v\u1ecb':'250mm / \u5355\u4f4d',
 '~2000 \u0111i\u1ec3m/gi\u1edd':'~2000\u70b9/\u5c0f\u65f6',
 '20\u2013240W c\u00f3 th\u1ec3 \u0111i\u1ec1u ch\u1ec9nh':'20\u2013240W \u53ef\u8c03',
}
EN={
 'Gi\u00f3':'Air',
 'N\u01b0\u1edbc':'Water',
 'Gi\u00f3 / N\u01b0\u1edbc':'Air / Water',
 'S\u1ee3i quang':'Fiber',
 'Li\u00ean t\u1ee5c / Xung':'Continuous / Pulse',
 'H\u1ed3ng ngo\u1ea1i / CCD':'Infrared / CCD',
 'H\u1ed3ng ngo\u1ea1i / Camera CCD':'Infrared / CCD Camera',
 '\u0110\u00f4i v\u1ecb tr\u00ed ch\u00e2n \u0111\u1ea1p':'Dual-position foot pedal',
 '\u0110\u00f4i v\u1ecb tr\u00ed, ti\u1ebfn l\u00f9i':'Dual-position, forward-backward',
 'Tr\u1ee5c XYZ':'XYZ axis',
 'PC + Card \u0111i\u1ec1u khi\u1ec3n PLC':'PC + PLC control card',
 'PC + Card \u0111i\u1ec1u khi\u1ec3n t\u1eebng b\u01b0\u1edbc':'PC + stepper control card',
 'Camera \u0111\u1ed3ng tr\u1ee5c':'Coaxial camera',
 'Tr\u00f2n, ch\u1eef nh\u1eadt, vu\u00f4ng, elip, tuy\u1ebfn t\u00ednh; c\u00f3 th\u1ec3 t\u00f9y ch\u1ec9nh':'Round, rectangular, square, elliptical, linear; customizable',
 'Tr\u00f2n, vu\u00f4ng, ch\u1eef nh\u1eadt, elip, tuy\u1ebfn t\u00ednh; t\u00f9y ch\u1ec9nh':'Round, square, rectangular, elliptical, linear; customizable',
 'D\u00e0i \u00b15, \u00b110%':'Length \u00b15, \u00b110%',
 '250mm / \u0110\u01a1n v\u1ecb':'250mm / Unit',
 '~2000 \u0111i\u1ec3m/gi\u1edd':'~2000 points/hour',
 '20\u2013240W c\u00f3 th\u1ec3 \u0111i\u1ec1u ch\u1ec9nh':'20\u2013240W adjustable',
}
SUB={  # substring replacements
 'zh':[('(c\u00f4ng su\u1ea5t \u0111\u1ec9nh)','(\u5cf0\u503c\u529f\u7387)'),('c\u00f3 th\u1ec3 \u0111i\u1ec1u ch\u1ec9nh','\u53ef\u8c03')],
 'en':[('(c\u00f4ng su\u1ea5t \u0111\u1ec9nh)','(peak power)'),('c\u00f3 th\u1ec3 \u0111i\u1ec1u ch\u1ec9nh','adjustable')],
}

def fix_value(val, locale):
    if locale=='vi' or not isinstance(val,str): return val
    m = ZH if locale=='zh' else EN
    if val in m: return m[val]
    out=val
    for a,b in SUB.get(locale,[]):
        out=out.replace(a,b)
    return out

def gen_html(name, full, specs, locale):
    h=HEADING[locale]
    rows=''
    for s in (specs or []):
        lab=s.get('label',''); val=s.get('value','')
        rows+=('      <tr style="border-bottom: 1px solid #ddd;">\n'
               f'        <td style="padding: 12px; font-weight: 600; width: 40%;">{lab}</td>\n'
               f'        <td style="padding: 12px;">{val}</td>\n'
               '      </tr>\n')
    return ('<div class="product-detail">\n'
            f'  <h2 style="font-size: 24px; border-bottom: 2px solid; padding-bottom: 10px; margin-bottom: 20px;">{name}</h2>\n'
            f'  <div style="margin-bottom: 30px; line-height: 1.8;">{full}</div>\n'
            f'  <h3 style="font-size: 20px; margin-top: 30px; margin-bottom: 15px;">{h}</h3>\n'
            '  <table style="width: 100%; border-collapse: collapse;">\n    <tbody>\n'
            f'{rows}    </tbody>\n  </table>\n</div>')

import re
VN_RE=re.compile('[\u00c0-\u1ef9]')  # rough latin-diacritic detector

total_fixed=0; leftovers=[]
for locale in ['vi','zh','en']:
    r=requests.get(f'{BASE}/api/products?locale={locale}&pagination[pageSize]=100&fields[0]=name&fields[1]=fullDescription&fields[2]=specs',headers=H).json()
    for pr in r['data']:
        pid=pr['id']; a=pr['attributes']
        name=a['name']; full=a.get('fullDescription') or ''
        specs=a.get('specs') or []
        changed=False
        newspecs=[]
        for s in specs:
            nv=fix_value(s.get('value',''), locale)
            if nv!=s.get('value'): changed=True
            newspecs.append({'label':s.get('label',''),'value':nv})
        # leftover VN detection in zh/en values
        if locale in ('zh','en'):
            for s in newspecs:
                v=s.get('value','')
                if isinstance(v,str) and VN_RE.search(v):
                    # skip pure units; report
                    leftovers.append((locale,pid,s.get('label'),v))
        html=gen_html(name, full, newspecs, locale)
        body={'specs':newspecs,'detailedContent':html}
        u=requests.put(f'{BASE}/api/products/{pid}?locale={locale}',json={'data':body},headers=H)
        if u.status_code==200:
            if changed: total_fixed+=1
        else:
            print('FAIL',locale,pid,u.status_code,u.text[:120])
print('specs-fixed records:', total_fixed)
print('LEFTOVER VN in zh/en values:', len(leftovers))
for x in leftovers[:40]: print('  ',x)
