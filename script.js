(function(){
  
  // DOM elementlerini al
  const startDiscoveryBtn = document.getElementById('startDiscoveryBtn');
  const discoveryList = document.getElementById('discoveryList');
  const heroSection = document.getElementById('heroSection');
  
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const closeSidebarBtn = document.getElementById('closeSidebar');
  
  const feedbackFab = document.getElementById('feedback-fab');
  const feedbackModal = document.getElementById('feedbackModal');
  const closeModalBtn = document.getElementById('closeModal');
  
  // Sadece ana sayfada olan elementler için kontrol eklendi.
  if (discoveryList && heroSection) {

    // 1. KEŞFETMEYE BAŞLA Butonu ve Animasyonu
    if(startDiscoveryBtn){
      startDiscoveryBtn.addEventListener('click', ()=>{
          // Ana sayfadaki kahraman (hero) bölümünü gizle
          heroSection.classList.add('hidden');
          // Keşif listesi bölümünü göster
          discoveryList.classList.add('show');
          
          // Yumuşak kaydırma ile keşif listesine in
          setTimeout(() => {
               window.scrollTo({ top: discoveryList.offsetTop - 80, behavior: 'smooth' });
          }, 100); 
      });
    }

    // Geri butonu artık ana sayfaya "/" linki veriyor, JS ile gizleyip göstermeye gerek yok.
    // Ancak bu butonu sadece discoveryList göründüğünde göstermek istiyorsanız CSS'te bu class'ı kullanabilirsiniz.
  }
  
  
  // 2. SIDEBAR (MENÜ) Fonksiyonları
  
  function openSidebar() {
      sidebar.classList.add('open');
      document.body.classList.add('sidebar-open'); // CSS için body'ye sınıf ekle
  }

  function closeSidebar() {
      sidebar.classList.remove('open');
      document.body.classList.remove('sidebar-open');
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
      link.addEventListener('click', () => {
          // Link navigasyonunu tarayıcıya bırak, sadece menüyü kapat
          closeSidebar();
      });
  });


  // 3. GERİ BİLDİRİM MODALI Fonksiyonları

  if (feedbackFab && feedbackModal && closeModalBtn) {
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

  
  // Artık eski kodunuzdaki showSection veya hash (adres çubuğundaki #) kontrolüne
  // gerek yoktur, çünkü tarayıcı direkt olarak linkleri takip edecektir.
  
})();
