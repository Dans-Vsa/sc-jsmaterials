// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = document.querySelector('.theme-icon');

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark', savedTheme === 'dark');
updateThemeIcon();

themeToggle.addEventListener('click', () => {
	body.classList.toggle('dark');
	const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
	localStorage.setItem('theme', currentTheme);
	updateThemeIcon();
});

function updateThemeIcon() {
	themeIcon.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
}

// ===== Project Filter =====
const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.project-card');

filterTabs.forEach(tab => {
	tab.addEventListener('click', () => {
		// Update active tab
		filterTabs.forEach(t => t.classList.remove('active'));
		tab.classList.add('active');

		const filter = tab.getAttribute('data-filter');

		// Filter projects
		projectCards.forEach(card => {
			const category = card.getAttribute('data-category');
			
			if (filter === 'all' || category === filter) {
				card.style.display = 'block';
				card.style.animation = 'fadeInUp 0.5s ease-out';
			} else {
				card.style.display = 'none';
			}
		});
	});
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			const navHeight = document.querySelector('.nav').offsetHeight;
			const targetPosition = target.offsetTop - navHeight;
			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});
		}
	});
});

// ===== Contact Form =====
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
	e.preventDefault();
	
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const message = document.getElementById('message').value;

	// Simulate form submission
	formStatus.textContent = 'Sending message...';
	formStatus.style.color = 'var(--text-secondary)';

	setTimeout(() => {
		formStatus.textContent = `Thank you, ${name}! Your message has been received.`;
		formStatus.style.color = 'var(--accent)';
		contactForm.reset();

		// Clear message after 5 seconds
		setTimeout(() => {
			formStatus.textContent = '';
		}, 5000);
	}, 1500);
});

// ===== Update Year in Footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Navbar Scroll Effect =====
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
	const currentScroll = window.pageYOffset;

	if (currentScroll > 50) {
		nav.style.padding = '12px 32px';
		nav.style.boxShadow = 'var(--shadow-md)';
	} else {
		nav.style.padding = '16px 32px';
		nav.style.boxShadow = 'none';
	}

	lastScroll = currentScroll;
});

// ===== Skill Bar Animation on Scroll =====
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const observerOptions = {
	threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting && !skillsAnimated) {
			skillBars.forEach((bar, index) => {
				setTimeout(() => {
					bar.style.width = bar.style.width;
				}, index * 100);
			});
			skillsAnimated = true;
		}
	});
}, observerOptions);

const aboutSection = document.getElementById('about');
if (aboutSection) {
	observer.observe(aboutSection);
}

// ===== Project Cards Hover Effect =====
projectCards.forEach(card => {
	card.addEventListener('mouseenter', function() {
		this.style.transform = 'translateY(-8px)';
	});
	
	card.addEventListener('mouseleave', function() {
		this.style.transform = 'translateY(0)';
	});
});
