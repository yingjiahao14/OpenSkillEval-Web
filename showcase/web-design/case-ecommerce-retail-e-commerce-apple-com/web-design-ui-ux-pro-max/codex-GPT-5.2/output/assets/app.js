(function(){
  function qs(root, sel){return (root || document).querySelector(sel)}
  function qsa(root, sel){return Array.from((root || document).querySelectorAll(sel))}

  function initCarousels(){
    qsa(document, '[data-carousel]').forEach(function(carousel){
      var scroller = qs(carousel, '[data-scroller]')
      var prev = qs(carousel, '[data-carousel-prev]')
      var next = qs(carousel, '[data-carousel-next]')
      if(!scroller || !prev || !next) return

      function cardStep(){
        var card = scroller.querySelector('.card')
        var style = card ? getComputedStyle(scroller) : null
        var gap = style ? parseFloat(style.columnGap || style.gap || '14') : 14
        var width = card ? card.getBoundingClientRect().width : 320
        return width + gap
      }

      function scrollByDir(dir){
        scroller.scrollBy({left: dir * Math.round(cardStep()*1.05), behavior:'smooth'})
      }

      prev.addEventListener('click', function(){scrollByDir(-1)})
      next.addEventListener('click', function(){scrollByDir(1)})

      function updateDisabled(){
        var max = scroller.scrollWidth - scroller.clientWidth
        var left = scroller.scrollLeft
        prev.disabled = left <= 2
        next.disabled = left >= (max - 2)
        prev.setAttribute('aria-disabled', String(prev.disabled))
        next.setAttribute('aria-disabled', String(next.disabled))
      }

      scroller.addEventListener('scroll', function(){
        window.requestAnimationFrame(updateDisabled)
      }, {passive:true})
      window.addEventListener('resize', updateDisabled)
      updateDisabled()
    })
  }

  function initTabs(){
    qsa(document, '[data-tabs]').forEach(function(root){
      var tabs = qsa(root, '[role="tab"]')
      var panels = qsa(root, '[role="tabpanel"]')
      if(!tabs.length || !panels.length) return

      function activate(id, focus){
        tabs.forEach(function(t){
          var on = t.getAttribute('aria-controls') === id
          t.setAttribute('aria-selected', on ? 'true' : 'false')
          t.tabIndex = on ? 0 : -1
        })
        panels.forEach(function(p){
          var on = p.id === id
          p.hidden = !on
        })
        if(focus){
          var active = tabs.find(function(t){return t.getAttribute('aria-controls')===id})
          if(active) active.focus()
        }
      }

      tabs.forEach(function(tab){
        tab.addEventListener('click', function(){
          activate(tab.getAttribute('aria-controls'), false)
        })
        tab.addEventListener('keydown', function(e){
          var idx = tabs.indexOf(tab)
          if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
            e.preventDefault()
            var dir = e.key === 'ArrowRight' ? 1 : -1
            var next = (idx + dir + tabs.length) % tabs.length
            activate(tabs[next].getAttribute('aria-controls'), true)
          }
        })
      })

      var defaultTab = tabs.find(function(t){return t.getAttribute('aria-selected')==='true'}) || tabs[0]
      activate(defaultTab.getAttribute('aria-controls'), false)
    })
  }

  function initFooterAccordion(){
    var mq = window.matchMedia('(max-width: 860px)')
    function apply(){
      qsa(document, '[data-footer-col]').forEach(function(col){
        var btn = qs(col, 'button[data-footer-toggle]')
        if(!btn) return
        if(mq.matches){
          if(!btn.__orchard_bound){
            btn.__orchard_bound = true
            btn.addEventListener('click', function(){
              var open = col.getAttribute('data-open') === 'true'
              col.setAttribute('data-open', open ? 'false' : 'true')
              btn.setAttribute('aria-expanded', open ? 'false' : 'true')
            })
          }
        } else {
          col.setAttribute('data-open', 'true')
          btn.setAttribute('aria-expanded', 'true')
        }
      })
    }
    mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply)
    apply()
  }

  function init(){
    initCarousels()
    initTabs()
    initFooterAccordion()
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})();

