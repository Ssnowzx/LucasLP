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
const vagasMap = [0, 2, 3, 3, 4, 4, 5]
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
   FLOATING CTA — Show after hero
   ============================================================ */
const floatingCta = document.getElementById('floatingCta')
const heroSection = document.getElementById('hero')

if (floatingCta && heroSection) {
  const floatObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      floatingCta.classList.add('visible')
    } else {
      floatingCta.classList.remove('visible')
    }
  }, { threshold: 0 })

  floatObserver.observe(heroSection)
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

const sectionTrack = { investimento: 'ViewContent', 'cta-final': 'Lead' }

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
