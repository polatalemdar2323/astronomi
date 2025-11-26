(function(){
  
  // SADECE GEREKLİ DOM elementlerini al
  const heroSection = document.getElementById('heroSection');
  const startDiscoveryBtn = document.getElementById('startDiscoveryBtn');
  const discoveryList = document.getElementById('discoveryList');
  
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const closeSidebarBtn = document.getElementById('closeSidebar');
  const body = document.body;
  
  const feedbackFab = document.getElementById('feedback-fab');
  const feedbackModal = document.getElementById('feedbackModal');
  const closeModalBtn = document.getElementById('closeModal');
  
  // 1. KEŞFETMEYE BAŞLA Butonu ve Animasyonu
  if(startDiscoveryBtn && heroSection && discoveryList){
    startDiscoveryBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        // Ana sayfadaki kahraman (hero) bölümünü gizle
        heroSection.classList.add('hidden');
        // Keşif listesi bölümünü göster
        discoveryList.classList.add('show');
        
        // Yumuşak kaydırma ile keşif listesine in
        setTimeout(() => {
             // discoveryList yoksa hata vermemesi için kontrol
             if(discoveryList) {
                 window.scrollTo({ top: discoveryList.offsetTop - 80, behavior: 'smooth' });
             }
        }, 100); 
    });
  }
  
  // 2. SIDEBAR (MENÜ) Fonksiyonları
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
  
  // Sidebar dışına tıklama ile kapatma
  if (sidebar) {
      window.addEventListener('click', (event) => {
          if (event.target === sidebar) {
              closeSidebar();
          }
      });
  }

  // Sidebar içindeki linklere tıklandığında menüyü kapat
  sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeSidebar);
  });


  // 3. GERİ BİLDİRİM MODALI Fonksiyonları
  if (feedbackFab && feedbackModal && closeModalBtn) {
      feedbackFab.classList.add('show'); // Ana sayfada sabit göster
      
      feedbackFab.addEventListener('click', () => {
          feedbackModal.style.display = 'block';
      });

      closeModalBtn.addEventListener('click', () => {
          feedbackModal.style.display = 'none';
      });

      // Modal dışına tıklama ile kapatma
      window.addEventListener('click', (event) => {
          if (event.target === feedbackModal) {
              feedbackModal.style.display = 'none';
          }
      });
  }
  
  // Sayfa yüklendiğinde varsayılan olarak Keşif listesini gizle
  document.addEventListener('DOMContentLoaded', ()=>{
      if(discoveryList) {
          discoveryList.classList.remove('show');
      }
  });

})();
