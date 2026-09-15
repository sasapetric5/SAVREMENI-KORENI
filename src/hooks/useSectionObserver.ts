import { useEffect, useRef } from 'react';
import { trackSectionView } from '../utils/analytics';

interface SectionConfig {
  id: string;
  title: string;
}

const DEFAULT_SECTIONS: SectionConfig[] = [
  { id: 'pocetna', title: 'Početna / Hero' },
  { id: 'o-nama', title: 'O Brendu i Filozofiji' },
  { id: 'katalog', title: 'Katalog Proizvoda' },
  { id: 'izrada', title: 'Izrada po Meri' },
  { id: 'blog', title: 'Blog & Vodiči Kroz Tradiciju' },
  { id: 'galerija', title: 'Galerija Radionice & Vaše Slike' },
  { id: 'drustvene-mreze', title: 'Društvene Mreže' },
  { id: 'podaci-firme', title: 'Pravni Podaci i APR' },
  { id: 'kontakt', title: 'Kontakt i Lokacija' },
];

/**
 * Hook to automatically observe when user scrolls through main sections
 * and fires GA4 section_view events once per session/view.
 */
export function useSectionObserver(sections: SectionConfig[] = DEFAULT_SECTIONS) {
  const trackedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          const sectionId = entry.target.id;
          if (sectionId && !trackedSections.current.has(sectionId)) {
            trackedSections.current.add(sectionId);
            const found = sections.find((s) => s.id === sectionId);
            const title = found ? found.title : sectionId;
            trackSectionView(sectionId, title);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: [0.35, 0.6],
    });

    sections.forEach((sec) => {
      const element = document.getElementById(sec.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);
}
