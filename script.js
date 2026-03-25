// Data
const categories = [
    { id: 'home', name: 'Home Services', type: 'image', visual: 'cat-home.png', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', description: 'Cleaning, repairs, plumbing' },
    { id: 'professional', name: 'Prof. Services', type: 'image', visual: 'cat-professional.png', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', description: 'Legal, accounting, marketing' },
    { id: 'personal', name: 'Personal Care', type: 'image', visual: 'cat-personal.png', gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)', description: 'Beauty, fitness, wellness' },
    { id: 'events', name: 'Event Services', type: 'emoji', visual: '🎈', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', description: 'Catering, photography, decor' },
    { id: 'tech', name: 'Tech Support', type: 'emoji', visual: '💻', gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', description: 'IT support, coding, repair' },
    { id: 'transport', name: 'Transport', type: 'emoji', visual: '📦', gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', description: 'Moving, delivery, logistics' }
];

const allServices = [
    { id: 1, catId: 'home', name: 'Deep House Cleaning', price: 80, location: 'Downtown', description: 'Professional deep cleaning for apartments and houses.', icon: 'fa-broom' },
    { id: 2, catId: 'home', name: 'Expert Plumbing', price: 60, location: 'Suburbs', description: 'Leak repairs, pipe installations, and more.', icon: 'fa-faucet' },
    { id: 3, catId: 'tech', name: 'PC/Mac Repair', price: 50, location: 'Midtown', description: 'Hardware and software troubleshooting.', icon: 'fa-laptop' },
    { id: 4, catId: 'events', name: 'Event Photography', price: 150, location: 'City Center', description: 'Professional shots for weddings and parties.', icon: 'fa-camera' }
];

const providers = [
    { id: 101, serviceId: 1, name: 'Sarah Cleaners', location: 'Downtown', price: 85, rating: 4.8, photo: 'provider-sarah.png', about: '5 years of experience in eco-friendly cleaning.', jobs: 527 },
    { id: 102, serviceId: 1, name: 'EcoShine Team', location: 'Uptown', price: 75, rating: 4.5, photo: 'provider-ecoshine.png', about: 'Fast and reliable cleaning services.', jobs: 413 },
    { id: 103, serviceId: 2, name: 'John the Plumber', location: 'Suburbs', price: 60, rating: 4.9, photo: 'provider-john.png', about: 'Certified plumber with 10+ years experience.', jobs: 612 }
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
        <div class="category-card-v3" style="background: ${cat.gradient};" onclick="showCategoryServices('${cat.id}')">
            <div class="cat-v3-content">
                <h3 class="cat-v3-title">${cat.name}</h3>
                <p class="cat-v3-desc">${cat.description}</p>
                <div class="cat-v3-btn">
                    ${serviceCounts[cat.id]} service${serviceCounts[cat.id] !== 1 ? 's' : ''} <i class="fas fa-chevron-right text-[10px]"></i>
                </div>
            </div>
            ${cat.type === 'image' 
                ? `<img src="${cat.visual}" alt="${cat.name}" class="cat-v3-visual">` 
                : `<div class="cat-v3-emoji">${cat.visual}</div>`
            }
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
                    <!-- Photo -->
                    <div class="provider-photo-wrap">
                        <img src="${p.photo}" alt="${p.name}" class="provider-photo">
                    </div>

                    <!-- Info -->
                    <div class="provider-info">
                        <h3 class="text-lg font-bold text-slate-900 font-display">${p.name}</h3>
                        <p class="text-sm text-slate-400 leading-relaxed mt-1 mb-4">${p.about}</p>

                        <!-- Stats Row -->
                        <div class="provider-stats-row">
                            <div class="provider-stat-item">
                                <i class="fas fa-user-check text-slate-400"></i>
                                <span class="font-bold text-slate-800">${p.jobs}</span>
                            </div>
                            <div class="provider-stat-item">
                                <i class="fas fa-star text-amber-400"></i>
                                <span class="font-bold text-slate-800">${p.rating}</span>
                            </div>
                            <div class="provider-stat-item">
                                <i class="fas fa-map-marker-alt text-serva-500"></i>
                                <span class="text-sm text-slate-500">${p.location}</span>
                            </div>
                        </div>

                        <!-- Price + CTA -->
                        <div class="flex items-center justify-between mt-5">
                            <div>
                                <span class="text-xl font-bold text-slate-900">$${p.price}</span>
                                <span class="text-xs text-slate-400">/hr</span>
                            </div>
                            <button onclick="openBookingModal(${p.id})" class="provider-book-btn">
                                Book Now <i class="fas fa-plus ml-1 text-xs"></i>
                            </button>
                        </div>
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
