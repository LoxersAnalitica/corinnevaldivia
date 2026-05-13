import { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import translations from './i18n'
import './index.css'

/* ═══ SVG Icons ══════════════════════════════════════════ */
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
)
const TrendUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
)
const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
)
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
)
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
)

/* ═══ App ════════════════════════════════════════════════ */
function App() {
  const [lang, setLang] = useState('es')
  const [modal, setModal] = useState(null) // 'buyer' | 'investor' | 'seller'
  const t = translations[lang]

  return (
    <>
      {/* Language Toggle */}
      <div className="lang-toggle">
        <button className={`lang-btn ${lang === 'es' ? 'active' : ''}`} onClick={() => setLang('es')}>ES</button>
        <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
      </div>

      <Header t={t} />
      <Hero t={t} onBuy={() => setModal('buyer')} onSell={() => setModal('seller')} />
      <ExpertiseSection t={t} onBuyer={() => setModal('buyer')} onInvestor={() => setModal('investor')} onSeller={() => setModal('seller')} />
      <StatsBar t={t} />
      <AboutSection t={t} onContact={() => setModal('buyer')} />
      <BuyerGuideSection t={t} onOpen={() => setModal('buyer')} />
      <InvestorGuideSection t={t} onOpen={() => setModal('investor')} />
      <SellerGuideSection t={t} onOpen={() => setModal('seller')} />
      <QuoteSection t={t} />
      <Footer t={t} />
      <WhatsAppButton t={t} />

      {modal && <LeadModal type={modal} t={t} lang={lang} onClose={() => setModal(null)} />}
    </>
  )
}

/* ═══ Header ═════════════════════════════════════════════ */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <div className="logo">Corinne <span>Valdivia</span></div>
      </div>
    </header>
  )
}

/* ═══ Hero ═══════════════════════════════════════════════ */
function Hero({ t, onBuy, onSell }) {
  return (
    <section className="hero">
      <img src="/assets/marbella-hero.png" alt="Marbella coastline" className="hero-bg" />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <span className="hero-tag">{t.heroTag}</span>
        <h1>{t.heroTitle[0]}<br /><em>{t.heroTitle[1]}</em>{t.heroTitle[2]}</h1>
        <p className="hero-subtitle">{t.heroSubtitle}</p>
        <div className="hero-ctas">
          <button className="btn btn-gold" onClick={onBuy}>{t.ctaBuy}</button>
          <button className="btn btn-outline" onClick={onSell}>{t.ctaSell}</button>
        </div>
      </div>
    </section>
  )
}

/* ═══ Expertise ══════════════════════════════════════════ */
function ExpertiseSection({ t, onBuyer, onInvestor, onSeller }) {
  return (
    <section className="section">
      <div className="container section-center">
        <span className="section-tag">{t.expertiseTag}</span>
        <h2 className="section-title">{t.expertiseTitle[0]}<em>{t.expertiseTitle[1]}</em></h2>
        <p className="section-desc">{t.expertiseDesc}</p>
        <div className="expertise-grid">
          <div className="expertise-card" onClick={onBuyer} style={{ cursor: 'pointer' }}>
            <div className="expertise-icon"><HomeIcon /></div>
            <h3>{t.buyerTitle}</h3>
            <p>{t.buyerDesc}</p>
          </div>
          <div className="expertise-card" onClick={onInvestor} style={{ cursor: 'pointer' }}>
            <div className="expertise-icon"><TrendUpIcon /></div>
            <h3>{t.investorTitle}</h3>
            <p>{t.investorDesc}</p>
          </div>
          <div className="expertise-card" onClick={onSeller} style={{ cursor: 'pointer' }}>
            <div className="expertise-icon"><TagIcon /></div>
            <h3>{t.sellerTitle}</h3>
            <p>{t.sellerDesc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══ About Section ══════════════════════════════════════ */
function AboutSection({ t, onContact }) {
  return (
    <section className="about-section section">
      <div className="container">
        <div className="about-layout">
          <div className="about-portrait">
            <div className="about-portrait-wrapper">
              <img src="/assets/corinne-portrait.jpg" alt="Corinne Valdivia" />
              <div className="about-portrait-border" />
            </div>
          </div>
          <div className="about-text">
            <span className="section-tag">{t.aboutTag}</span>
            <h2 className="about-name">{t.aboutTitle[0]}<em>{t.aboutTitle[1]}</em></h2>
            <p className="about-role">{t.aboutSubtitle}</p>
            <div className="gold-divider" />
            <p className="about-bio">{t.aboutBio}</p>
            <p className="about-bio">{t.aboutBio2}</p>
            <p className="about-philosophy">"{t.aboutPhilosophy}"</p>
            <button className="btn btn-gold" onClick={onContact}>{t.aboutCta}</button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══ Stats Bar ══════════════════════════════════════════ */
function StatsBar({ t }) {
  return (
    <div className="stats-bar">
      <div className="container">
        <div className="stats-grid">
          <div><div className="stat-number">12+</div><div className="stat-label">{t.statsYears}</div></div>
          <div><div className="stat-number">300+</div><div className="stat-label">{t.statsClients}</div></div>
          <div><div className="stat-number">85</div><div className="stat-label">{t.statsValue}</div></div>
          <div><div className="stat-number">100</div><div className="stat-label">{t.statsExclusive}</div></div>
        </div>
      </div>
    </div>
  )
}

/* ═══ Lead Magnet Sections ═══════════════════════════════ */
function BuyerGuideSection({ t, onOpen }) {
  return (
    <section className="section" style={{ borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <div className="lead-magnet">
          <div className="lead-magnet-image"><img src="/assets/buyer-guide.png" alt="Buyer's Guide" /></div>
          <div className="lead-magnet-text">
            <span className="section-tag">{t.buyerGuideTag}</span>
            <h2>{t.buyerGuideTitle[0]}<em>{t.buyerGuideTitle[1]}</em></h2>
            <div className="gold-divider" />
            <p>{t.buyerGuideDesc}</p>
            <ul className="lead-magnet-list">
              {t.buyerGuideList.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <button className="btn btn-gold" onClick={onOpen}>{t.downloadGuide}</button>
          </div>
        </div>
      </div>
    </section>
  )
}

function InvestorGuideSection({ t, onOpen }) {
  return (
    <section className="section" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <div className="lead-magnet reverse">
          <div className="lead-magnet-image"><img src="/assets/investor-guide.png" alt="Investor Report" /></div>
          <div className="lead-magnet-text">
            <span className="section-tag">{t.investorGuideTag}</span>
            <h2>{t.investorGuideTitle[0]}<em>{t.investorGuideTitle[1]}</em></h2>
            <div className="gold-divider" />
            <p>{t.investorGuideDesc}</p>
            <ul className="lead-magnet-list">
              {t.investorGuideList.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <button className="btn btn-gold" onClick={onOpen}>{t.downloadReport}</button>
          </div>
        </div>
      </div>
    </section>
  )
}

function SellerGuideSection({ t, onOpen }) {
  return (
    <section className="section" style={{ borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <div className="lead-magnet">
          <div className="lead-magnet-image"><img src="/assets/seller-guide.png" alt="Seller's Guide" /></div>
          <div className="lead-magnet-text">
            <span className="section-tag">{t.sellerGuideTag}</span>
            <h2>{t.sellerGuideTitle[0]}<em>{t.sellerGuideTitle[1]}</em></h2>
            <div className="gold-divider" />
            <p>{t.sellerGuideDesc}</p>
            <ul className="lead-magnet-list">
              {t.sellerGuideList.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <button className="btn btn-gold" onClick={onOpen}>{t.requestValuation}</button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══ Quote ══════════════════════════════════════════════ */
function QuoteSection({ t }) {
  return (
    <section className="quote-section section">
      <div className="container">
        <div className="quote-box">
          <p className="quote-text">{t.quoteText}</p>
          <p className="quote-author">{t.quoteAuthor}</p>
        </div>
      </div>
    </section>
  )
}

/* ═══ Lead Modal (Multi-step Form) ═══════════════════════ */
function LeadModal({ type, t, lang, onClose }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ email: '', name: '', phone: '', purpose: '' })
  const [status, setStatus] = useState('idle')

  const isBuyer = type === 'buyer'
  const isInvestor = type === 'investor'
  const isSeller = type === 'seller'
  const totalSteps = isBuyer ? 4 : 3

  const titles = {
    buyer: { title: t.formBuyerTitle, sub: t.formBuyerSubtitle },
    investor: { title: t.formInvestorTitle, sub: t.formInvestorSubtitle },
    seller: { title: t.formSellerTitle, sub: t.formSellerSubtitle },
  }

  const getTag = () => {
    if (isBuyer) return 'Comprador'
    if (isInvestor) return 'Inversor'
    return 'Propietario'
  }

  const handleSubmit = async () => {
    setStatus('submitting')
    try {
      const tagName = getTag()
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        tag: tagName,
        purpose: formData.purpose || '',
        type: type,
      }
      const response = await fetch('/api/kommo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        setStatus('success')
        if (window.gtag) {
          window.gtag('event', 'generate_lead', { event_category: 'form', event_label: tagName })
        }
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const nextStep = () => {
    if (step === 1 && (!formData.email || !formData.email.includes('@'))) {
      alert(lang === 'es' ? 'Introduce un email válido.' : 'Please enter a valid email.')
      return
    }
    if (step === 2 && (!formData.name || formData.name.trim().length < 2)) {
      alert(lang === 'es' ? 'Introduce tu nombre completo.' : 'Please enter your full name.')
      return
    }
    if (step === 3 && (!formData.phone || formData.phone.length < 8)) {
      alert(lang === 'es' ? 'Introduce un teléfono válido.' : 'Please enter a valid phone number.')
      return
    }
    if (step === totalSteps) {
      if (isBuyer && !formData.purpose) {
        alert(lang === 'es' ? 'Selecciona tu objetivo.' : 'Please select your goal.')
        return
      }
      handleSubmit()
      return
    }
    setStep(step + 1)
  }

  if (status === 'success') {
    const successMsg = isBuyer ? t.formSuccessBuyer : isInvestor ? t.formSuccessInvestor : t.formSuccessSeller
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>×</button>
          <div className="form-success">
            <div className="form-success-icon"><CheckIcon /></div>
            <h3>{t.formSuccessTitle}</h3>
            <p>{successMsg}</p>
            <p style={{ marginTop: '0.5rem' }}>{t.formSuccessMsg}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">{titles[type].title}</h2>
        <p className="modal-subtitle">{titles[type].sub}</p>

        {/* Progress Bar */}
        <div className="progress-bar">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`progress-step ${i + 1 === step ? 'active' : ''} ${i + 1 < step ? 'completed' : ''}`} />
          ))}
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <div className="form-group">
            <label className="form-label">{t.formEmail}</label>
            <input className="form-input" type="email" placeholder={t.formEmailPlaceholder}
              value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
              autoFocus
            />
            <button className="form-btn" onClick={nextStep} style={{ marginTop: '16px' }}>{t.formContinue}</button>
          </div>
        )}

        {/* Step 2: Name */}
        {step === 2 && (
          <div className="form-group">
            <label className="form-label">{t.formName}</label>
            <input className="form-input" type="text" placeholder={t.formNamePlaceholder}
              value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
              autoFocus
            />
            <button className="form-btn" onClick={nextStep} style={{ marginTop: '16px' }}>{t.formContinue}</button>
            <button className="form-back" onClick={() => setStep(1)}>{t.formBack}</button>
          </div>
        )}

        {/* Step 3: Phone */}
        {step === 3 && (
          <div className="form-group">
            <label className="form-label">{t.formPhone}</label>
            <PhoneInput international defaultCountry="ES"
              value={formData.phone} onChange={val => setFormData({ ...formData, phone: val || '' })}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px', fontStyle: 'italic' }}>
              {isSeller ? t.formPhoneNoteSeller : t.formPhoneNote}
            </p>
            {!isBuyer ? (
              <>
                {status === 'error' && <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '8px' }}>{lang === 'es' ? 'Error al enviar. Inténtalo de nuevo.' : 'Error sending. Please try again.'}</p>}
                <button className="form-btn" onClick={nextStep} disabled={status === 'submitting'} style={{ marginTop: '16px' }}>
                  {status === 'submitting' ? t.formSending : t.formSubmit}
                </button>
              </>
            ) : (
              <button className="form-btn" onClick={nextStep} style={{ marginTop: '16px' }}>{t.formContinue}</button>
            )}
            <button className="form-back" onClick={() => setStep(2)}>{t.formBack}</button>
          </div>
        )}

        {/* Step 4: Purpose (Buyer only) */}
        {step === 4 && isBuyer && (
          <div className="form-group">
            <label className="form-label">{t.formPurpose}</label>
            <div className="radio-group">
              {[
                { value: 'Vivienda habitual', label: t.purposeResidence },
                { value: 'Segunda residencia', label: t.purposeSecond },
                { value: 'Inversión', label: t.purposeInvestment },
              ].map(opt => (
                <label key={opt.value} className={`radio-option ${formData.purpose === opt.value ? 'selected' : ''}`}>
                  <input type="radio" name="purpose" value={opt.value}
                    checked={formData.purpose === opt.value}
                    onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {status === 'error' && <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '8px' }}>{lang === 'es' ? 'Error al enviar. Inténtalo de nuevo.' : 'Error sending. Please try again.'}</p>}
            <button className="form-btn" onClick={nextStep} disabled={status === 'submitting' || !formData.purpose} style={{ marginTop: '16px', opacity: formData.purpose ? 1 : 0.5 }}>
              {status === 'submitting' ? t.formSending : t.formSubmit}
            </button>
            <button className="form-back" onClick={() => setStep(3)}>{t.formBack}</button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══ WhatsApp Float ═════════════════════════════════════ */
function WhatsAppButton({ t }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const timer = setTimeout(() => setVisible(true), 1500); return () => clearTimeout(timer) }, [])
  const msg = encodeURIComponent(t.waMessage)
  return (
    <a href={`https://wa.me/34919934639?text=${msg}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
      className={`whatsapp-float ${visible ? 'visible' : ''}`}>
      <WhatsAppIcon />
    </a>
  )
}

/* ═══ Footer ═════════════════════════════════════════════ */
function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-logo">Corinne <span style={{ color: 'var(--accent-gold)' }}>Valdivia</span></p>
        <p>{t.footerSubtext}</p>
        <div className="footer-links">
          <a href="#">{t.privacyPolicy}</a>
        </div>
      </div>
    </footer>
  )
}

export default App
