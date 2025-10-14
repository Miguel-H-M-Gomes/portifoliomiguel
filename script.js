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
    // Hamburger menu
    const menuToggle = document.getElementById('menu-toggle');
    const menuList = document.getElementById('menu-list');

    function closeMenu() {
        menuList.classList.remove('show');
    }

    function openMenu() {
        menuList.classList.add('show');
    }

    if (menuToggle && menuList) {
        menuToggle.addEventListener('click', () => {
            menuList.classList.toggle('show');
        });

        menuList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 700) closeMenu();
            });
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth > 700) return;
            if (!menuList.contains(e.target) && e.target !== menuToggle) {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 700) closeMenu();
        });
    }

    // Mensagem de boas-vindas animada
    const btnBoasVindas = document.getElementById('btn-boas-vindas');
    const msgBoasVindas = document.getElementById('mensagem-boas-vindas');
    if (btnBoasVindas && msgBoasVindas) {
        btnBoasVindas.addEventListener('click', () => {
            msgBoasVindas.textContent = 'Seja bem-vindo ao meu portfólio!';
            msgBoasVindas.style.opacity = '1';
        });
    }
});
