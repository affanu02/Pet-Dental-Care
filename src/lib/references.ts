export type Reference = {
  author: string;
  date: string;
  title: string;
  url: string;
  siteName?: string;
  journal?: {
    name: string;
    volume: string;
    issue: string;
    pages: string;
  };
};

// Dates and bylines come from the original pages and their publication metadata.
// Use n.d. only when the source supplies no publication date.
export const SOURCES: Reference[] = [
  {
    author: "Bellows, J.",
    date: "2025, June 17",
    title: "Dental care in dogs and cats and what to expect",
    siteName: "Veterinary Partner",
    url: "https://veterinarypartner.vin.com/default.aspx?pid=19239&id=4951294",
  },
  {
    author: "Bellows, J., Berg, M. L., Dennis, S., Harvey, R., Lobprise, H. B., Snyder, C. J., Stone, A. E. S., & Van de Wetering, A. G.",
    date: "2019",
    title: "2019 AAHA dental care guidelines for dogs and cats",
    journal: {
      name: "Journal of the American Animal Hospital Association",
      volume: "55",
      issue: "2",
      pages: "49–69",
    },
    url: "https://doi.org/10.5326/JAAHA-MS-6933",
  },
  {
    author: "Boven, J.",
    date: "2026, February 17",
    title: "Home dental care for dogs & cats—Building habits that last a lifetime",
    siteName: "Leo Vets",
    url: "https://leovets.ca/blog/home-dental-care-for-dogs-cats-building-habits-that-last-a-lifetime/",
  },
  {
    author: "Greencross Vets",
    date: "2018, April 18",
    title: "Dental home care for pets",
    url: "https://www.greencrossvets.com.au/pet-library/articles-of-interest/dental-home-care/",
  },
  {
    author: "Texas A&M University",
    date: "2026, February 5",
    title: "The ‘tooth’ of the matter: Why pet dental care is so important",
    siteName: "Veterinary Medicine & Biomedical Sciences",
    url: "https://vetmed.tamu.edu/news/pet-talk/why-pet-dental-care-is-important/",
  },
  {
    author: "Veterinary Oral Health Council",
    date: "n.d.",
    title: "History of the VOHC",
    url: "https://vohc.org/history/",
  },
  {
    author: "The Vetster Editorial Team",
    date: "2024, April 7",
    title: "Why dental hygiene and oral health are important for pets",
    siteName: "Vetster",
    url: "https://vetster.com/en/wellness/why-dental-hygiene-and-oral-health-are-important-for-pets",
  },
];

export const IMAGE_CREDITS = {
  boneLossXray: {
    author: "Beckman, B.",
    date: "2025, August 12",
    title: "Periodontal disease in dogs: Evidence-based management strategies for small animal practitioners",
    siteName: "Veterinary Dentistry",
    url: "https://veterinarydentistry.net/periodontal-disease-dogs/",
  },
  warningSigns: {
    author: "Brown, L.",
    date: "2023, October 16",
    title: "Dog dental disease: 7 warning signs you can’t ignore",
    siteName: "MustCare Vet Centres",
    url: "https://mustcarevets.com.au/blogs/dental/spotting-trouble-early-7-signs-of-dental-disease-in-dogs/",
  },
  brushing: {
    author: "Dogwood Animal Hospital",
    date: "n.d.",
    title: "Pet dental care: Tips to manage your pet’s oral health",
    url: "https://www.dahnc.com/articles/pet-dental-care-tips-to-manage-your-pets-oral-health",
  },
  normalXray: {
    author: "Hale, F. A.",
    date: "2023, January 2",
    title: "Normal canine dental radiographs",
    siteName: "Vet Dent Edu",
    url: "https://vetdentedu.ca/2023/01/02/normal-canine-dental-radiographs/",
  },
  teeth: {
    author: "Laudano, M.",
    date: "2024, February 13",
    title: "How your pet’s dental health impacts the entire body",
    siteName: "NorthPoint Pets & Company",
    url: "https://www.northpointpets.com/howyourpetsdentalhealthimpactstheentirebody/",
  },
  catXray: {
    author: "McQueen Animal Hospital",
    date: "2020, December 30",
    title: "Veterinary digital dental radiography Brampton",
    url: "https://www.mcqueenanimalhospital.com/digital-dental-pet-radiography-brampton/",
  },
  annotated: {
    author: "Yonge Sheppard Animal Hospital Team",
    date: "2025, March 27",
    title: "Anesthesia-free vs COHAT",
    siteName: "Yonge Sheppard Animal Hospital",
    url: "https://yongesheppardvets.ca/anesthesia-free-vs-cohat/",
  },
} satisfies Record<string, Reference>;

export const IMAGE_REFERENCES: Reference[] = Object.values(IMAGE_CREDITS);
