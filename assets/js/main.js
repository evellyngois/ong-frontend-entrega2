// =============================================
//  MENU HAMBÚRGUER + SUBMENU RESPONSIVO
// =============================================

// Seleciona o botão do menu e a navegação principal
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Quando o botão for clicado, abre/fecha o menu no mobile
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
}

// =============================================
//  SUBMENU (Projetos ▾) — funciona no mobile
// =============================================

// Seleciona o botão do submenu e o container pai
const submenuButton = document.querySelector('.has-submenu > .nav-item');
const submenuParent = document.querySelector('.has-submenu');

if (submenuButton && submenuParent) {
  submenuButton.addEventListener('click', (e) => {
    e.preventDefault(); // evita recarregar a página
    submenuParent.classList.toggle('open');
    const expanded = submenuParent.classList.contains('open');
    submenuButton.setAttribute('aria-expanded', expanded);
  });
}

// =============================================
//  ALERTA SUAVE (toast)
// =============================================

/**
 * Cria e exibe um Toast (alerta suave) no rodapé da tela.
 * @param {string} message - A mensagem a ser exibida.
 * @param {('info'|'success'|'error')} [type='info'] - O tipo de toast para estilização.
 */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    // Remove o elemento do DOM após a animação de saída (300ms)
    setTimeout(() => toast.remove(), 400); 
  }, 4000); // Exibe por 4 segundos
}

// Exemplo: mostra um toast de boas-vindas
window.addEventListener('load', () => {
  showToast('Bem-vinda ao site da ONG Esperança! 💙');
});

// =============================================
//  MODAL
// =============================================

/**
 * Controla a exibição de um modal.
 * @param {string} modalId - O ID do elemento modal-backdrop.
 * @param {boolean} open - Se deve abrir (true) ou fechar (false) o modal.
 */
function toggleModal(modalId, open) {
    const backdrop = document.getElementById(modalId);
    if (!backdrop) return;

    if (open) {
        backdrop.classList.add('open');
        backdrop.setAttribute('aria-hidden', 'false');
    } else {
        // Usa setTimeout para garantir que a animação de fade-out ocorra antes de remover a classe 'open'
        setTimeout(() => backdrop.classList.remove('open'), 200);
        backdrop.setAttribute('aria-hidden', 'true');
    }
}

// Inicializa a funcionalidade de modais ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // 1. Botões que abrem o modal (ex: data-modal-target="modal-contato")
    document.querySelectorAll('[data-modal-target]').forEach(button => {
        const modalId = button.getAttribute('data-modal-target');
        button.addEventListener('click', (e) => {
            e.preventDefault();
            toggleModal(modalId, true);
        });
    });

    // 2. Botões de fechar e Backdrop (clique fora)
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        const modalId = backdrop.id;
        
        // Listener para o botão de fechar dentro do modal
        const closeButton = backdrop.querySelector('.modal .close');
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                toggleModal(modalId, false);
            });
        }

        // Listener para fechar clicando no backdrop (mas não no modal em si)
        backdrop.addEventListener('click', (e) => {
            // Se o clique for exatamente no backdrop (e não em um filho do modal)
            if (e.target === backdrop) {
                toggleModal(modalId, false);
            }
        });
        
        // Listener para fechar com a tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && backdrop.classList.contains('open')) {
                toggleModal(modalId, false);
            }
        });
    });
});
