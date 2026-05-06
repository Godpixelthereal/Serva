// Supabase Initialization
const SUPABASE_URL = "https://zcxixbrtdmwtjxtbnezk.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_MAqGo_FVYT3ZCGSJ1NvO3w_PyjZkOhV";
let supabaseClient = null;

function getSupabase() {
    if (supabaseClient) return supabaseClient;
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        return supabaseClient;
    }
    return null;
}

async function loadAppData() {
    try {
        const client = getSupabase();
        if (!client) throw new Error("Supabase library not loaded");

        // Fetch Services
        const { data: services, error: sError } = await client.from('services').select('*');
        if (!sError) allServicesData = services;

        // Fetch Approved Providers
        const { data: providers, error: pError } = await client.from('providers').select('*').eq('status', 'approved');
        if (!pError) providersData = providers;
        
        console.log("Supabase data loaded successfully");
    } catch (e) {
        console.error("Supabase load error:", e);
        // Fallback to local storage or data.js if Supabase fails
        const stored = localStorage.getItem('serva_providers');
        if (stored) providersData = JSON.parse(stored);
    }
}


// Navigation State & Routing
function hideAllPages() { 
    document.querySelectorAll('.page-section').forEach(p => p.classList.add('hidden')); 
    window.scrollTo(0, 0); 
    // Close mobile menu on every navigation
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) mobileMenu.classList.add('hidden');
}

// Public Navigation API (Updates Hash)
function showHome() { window.location.hash = 'home'; }
function showCategories() { window.location.hash = 'categories'; }
function showAbout() { window.location.hash = 'about'; }
function showContact() { window.location.hash = 'contact'; }
function showFeedback() { window.location.hash = 'feedback'; }
function showTerms() { window.location.hash = 'terms'; }
function showGuarantee() { window.location.hash = 'guarantee'; }
function showBlog() { window.location.hash = 'blog'; }
function showJoin() { window.location.hash = 'join'; }

function handleRouting() {
    const hash = window.location.hash.substring(1) || 'home';
    const [path, param] = hash.split('/');

    hideAllPages();

    // Route Logic
    if (path === 'home') {
        document.getElementById('homePage').classList.remove('hidden');
    } else if (path === 'categories') {
        document.getElementById('categoriesPage').classList.remove('hidden');
        renderCategories();
    } else if (path === 'category' && param) {
        renderCategoryServicesInternal(param);
    } else if (path === 'services' && param) {
        renderProvidersListInternal(parseInt(param));
    } else if (path === 'provider' && param) {
        renderProfileInternal(parseInt(param));
    } else if (path === 'about') {
        document.getElementById('aboutPage').classList.remove('hidden');
    } else if (path === 'contact') {
        document.getElementById('contactPage').classList.remove('hidden');
    } else if (path === 'feedback') {
        document.getElementById('feedbackPage').classList.remove('hidden');
    } else if (path === 'terms') {
        document.getElementById('termsPage').classList.remove('hidden');
    } else if (path === 'guarantee') {
        document.getElementById('guaranteePage').classList.remove('hidden');
    } else if (path === 'blog') {
        document.getElementById('blog-page').classList.remove('hidden');
    } else if (path === 'join') {
        document.getElementById('joinPage').classList.remove('hidden');
        renderJoinServices();
    } else {
        // Fallback to home
        window.location.hash = 'home';
    }
}

function toggleMobileMenu() { document.getElementById('mobileMenu').classList.toggle('hidden'); }

// Dynamic Rendering
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    const serviceCounts = {};
    categories.forEach(cat => { serviceCounts[cat.id] = allServicesData.filter(s => s.catId === cat.id).length; });
    grid.innerHTML = categories.map(cat => `
        <div class="category-card-v3" style="background: ${cat.gradient};" onclick="showCategoryServices('${cat.id}')">
            <div class="cat-v3-content">
                <h3 class="cat-v3-title text-white">${cat.name}</h3>
                <p class="cat-v3-desc text-white/80">${cat.description}</p>
                <div class="cat-v3-btn bg-white/20 text-white">
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
    
    // Services to show on home page (ids 1, 2, 9, 14)
    const featuredIds = [1, 2, 14, 9];
    const featuredServices = featuredIds.map(id => allServicesData.find(s => s.id === id)).filter(Boolean);

    grid.innerHTML = featuredServices.map(svc => {
        // Find minimum price from providers for this service
        const providers = providersData.filter(p => p.serviceId === svc.id);
        const minPrice = providers.length > 0 
            ? Math.min(...providers.map(p => p.price))
            : (svc.price || 0);

        const priceDisplay = minPrice > 0 ? `₦${minPrice.toLocaleString()}` : 'Contact Us';

        return `
        <div class="service-card-new" onclick="showProviders(${svc.id})">
            <h3 class="text-lg font-bold text-slate-900 mb-2 font-display">${svc.name}</h3>
            <p class="text-sm text-slate-500 mb-8 leading-relaxed">${svc.description}</p>
            <div class="flex items-center justify-between mt-auto">
                <div class="w-11 h-11 rounded-full bg-serva-500 text-white flex items-center justify-center text-lg">
                    <i class="fas ${svc.icon}"></i>
                </div>
                <div class="text-right">
                    <p class="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Starting from</p>
                    <p class="text-lg font-bold text-serva-600">${priceDisplay}</p>
                </div>
            </div>
        </div>
    `}).join('');
}

function showCategoryServices(catId) { window.location.hash = `category/${catId}`; }

function renderCategoryServicesInternal(catId) {
    const cat = categories.find(c => c.id === catId);
    if (!cat) return;
    document.getElementById('servicesListPage').classList.remove('hidden');
    document.getElementById('categoryTitle').textContent = cat.name;

    const services = allServicesData.filter(s => s.catId === catId);
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
function showProviders(serviceId) { window.location.hash = `services/${serviceId}`; }

function renderProvidersListInternal(serviceId) {
    currentServiceId = serviceId;
    const svc = allServicesData.find(s => s.id === serviceId);
    hideAllPages();
    document.getElementById('providerPage').classList.remove('hidden');
    document.getElementById('providerNameHeader').textContent = svc ? svc.name : 'Providers';

    const filteredProviders = providersData.filter(p => p.serviceId === serviceId);
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
                    <option value="PH">PH</option>
                    <option value="Enugu">Enugu</option>
                    <option value="Obosi">Obosi</option>
                    <option value="Asaba">Asaba</option>
                    <option value="Awka">Awka</option>
                    <option value="Kwata">Kwata</option>
                </select>
            </div>
            <p class="text-sm text-slate-400 font-medium">${filteredProviders.length} providers found</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="providersList">
            ${renderProvidersItems(filteredProviders)}
        </div>
    `;

    // Add event listener for filtering
    const filter = document.getElementById('filterLocation');
    if (filter) {
        filter.addEventListener('change', (e) => {
            const loc = e.target.value;
            const providers = loc ? providersData.filter(p => p.serviceId === serviceId && p.location === loc) : providersData.filter(p => p.serviceId === serviceId);
            const list = document.getElementById('providersList');
            if (list) list.innerHTML = renderProvidersItems(providers);
        });
    }
}

function renderProvidersItems(providers) {
    return providers.length ? providers.map(p => `
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
    `).join('') : '<div class="col-span-full py-20 text-center"><p class="text-slate-400">No providers found in this location.</p></div>';
}

function showProfile(providerId) { window.location.hash = `provider/${providerId}`; }

function renderProfileInternal(providerId) {
    const provider = providersData.find(p => p.id === providerId);
    if (!provider) return;
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
                        <button onclick="window.history.back()"
                        class="text-slate-500 hover:text-slate-900 mb-4 flex items-center gap-2 text-sm sm:text-base transition"><i
                            class="fas fa-arrow-left"></i> Back</button>
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
                        ${provider.portfolio && provider.portfolio.length ? 
                            provider.portfolio.map(img => `
                                <div class="aspect-square bg-slate-100 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                                    <img src="${img}" alt="Work" class="w-full h-full object-cover">
                                </div>
                            `).join('') : `
                                <div class="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300"><i class="fas fa-image text-3xl"></i></div>
                                <div class="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300"><i class="fas fa-image text-3xl"></i></div>
                                <div class="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300"><i class="fas fa-image text-3xl"></i></div>
                            `
                        }
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
    const matches = allServicesData.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
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
    const provider = providersData.find(p => p.id === selectedProviderId);
    const service = allServicesData.find(s => s.id === provider.serviceId);
    const serviceName = service ? service.name : 'your service';
    const message = `Hello Serva, I would like to book *${serviceName}* with *${provider.name}* (${provider.location}).%0A%0AMy email: ${encodeURIComponent(email)}`;
    showToast(`Redirecting to WhatsApp to book ${provider.name}...`);
    closeModals();
    const url = `https://wa.me/+2348112174969?text=${message}`;
    window.location.href = url;
}

function handleOffer(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[placeholder="Full Name"]').value;
    const phone = form.querySelector('input[placeholder="Phone Number (WhatsApp)"]').value;
    const location = form.querySelector('input[placeholder="Location (e.g. Ifite)"]').value;
    const service = form.querySelector('input[placeholder="Service offered (e.g. Plumbing)"]').value;
    const message = `Hello Serva, I would like to offer my services on your platform.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Location:* ${encodeURIComponent(location)}%0A*Service:* ${encodeURIComponent(service)}`;
    showToast("Application submitted! Redirecting to WhatsApp...");
    closeModals();
    form.reset();
    const url = `https://wa.me/+2348112174969?text=${message}`;
    window.location.href = url;
}

function handleFeedback(e) {
    e.preventDefault();
    showToast("Thank you for your feedback!");
    e.target.reset();
}

function setFeedbackTab(e, tab) {
    const buttons = document.querySelectorAll('#feedbackTabs button');
    buttons.forEach(btn => {
        btn.classList.remove('text-serva-500', 'border-b-2', 'border-serva-500', 'bg-serva-50/50');
        btn.classList.add('text-slate-500');
    });
    e.target.classList.add('text-serva-500', 'border-b-2', 'border-serva-500', 'bg-serva-50/50');
}



function showToast(msg) {
    const t = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = msg;
    t.classList.remove('hidden');
    setTimeout(() => t.classList.add('hidden'), 5000);
}

// Become a Provider Logic
function renderJoinServices() {
    const select = document.getElementById('joinServiceSelect');
    if (!select) return;
    select.innerHTML = '<option value="" disabled selected>Select a category</option>' + 
        allServicesData.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
}

let uploadedFiles = [];
function previewImages(input) {
    const grid = document.getElementById('imagePreviewGrid');
    const files = Array.from(input.files);
    
    files.forEach(file => {
        if (uploadedFiles.length >= 5) return;
        uploadedFiles.push(file);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const div = document.createElement('div');
            div.className = 'aspect-square rounded-2xl overflow-hidden relative group';
            div.innerHTML = `
                <img src="${e.target.result}" class="w-full h-full object-cover">
                <button type="button" onclick="removeImage(${uploadedFiles.length - 1})" class="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <i class="fas fa-times text-[10px]"></i>
                </button>
            `;
            grid.appendChild(div);
        };
        reader.readAsDataURL(file);
    });
}

function removeImage(index) {
    uploadedFiles.splice(index, 1);
    const grid = document.getElementById('imagePreviewGrid');
    const divs = grid.querySelectorAll('div:not(label)');
    if (divs[index]) divs[index].remove();
}

async function handleJoinForm(e) {
    e.preventDefault();
    const btn = document.getElementById('submitJoinBtn');
    const originalText = btn.innerHTML;
    
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Processing...`;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    const client = getSupabase();
    if (!client) {
        showToast("Service currently unavailable. Please try again later.");
        return;
    }

    try {
        const portfolioUrls = [];
        
        // 1. Upload Images to Supabase Storage
        for (const file of uploadedFiles) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `applications/${fileName}`;

            const { data: uploadData, error: uploadError } = await client.storage
                .from('provider-portfolios')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = client.storage
                .from('provider-portfolios')
                .getPublicUrl(filePath);
                
            portfolioUrls.push(publicUrl);
        }

        // 2. Insert Provider Data
        const { error } = await client.from('providers').insert([{
            name: data.name,
            business_name: data.business_name,
            location: data.location,
            about: data.about,
            call_line: data.call_line,
            whatsapp_line: data.whatsapp_line,
            price: parseInt(data.price),
            service_id: parseInt(data.serviceId),
            photo_url: portfolioUrls[0] || 'provider-sarah.png', // First image is profile pic
            portfolio_urls: portfolioUrls,
            status: 'pending',
            rating: 5.0,
            jobs: 0
        }]);

        if (error) throw error;

        showToast("Application submitted! We will review and contact you shortly.");
        e.target.reset();
        document.getElementById('imagePreviewGrid').querySelectorAll('div:not(label)').forEach(el => el.remove());
        uploadedFiles = [];
        showHome();
    } catch (err) {
        console.error("Submission error:", err);
        showToast("Error uploading application. Please check your connection.");
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}
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
// FAQ Functionality
function renderFAQ() {
    const categoriesContainer = document.getElementById('faqCategories');
    const itemsContainer = document.getElementById('faqItems');
    if (!categoriesContainer || !itemsContainer) return;

    // Render Categories
    const categories = ['All', ...faqData.map(group => group.category)];
    categoriesContainer.innerHTML = categories.map((cat, index) => `
        <button onclick="filterFAQ('${cat}', this)" 
            class="px-6 py-2 rounded-full font-medium transition-all ${index === 0 ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'}">
            ${cat}
        </button>
    `).join('');

    // Initial render of all questions
    filterFAQ('All', categoriesContainer.querySelector('button'));
}

function filterFAQ(category, button) {
    const itemsContainer = document.getElementById('faqItems');
    const buttons = document.querySelectorAll('#faqCategories button');
    
    // Update active button state
    buttons.forEach(btn => {
        btn.className = "px-6 py-2 rounded-full font-medium transition-all bg-white text-slate-600 border border-slate-100 hover:bg-slate-50";
    });
    button.className = "px-6 py-2 rounded-full font-medium transition-all bg-emerald-600 text-white shadow-lg";

    // Filter questions
    let questions = [];
    if (category === 'All') {
        faqData.forEach(group => questions.push(...group.questions));
    } else {
        const group = faqData.find(g => g.category === category);
        if (group) questions = group.questions;
    }

    // Render Items
    itemsContainer.innerHTML = questions.map((item, index) => `
        <div class="faq-item group bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300">
            <button class="faq-trigger w-full flex items-center justify-between p-6 text-left focus:outline-none" onclick="toggleFAQ(this)">
                <span class="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">${item.q}</span>
                <span class="faq-icon w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                    <i class="fas fa-plus text-xs"></i>
                </span>
            </button>
            <div class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                <div class="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50">
                    ${item.a}
                </div>
            </div>
        </div>
    `).join('');
}

function toggleFAQ(button) {
    const item = button.closest('.faq-item');
    const isActive = item.classList.contains('active');

    // Close all other items
    document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherIcon = otherItem.querySelector('.faq-icon i');
            if (otherIcon) otherIcon.className = 'fas fa-plus text-xs';
            const otherContent = otherItem.querySelector('.faq-content');
            if (otherContent) otherContent.style.maxHeight = null;
        }
    });

    // Toggle current item
    item.classList.toggle('active');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon i');
    
    if (item.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.className = 'fas fa-minus text-xs';
    } else {
        content.style.maxHeight = null;
        icon.className = 'fas fa-plus text-xs';
    }
}

// Init
document.addEventListener('DOMContentLoaded', async () => {
    await loadAppData();
    renderFeatured();
    renderFAQ();
    animateCounters();
    
    // Initialize Routing
    window.addEventListener('hashchange', handleRouting);
    handleRouting(); // First load
});
