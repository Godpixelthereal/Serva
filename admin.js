// Admin Auth & Logic
const PASSCODE = "2024";

function checkAdminAccess() {
    const entered = document.getElementById('adminPasscode').value;
    if (entered === PASSCODE) {
        document.getElementById('loginOverlay').classList.add('hidden');
        document.getElementById('mainSidebar').classList.remove('hidden');
        document.getElementById('mainDashboard').classList.remove('hidden');
        initAdmin();
    } else {
        document.getElementById('loginError').classList.remove('hidden');
    }
}

function logoutAdmin() {
    location.reload();
}

function initAdmin() {
    // Load services for the select modal from data.js (allServicesData)
    const select = document.getElementById('modalServiceSelect');
    if (typeof allServicesData !== 'undefined') {
        select.innerHTML = allServicesData.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    } else {
        console.error("allServicesData is not defined. Ensure data.js is loaded.");
    }
    
    renderAdminProviders();
}

function renderAdminProviders() {
    const stored = localStorage.getItem('serva_providers');
    const displayProviders = stored ? JSON.parse(stored) : providersData;

    const list = document.getElementById('adminProviderList');
    list.innerHTML = displayProviders.map(p => {
        const serviceName = (typeof allServicesData !== 'undefined') 
            ? allServicesData.find(s => s.id == p.serviceId)?.name || 'Service'
            : 'Service';
            
        return `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
            <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400 overflow-hidden">
                        <img src="${p.photo}" alt="${p.name}" class="w-full h-full object-cover">
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
    const uniqueServices = new Set(displayProviders.map(p => p.serviceId));
    const activeServicesStat = document.getElementById('statActiveServices');
    if (activeServicesStat) activeServicesStat.textContent = uniqueServices.size;
}

function deleteProvider(id) {
    if (!confirm("Are you sure you want to remove this provider?")) return;
    const stored = localStorage.getItem('serva_providers');
    let currentProviders = stored ? JSON.parse(stored) : [...providersData];
    currentProviders = currentProviders.filter(p => p.id != id);
    localStorage.setItem('serva_providers', JSON.stringify(currentProviders));
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

function editProvider(id) {
    const stored = localStorage.getItem('serva_providers');
    const currentProviders = stored ? JSON.parse(stored) : [...providersData];
    const p = currentProviders.find(p => p.id == id);
    if (!p) return;

    // Open Modal
    document.getElementById('addModal').classList.remove('hidden');
    document.getElementById('modalTitle').textContent = "Edit Provider Details";
    document.getElementById('submitBtn').textContent = "Save Changes";

    // Fill Form
    const form = document.getElementById('addProviderForm');
    form.name.value = p.name;
    form.serviceId.value = p.serviceId;
    form.location.value = p.location;
    form.price.value = p.price;
    form.about.value = p.about;
    form.photo.value = p.photo;
    document.getElementById('editId').value = p.id;
}

function saveProvider(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const providerDataInput = Object.fromEntries(formData.entries());
    const editId = document.getElementById('editId').value;
    
    const stored = localStorage.getItem('serva_providers');
    let currentProviders = stored ? JSON.parse(stored) : [...providersData];

    if (editId) {
        // Update mode
        const index = currentProviders.findIndex(p => p.id == editId);
        if (index !== -1) {
            currentProviders[index] = {
                ...currentProviders[index],
                ...providerDataInput,
                price: parseInt(providerDataInput.price),
                serviceId: parseInt(providerDataInput.serviceId)
            };
        }
    } else {
        // Create mode
        const newProvider = {
            ...providerDataInput,
            id: Date.now(),
            rating: 5.0,
            jobs: 0,
            price: parseInt(providerDataInput.price),
            serviceId: parseInt(providerDataInput.serviceId)
        };
        currentProviders.push(newProvider);
    }

    // Persist to LocalStorage
    localStorage.setItem('serva_providers', JSON.stringify(currentProviders));

    alert(editId ? "Provider updated successfully!" : "Provider Approved! They are now live on your website.");
    closeModal();
    e.target.reset();
    renderAdminProviders(); // Refresh list
}
