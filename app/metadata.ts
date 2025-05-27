import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
    title: "Zenit Digital",
    description: "Landing page for Zenit Digital",
    icons: {
        icon: [
            {
                url: "/favicon2.png",
                type: "image/png",
                sizes: "any"
            }
        ],
    },
    robots: "index, follow",
    openGraph: {
        title: "Zenit Digital",
        description: "Landing page for Zenit Digital",
        type: "website",
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
    themeColor: '#00002e',
}; 