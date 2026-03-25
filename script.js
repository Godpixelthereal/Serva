// Data
const categories = [
    { id: 'repairs', name: 'Repairs', type: 'emoji', visual: '🔧', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', description: 'Services focused on fixing damaged or faulty items to restore them to proper working condition.' },
    { id: 'maintenance', name: 'Maintenance', type: 'emoji', visual: '🧹', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', description: 'Routine services to keep your spaces, equipment, and systems in good condition and prevent breakdowns.' },
    { id: 'electrical', name: 'Electrical Services', type: 'emoji', visual: '⚡', gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', description: 'Solutions related to the installation, repair, and management of electrical systems and power-related needs.' },
    { id: 'lifestyle', name: 'Lifestyle', type: 'emoji', visual: '🛍️', gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)', description: 'Convenience services that support daily living and make everyday tasks easier and more manageable.' },
    { id: 'building', name: 'Building', type: 'emoji', visual: '🏗️', gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', description: 'Services involved in the construction, renovation, and improvement of physical spaces and structures.' },
    { id: 'personal', name: 'Personal Care', type: 'emoji', visual: '💇', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', description: 'Services centered on individual grooming, hygiene, and overall personal well-being.' },
    { id: 'logistics', name: 'Logistics & Moving', type: 'emoji', visual: '🚛', gradient: 'linear-gradient(135deg, #e2ebf0 0%, #cfd9df 100%)', description: 'Services that handle the movement, delivery, and transportation of people, goods, or items from one place to another.' },
    { id: 'others', name: 'Others', type: 'emoji', visual: '✨', gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', description: 'Custom or specialized services designed to meet unique, urgent, or less common needs.' }
];

const allServices = [
    { id: 1, catId: 'maintenance', name: 'Cleaning', location: 'Ifite', description: 'Thorough home, office, and post-construction cleaning services to keep your space spotless and comfortable.', icon: 'fa-broom' },
    { id: 2, catId: 'repairs', name: 'Expert Plumbing', location: 'Regina', description: 'Fixing leaks, pipe installations, drainage issues, and everything in between to keep your water systems running smoothly.', icon: 'fa-faucet' },
    { id: 3, catId: 'repairs', name: 'Welding', location: 'Amansea', description: 'Professional metal joining, fabrication, and structural repairs for both residential and commercial needs.', icon: 'fa-tools' },
    { id: 4, catId: 'maintenance', name: 'Decluttering', location: 'Arroma', description: 'Organized removal and sorting of unwanted items to restore order and breathing room to your space.', icon: 'fa-box-open' },
    { id: 5, catId: 'maintenance', name: 'Fumigation', location: 'Tempsite', description: 'Effective pest control and fumigation treatments to protect your home or business from infestation.', icon: 'fa-spray-can' },
    { id: 6, catId: 'electrical', name: 'Wiring', location: 'Okpuno', description: 'Safe and compliant electrical wiring installations and repairs for new builds and existing structures.', icon: 'fa-plug' },
    { id: 7, catId: 'electrical', name: 'Fixtures', location: 'Amaenyi', description: 'Professional fitting of lighting, switches, sockets, and other electrical fixtures.', icon: 'fa-lightbulb' },
    { id: 8, catId: 'electrical', name: 'Appliance installation and maintenance', location: 'Amawbia', description: 'Expert setup and routine servicing of household and commercial appliances to extend their lifespan.', icon: 'fa-tv' },
    { id: 9, catId: 'lifestyle', name: 'Shopping', location: 'Government house', description: 'Personal shopping for essentials and other needs, delivered to your preferred location.', icon: 'fa-shopping-cart' },
    { id: 10, catId: 'lifestyle', name: 'Home car-washing', location: 'Aguawka', description: 'Convenient, thorough vehicle cleaning carried out right at your doorstep.', icon: 'fa-car' },
    { id: 11, catId: 'building', name: 'Carpentry', location: 'Ngozika', description: 'Custom woodwork, furniture making, repairs, and installations crafted to your specification.', icon: 'fa-hammer' },
    { id: 12, catId: 'building', name: 'Painting', location: 'Udoka', description: 'Interior and exterior painting services that give your space a beautiful, refreshed finish.', icon: 'fa-paint-roller' },
    { id: 13, catId: 'personal', name: 'Hairstyling/Barbing', location: 'Kwata', description: 'Professional hair and grooming services brought directly to your home or preferred location.', icon: 'fa-cut' },
    { id: 14, catId: 'personal', name: 'Laundry', location: 'Ifite', description: 'Washing, drying, ironing, and folding services handled with care and returned fresh.', icon: 'fa-tshirt' },
    { id: 15, catId: 'logistics', name: 'Relocation', location: 'Regina', description: 'Stress-free residential and commercial moving services, carefully handled from start to finish.', icon: 'fa-truck-loading' },
    { id: 16, catId: 'logistics', name: 'Haulage', location: 'Amansea', description: 'Reliable transportation of large equipment, furniture, and bulk goods to any destination.', icon: 'fa-truck-moving' },
    { id: 17, catId: 'logistics', name: 'Errands', location: 'Arroma', description: 'Trusted assistance with time-sensitive tasks and day-to-day runs so you can focus on what matters.', icon: 'fa-running' },
    { id: 18, catId: 'others', name: 'Personalized, tailored, or emergency services', location: 'Tempsite', description: 'Can’t find what you need? We accommodate unique, custom, and urgent requests to ensure no need goes unmet.', icon: 'fa-star' }
];

const providers = [
    { id: 101, serviceId: 1, name: 'Sarah Cleaners', location: 'Ifite', price: 5000, rating: 4.8, photo: 'provider-sarah.png', about: '5 years of experience in eco-friendly cleaning.', jobs: 527 },
    { id: 102, serviceId: 1, name: 'EcoShine Team', location: 'Arroma', price: 4500, rating: 4.5, photo: 'provider-ecoshine.png', about: 'Fast and reliable cleaning services.', jobs: 413 },
    { id: 103, serviceId: 2, name: 'John the Plumber', location: 'Regina', price: 8000, rating: 4.9, photo: 'provider-john.png', about: 'Certified plumber with 10+ years experience.', jobs: 612 }
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
function showGuarantee() { hideAllPages(); document.getElementById('guaranteePage').classList.remove('hidden'); }

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
            </div>
            <h3 class="text-2xl font-bold mb-3 font-display text-slate-900">${svc.name}</h3>
            <p class="text-slate-500 mb-8 leading-relaxed">${svc.description}</p>
            <div class="flex items-center gap-2 text-serva-blue font-bold uppercase text-xs tracking-widest">
                View service providers <i class="fas fa-arrow-right text-[10px]"></i>
            </div>
        </div>
    `).join('') : '<div class="col-span-1 md:col-span-2 py-16 text-center"><p class="text-slate-500 text-lg">No services found in this category yet.</p></div>';
}

let currentServiceId = null;
function showProviders(serviceId) {
    currentServiceId = serviceId;
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
                    <option value="Ifite">Ifite</option>
                    <option value="Regina">Regina</option>
                    <option value="Amansea">Amansea</option>
                    <option value="Arroma">Arroma</option>
                    <option value="Tempsite">Tempsite</option>
                    <option value="Okpuno">Okpuno</option>
                    <option value="Amaenyi">Amaenyi</option>
                    <option value="Amawbia">Amawbia</option>
                    <option value="Government house">Government house</option>
                    <option value="Aguawka">Aguawka</option>
                    <option value="Ngozika">Ngozika</option>
                    <option value="Udoka">Udoka</option>
                    <option value="Kwata">Kwata</option>
                </select>
            </div>
            <p class="text-sm text-slate-400 font-medium">${filteredProviders.length} providers found</p>
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
                                <span class="text-xl font-bold text-slate-900">₦${p.price.toLocaleString()}</span>
                            </div>
                            <button onclick="showProfile(${p.id})" class="provider-book-btn">
                                View Profile <i class="fas fa-user ml-1 text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function showProfile(providerId) {
    const provider = providers.find(p => p.id === providerId);
    if (!provider) return;
    hideAllPages();
    document.getElementById('providerProfilePage').classList.remove('hidden');
    const container = document.getElementById('profileDetails');
    
    container.innerHTML = `
        <div class="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
            <div class="relative h-48 bg-serva-500">
                <div class="absolute -bottom-16 left-8">
                    <img src="${provider.photo}" alt="${provider.name}" class="w-32 h-32 rounded-3xl border-4 border-white shadow-lg object-cover">
                </div>
            </div>
            <div class="pt-20 px-8 pb-8">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h2 class="text-3xl font-bold text-slate-900 font-display">${provider.name}</h2>
                        <p class="text-slate-500 flex items-center gap-2 mt-1">
                            <i class="fas fa-map-marker-alt text-serva-500"></i> ${provider.location}
                        </p>
                    </div>
                    <div class="text-right">
                        <p class="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Starting from</p>
                        <p class="text-3xl font-bold text-serva-600">₦${provider.price.toLocaleString()}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="p-4 bg-slate-50 rounded-2xl text-center">
                        <p class="text-xs text-slate-400 uppercase font-bold mb-1">Jobs Done</p>
                        <p class="text-xl font-bold text-slate-900">${provider.jobs}</p>
                    </div>
                    <div class="p-4 bg-slate-50 rounded-2xl text-center">
                        <p class="text-xs text-slate-400 uppercase font-bold mb-1">Rating</p>
                        <p class="text-xl font-bold text-slate-900">${provider.rating} <i class="fas fa-star text-amber-400"></i></p>
                    </div>
                    <div class="p-4 bg-slate-50 rounded-2xl text-center">
                        <p class="text-xs text-slate-400 uppercase font-bold mb-1">Status</p>
                        <p class="text-xl font-bold text-serva-500">Verified</p>
                    </div>
                </div>
                
                <div class="mb-8">
                    <h4 class="font-bold text-slate-900 mb-2 font-display">About the Provider</h4>
                    <p class="text-slate-500 leading-relaxed">${provider.about}</p>
                </div>
                
                <div class="mb-8">
                    <h4 class="font-bold text-slate-900 mb-4 font-display">Recent Work</h4>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div class="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300"><i class="fas fa-image text-3xl"></i></div>
                        <div class="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300"><i class="fas fa-image text-3xl"></i></div>
                        <div class="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300"><i class="fas fa-image text-3xl"></i></div>
                    </div>
                </div>
                
                <button onclick="openBookingModal(${provider.id})" class="w-full btn-primary text-white py-4 rounded-2xl font-bold text-xl shadow-lg shadow-serva-500/30">
                    Book Now
                </button>
            </div>
        </div>
    `;
}

function performVisibleSearch() {
    const q = document.getElementById('visibleHeroSearch').value.toLowerCase();
    if (!q) return;
    const matches = allServices.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    if (matches.length) {
        showCategoryServices(matches[0].catId);
    } else {
        showToast("No services found for your search.");
    }
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
    const phone = form.querySelector('input[placeholder="Phone Number (WhatsApp)"]').value;
    const location = form.querySelector('input[placeholder="Location (e.g. Ifite)"]').value;
    const service = form.querySelector('input[placeholder="Service offered (e.g. Plumbing)"]').value;
    showToast("Application submitted! Redirecting to WhatsApp...");
    setTimeout(() => {
        window.open(`https://wa.me/+2348112174969?text=Hello, I would like to offer my services on Serva.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ALocation: ${encodeURIComponent(location)}%0AService: ${encodeURIComponent(service)}`, '_blank');
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
    const servicesCounter = document.getElementById('servicesCounter');
    const trustCount = document.getElementById('trustCount');
    const satisfactionCounter = document.getElementById('satisfactionCounter');
    
    if (!servicesCounter) return;
    let s = 0, t = 0, sa = 0;
    const interval = setInterval(() => {
        s += 1; t += 2; sa += 2;
        if (s >= 17) s = 17;
        if (t >= 86) t = 86;
        if (sa >= 94) sa = 94;
        
        servicesCounter.textContent = s + '+';
        if (trustCount) trustCount.textContent = t + '+';
        if (satisfactionCounter) satisfactionCounter.textContent = sa + '%';
        
        if (s === 17 && t === 86 && sa === 94) clearInterval(interval);
    }, 40);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderFeatured();
    animateCounters();
});
