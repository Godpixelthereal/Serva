// Shared Data Layer
const categories = [
    { id: 'repairs', name: 'Repairs', type: 'image', visual: 'repairs_bg_localized_1774610544054.png', gradient: 'linear-gradient(135deg, #254B96 0%, #1a3270 100%)', description: 'Services focused on fixing damaged or faulty items to restore them to proper working condition.' },
    { id: 'maintenance', name: 'Maintenance', type: 'image', visual: 'maintenance_bg_localized_1774610594834.png', gradient: 'linear-gradient(135deg, #006F3C 0%, #004d2a 100%)', description: 'Routine services to keep your spaces, equipment, and systems in good condition and prevent breakdowns.' },
    { id: 'electrical', name: 'Electrical Services', type: 'image', visual: 'electrical_bg_localized_1774610700416.png', gradient: 'linear-gradient(135deg, #DE902D 0%, #B45309 100%)', description: 'Solutions related to the installation, repair, and management of electrical systems and power-related needs.' },
    { id: 'lifestyle', name: 'Lifestyle', type: 'image', visual: 'lifestyle.png', gradient: 'linear-gradient(135deg, #27B376 0%, #006F3C 100%)', description: 'Convenience services that support daily living and make everyday tasks easier and more manageable.' },
    { id: 'building', name: 'Building', type: 'emoji', visual: '🏗️', gradient: 'linear-gradient(135deg, #254B96 0%, #173366 100%)', description: 'Services involved in the construction, renovation, and improvement of physical spaces and structures.' },
    { id: 'personal', name: 'Personal Care', type: 'image', visual: 'cat-personal.png', gradient: 'linear-gradient(135deg, #DE902D 0%, #B45309 100%)', description: 'Services centered on individual grooming, hygiene, and overall personal well-being.' },
    { id: 'logistics', name: 'Logistics & Moving', type: 'image', visual: 'logistics.png', gradient: 'linear-gradient(135deg, #27B376 0%, #006F3C 100%)', description: 'Services that handle the movement, delivery, and transportation of people, goods, or items from one place to another.' },
    { id: 'others', name: 'Others', type: 'emoji', visual: '✨', gradient: 'linear-gradient(135deg, #BF212F 0%, #a01b27 100%)', description: 'Custom or specialized services designed to meet unique, urgent, or less common needs.' }
];

let allServicesData = [
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

let providersData = [
    { id: 101, serviceId: 1, name: 'Sarah Cleaners', location: 'Ifite', price: 5000, rating: 4.8, photo: 'provider_sarah_new_1774610165024.png', about: '5 years of experience in eco-friendly cleaning.', jobs: 527 },
    { id: 102, serviceId: 1, name: 'EcoShine Team', location: 'Arroma', price: 4500, rating: 4.5, photo: 'provider_ecoshine_new_1774610190997.png', about: 'Fast and reliable cleaning services.', jobs: 413 },
    { id: 103, serviceId: 2, name: 'John the Plumber', location: 'Regina', price: 8000, rating: 4.9, photo: 'provider_john_new_1774610491464.png', about: 'Certified plumber with 10+ years experience.', jobs: 612 }
];
