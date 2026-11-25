export const SITE = {
  brandName: 'أركان',
  brandFullName: 'أركان لصيانة الأجهزة المنزلية الكهربائية في مصر',
  brandEn: 'ARKAN CARE',
  domain: 'https://arkan-appliances-repair.vercel.app',
  // رقم تجريبي موحّد — عدّله هنا فقط ليتحدث في كامل الموقع والروابط والـ Schema
  phoneDisplay: '0100 000 0000',
  phoneHref: 'tel:+201000000000',
  whatsappNumber: '201000000000',
  email: 'info@arkan-care.eg',
  workingHours: 'يومياً من 8 صباحاً حتى 12 منتصف الليل (طوال أيام الأسبوع)',
  locationLabel: 'القاهرة • الجيزة • الإسكندرية • جميع محافظات مصر',
  defaultOgImage: '/images/hero-home-appliances-repair.webp',
  disclaimerShort:
    'أركان مركز صيانة مستقل متخصص لصيانة الأجهزة المنزلية خارج الضمان بقطع غيار أصلية، ولسنا توكيلاً رسمياً أو تابعين لأي علامة تجارية مذكورة.',
} as const;

export const IMG_DIMS: Record<string, { w: number; h: number }> = {
  '/images/hero-home-appliances-repair.webp': { w: 1376, h: 768 },
  '/images/service-ac-repair.webp': { w: 896, h: 1200 },
  '/images/service-fridge-repair.webp': { w: 896, h: 1200 },
  '/images/service-freezer-repair.webp': { w: 896, h: 1200 },
  '/images/service-washer-repair.webp': { w: 896, h: 1200 },
  '/images/service-dishwasher-repair.webp': { w: 896, h: 1200 },
  '/images/service-cooker-repair.webp': { w: 896, h: 1200 },
  '/images/service-heater-repair.webp': { w: 896, h: 1200 },
  '/images/service-microwave-repair.webp': { w: 896, h: 1200 },
  '/images/service-tv-repair.webp': { w: 896, h: 1200 },
  '/images/editorial-technician-care.webp': { w: 896, h: 1200 },
  '/images/egypt-cities-coverage.webp': { w: 1376, h: 768 },
};

export function whatsappUrl(
  message = 'مرحباً أركان، أريد حجز فني صيانة أجهزة منزلية بالمنزل'
): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: 'الرئيسية', href: '/' },
  { label: 'الأجهزة الـ 9', href: '/services/ac-repair' },
  { label: 'الماركات', href: '/brands' },
  { label: 'المحافظات', href: '/coverage/cairo' },
  { label: 'الأعطال والأسعار', href: '/blog' },
  { label: 'الضمان', href: '/warranty-and-parts' },
  { label: 'تواصل معنا', href: '/contact' },
] as const;

export const FEATURED_BRAND_LINKS = [
  { label: 'كريازي', en: 'Kiriazi', href: '/brands/kiriazi' },
  { label: 'توشيبا', en: 'Toshiba', href: '/brands/toshiba' },
  { label: 'إل جي', en: 'LG', href: '/brands/lg' },
  { label: 'وايت ويل', en: 'White Whale', href: '/brands/white-whale' },
  { label: 'زانوسي', en: 'Zanussi', href: '/brands/zanussi' },
  { label: 'فريش', en: 'Fresh', href: '/brands/fresh' },
  { label: 'يونيفرسال', en: 'Universal', href: '/brands/universal' },
  { label: 'شارب', en: 'Sharp', href: '/brands/sharp' },
  { label: 'سامسونج', en: 'Samsung', href: '/brands/samsung' },
  { label: 'كاريير', en: 'Carrier', href: '/brands/carrier-midea' },
  { label: 'أريستون', en: 'Ariston', href: '/brands/ariston-indesit' },
  { label: 'بيكو', en: 'Beko', href: '/brands/beko' },
] as const;

export const FOOTER_COLUMNS = {
  services: [
    { label: 'صيانة التكييفات وشحن الفريون', href: '/services/ac-repair' },
    { label: 'صيانة الثلاجات النوفروست', href: '/services/refrigerator-repair' },
    { label: 'صيانة الديب فريزر الرأسي والأفقي', href: '/services/deep-freezer-repair' },
    { label: 'صيانة الغسالات الأوتوماتيك والمجففات', href: '/services/washing-machine-repair' },
    { label: 'صيانة غسالات الأطباق', href: '/services/dishwasher-repair' },
    { label: 'صيانة البوتاجازات والأفران البلت-إن', href: '/services/cooker-oven-repair' },
    { label: 'صيانة السخانات الغاز والكهرباء', href: '/services/water-heater-repair' },
    { label: 'صيانة الميكروويف', href: '/services/microwave-repair' },
    { label: 'صيانة الشاشات والتلفزيونات', href: '/services/tv-screen-repair' },
  ],
  brands: [
    { label: 'دليل صيانة جميع الماركات', href: '/brands' },
    { label: 'صيانة كريازي', href: '/brands/kiriazi' },
    { label: 'صيانة توشيبا', href: '/brands/toshiba' },
    { label: 'صيانة إل جي LG', href: '/brands/lg' },
    { label: 'صيانة وايت ويل', href: '/brands/white-whale' },
    { label: 'صيانة زانوسي وإيديال زانوسي', href: '/brands/zanussi' },
    { label: 'صيانة فريش', href: '/brands/fresh' },
    { label: 'صيانة كاريير وميديا وجري', href: '/brands/carrier-midea' },
    { label: 'صيانة سامسونج للأجهزة المنزلية', href: '/brands/samsung' },
  ],
  coverageAndGuides: [
    { label: 'صيانة الأجهزة في القاهرة', href: '/coverage/cairo' },
    { label: 'صيانة الأجهزة في الجيزة وأكتوبر', href: '/coverage/giza' },
    { label: 'صيانة الأجهزة في الإسكندرية', href: '/coverage/alexandria' },
    { label: 'محافظات الدلتا والقناة والصعيد', href: '/coverage/egypt-governorates' },
    { label: 'أعطال التكييف وأسعار شحن الفريون', href: '/blog/ac-faults-freon-prices-egypt' },
    { label: 'رموز وأكواد أعطال الغسالات', href: '/blog/washing-machine-faults-error-codes' },
    { label: 'أسعار صيانة الأجهزة المنزلية 2026', href: '/blog/appliance-maintenance-prices-egypt' },
    { label: 'المدونة وأدلة الأعطال (12 دليلاً)', href: '/blog' },
  ],
} as const;
