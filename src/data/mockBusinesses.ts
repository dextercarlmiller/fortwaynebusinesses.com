import type { Business } from '../lib/types'
import { generateSlug } from '../lib/utils'

function mockBusiness(partial: Omit<Business, 'id' | 'slug' | 'city' | 'state' | 'is_claimed' | 'is_featured' | 'is_verified' | 'tier' | 'created_at' | 'updated_at'> & Partial<Pick<Business, 'is_claimed' | 'is_featured' | 'is_verified' | 'tier'>>): Business {
  return {
    id: generateSlug(partial.name),
    slug: generateSlug(partial.name),
    city: 'Fort Wayne',
    state: 'IN',
    is_claimed: false,
    is_featured: false,
    is_verified: false,
    tier: 'free',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    ...partial,
  }
}

export const MOCK_BUSINESSES: Business[] = [
  mockBusiness({
    name: 'Fort Wayne Coffee Co.',
    category: 'Coffee & Cafes',
    subcategory: 'Coffee Shop',
    neighborhood: 'Downtown',
    address: '125 W Main St',
    zip: '46802',
    phone: '2605551234',
    website_url: null,
    description:
      'A cozy neighborhood coffee shop in the heart of downtown Fort Wayne. We roast our beans in-house and serve seasonal espresso drinks, pour-overs, and homemade pastries. A gathering spot for locals since 2018.',
    hours: {
      mon: '7:00 AM – 5:00 PM',
      tue: '7:00 AM – 5:00 PM',
      wed: '7:00 AM – 5:00 PM',
      thu: '7:00 AM – 5:00 PM',
      fri: '7:00 AM – 6:00 PM',
      sat: '8:00 AM – 6:00 PM',
      sun: '9:00 AM – 3:00 PM',
    },
    tags: ['coffee', 'espresso', 'pastries', 'local roaster'],
    is_featured: true,
    tier: 'featured',
  }),

  mockBusiness({
    name: 'Summit City Brewing',
    category: 'Restaurants & Bars',
    subcategory: 'Craft Brewery',
    neighborhood: 'Downtown',
    address: '201 E Calhoun St',
    zip: '46802',
    phone: '2605552345',
    website_url: 'https://summitcitybrewing.example.com',
    description:
      'Fort Wayne\'s original craft brewery, right in the center of Summit City. We brew 12 rotating taps of ales, lagers, and seasonal specialties alongside a full pub menu featuring locally sourced ingredients.',
    hours: {
      mon: 'Closed',
      tue: '4:00 PM – 10:00 PM',
      wed: '4:00 PM – 10:00 PM',
      thu: '4:00 PM – 11:00 PM',
      fri: '12:00 PM – 12:00 AM',
      sat: '12:00 PM – 12:00 AM',
      sun: '12:00 PM – 8:00 PM',
    },
    tags: ['craft beer', 'brewery', 'pub food', 'happy hour'],
    is_featured: true,
    is_verified: true,
    tier: 'featured',
  }),

  mockBusiness({
    name: 'Three Rivers Plumbing',
    category: 'Home Services',
    subcategory: 'Plumbing',
    neighborhood: 'Northside',
    address: '4820 Lima Rd',
    zip: '46808',
    phone: '2605553456',
    website_url: null,
    description:
      'Family-owned and operated plumbing company serving Fort Wayne and surrounding Allen County since 1992. We handle everything from emergency repairs to full bathroom remodels. Licensed, bonded, and insured.',
    hours: {
      mon: '7:00 AM – 6:00 PM',
      tue: '7:00 AM – 6:00 PM',
      wed: '7:00 AM – 6:00 PM',
      thu: '7:00 AM – 6:00 PM',
      fri: '7:00 AM – 6:00 PM',
      sat: '8:00 AM – 2:00 PM',
      sun: 'Emergency only',
    },
    tags: ['plumbing', 'repairs', 'remodel', 'licensed'],
  }),

  mockBusiness({
    name: 'Hoosier Auto Repair',
    category: 'Automotive',
    subcategory: 'Auto Repair',
    neighborhood: 'Georgetown',
    address: '3210 Coliseum Blvd W',
    zip: '46808',
    phone: '2605554567',
    website_url: 'https://hoosiераuto.example.com',
    description:
      'ASE-certified mechanics providing honest, affordable auto repair for all makes and models. From oil changes to engine rebuilds, we treat every car like it\'s our own. Free estimates on all work.',
    hours: {
      mon: '8:00 AM – 5:30 PM',
      tue: '8:00 AM – 5:30 PM',
      wed: '8:00 AM – 5:30 PM',
      thu: '8:00 AM – 5:30 PM',
      fri: '8:00 AM – 5:30 PM',
      sat: '9:00 AM – 2:00 PM',
      sun: 'Closed',
    },
    tags: ['auto repair', 'ASE certified', 'oil change', 'brakes'],
    is_verified: true,
    tier: 'premium',
  }),

  mockBusiness({
    name: 'Aboite Yoga & Wellness',
    category: 'Health & Fitness',
    subcategory: 'Yoga Studio',
    neighborhood: 'Aboite',
    address: '10311 Aboite Center Rd',
    zip: '46804',
    phone: '2605555678',
    website_url: 'https://aboiteyoga.example.com',
    description:
      'A welcoming yoga studio offering classes for all levels in southwest Fort Wayne. From beginner flow to advanced hot yoga, our certified instructors help you build strength, flexibility, and mindfulness.',
    hours: {
      mon: '6:00 AM – 8:00 PM',
      tue: '6:00 AM – 8:00 PM',
      wed: '6:00 AM – 8:00 PM',
      thu: '6:00 AM – 8:00 PM',
      fri: '6:00 AM – 7:00 PM',
      sat: '8:00 AM – 12:00 PM',
      sun: '9:00 AM – 11:00 AM',
    },
    tags: ['yoga', 'wellness', 'fitness', 'meditation'],
  }),

  mockBusiness({
    name: "TW's Burgers & Shakes",
    category: 'Restaurants & Bars',
    subcategory: 'Burger Joint',
    neighborhood: 'Waynedale',
    address: '2302 Lower Huntington Rd',
    zip: '46819',
    phone: '2605556789',
    website_url: null,
    description:
      'Waynedale\'s favorite spot for smash burgers, hand-cut fries, and thick milkshakes. Using local beef and fresh ingredients, we\'ve been serving up comfort food the Fort Wayne way since 2015.',
    hours: {
      mon: '11:00 AM – 9:00 PM',
      tue: '11:00 AM – 9:00 PM',
      wed: '11:00 AM – 9:00 PM',
      thu: '11:00 AM – 9:00 PM',
      fri: '11:00 AM – 10:00 PM',
      sat: '11:00 AM – 10:00 PM',
      sun: '12:00 PM – 8:00 PM',
    },
    tags: ['burgers', 'milkshakes', 'fries', 'diner'],
  }),

  mockBusiness({
    name: 'Rivers Edge Dental',
    category: 'Healthcare',
    subcategory: 'Dentist',
    neighborhood: 'Downtown',
    address: '110 W Berry St Suite 200',
    zip: '46802',
    phone: '2605557890',
    website_url: 'https://riversedgedental.example.com',
    description:
      'Modern dental care in the heart of downtown Fort Wayne. We offer comprehensive services including cleanings, cosmetic dentistry, orthodontics, and emergency care — all in a calm, welcoming environment.',
    hours: {
      mon: '8:00 AM – 5:00 PM',
      tue: '8:00 AM – 5:00 PM',
      wed: '8:00 AM – 5:00 PM',
      thu: '8:00 AM – 5:00 PM',
      fri: '8:00 AM – 2:00 PM',
      sat: 'Closed',
      sun: 'Closed',
    },
    tags: ['dentist', 'cosmetic dentistry', 'orthodontics', 'dental care'],
    is_verified: true,
    tier: 'premium',
  }),

  mockBusiness({
    name: 'Parkview Pet Clinic',
    category: 'Pet Services',
    subcategory: 'Veterinarian',
    neighborhood: 'Northside',
    address: '6120 Stellhorn Rd',
    zip: '46815',
    phone: '2605558901',
    website_url: 'https://parkviewpetclinic.example.com',
    description:
      'Compassionate veterinary care for dogs, cats, and small animals on Fort Wayne\'s northside. Our experienced vets offer wellness exams, vaccinations, surgery, dental cleanings, and urgent care.',
    hours: {
      mon: '8:00 AM – 6:00 PM',
      tue: '8:00 AM – 6:00 PM',
      wed: '8:00 AM – 6:00 PM',
      thu: '8:00 AM – 6:00 PM',
      fri: '8:00 AM – 6:00 PM',
      sat: '9:00 AM – 1:00 PM',
      sun: 'Closed',
    },
    tags: ['veterinarian', 'dogs', 'cats', 'pet care'],
  }),

  mockBusiness({
    name: 'Summit City Hair Studio',
    category: 'Beauty & Wellness',
    subcategory: 'Hair Salon',
    neighborhood: 'Downtown',
    address: '315 E Washington Blvd',
    zip: '46802',
    phone: '2605559012',
    website_url: null,
    description:
      'An upscale hair salon offering cuts, color, highlights, keratin treatments, and blowouts. Our stylists stay current with the latest trends and techniques to keep you looking your best.',
    hours: {
      mon: 'Closed',
      tue: '9:00 AM – 7:00 PM',
      wed: '9:00 AM – 7:00 PM',
      thu: '9:00 AM – 7:00 PM',
      fri: '9:00 AM – 7:00 PM',
      sat: '8:00 AM – 5:00 PM',
      sun: '10:00 AM – 3:00 PM',
    },
    tags: ['hair salon', 'color', 'highlights', 'blowout'],
  }),

  mockBusiness({
    name: 'Midwest HVAC Services',
    category: 'Home Services',
    subcategory: 'HVAC',
    neighborhood: 'Southwest',
    address: '7801 Decatur Rd',
    zip: '46816',
    phone: '2605550123',
    website_url: 'https://midwesthvac.example.com',
    description:
      'Full-service HVAC company serving residential and commercial clients across Allen County. Installation, repair, and maintenance of heating and cooling systems. 24/7 emergency service available.',
    hours: {
      mon: '7:00 AM – 7:00 PM',
      tue: '7:00 AM – 7:00 PM',
      wed: '7:00 AM – 7:00 PM',
      thu: '7:00 AM – 7:00 PM',
      fri: '7:00 AM – 7:00 PM',
      sat: '8:00 AM – 4:00 PM',
      sun: 'Emergency only',
    },
    tags: ['HVAC', 'heating', 'cooling', 'emergency service'],
    is_verified: true,
  }),
]

export function getMockBusiness(slug: string): Business | undefined {
  return MOCK_BUSINESSES.find(b => b.slug === slug)
}
