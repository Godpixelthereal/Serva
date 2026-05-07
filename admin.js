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

// Admin Auth & Logic
const PASSCODE = "2024";

function checkAdminAccess() {
    const entered = document.getElementById('adminPasscode').value;
    if (entered === PASSCODE) {
        document.getElementById('loginOverlay').classList.add('hidden');
        document.getElementById('mainSidebar').classList.remove('hidden');
        document.getElementById('mainDashboard').classList.remove('hidden');
        // Initialize dashboard UI immediately, then load data
        showAdminSection('providers');
    } else {
        document.getElementById('loginError').classList.remove('hidden');
    }
}

function logoutAdmin() {
    location.reload();
}

function showAdminSection(section) {
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active', 'text-white');
        el.classList.add('text-slate-400');
    });
    
    const activeBtn = document.getElementById(`nav-${section}`);
    if (activeBtn) {
        activeBtn.classList.add('active', 'text-white');
        activeBtn.classList.remove('text-slate-400');
    }

    // Hide all sections
    document.getElementById('section-providers').classList.add('hidden');
    document.getElementById('section-applications').classList.add('hidden');

    if (section === 'providers') {
        document.getElementById('section-providers').classList.remove('hidden');
        renderAdminProviders();
    } else if (section === 'applications') {
        document.getElementById('section-applications').classList.remove('hidden');
        renderAdminApplications();
    } else {
        alert(`${section.charAt(0).toUpperCase() + section.slice(1)} module is coming soon!`);
    }
}

function initAdmin() {
    // Load services for the select modal from data.js (fallback)
    const select = document.getElementById('modalServiceSelect');
    if (typeof allServicesData !== 'undefined') {
        select.innerHTML = allServicesData.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    }
    
    // Fetch data in background
    loadAdminData();
}

async function loadAdminData() {
    try {
        const client = getSupabase();
        if (!client) return;

        // Fetch services from Supabase to update the modal
        const { data: services } = await client.from('services').select('*');
        if (services) {
            const select = document.getElementById('modalServiceSelect');
            select.innerHTML = services.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
        }
    } catch (e) {
        console.error("Admin data load error:", e);
    }
}

async function renderAdminProviders() {
    const client = getSupabase();
    if (!client) return;
    const { data: displayProviders, error } = await client.from('providers').select('*').eq('status', 'approved');
    if (error) { console.error("Fetch error:", error); return; }

    const list = document.getElementById('adminProviderList');
    list.innerHTML = displayProviders.map(p => {
        const svcId = p.service_id ?? p.serviceId;
        const serviceName = (typeof allServicesData !== 'undefined') 
            ? allServicesData.find(s => s.id == svcId)?.name || 'Service'
            : 'Service';
        const photoSrc = p.photo_url || p.photo || 'provider-sarah.png';
            
        return `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
            <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400 overflow-hidden">
                        <img src="${photoSrc}" alt="${p.name}" class="w-full h-full object-cover">
                    </div>
                    <span class="font-bold text-slate-900">${p.name}</span>
                </div>
            </td>
            <td class="px-6 py-4 text-sm text-slate-500">${serviceName}</td>
            <td class="px-6 py-4 text-sm text-slate-500">${p.location}</td>
            <td class="px-6 py-4 font-bold text-slate-900">₦${parseInt(p.price).toLocaleString()}</td>
            <td class="px-6 py-4 text-right">
                <button class="text-slate-300 hover:text-serva-blue p-2" onclick="editProvider(${p.id})"><i class="fas fa-edit"></i></button>
                <button class="text-slate-300 hover:text-red-500 p-2" onclick="deleteProvider(${p.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `}).join('');
    
    // Update Stats
    document.getElementById('statTotal').textContent = displayProviders.length;
    
    // Active Services (Unique Service IDs being provided)
    const uniqueServices = new Set(displayProviders.map(p => p.service_id ?? p.serviceId));
    const activeServicesStat = document.getElementById('statActiveServices');
    if (activeServicesStat) activeServicesStat.textContent = uniqueServices.size;
}

async function deleteProvider(id) {
    if (!confirm("Are you sure you want to remove this provider?")) return;
    const client = getSupabase();
    if (!client) return;
    const { error } = await client.from('providers').delete().eq('id', id);
    if (error) {
        console.error("Delete error:", error);
        alert("Failed to delete provider.");
        return;
    }
    alert("Provider removed successfully.");
    renderAdminProviders();
}

function openAddModal() { 
    document.getElementById('addModal').classList.remove('hidden'); 
    document.getElementById('modalTitle').textContent = "Add Service Provider";
    document.getElementById('submitBtn').textContent = "Approve & Publish";
    document.getElementById('addProviderForm').reset();
    document.getElementById('editId').value = "";
}

function closeModal() { document.getElementById('addModal').classList.add('hidden'); }

async function editProvider(id) {
    const client = getSupabase();
    if (!client) return;
    const { data: p, error } = await client.from('providers').select('*').eq('id', id).single();
    if (error || !p) { console.error("Fetch error:", error); return; }

    // Open Modal
    document.getElementById('addModal').classList.remove('hidden');
    document.getElementById('modalTitle').textContent = "Edit Provider Details";
    document.getElementById('submitBtn').textContent = "Save Changes";

    // Fill Form (map Supabase fields to form fields)
    const form = document.getElementById('addProviderForm');
    form.name.value = p.name;
    form.serviceId.value = p.service_id ?? p.serviceId;
    form.location.value = p.location;
    form.price.value = p.price;
    form.about.value = p.about;
    form.photo.value = p.photo_url || p.photo || '';
    document.getElementById('editId').value = p.id;
}

async function saveProvider(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const providerDataInput = Object.fromEntries(formData.entries());
    const editId = document.getElementById('editId').value;

    const client = getSupabase();
    if (!client) {
        alert("Service unavailable. Please try again.");
        return;
    }

    const payload = {
        name: providerDataInput.name,
        location: providerDataInput.location,
        price: parseInt(providerDataInput.price),
        service_id: parseInt(providerDataInput.serviceId),
        about: providerDataInput.about,
        photo_url: providerDataInput.photo || 'provider-sarah.png'
    };

    if (editId) {
        // Update existing provider
        const { error } = await client.from('providers').update(payload).eq('id', parseInt(editId));
        if (error) {
            console.error("Update error:", error);
            alert("Failed to update provider.");
            return;
        }
        alert("Provider updated successfully!");
    } else {
        // Create new approved provider
        payload.status = 'approved';
        payload.rating = 5.0;
        payload.jobs = 0;
        const { error } = await client.from('providers').insert([payload]);
        if (error) {
            console.error("Insert error:", error);
            alert("Failed to add provider.");
            return;
        }
        alert("Provider added and published!");
    }

    closeModal();
    e.target.reset();
    renderAdminProviders();
}

async function renderAdminApplications() {
    const client = getSupabase();
    if (!client) return;
    const { data: applications, error } = await client.from('providers').select('*').eq('status', 'pending');
    if (error) { console.error("Fetch error:", error); return; }

    const list = document.getElementById('adminApplicationList');
    if (!applications.length) {
        list.innerHTML = `<tr><td colspan="4" class="px-6 py-12 text-center text-slate-400">No pending applications found.</td></tr>`;
        return;
    }

    list.innerHTML = applications.map(app => {
        const svcId = app.service_id ?? app.serviceId;
        const serviceName = (typeof allServicesData !== 'undefined') 
            ? allServicesData.find(s => s.id == svcId)?.name || 'Service'
            : 'Service';

        return `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
            <td class="px-6 py-4">
                <div class="flex flex-col">
                    <span class="font-bold text-slate-900">${app.name}</span>
                    <span class="text-xs text-slate-400">${app.business_name}</span>
                </div>
            </td>
            <td class="px-6 py-4 text-sm text-slate-500">${serviceName}</td>
            <td class="px-6 py-4">
                <div class="flex flex-col gap-1">
                    <div class="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <i class="fas fa-phone text-emerald-500"></i> ${app.call_line}
                    </div>
                    <div class="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <i class="fab fa-whatsapp text-emerald-500"></i> ${app.whatsapp_line}
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                    <button class="bg-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-emerald-600 transition" onclick="approveApplication(${app.id})">Approve</button>
                    <button class="bg-slate-100 text-slate-600 px-3 py-2 rounded-lg text-xs font-bold hover:bg-red-50 hover:text-red-600 transition" onclick="rejectApplication(${app.id})">Reject</button>
                </div>
            </td>
        </tr>
    `}).join('');
}

async function approveApplication(id) {
    const client = getSupabase();
    if (!client) return;
    const { error } = await client.from('providers').update({ status: 'approved' }).eq('id', id);
    if (error) {
        console.error("Approve error:", error);
        alert("Failed to approve application.");
        return;
    }
    
    alert("Application approved! The provider is now live.");
    renderAdminApplications();
}

async function rejectApplication(id) {
    if (!confirm("Are you sure you want to reject this application?")) return;
    const client = getSupabase();
    if (!client) return;
    const { error } = await client.from('providers').delete().eq('id', id);
    if (error) {
        console.error("Reject error:", error);
        alert("Failed to reject application.");
        return;
    }
    alert("Application rejected.");
    renderAdminApplications();
}
