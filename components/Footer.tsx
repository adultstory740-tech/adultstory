import Link from "next/link";
import React from "react";

export default function Footer() {
    return (
        <footer className="bg-foreground text-background py-12 border-t border-border mt-16">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-primary">FreeSexKahani</h3>
                    <p className="text-sm text-background/80 leading-relaxed">
                        भारत की सबसे बेहतरीन और लोकप्रिय हिंदी अडल्ट कहानियों का संग्रह। यहाँ पढ़ें ताज़ा और रोमांचित कर देने वाली कहानियां।
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-background">महत्वपूर्ण लिंक</h4>
                    <ul className="space-y-2 text-sm text-background/80">
                        <li><Link href="/about" className="hover:text-primary transition-colors">हमारे बारे में</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">संपर्क करें</Link></li>
                        <li><Link href="/privacy" className="hover:text-primary transition-colors">प्राइवेसी पॉलिसी</Link></li>
                        <li><Link href="/terms" className="hover:text-primary transition-colors">नियम और शर्तें</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-background">श्रेणियां</h4>
                    <ul className="space-y-2 text-sm text-background/80">
                        <li><Link href="/category/devar-bhabhi" className="hover:text-primary transition-colors">देवर भाभी</Link></li>
                        <li><Link href="/category/jija-sali" className="hover:text-primary transition-colors">जीजा साली</Link></li>
                        <li><Link href="/category/padosi" className="hover:text-primary transition-colors">पड़ोसी</Link></li>
                        <li><Link href="/category/hot-romance" className="hover:text-primary transition-colors">हॉट रोमांस</Link></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-background/20 text-center text-xs text-background/60">
                &copy; {new Date().getFullYear()} FreeSexKahani. All rights reserved. 18+ Only.
            </div>
        </footer>
    );
}
