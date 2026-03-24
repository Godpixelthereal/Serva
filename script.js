// Data
const categories = [
    { id: 'home', name: 'Home Services', icon: 'fa-home', description: 'Cleaning, repairs, plumbing', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 'professional', name: 'Professional Services', icon: 'fa-briefcase', description: 'Legal, accounting, marketing', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 'personal', name: 'Personal Care', icon: 'fa-spa', description: 'Beauty, fitness, wellness', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 'events', name: 'Event Services', icon: 'fa-calendar-star', description: 'Catering, photography, decor', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { id: 'tech', name: 'Tech Support', icon: 'fa-laptop-code', description: 'IT support, coding, repair', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { id: 'transport', name: 'Transport', icon: 'fa-car', description: 'Moving, delivery, logistics', gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' }
];

const allServices = [
    { id: 1, catId: 'home', name: 'Deep House Cleaning', price: 80, location: 'Downtown', description: 'Professional deep cleaning for apartments and houses.', icon: 'fa-broom' },
    { id: 2, catId: 'home', name: 'Expert Plumbing', price: 60, location: 'Suburbs', description: 'Leak repairs, pipe installations, and more.', icon: 'fa-faucet' },
    { id: 3, catId: 'tech', name: 'PC/Mac Repair', price: 50, location: 'Midtown', description: 'Hardware and software troubleshooting.', icon: 'fa-laptop' },
    { id: 4, catId: 'events', name: 'Event Photography', price: 150, location: 'City Center', description: 'Professional shots for weddings and parties.', icon: 'fa-camera' }
];

const providers = [
    { id: 101, serviceId: 1, name: 'Sarah Cleaners', location: 'Downtown', price: 85, rating: 4.8, images: ['fa-broom', 'fa-spray-can'], about: '5 years of experience in eco-friendly cleaning.', banner: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { id: 102, serviceId: 1, name: 'EcoShine Team', location: 'Uptown', price: 75, rating: 4.5, images: ['fa-broom'], about: 'Fast and reliable cleaning services.', banner: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 103, serviceId: 2, name: 'John the Plumber', location: 'Suburbs', price: 60, rating: 4.9, images: ['fa-wrench'], about: 'Certified plumber with 10+ years exp.', banner: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }
];

let currentFeedbackTab = 'suggestion';

// Navigation
function hideAllPages() { document.querySelectorAll('.page-section').forEach(p => p.classList.add('hidden')); window.scrollTo(0, 0); }
function showHome() { hideAllPages(); document.getElementById('homePage').classList.remove('hidden'); }
function showCategories() { hideAllPages(); document.getElementById('categoriesPage').classList.remove('hidden'); renderCategories(); }
function showAbout() { hideAllPages(); document.getElementById('aboutPage').classList.remove('hidden'); }
function showContact() { hideAllPages(); document.getElementById('contactPage').classList.remove('hidden'); }
function showFeedback() { hideAllPages(); document.getElementById('feedbackPage').classList.remove('hidden'); }
function showTerms() { hideAllPages(); document.getElementById('termsPage').classList.remove('hidden'); }

function toggleMobileMenu() { document.getElementById('mobileMenu').classList.toggle('hidden'); }

// Dynamic Rendering
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    const serviceCounts = {};
    categories.forEach(cat => { serviceCounts[cat.id] = allServices.filter(s => s.catId === cat.id).length; });
    grid.innerHTML = categories.map(cat => `
        <div class="category-card-v2 group" onclick="showCategoryServices('${cat.id}')">
            <div class="cat-icon-v2" style="background: ${cat.gradient};">
                <i class="fas ${cat.icon}"></i>
            </div>
            <h3 class="text-xl font-bold mb-2 font-display text-slate-900">${cat.name}</h3>
            <p class="text-slate-400 text-sm leading-relaxed mb-5">${cat.description}</p>
            <div class="flex items-center justify-between mt-auto">
                <span class="text-xs font-bold text-serva-500 bg-serva-50 px-3 py-1 rounded-full">${serviceCounts[cat.id]} service${serviceCounts[cat.id] !== 1 ? 's' : ''}</span>
                <span class="text-slate-300 group-hover:text-serva-500 group-hover:translate-x-1 transition-all"><i class="fas fa-arrow-right"></i></span>
            </div>
        </div>
    `).join('');
}

function renderFeatured() {
    const grid = document.getElementById('featuredServices');
    if (!grid) return;
    grid.innerHTML = allServices.slice(0, 4).map(svc => `
        <div class="service-card-new" onclick="showProviders(${svc.id})">
            <h3 class="text-lg font-bold text-slate-900 mb-2 font-display">${svc.name}</h3>
            <p class="text-sm text-slate-500 mb-8 leading-relaxed">${svc.description}</p>
            <div class="flex items-center justify-between mt-auto">
                <div class="w-11 h-11 rounded-full bg-serva-500 text-white flex items-center justify-center text-lg">
                    <i class="fas ${svc.icon}"></i>
                </div>
                <div class="text-right">
                    <p class="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Starting from</p>
                    <p class="text-lg font-bold text-serva-600">$${svc.price}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function showCategoryServices(catId) {
    const cat = categories.find(c => c.id === catId);
    if (!cat) return;
    hideAllPages();
    document.getElementById('servicesListPage').classList.remove('hidden');
    document.getElementById('categoryTitle').textContent = cat.name;

    const services = allServices.filter(s => s.catId === catId);
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = services.length ? services.map(svc => `
        <div class="service-card-premium" onclick="showProviders(${svc.id})">
            <div class="flex justify-between items-start mb-6">
                <div class="w-14 h-14 bg-serva-50 text-serva-500 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-serva-500 group-hover:text-white transition-all"><i class="fas ${svc.icon}"></i></div>
                <div class="text-right">
                    <p class="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Avg. Price</p>
                    <p class="text-2xl font-bold text-slate-900">$${svc.price}</p>
                </div>
            </div>
            <h3 class="text-2xl font-bold mb-3 font-display text-slate-900">${svc.name}</h3>
            <p class="text-slate-500 mb-8 leading-relaxed">${svc.description}</p>
            <div class="flex items-center gap-2 text-serva-500 font-bold uppercase text-xs tracking-widest">
                View Professionals <i class="fas fa-arrow-right text-[10px]"></i>
            </div>
        </div>
    `).join('') : '<div class="col-span-1 md:col-span-2 py-16 text-center"><p class="text-slate-500 text-lg">No services found in this category yet.</p></div>';
}

function showProviders(serviceId) {
    const svc = allServices.find(s => s.id === serviceId);
    hideAllPages();
    document.getElementById('providerPage').classList.remove('hidden');
    document.getElementById('providerNameHeader').textContent = svc ? svc.name : 'Providers';

    const filteredProviders = providers.filter(p => p.serviceId === serviceId);
    const container = document.getElementById('providerDetailsContainer');

    container.innerHTML = `
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-white/50 p-6 rounded-3xl border border-slate-100/50 backdrop-blur-sm">
            <div class="flex flex-wrap gap-3">
                <select class="px-5 py-3 bg-white rounded-2xl border-none focus:ring-2 focus:ring-serva-500 shadow-sm text-sm font-medium text-slate-700 outline-none transition-all" id="filterLocation">
                    <option value="">All Locations</option>
                    <option value="Downtown">Downtown</option>
                    <option value="Suburbs">Suburbs</option>
                </select>
                <select class="px-5 py-3 bg-white rounded-2xl border-none focus:ring-2 focus:ring-serva-500 shadow-sm text-sm font-medium text-slate-700 outline-none transition-all" id="filterPrice">
                    <option value="">All Prices</option>
                    <option value="60">Under $60</option>
                    <option value="100">Under $100</option>
                </select>
            </div>
            <p class="text-sm text-slate-400 font-medium">${filteredProviders.length} professionals found</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            ${filteredProviders.map(p => `
                <div class="provider-card-v2 group">
                    <!-- Banner -->
                    <div class="provider-banner" style="background: ${p.banner};">
                        <div class="provider-banner-overlay"></div>
                        <div class="provider-badge-row">
                            <span class="provider-badge-verified"><i class="fas fa-check-circle"></i> Verified</span>
                        </div>
                    </div>

                    <!-- Avatar -->
                    <div class="provider-avatar-wrapper">
                        <div class="provider-avatar">${p.name[0]}</div>
                    </div>

                    <!-- Info -->
                    <div class="provider-info">
                        <h3 class="text-xl font-bold text-slate-900 font-display mb-1">${p.name}</h3>
                        <p class="text-sm text-slate-400 mb-5">${p.about}</p>

                        <!-- Stats Row -->
                        <div class="provider-stats">
                            <div class="provider-stat">
                                <i class="fas fa-star text-amber-400"></i>
                                <span class="provider-stat-value">${p.rating}</span>
                                <span class="provider-stat-label">Rating</span>
                            </div>
                            <div class="provider-stat">
                                <i class="fas fa-tag text-serva-500"></i>
                                <span class="provider-stat-value">$${p.price}</span>
                                <span class="provider-stat-label">per hour</span>
                            </div>
                            <div class="provider-stat">
                                <i class="fas fa-map-marker-alt text-rose-400"></i>
                                <span class="provider-stat-value">${p.location}</span>
                                <span class="provider-stat-label">Location</span>
                            </div>
                        </div>

                        <!-- CTA -->
                        <button onclick="openBookingModal(${p.id})" class="provider-cta">
                            Book Now
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function backToServices() {
    showCategories();
}

// Modals
let selectedProviderId = null;
function openBookingModal(providerId) { selectedProviderId = providerId; document.getElementById('bookingModal').classList.remove('hidden'); }
function openOfferModal() { document.getElementById('offerModal').classList.remove('hidden'); }
function openGiftModal() { document.getElementById('giftModal').classList.remove('hidden'); }
function closeModals(e) {
    if (!e || e.target.id.includes('Modal') || e.target.closest('button')) {
        document.querySelectorAll('[id$="Modal"]').forEach(m => m.classList.add('hidden'));
    }
}

// Actions
function handleBooking(e) {
    e.preventDefault();
    const email = document.getElementById('bookingEmail').value;
    const provider = providers.find(p => p.id === selectedProviderId);
    showToast(`Welcome! Redirecting to chat with ${provider.name}...`);
    setTimeout(() => {
        window.open(`https://wa.me/+2348112174969?text=Hello, I would like to book your service: ${provider.name}. My email is ${email}`, '_blank');
        closeModals();
    }, 1500);
}

function handleOffer(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[placeholder="Full Name"]').value;
    const service = form.querySelector('input[placeholder="Service offered (e.g. Plumbing)"]').value;
    showToast("Application submitted! Redirecting to WhatsApp...");
    setTimeout(() => {
        window.open(`https://wa.me/+2348112174969?text=Hello, I would like to offer my services on Serva.%0A%0AName: ${encodeURIComponent(name)}%0AService: ${encodeURIComponent(service)}`, '_blank');
        closeModals();
        form.reset();
    }, 1500);
}

function handleFeedback(e) {
    e.preventDefault();
    showToast("Thank you for your feedback!");
    e.target.reset();
}

function setFeedbackTab(tab) {
    currentFeedbackTab = tab;
    const buttons = document.querySelectorAll('#feedbackTabs button');
    buttons.forEach(btn => {
        btn.classList.remove('text-serva-500', 'border-b-2', 'border-serva-500', 'bg-serva-50/50');
        btn.classList.add('text-slate-500');
    });
    event.target.classList.add('text-serva-500', 'border-b-2', 'border-serva-500', 'bg-serva-50/50');
}

function performSearch() {
    const q = document.getElementById('heroSearch').value.toLowerCase();
    if (!q) return;
    const matches = allServices.filter(s => s.name.toLowerCase().includes(q));
    if (matches.length) {
        showCategoryServices(matches[0].catId);
    } else {
        showToast("No services found for your search.");
    }
}

function showToast(msg) {
    const t = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = msg;
    t.classList.remove('hidden');

    // Add entering animation classes
    t.classList.add('animate-slide-up');

    setTimeout(() => {
        t.classList.add('hidden');
        t.classList.remove('animate-slide-up');
    }, 3000);
}

// Counters
function animateCounters() {
    const clientsCounter = document.getElementById('clientsCounter');
    const servicesCounter = document.getElementById('servicesCounter');
    if (!clientsCounter) return;
    let c = 0, s = 0;
    const interval = setInterval(() => {
        c += 200; s += 150;
        if (c >= 12543) c = 12543;
        if (s >= 8932) s = 8932;
        clientsCounter.textContent = c.toLocaleString();
        servicesCounter.textContent = s.toLocaleString();
        if (c === 12543 && s === 8932) clearInterval(interval);
    }, 30);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderFeatured();
    animateCounters();
});
