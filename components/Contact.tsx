'use client';

import { useState, FormEvent } from 'react';
import { useLang } from '@/lib/useLang';
import '@/app/styles/contact.css';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { lang, t } = useLang();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    console.log('Form data:', Object.fromEntries(formData));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert(t.form_success);
    e.currentTarget.reset();
    setIsSubmitting(false);
  };

  return (
    <section className="fp-slide contact-section" id="s10">
      <div className="grid-bg"></div>
      <div className="orb orb3"></div>
      
      <div className="slide-inner">
        <div className="contact-grid">
          <div className="contact-info-col">
            <div className="sec-label anim">{t.contact_label}</div>
            <h2 className="sec-title anim">
              {t.contact_title}<br/><em>{t.contact_title_em}</em>
            </h2>
            <p className="sec-sub anim">{t.contact_subtitle}</p>
            
            <div className="ci-list">
              <ContactInfo 
                icon={<LocationIcon />}
                title={t.contact_address}
                content={
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Cụm+CN+Hạp+Lĩnh,+P.+Hạp+Lĩnh,+TP.+Bắc+Ninh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {t.contact_address_full}
                  </a>
                }
                delay={0.1}
              />
              <ContactInfo 
                icon={<EmailIcon />}
                title={t.contact_email_vn}
                content={<a href="mailto:nghehuyhienvn@gmail.com">nghehuyhienvn@gmail.com</a>}
                delay={0.2}
              />
              <ContactInfo 
                icon={<GlobalIcon />}
                title={t.contact_china}
                content={<>{t.contact_china_location} · <a href="mailto:boernazn@163.com">boernazn@163.com</a></>}
                delay={0.3}
              />
            </div>
          </div>

          <div className="contact-form-col">
            <div className="form-wrap anim" style={{ animationDelay: '0.4s' }}>
              <form id="cForm" onSubmit={handleSubmit}>
                <div className="form-row">
                  <FormField 
                    label={`${t.form_name} *`} 
                    name="name" 
                    placeholder={t.form_name_placeholder} 
                    required 
                  />
                  <FormField 
                    label={t.form_company} 
                    name="company" 
                    placeholder={t.form_company_placeholder} 
                  />
                </div>
                
                <div className="form-row">
                  <FormField 
                    label={`${t.form_email} *`} 
                    name="email" 
                    type="email" 
                    placeholder="email@company.com" 
                    required 
                  />
                  <FormField 
                    label={t.form_phone} 
                    name="phone" 
                    type="tel" 
                    placeholder={t.form_phone_placeholder} 
                  />
                </div>
                
                <div className="fg full">
                  <label>{t.form_product_label}</label>
                  <select name="product">
                    <option value="">{t.form_product_select}</option>
                    <option value="marking">{t.form_product_marking}</option>
                    <option value="skinning">{t.form_product_skinning}</option>
                    <option value="welding">{t.form_product_welding}</option>
                    <option value="cutting">{t.form_product_cutting}</option>
                    <option value="automation">{t.form_product_automation}</option>
                  </select>
                </div>
                
                <div className="fg full">
                  <label>{t.form_message} *</label>
                  <textarea 
                    name="description"
                    placeholder={t.form_message_placeholder} 
                    required 
                    rows={5}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary btn-submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.form_submitting : t.form_submit}
                  {!isSubmitting && <span className="btn-arr">→</span>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="contact-footer">
        <span>&copy; 2022–2025 {t.contact_footer_rights}</span>
        <span>{t.contact_footer_location} · <a href="mailto:nghehuyhienvn@gmail.com">nghehuyhienvn@gmail.com</a></span>
      </footer>
    </section>
  );
}

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  delay: number;
}

function ContactInfo({ icon, title, content, delay }: ContactInfoProps) {
  return (
    <div className="ci-item anim" style={{ animationDelay: `${delay}s` }}>
      <div className="ci-icon">{icon}</div>
      <div className="ci-content">
        <h4 className="ci-title">{title}</h4>
        <p className="ci-text">{content}</p>
      </div>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}

function FormField({ label, name, type = 'text', placeholder, required = false }: FormFieldProps) {
  return (
    <div className="fg">
      <label>{label}</label>
      <input type={type} name={name} placeholder={placeholder} required={required} />
    </div>
  );
}

function LocationIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  );
}

function GlobalIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
    </svg>
  );
}