document.addEventListener('DOMContentLoaded', () => {
	// Helpers
	const qs = (s, root = document) => root.querySelector(s);
	const qsa = (s, root = document) => Array.from(root.querySelectorAll(s));

	
	const nav = qs('nav');
	if (nav) {

		let menuToggle = qs('#menu-toggle', nav);
		if (!menuToggle) {
			menuToggle = document.createElement('button');
			menuToggle.id = 'menu-toggle';
			menuToggle.setAttribute('aria-label', 'Abrir menu');
			menuToggle.innerHTML = '&#9776;'; // hambúrguer
			// estilo básico (pode ajustar no CSS)
			Object.assign(menuToggle.style, {
				background: 'none',
				border: 'none',
				display: 'none',
				position: 'absolute',
				top: '12px',
				right: '18px',
				fontSize: '30px',
				color: '#f7c948',
				zIndex: '1100',
				cursor: 'pointer',
			});
			nav.appendChild(menuToggle);
		}

		
		let menuList = qs('#menu-list', nav);
		const sections = qsa('section').map(s => s.id).filter(Boolean);
		if (!menuList) {
			menuList = document.createElement('ul');
			menuList.id = 'menu-list';
			Object.assign(menuList.style, {
				listStyle: 'none',
				display: 'flex',
				gap: '24px',
				justifyContent: 'center',
				margin: '0',
				padding: '0',
			});
			
			if (sections.length === 0) {
				
				['inicio', 'sobre', 'contato'].forEach(id => {
					const li = document.createElement('li');
					const a = document.createElement('a');
					a.href = `#${id}`;
					a.textContent = id.charAt(0).toUpperCase() + id.slice(1);
					li.appendChild(a);
					menuList.appendChild(li);
				});
			} else {
				sections.forEach(id => {
					const li = document.createElement('li');
					const a = document.createElement('a');
					a.href = `#${id}`;
					
					a.textContent = id === 'inicio' ? 'Início' : id.charAt(0).toUpperCase() + id.slice(1);
					li.appendChild(a);
					menuList.appendChild(li);
				});
			}
			nav.appendChild(menuList);
		}
		
const btnBoasVindas = document.getElementById('btn-boas-vindas');
    const msgBoasVindas = document.getElementById('mensagem-boas-vindas');
    if (btnBoasVindas && msgBoasVindas) {
        btnBoasVindas.addEventListener('click', () => {
            msgBoasVindas.textContent = 'Seja bem-vindo ao meu portfólio!';
            msgBoasVindas.style.display = 'block';
            msgBoasVindas.style.opacity = '0';
            msgBoasVindas.style.transition = 'opacity 600ms';
            setTimeout(() => {
                msgBoasVindas.style.opacity = '1';
            }, 10);
        });
    }



		function checkMenu() {
			if (window.innerWidth <= 700) {
				menuToggle.style.display = 'block';
				menuList.style.display = 'none';
				menuList.style.flexDirection = 'column';
				menuList.style.background = 'rgba(255,255,255,0.97)';
				menuList.style.position = 'absolute';
				menuList.style.top = '56px';
				menuList.style.right = '12px';
				menuList.style.padding = '12px 16px';
				menuList.style.borderRadius = '8px';
				menuList.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
			} else {
				menuToggle.style.display = 'none';
				menuList.style.display = 'flex';
				menuList.style.position = '';
				menuList.style.top = '';
				menuList.style.right = '';
				menuList.style.padding = '';
				menuList.style.background = '';
				menuList.style.boxShadow = '';
				menuList.style.flexDirection = 'row';
			}
		}
		checkMenu();
		window.addEventListener('resize', checkMenu);

		menuToggle.addEventListener('click', () => {
			if (menuList.style.display === 'none' || menuList.style.display === '') {
				menuList.style.display = 'flex';
				
				menuList.style.opacity = '0';
				menuList.style.transition = 'opacity 220ms ease';
				requestAnimationFrame(() => menuList.style.opacity = '1');
			} else {
				
				menuList.style.opacity = '0';
				menuList.addEventListener('transitionend', function onEnd() {
					menuList.style.display = 'none';
					menuList.removeEventListener('transitionend', onEnd);
				});
			}
		});

		qsa('#menu-list a', nav).forEach(a => {
			a.style.cursor = 'pointer';
			a.addEventListener('click', (e) => {
				const target = document.querySelector(a.getAttribute('href'));
				if (target) target.scrollIntoView({ behavior: 'smooth' });
				if (window.innerWidth <= 700) {
					// fechar menu
					menuList.style.opacity = '0';
					menuList.addEventListener('transitionend', function onEnd() {
						menuList.style.display = 'none';
						menuList.removeEventListener('transitionend', onEnd);
					});
				}
			});
		});
	}

	const title = qs('h1');
	if (title) {
		title.style.opacity = '0';
		title.style.transform = 'translateY(6px)';
		title.style.transition = 'opacity 900ms ease, transform 900ms ease';
		setTimeout(() => {
			title.style.opacity = '1';
			title.style.transform = 'translateY(0)';
		}, 200);
	}

	const foto = qs('#foto');
	if (foto) {
		foto.style.transition = 'transform 260ms ease, box-shadow 260ms ease';
		foto.addEventListener('mouseenter', () => {
			foto.style.transform = 'scale(1.06)';
			foto.style.boxShadow = '0 8px 28px rgba(58,90,107,0.18)';
		});
		foto.addEventListener('mouseleave', () => {
			foto.style.transform = '';
			foto.style.boxShadow = '';
		});
	}

	const sections = qsa('section');
	if (sections.length > 0 && 'IntersectionObserver' in window) {
		sections.forEach(sec => {
			sec.style.opacity = '0';
			sec.style.transform = 'translateY(12px)';
			sec.style.transition = 'opacity 600ms ease, transform 600ms ease';
		});
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = '1';
					entry.target.style.transform = 'translateY(0)';
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12 });
		sections.forEach(s => observer.observe(s));
	} else {
s
		sections.forEach(s => {
			s.style.opacity = '1';
			s.style.transform = 'translateY(0)';
		});
	}


	let btnTopo = qs('#btn-voltar-topo');
	if (!btnTopo) {
		btnTopo = document.createElement('a');
		btnTopo.id = 'btn-voltar-topo';
		btnTopo.href = '#inicio';
		btnTopo.textContent = '↑ Topo';
		Object.assign(btnTopo.style, {
			position: 'fixed',
			bottom: '18px',
			right: '18px',
			padding: '10px 14px',
			borderRadius: '40px',
			background: '#3a5a6b',
			color: '#f7c948',
			border: 'none',
			fontSize: '16px',
			cursor: 'pointer',
			boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
			display: 'none',
			textDecoration: 'none',
			textAlign: 'center',
			zIndex: '1000'
		});
		document.body.appendChild(btnTopo);
	}
	
	window.addEventListener('scroll', () => {
		if (window.scrollY > 220) {
			btnTopo.style.display = 'block';
			btnTopo.style.opacity = '1';
			btnTopo.style.transition = 'opacity 240ms ease';
		} else {
			btnTopo.style.opacity = '0';
		
			setTimeout(() => { if (window.scrollY <= 220) btnTopo.style.display = 'none'; }, 260);
		}
	});

	document.addEventListener('click', (e) => {
		const menuList = qs('#menu-list');
		const menuToggle = qs('#menu-toggle');
		if (!menuList || !menuToggle) return;
		if (window.innerWidth > 700) return; // só em mobile
		const target = e.target;
		if (menuList.style.display === 'flex' && !menuList.contains(target) && target !== menuToggle) {
			menuList.style.opacity = '0';
			menuList.addEventListener('transitionend', function onEnd() {
				menuList.style.display = 'none';
				menuList.removeEventListener('transitionend', onEnd);
			});
		}
	});
});
document.addEventListener('DOMContentLoaded', () => {
    const qs = (s, root = document) => root.querySelector(s);
    const qsa = (s, root = document) => Array.from(root.querySelectorAll(s));

    const nav = qs('#hamburger-nav') || qs('nav');
    if (!nav) return;

    // cria/garante botão toggle
    let menuToggle = qs('#menu-toggle', nav);
    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.id = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Abrir menu');
        menuToggle.innerHTML = '&#9776;'; // ☰
        nav.appendChild(menuToggle);
    }
    // sempre visível (PC e mobile)
    Object.assign(menuToggle.style, {
        display: 'block',
        background: 'none',
        border: 'none',
        fontSize: '28px',
        color: '#f7c948',
        cursor: 'pointer',
        padding: '8px 12px',
        zIndex: '1200',
        position: 'relative'
    });

    // cria/garante lista de menu
    let menuList = qs('#menu-list', nav);
    if (!menuList) {
        menuList = document.createElement('ul');
        menuList.id = 'menu-list';
        menuList.innerHTML = `
            <li><a href="index.html">Início</a></li>
            <li><a href="sobre.html">Sobre</a></li>
            <li><a href="contato.html">Contato</a></li>
        `;
        nav.appendChild(menuList);
    }

    // estilos base do menu (controlados por script para evitar conflitos)
    Object.assign(menuList.style, {
        listStyle: 'none',
        margin: '0',
        padding: '6px 0',
        display: 'none', // escondido até abrir
        flexDirection: 'column',
        position: 'absolute',
        top: (menuToggle.offsetHeight + 8) + 'px',
        right: '12px',
        background: '#3a5a6b',
        borderRadius: '10px',
        minWidth: '180px',
        boxShadow: '0 8px 26px rgba(0,0,0,0.15)',
        zIndex: '1100',
        gap: '0',
        overflow: 'hidden',
        transition: 'opacity 200ms ease, transform 200ms ease',
        opacity: '0',
        transform: 'translateY(-6px)'
    });

    // estilo links
    qsa('a', menuList).forEach(a => {
        Object.assign(a.style, {
            display: 'block',
            padding: '12px 20px',
            color: '#f7c948',
            textDecoration: 'none',
            fontWeight: '700'
        });
        a.addEventListener('mouseenter', () => { a.style.background = '#6ec6e6'; a.style.color = '#00343a'; });
        a.addEventListener('mouseleave', () => { a.style.background = 'transparent'; a.style.color = '#f7c948'; });
    });

    let menuOpen = false;
    function openMenu() {
        menuList.style.display = 'flex';
        // forçar reflow antes da animação
        void menuList.offsetWidth;
        menuList.style.opacity = '1';
        menuList.style.transform = 'translateY(0)';
        menuOpen = true;
    }
    function closeMenu() {
        menuList.style.opacity = '0';
        menuList.style.transform = 'translateY(-6px)';
        menuOpen = false;
        setTimeout(() => {
            if (!menuOpen) menuList.style.display = 'none';
        }, 220);
    }

    menuToggle.addEventListener('click', (ev) => {
        ev.stopPropagation();
        if (menuOpen) closeMenu(); else openMenu();
    });

    // fecha ao clicar fora
    document.addEventListener('click', (e) => {
        if (!menuOpen) return;
        if (!menuList.contains(e.target) && e.target !== menuToggle) closeMenu();
    });

    // fechar ao pressionar ESC
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuOpen) closeMenu(); });

    // links: não bloquear navegação entre páginas; tratar apenas âncoras internas
    qsa('a', menuList).forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href') || '';
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
                closeMenu();
            } else {
                // permite navegação normal para index.html, sobre.html, contato.html
                closeMenu(); // fecha menu antes de navegar
            }
        });
    });

    // ajustar posição do menu ao redimensionar e garantir botão sempre visível
    window.addEventListener('resize', () => {
        menuList.style.top = (menuToggle.offsetHeight + 8) + 'px';
        // garantir que o toggle permaneça visível (corrige quando outro código altera)
        menuToggle.style.display = 'block';
        // se estiver aberto, manter aberto; se estiver fechado, manter display none
        if (!menuOpen) {
            menuList.style.display = 'none';
            menuList.style.opacity = '0';
            menuList.style.transform = 'translateY(-6px)';
        }
    });
});
