import StoryGrid from "../../components/StoryGrid";
import Sidebar from "../../components/Sidebar";
import { Story } from "../../components/StoryCard";

const stories: Story[] = [
    {
        id: 1,
        title: "कॉलेज की कहानी",
        date: "22-03-2026",
        excerpt:
            "एक कॉलेज की कहानी जहां दो लोग सोशल मीडिया के जरिए मिलते हैं। धीरे-धीरे उनकी बातचीत बढ़ती है और वो एक-दूसरे को समझने लगते हैं। यह कहानी दोस्ती और नए रिश्तों की शुरुआत को दिखाती है।",
        category: "कॉलेज",
        tags: ["स्टोरी", "दोस्ती"],
    },
    {
        id: 2,
        title: "कैंपस क्रश",
        date: "20-03-2026",
        excerpt:
            "कैंपस में हुई एक मुलाकात जो धीरे-धीरे एक खास एहसास में बदल जाती है। हर दिन मिलने का इंतजार इस कहानी को खास बनाता है।",
        category: "कॉलेज",
        tags: ["क्रश", "कैंपस"],
    },
    {
        id: 3,
        title: "लेट नाइट चैट",
        date: "19-03-2026",
        excerpt:
            "दो अजनबी ऑनलाइन बात करते-करते करीब आ जाते हैं और अपने दिल की बातें शेयर বাতাসে हैं।",
        category: "ऑनलाइन",
        tags: ["चैट", "कनेक्शन"],
    },
    {
        id: 4,
        title: "ऑफिस सीक्रेट",
        date: "18-03-2026",
        excerpt:
            "ऑफिस में छुपे हुए रिश्तों और भावनाओं की कहानी जहां प्रोफेशनल लाइफ और इमोशन्स मिलते हैं।",
        category: "ऑफिस",
        tags: ["ड्रामा", "वर्क"],
    },
    {
        id: 5,
        title: "पहली डेट",
        date: "17-03-2026",
        excerpt:
            "पहली डेट हमेशा खास होती है—थोड़ी नर्वसनेस, थोड़ी एक्साइटमेंट और बहुत सारी यादें।",
        category: "डेटिंग",
        tags: ["डेट", "मज़ा"],
    },
    {
        id: 6,
        title: "जिम में मुलाकात",
        date: "16-03-2026",
        excerpt:
            "जिम में हुई एक साधारण सी मुलाकात धीरे-धीरे दोस्ती में बदल जाती है।",
        category: "फिटनेस",
        tags: ["जिम", "लाइफस्टाइल"],
    },
    {
        id: 7,
        title: "पड़ोसी की कहानी",
        date: "15-03-2026",
        excerpt:
            "पड़ोसी जो धीरे-धीरे अच्छे दोस्त बन जाते हैं और रिश्ता मजबूत होता है।",
        category: "लोकल",
        tags: ["पड़ोसी", "लाइफ"],
    },
    {
        id: 8,
        title: "यात्रा की यादें",
        date: "14-03-2026",
        excerpt:
            "एक ट्रिप जो जिंदगी भर याद रहती है—नई जगहें और नई कहानियां।",
        category: "ट्रैवल",
        tags: ["सफर", "एडवेंचर"],
    },
    {
        id: 9,
        title: "अचानक मुलाकात",
        date: "13-03-2026",
        excerpt:
            "एक अचानक मुलाकात जो खास बन जाती है और यादगार पल देती है।",
        category: "लाइफ",
        tags: ["मुलाकात", "स्टोरी"],
    },
    {
        id: 10,
        title: "पुराने दोस्त",
        date: "12-03-2026",
        excerpt:
            "पुराने दोस्त से मिलना और यादें ताज़ा करना हमेशा खास होता है।",
        category: "दोस्ती",
        tags: ["रीयूनियन", "यादें"],
    },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Content Area (Stories) */}
        <div className="lg:col-span-8">
          <StoryGrid title="📚 ताज़ा कहानियां" stories={stories} />
        </div>

        {/* Right Content Area (Sidebar) */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
