(function(){
  
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
  
  if(startDiscoveryBtn && heroSection && discoveryList){
    startDiscoveryBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        heroSection.classList.add('hidden');
        discoveryList.classList.add('show');
        
        setTimeout(() => {
             if(discoveryList) {
                 window.scrollTo({ top: discoveryList.offsetTop - 80, behavior: 'smooth' });
             }
        }, 100); 
    });
  }

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

  if (sidebar) {
      window.addEventListener('click', (event) => {
          if (event.target === sidebar) {
              closeSidebar();
          }
      });
  }

  sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeSidebar);
  });


  if (feedbackFab && feedbackModal && closeModalBtn) {
      feedbackFab.classList.add('show'); 
      
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
  }
  
  document.addEventListener('DOMContentLoaded', ()=>{
      if(discoveryList) {
          discoveryList.classList.remove('show');
      }
  });

})();

