export const initialPdfRegistry = [
  {
    id: 'pyq-tnpsc-2025',
    title: 'TNPSC Group 4 2025 Solved Paper',
    exam: 'TNPSC Group 4',
    year: 2025,
    subject: 'General Studies & Tamil',
    language: 'Tamil & English',
    fileSize: '3.4 MB',
    downloads: 124500,
    isPublished: true,
    fileUrl: '/pdfs/tnpsc-group4-2025.pdf',
    uploadDate: '2025-10-15',
  },
  {
    id: 'pyq-upsc-2024',
    title: 'UPSC CSE Prelims 2024 General Studies Paper 1',
    exam: 'UPSC CSE',
    year: 2024,
    subject: 'GS Paper 1 & CSAT',
    language: 'English & Hindi',
    fileSize: '4.1 MB',
    downloads: 98000,
    isPublished: true,
    fileUrl: '/pdfs/upsc-cse-2024.pdf',
    uploadDate: '2024-06-02',
  },
  {
    id: 'pyq-ssc-2024',
    title: 'SSC CGL Tier I 2024 All Shifts Combined',
    exam: 'SSC CGL',
    year: 2024,
    subject: 'All 4 Shifts Combined',
    language: 'English',
    fileSize: '2.8 MB',
    downloads: 152000,
    isPublished: true,
    fileUrl: '/pdfs/ssc-cgl-2024.pdf',
    uploadDate: '2024-09-20',
  },
  {
    id: 'pyq-tnpsc-2023',
    title: 'TNPSC Group 2 Prelims 2023 Official Paper',
    exam: 'TNPSC Group 2',
    year: 2023,
    subject: 'Prelims General Studies',
    language: 'Tamil & English',
    fileSize: '3.8 MB',
    downloads: 85000,
    isPublished: true,
    fileUrl: '/pdfs/tnpsc-group2-2023.pdf',
    uploadDate: '2023-05-18',
  },
  {
    id: 'pyq-ibps-2022',
    title: 'IBPS Bank PO Prelims 2022 Memory Based Paper',
    exam: 'IBPS Bank PO',
    year: 2022,
    subject: 'Prelims & Mains Combined',
    language: 'English',
    fileSize: '2.2 MB',
    downloads: 64000,
    isPublished: false, // Unpublished example for testing disable state
    fileUrl: '',
    uploadDate: '2022-11-10',
  },
  {
    id: 'pyq-tnpsc-group1-2024',
    title: 'TNPSC Group 1 Prelims 2024 Official Paper',
    exam: 'TNPSC Group 1',
    year: 2024,
    subject: 'General Studies & Aptitude',
    language: 'Tamil & English',
    fileSize: '4.5 MB',
    downloads: 72000,
    isPublished: true,
    fileUrl: '/pdfs/tnpsc-group1-2024.pdf',
    uploadDate: '2024-07-15',
  },
  {
    id: 'pyq-tnpsc-group2-2022',
    title: 'TNPSC Group 2 & 2A Prelims 2022 Official Paper',
    exam: 'TNPSC Group 2',
    year: 2022,
    subject: 'General Studies & General Tamil',
    language: 'Tamil & English',
    fileSize: '5.1 MB',
    downloads: 145000,
    isPublished: true,
    fileUrl: '/pdfs/tnpsc-group2-2022.pdf',
    uploadDate: '2022-05-25',
  },
];

export function getStoredPdfRegistry() {
  try {
    const data = localStorage.getItem('exammaster_pdf_registry');
    if (data) return JSON.parse(data);
  } catch {
    // fallback
  }
  return initialPdfRegistry;
}

export function savePdfRegistry(registry) {
  try {
    localStorage.setItem('exammaster_pdf_registry', JSON.stringify(registry));
  } catch {
    // ignore
  }
}
