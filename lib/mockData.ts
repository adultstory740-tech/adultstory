import { Story } from "../components/StoryCard";

export const CATEGORIES = [
    { name: "ताज़ा कहानियां", slug: "latest", href: "/" },
    { name: "देवर भाभी", slug: "devar-bhabhi", href: "/category/devar-bhabhi" },
    { name: "जीजा साली", slug: "jija-sali", href: "/category/jija-sali" },
    { name: "पड़ोसी", slug: "padosi", href: "/category/padosi" },
    { name: "हॉट रोमांस", slug: "hot-romance", href: "/category/hot-romance" },
    { name: "ऑफिस", slug: "office", href: "/category/office" },
    { name: "सुहागरात", slug: "suhagrat", href: "/category/suhagrat" },
];

export const stories: Story[] = [
    // --- 1. devar-bhabhi ---
    { id: 101, title: "देवर का बदला", date: "20-03-2026", excerpt: "देवर और भाभी की एक दिलचस्प कहानी...", category: "देवर भाभी", tags: ["devar-bhabhi", "भाभी"] },
    { id: 102, title: "भाभी का सीक्रेट", date: "21-03-2026", excerpt: "जब देवर को पता चला भाभी का एक गहरा राज...", category: "देवर भाभी", tags: ["devar-bhabhi", "हॉट"] },
    { id: 103, title: "देवरानी जेठानी और देवर", date: "19-03-2026", excerpt: "घर में देवर और भाभी का प्यार कैसे परवान चढ़ा...", category: "देवर भाभी", tags: ["devar-bhabhi", "रोमांस"] },
    { id: 104, title: "भाभी का नया अवतार", date: "15-03-2026", excerpt: "देवर ने भाभी को एक नए रूप में देखा...", category: "देवर भाभी", tags: ["devar-bhabhi"] },
    { id: 105, title: "रात के अंधेरे में", date: "12-03-2026", excerpt: "रात को जब घर में कोई नहीं था, देवर और भाभी...", category: "देवर भाभी", tags: ["devar-bhabhi", "हॉट"] },
    { id: 106, title: "भाभी का गिफ्ट", date: "10-03-2026", excerpt: "देवर ने अपनी प्यारी भाभी को दिया एक ऐसा तोहफा...", category: "देवर भाभी", tags: ["devar-bhabhi"] },
    { id: 107, title: "देवर का प्यार", date: "05-03-2026", excerpt: "देवर और भाभी की मीठी और तीखी नोकझोंक...", category: "देवर भाभी", tags: ["devar-bhabhi", "रोमांस"] },

    // --- 2. jija-sali ---
    { id: 201, title: "साली की डिमांड", date: "22-03-2026", excerpt: "जीजा के घर आते ही साली की नई फरमाइश...", category: "जीजा साली", tags: ["jija-sali", "साली"] },
    { id: 202, title: "जीजा के साथ ट्रिप", date: "18-03-2026", excerpt: "जब जीजा साली एक अनजानी ट्रिप पर गए...", category: "जीजा साली", tags: ["jija-sali", "हॉट"] },
    { id: 203, title: "साली की शादी", date: "16-03-2026", excerpt: "साली की शादी से पहले जीजा का एक गिफ्ट...", category: "जीजा साली", tags: ["jija-sali"] },
    { id: 204, title: "जीजा जी का वादा", date: "14-03-2026", excerpt: "जीजा ने साली से किया एक खास वादा...", category: "जीजा साली", tags: ["jija-sali", "रोमांस"] },
    { id: 205, title: "साली का नखरा", date: "11-03-2026", excerpt: "साली के नखरे हमेशा जीजा को परेशान करते...", category: "जीजा साली", tags: ["jija-sali", "मज़ा"] },
    { id: 206, title: "दीदी के पीठ पीछे", date: "09-03-2026", excerpt: "पत्नी के जाने के बाद जीजा और साली...", category: "जीजा साली", tags: ["jija-sali", "हॉट"] },
    { id: 207, title: "साली की पहली जॉब", date: "06-03-2026", excerpt: "जॉब लगने पर साली ने जीजा से मांगी पार्टी...", category: "जीजा साली", tags: ["jija-sali"] },

    // --- 3. padosi ---
    { id: 301, title: "पड़ोसन की नजर", date: "23-03-2026", excerpt: "सामने वाले घर की पड़ोसन हमेशा देखती रहती...", category: "पड़ोसी", tags: ["padosi", "पड़ोसन"] },
    { id: 302, title: "छत पर मुलाकात", date: "20-03-2026", excerpt: "गर्मी की रातों में छत पर पड़ोसी से हुई मुलाकात...", category: "पड़ोसी", tags: ["padosi", "रोमांस"] },
    { id: 303, title: "पड़ोसी अंकल", date: "17-03-2026", excerpt: "पड़ोसी की एक अनोखी कहानी जहाँ राज खुले...", category: "पड़ोसी", tags: ["padosi"] },
    { id: 304, title: "नया पड़ोसी", date: "13-03-2026", excerpt: "बगल वाले फ्लैट में आए गए नए पड़ोसी से दोस्ती...", category: "पड़ोसी", tags: ["padosi", "कॉलेज"] },
    { id: 305, title: "पड़ोसन का बहाना", date: "08-03-2026", excerpt: "बार-बार चीनी मांगने के बहाने घर आने वाली...", category: "पड़ोसी", tags: ["padosi", "हॉट"] },
    { id: 306, title: "बालकनी का प्यार", date: "04-03-2026", excerpt: "बालकनी से बालकनी दोनों की नजरें चार हुईं...", category: "पड़ोसी", tags: ["padosi", "रोमांस"] },
    { id: 307, title: "लोकल आंटी", date: "01-03-2026", excerpt: "सोसाइटी की सबसे खूबसूरत पड़ोसन...", category: "पड़ोसी", tags: ["padosi"] },

    // --- 4. hot-romance ---
    { id: 401, title: "बारिश में रोमांस", date: "23-03-2026", excerpt: "आधी रात को बारिश में अचानक हुई मुलाकात और...", category: "हॉट रोमांस", tags: ["hot-romance", "रोमांस"] },
    { id: 402, title: "अकेले घर में", date: "19-03-2026", excerpt: "जब पूरे घर में बस वो दोनों अकेले थे...", category: "हॉट रोमांस", tags: ["hot-romance", "हॉट"] },
    { id: 403, title: "डिनर डेट के बाद", date: "16-03-2026", excerpt: "रोमांटिक डिनर डेट का अंत एक बहुत ही खास...", category: "हॉट रोमांस", tags: ["hot-romance"] },
    { id: 404, title: "बेडरूम सीक्रेट", date: "14-03-2026", excerpt: "पति-पत्नी के बीच एक नई और बोल्ड शुरुआत...", category: "हॉट रोमांस", tags: ["hot-romance", "सुहागरात"] },
    { id: 405, title: "होटल रूम की रात", date: "11-03-2026", excerpt: "वीकेंड ट्रिप पर होटल रूम की वो हसीन रात...", category: "हॉट रोमांस", tags: ["hot-romance", "ट्रैवल"] },
    { id: 406, title: "आधी रात का खेल", date: "07-03-2026", excerpt: "देर रात जब नींद नहीं आ रही थी...", category: "हॉट रोमांस", tags: ["hot-romance", "हॉट"] },
    { id: 407, title: "स्वीमिंग पूल रोमांस", date: "03-03-2026", excerpt: "प्राइवेट पूल में बिताए कुछ यादगार पल...", category: "हॉट रोमांस", tags: ["hot-romance", "मज़ा"] },

    // --- 5. office ---
    { id: 501, title: "बॉस के साथ लॉक्ड", date: "22-03-2026", excerpt: "ऑफिस में लेट नाइट शिफ्ट और बॉस के साथ...", category: "ऑफिस", tags: ["office", "बॉस"] },
    { id: 502, title: "कलीग की नजर", date: "18-03-2026", excerpt: "डेस्क पर बैठे-बैठे आंखों ही आंखों में इशारे...", category: "ऑफिस", tags: ["office", "कलीग"] },
    { id: 503, title: "ऑफिस पार्टी का राज", date: "15-03-2026", excerpt: "क्रिसमस पार्टी के बाद जो कुछ हुआ वो...", category: "ऑफिस", tags: ["office", "पार्टी"] },
    { id: 504, title: "कांफ्रेंस रूम", date: "12-03-2026", excerpt: "खाली कांफ्रेंस रूम में एक छोटी सी मीटिंग...", category: "ऑफिस", tags: ["office", "हॉट"] },
    { id: 505, title: "नई सेक्रेटरी", date: "09-03-2026", excerpt: "बॉस की नई सेक्रेटरी के आने से ऑफिस का माहौल...", category: "ऑफिस", tags: ["office"] },
    { id: 506, title: "प्रमोशन का लालच", date: "05-03-2026", excerpt: "आगे बढ़ने की चाह में कलीग का एक बड़ा कदम...", category: "ऑफिस", tags: ["office", "ड्रामा"] },
    { id: 507, title: "केबिन में रोमांस", date: "02-03-2026", excerpt: "प्राइवेट केबिन में एक खास मुलाकात...", category: "ऑफिस", tags: ["office", "रोमांस"] },

    // --- 6. suhagrat ---
    { id: 601, title: "सुहागरात का पल", date: "23-03-2026", excerpt: "सजे हुए कमरे में पत्नी का इंतज़ार...", category: "सुहागरात", tags: ["suhagrat", "शादी"] },
    { id: 602, title: "पहली रात का डर", date: "21-03-2026", excerpt: "सुहागरात की वो घबराहट जो बाद में प्यार में...", category: "सुहागरात", tags: ["suhagrat", "हॉट"] },
    { id: 603, title: "दूध का गिलास", date: "18-03-2026", excerpt: "परंपरा अनुसार जब बीवी केसरी दूध लाई...", category: "सुहागरात", tags: ["suhagrat"] },
    { id: 604, title: "अरेंज मैरिज की रात", date: "15-03-2026", excerpt: "दो अनजान लोगों का एक होने का खूबसूरत सफर...", category: "सुहागरात", tags: ["suhagrat", "रोमांस"] },
    { id: 605, title: "घूंघट के पीछे", date: "10-03-2026", excerpt: "घूंघट उठाने पर जो चेहरा दिखा वो दिल जीत...", category: "सुहागरात", tags: ["suhagrat"] },
    { id: 606, title: "खिड़की खुली थी", date: "06-03-2026", excerpt: "सुहागरात की रात अचानक कमरे की खिड़की...", category: "सुहागरात", tags: ["suhagrat", "सस्पेंस"] },
    { id: 607, title: "हनीमून की शुरुआत", date: "02-03-2026", excerpt: "सुहागरात के अगले दिन हनीमून की पैकिंग और...", category: "सुहागरात", tags: ["suhagrat", "हनीमून"] },
];

export function getLatestStories(limit: number = 20) {
    // Sort by Date properly by converting dd-mm-yyyy to timestamp
    return [...stories].sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split("-");
        const [dayB, monthB, yearB] = b.date.split("-");
        const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
        const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
        return dateB.getTime() - dateA.getTime();
    }).slice(0, limit);
}
