(function(){
  
  const BASE_TITLE = "Evrenin Ansiklopedisi";
  const TITLE_MAP = {
      'home': BASE_TITLE,
      'teleskoplar': `Teleskoplar | ${BASE_TITLE}`,
      'gezegenler': `Gezegenler | ${BASE_TITLE}`,
      'yildizlar': `Yıldızlar | ${BASE_TITLE}`,
      'galaksiler': `Galaksiler | ${BASE_TITLE}`,
      'karadelikler': `Kara Delikler | ${BASE_TITLE}`,
      'sondalar': `Uzay Sondaları | ${BASE_TITLE}`,
      'iss': `Uluslararası Uzay İstasyonu | ${BASE_TITLE}`,
      'exoplanet': `Ötegezegenler | ${BASE_TITLE}`,
      'iletisim': `İletişim | ${BASE_TITLE}`,
      'hakkimizda': `Hakkımda | ${BASE_TITLE}`,
  };
  
  
  const sections = Array.from(document.querySelectorAll('.section'));
  const body = document.body;

  const homeContent = document.getElementById('home-content'); 
  const heroSection = document.getElementById('heroSection');
  const startDiscoveryBtn = document.getElementById('startDiscoveryBtn');
  const discoveryList = document.getElementById('discoveryList');
  const discoveryCardGrid = document.getElementById('discoveryCardGrid');
  const feedbackFab = document.getElementById('feedback-fab');
  const feedbackModal = document.getElementById('feedbackModal');
  const closeModalBtn = document.getElementById('closeModal');
  const backToHomeBtns = Array.from(document.querySelectorAll('.back-to-home-btn'));
  
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const closeSidebarBtn = document.getElementById('closeSidebar');
  
  const siteLogo = document.getElementById('site-logo');


  const navData = sections
      .filter(sec => sec.id !== 'home' && sec.id !== 'hakkimizda' && sec.id !== 'iletisim')
      .map(sec => ({
          id: sec.id,
          name: sec.querySelector('h2').textContent,
          bg: sec.getAttribute('data-bg')
      }));
  
  function showSection(id){
    const target = document.getElementById(id);
    const isHome = (id === 'home');
    
    
    document.title = TITLE_MAP[id] || BASE_TITLE;
    
    if(isHome) {
        history.pushState(null, '', window.location.pathname); 
    } else {
        history.pushState(null, '', `#${id}`); 
    }
  

    if (homeContent) {
        if (isHome) {
            homeContent.classList.add('show');
            feedbackFab.classList.add('show');
            menuToggle.style.display = 'flex';
            discoveryList.classList.remove('show'); 
            if(heroSection) heroSection.classList.remove('hidden');
            document.querySelector('.wrap').style.margin = '40px auto';
            if(siteLogo) siteLogo.style.display = 'block';

            homeContent.classList.remove('fade-in');
            void homeContent.offsetWidth;
            homeContent.classList.add('fade-in');

        } else {
            homeContent.classList.remove('show');
            feedbackFab.classList.remove('show'); 
            menuToggle.style.display = 'none'; 
            if(heroSection) heroSection.classList.add('hidden');
            document.querySelector('.wrap').style.margin = '20px auto 40px'; 
            if(siteLogo) siteLogo.style.display = 'none'; 
        }
    }


    sections.forEach(sec=>{
      if(sec === target){
        sec.classList.add('show');
        const elems = sec.querySelectorAll('h2,h3,p,ul,img,a,.subtitle,.card, .back-to-home-btn');
        elems.forEach((el,i)=>{ 
            el.classList.remove('fade-in'); 
            el.style.animationDelay = (i*60)+'ms'; 
        });
        void sec.offsetWidth;
        elems.forEach(el=> el.classList.add('fade-in'));
      } else {
        sec.classList.remove('show');
        const els = sec.querySelectorAll('h2,h3,p,ul,img,a,.subtitle,.card, .back-to-home-btn');
        els.forEach(el=>{ el.classList.remove('fade-in'); el.style.animationDelay='0ms'; });
      }
    });

    const bg = target ? target.getAttribute('data-bg') : 'arkaplan.jpg';
    body.style.transition = 'background-image 700ms ease, background-position 700ms ease';
    body.style.backgroundImage = `url('${bg}')`;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    closeSidebar();
  }

  if(startDiscoveryBtn){
    startDiscoveryBtn.addEventListener('click', ()=>{
        if(heroSection) heroSection.classList.add('hidden');
        discoveryList.classList.add('show');
        
        setTimeout(() => {
             window.scrollTo({ top: discoveryList.offsetTop - 80, behavior: 'smooth' });
        }, 500); 
    });
  }

  function createDiscoveryCards(){
    discoveryCardGrid.innerHTML = ''; 
    
    navData.forEach((data, i) => {
        const card = document.createElement('div');
        card.className = 'discovery-card fade-in';
        card.setAttribute('data-target', data.id);
        card.style.animationDelay = (500 + i * 100) + 'ms';
        card.innerHTML = `<span>${data.name}</span>`;
        
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = card.dataset.target;
            showSection(targetId);
        });
        
        discoveryCardGrid.appendChild(card);
    });
  }

  backToHomeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          showSection('home');
      });
  });

  feedbackFab.addEventListener('click', () => {
      feedbackModal.style.display = 'block';
  });

  closeModalBtn.addEventListener('click', () => {
      feedbackModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
      if (event.target === feedbackModal) {
          feedbackModal.style.display = 'none';
      }
  });
  
  function openSidebar() {
      sidebar.classList.add('open');
      body.classList.add('sidebar-open');
  }

  function closeSidebar() {
      sidebar.classList.remove('open');
      body.classList.remove('sidebar-open');
  }

  if (menuToggle) {
      menuToggle.addEventListener('click', openSidebar);
  }
  if (closeSidebarBtn) {
      closeSidebarBtn.addEventListener('click', closeSidebar);
  }
  
  window.addEventListener('click', (event) => {
      if (event.target === sidebar) {
          closeSidebar();
      }
  });

  sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('data-target');
          if (targetId) {
              showSection(targetId);
          }
      });
  });


  
  document.addEventListener('DOMContentLoaded', ()=>{
  
    const initialHash = window.location.hash.substring(1);
    
    let initialSection = 'home';
    if (initialHash && document.getElementById(initialHash)) {
        initialSection = initialHash;
    }
    // ----------------------------------------------
      
    showSection(initialSection);
    
    createDiscoveryCards(); 

    if(initialSection === 'home') {
        feedbackFab.classList.add('show');
    }
  });

  
  window.addEventListener('popstate', () => {
      const hash = window.location.hash.substring(1);
      const targetId = hash && document.getElementById(hash) ? hash : 'home';
      showSection(targetId);
  });
})();