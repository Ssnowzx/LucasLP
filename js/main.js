import '../css/styles.css'

/* ============================================================
   SCROLL REVEAL — 4 directions with blur + stagger
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' })

document.querySelectorAll('.anim-up,.anim-down,.anim-left,.anim-right').forEach(el => {
  revealObserver.observe(el)
})

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10)
  const prefix = el.dataset.prefix || ''
  const suffix = el.dataset.suffix || ''
  const duration = 2000
  const start = performance.now()

  function update(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(eased * target)
    el.textContent = prefix + current + suffix
    if (progress < 1) requestAnimationFrame(update)
  }

  requestAnimationFrame(update)
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target)
      counterObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.5 })

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el))

/* ============================================================
   DYNAMIC SCARCITY — Day-based vagas counter
   ============================================================ */
const vagasMap = [7, 7, 8, 8, 8, 9, 7]
const vagasEl = document.getElementById('vagasCounter')
if (vagasEl) {
  vagasEl.textContent = vagasMap[new Date().getDay()]
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
const hamburger = document.getElementById('hamburger')
const mobileMenu = document.getElementById('mobileMenu')

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('active')
    hamburger.classList.toggle('active', isOpen)
  })

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active')
      hamburger.classList.remove('active')
    })
  })
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
document.querySelectorAll('.faq__question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement
    const wasActive = item.classList.contains('active')

    document.querySelectorAll('.faq__item.active').forEach(open => {
      open.classList.remove('active')
      open.querySelector('.faq__question').setAttribute('aria-expanded', 'false')
    })

    if (!wasActive) {
      item.classList.add('active')
      button.setAttribute('aria-expanded', 'true')
    }
  })
})

/* ============================================================
   SMOOTH SCROLL with offset
   ============================================================ */
const navbar = document.getElementById('navbar')

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href')
    if (id === '#') return
    const target = document.querySelector(id)
    if (target) {
      e.preventDefault()
      const offset = (navbar?.offsetHeight || 60) + 20
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      })
    }
  })
})

/* ============================================================
   FLOATING CTA — Robust mobile trigger
   ============================================================ */
const floatingCta = document.getElementById('floatingCta')
if (floatingCta) {
  window.addEventListener('scroll', () => {
    // Show only on mobile/tablet after 300px scroll
    if (window.innerWidth <= 860 && window.scrollY > 400) {
      floatingCta.classList.add('visible')
    } else {
      floatingCta.classList.remove('visible')
    }
  }, { passive: true })
}

/* ============================================================
   FACEBOOK PIXEL — Event Tracking
   ============================================================ */
document.querySelectorAll('.cta-track').forEach(btn => {
  btn.addEventListener('click', () => {
    const event = btn.dataset.event
    if (event && typeof fbq !== 'undefined') {
      fbq('track', event)
    }
  })
})

const sectionTrack = { investimento: 'ViewContent', 'cta-final': 'Lead', calculadora: 'ViewContent' }

const pixelObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && typeof fbq !== 'undefined') {
      const event = sectionTrack[entry.target.id]
      if (event) fbq('track', event, { content_name: entry.target.id })
      pixelObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.4 })

Object.keys(sectionTrack).forEach(id => {
  const el = document.getElementById(id)
  if (el) pixelObserver.observe(el)
})

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
const scrollProgress = document.getElementById('scrollProgress')
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    scrollProgress.style.width = scrollPercent + '%'
  }, { passive: true })
}

/* ============================================================
   ROI CALCULATOR
   ============================================================ */
const roiCalcBtn = document.getElementById('roiCalcBtn')
if (roiCalcBtn) {
  function parseNumericInput(val) {
    return parseFloat(val.replace(/[^\d.,]/g, '').replace(',', '.')) || 0
  }

  function formatCurrency(val) {
    return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  }

  function animateValue(el, targetVal, formatted) {
    const duration = 1200
    const start = performance.now()
    const startVal = 0
    function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(startVal + (targetVal - startVal) * eased)
      el.textContent = formatCurrency(current)
      if (progress < 1) requestAnimationFrame(tick)
      else el.textContent = formatted
    }
    requestAnimationFrame(tick)
  }

  roiCalcBtn.addEventListener('click', () => {
    const faturamento = parseNumericInput(document.getElementById('roiFaturamento').value)
    const margem = parseNumericInput(document.getElementById('roiMargem').value)
    const ads = parseNumericInput(document.getElementById('roiAds').value)

    if (faturamento <= 0) {
      document.getElementById('roiFaturamento').focus()
      return
    }

    const lucroAtual = faturamento * (margem / 100)
    const gastoAds = faturamento * (ads / 100)
    const desperdicio = gastoAds * 0.35
    const lucroNaoCapturado = faturamento * 0.25
    const perda = Math.round(desperdicio + lucroNaoCapturado)
    const potencial = Math.round(lucroAtual + perda * 0.6)
    const anual = potencial * 12

    const roiLoss = document.getElementById('roiLoss')
    const roiGain = document.getElementById('roiGain')
    const roiAnnual = document.getElementById('roiAnnual')
    const roiCta = document.getElementById('roiCta')

    animateValue(roiLoss, perda, formatCurrency(perda))
    animateValue(roiGain, potencial, formatCurrency(potencial))
    animateValue(roiAnnual, anual, formatCurrency(anual))

    roiCta.style.display = 'inline-flex'

    if (typeof fbq !== 'undefined') {
      fbq('track', 'ViewContent', { content_name: 'roi_calculator', value: faturamento })
    }
  })
}

/* ============================================================
   EXIT INTENT POPUP
   ============================================================ */
const exitPopup = document.getElementById('exitPopup')
if (exitPopup) {
  let exitShown = false

  function showExitPopup() {
    if (exitShown) return
    exitShown = true
    exitPopup.classList.add('active')
    if (typeof fbq !== 'undefined') {
      fbq('track', 'ViewContent', { content_name: 'exit_intent' })
    }
  }

  function hideExitPopup() {
    exitPopup.classList.remove('active')
  }

  document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget && e.clientY < 10) {
      showExitPopup()
    }
  })

  document.getElementById('exitPopupClose')?.addEventListener('click', hideExitPopup)
  document.getElementById('exitPopupOverlay')?.addEventListener('click', hideExitPopup)
  document.getElementById('exitPopupCta')?.addEventListener('click', hideExitPopup)
}

/* ============================================================
   SOCIAL PROOF TOAST — Rotating notifications
   ============================================================ */
const proofToast = document.getElementById('socialProofToast')
if (proofToast) {
  const proofData = [
    { company: 'Indústria de Calçados', action: 'solicitou diagnóstico', time: 'há 2 horas' },
    { company: 'Rede de Cosméticos', action: 'iniciou onboarding', time: 'há 4 horas' },
    { company: 'Distribuidora de EPIs', action: 'solicitou diagnóstico', time: 'há 6 horas' },
    { company: 'E-commerce de Eletrônicos', action: 'entrou na gestão', time: 'há 1 dia' },
    { company: 'Loja de Suplementos', action: 'solicitou diagnóstico', time: 'há 1 dia' }
  ]

  let proofIndex = 0
  const proofCompany = document.getElementById('proofCompany')
  const proofAction = document.getElementById('proofAction')
  const proofTime = document.getElementById('proofTime')

  function showProofToast() {
    const data = proofData[proofIndex]
    proofCompany.textContent = data.company
    proofAction.textContent = data.action
    proofTime.textContent = data.time
    proofToast.classList.add('visible')

    setTimeout(() => {
      proofToast.classList.remove('visible')
      proofIndex = (proofIndex + 1) % proofData.length
    }, 4000)
  }

  setTimeout(showProofToast, 8000)
  setInterval(showProofToast, 25000)
}

/* ============================================================
   WHATSAPP FLOATING BUTTON — Show after scroll
   ============================================================ */
const whatsappFloat = document.getElementById('whatsappFloat')
if (whatsappFloat) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      whatsappFloat.classList.add('visible')
    } else {
      whatsappFloat.classList.remove('visible')
    }
  }, { passive: true })
}

/* ============================================================
   DIAGNÓSTICO MODAL LOGIC
   ============================================================ */
const diagModal = document.getElementById('diagModal');
const leadForm = document.getElementById('leadForm');
const leadSuccess = document.getElementById('leadSuccess');

window.openDiagModal = function() {
  if (diagModal) diagModal.classList.add('active');
  // Track open event
  if (typeof fbq !== 'undefined') {
    fbq('track', 'InitiateCheckout', { content_name: 'diagnostic_modal' });
  }
}

window.closeDiagModal = function() {
  if (diagModal) {
    diagModal.classList.remove('active');
    // Wait for transition, then reset form state
    setTimeout(() => {
      if (leadForm) leadForm.style.display = 'block';
      if (leadSuccess) leadSuccess.style.display = 'none';
      if (leadForm) leadForm.reset();
    }, 400)
  }
}

// Global listeners for buttons
document.querySelectorAll('.btn-diagnostico').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openDiagModal();
  });
});

// Close listeners
document.getElementById('diagModalClose')?.addEventListener('click', closeDiagModal);
document.getElementById('diagModalOverlay')?.addEventListener('click', closeDiagModal);

// Form Submission
if (leadForm) {
  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('leadSubmit');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando...';
    }

    const formData = new FormData(leadForm);
    const leadData = Object.fromEntries(formData.entries());

    try {
      if (window.db && window.db.saveLead) {
        const success = await window.db.saveLead(leadData);
        if (success) {
          // Track Lead event
          if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', { 
              content_name: 'diagnostic_form',
              value: 0,
              currency: 'BRL'
            });
          }

          // Show Success State
          leadForm.style.display = 'none';
          leadSuccess.style.display = 'block';
        } else {
          alert('Ocorreu um erro ao enviar. Por favor, tente novamente ou entre em contato via WhatsApp.');
        }
      } else {
        console.error('Database client not ready');
        alert('Sistema em manutenção. Por favor, use o WhatsApp para contato direto.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Erro inesperado. Tente novamente em instantes.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Enviar para Diagnóstico <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>`;
      }
    }
  });
}
