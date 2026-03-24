// Data
const categories = [
    { id: 'home', name: 'Home Services', icon: 'fa-home', description: 'Cleaning, repairs, plumbing', color: 'from-blue-500 to-cyan-500' },
    { id: 'professional', name: 'Professional Services', icon: 'fa-briefcase', description: 'Legal, accounting, marketing', color: 'from-violet-500 to-purple-500' },
    { id: 'personal', name: 'Personal Care', icon: 'fa-spa', description: 'Beauty, fitness, wellness', color: 'from-pink-500 to-rose-500' },
    { id: 'events', name: 'Event Services', icon: 'fa-calendar-star', description: 'Catering, photography, decor', color: 'from-amber-500 to-orange-500' },
    { id: 'tech', name: 'Tech Support', icon: 'fa-laptop-code', description: 'IT support, coding, repair', color: 'from-emerald-500 to-green-500' },
    { id: 'transport', name: 'Transport', icon: 'fa-car', description: 'Moving, delivery, logistics', color: 'from-red-500 to-rose-500' }
];

const allServices = [
    { id: 1, catId: 'home', name: 'Deep House Cleaning', price: 80, location: 'Downtown', description: 'Professional deep cleaning for apartments and houses.', icon: 'fa-broom' },
    { id: 2, catId: 'home', name: 'Expert Plumbing', price: 60, location: 'Suburbs', description: 'Leak repairs, pipe installations, and more.', icon: 'fa-faucet' },
    { id: 3, catId: 'tech', name: 'PC/Mac Repair', price: 50, location: 'Midtown', description: 'Hardware and software troubleshooting.', icon: 'fa-laptop' },
    { id: 4, catId: 'events', name: 'Event Photography', price: 150, location: 'City Center', description: 'Professional shots for weddings and parties.', icon: 'fa-camera' }
];

const providers = [
    { id: 101, serviceId: 1, name: 'Sarah Cleaners', location: 'Downtown', price: 85, rating: 4.8, images: ['fa-broom', 'fa-spray-can'], about: '5 years of experience in eco-friendly cleaning.' },
    { id: 102, serviceId: 1, name: 'EcoShine Team', location: 'Uptown', price: 75, rating: 4.5, images: ['fa-broom'], about: 'Fast and reliable cleaning services.' },
    { id: 103, serviceId: 2, name: 'John the Plumber', location: 'Suburbs', price: 60, rating: 4.9, images: ['fa-wrench'], about: 'Certified plumber with 10+ years exp.' }
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
    grid.innerHTML = categories.map(cat => `
        <div class="category-card-premium group" onclick="showCategoryServices('${cat.id}')">
            <div class="category-icon-wrapper">
                <i class="fas ${cat.icon}"></i>
            </div>
            <h3 class="text-xl font-bold mb-3 font-display text-slate-900">${cat.name}</h3>
            <p class="text-slate-500 leading-relaxed">${cat.description}</p>
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            ${filteredProviders.map(p => `
                <div class="bg-white rounded-[32px] p-8 sm:p-10 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-serva-50 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>
                    
                    <div class="relative z-10">
                        <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 mb-8">
                            <div class="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-serva-100 rounded-3xl flex items-center justify-center text-3xl font-bold text-serva-600 shadow-inner">${p.name[0]}</div>
                            <div class="flex-1">
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                    <h3 class="text-2xl font-bold text-slate-900 font-display">${p.name}</h3>
                                    <div class="flex items-center justify-center sm:justify-start gap-1">
                                        <div class="text-amber-400 flex text-sm">
                                            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(p.rating))}
                                        </div>
                                        <span class="text-slate-900 font-bold text-sm">${p.rating}</span>
                                    </div>
                                </div>
                                <p class="text-slate-500 text-sm flex items-center justify-center sm:justify-start gap-2"><i class="fas fa-map-marker-alt text-serva-500 text-xs"></i> ${p.location}</p>
                                <div class="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                                    <span class="px-3 py-1 bg-serva-50 text-serva-600 text-[10px] uppercase tracking-widest font-bold rounded-full">Top Rated</span>
                                    <span class="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] uppercase tracking-widest font-bold rounded-full">Verified</span>
                                </div>
                            </div>
                        </div>

                        <div class="mb-10">
                            <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Professional Bio</h4>
                            <p class="text-slate-600 leading-relaxed mb-6">${p.about}</p>
                            
                            <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Gallery</h4>
                            <div class="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                                ${p.images.map(img => `
                                    <div class="w-24 h-24 shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl text-slate-300 border border-slate-100 hover:border-serva-300 transition-colors">
                                        <i class="fas ${img}"></i>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-slate-100 gap-6">
                            <div class="text-center sm:text-left">
                                <p class="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Service Fee</p>
                                <p class="text-3xl font-bold text-slate-900">$${p.price}<span class="text-sm text-slate-400 font-medium">/hr</span></p>
                            </div>
                            <button onclick="openBookingModal(${p.id})" class="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-serva-600 transition-colors shadow-lg shadow-slate-900/10">Book Now</button>
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
