-- Consumer-friendly categories for Fort Wayne Business Directory
-- Run this in the Supabase SQL editor to populate the categories table.
-- Safe to re-run: uses INSERT ... ON CONFLICT DO UPDATE.

INSERT INTO categories (name, slug, icon, description, display_order)
VALUES
  ('Restaurants & Dining',      'restaurants-dining',       '🍽️',  'Eat in, take out, or delivery',             1),
  ('Auto Repair & Service',     'auto-repair-service',      '🔧',  'Mechanics, body shops & tires',             2),
  ('Home Services',             'home-services',            '🏠',  'Plumbers, electricians & more',             3),
  ('Health & Wellness',         'health-wellness',          '💚',  'Doctors, therapists & clinics',             4),
  ('Beauty & Personal Care',    'beauty-personal-care',     '✂️',  'Salons, spas & barbers',                    5),
  ('Shopping & Retail',         'shopping-retail',          '🛍️',  'Boutiques, gifts & everyday goods',         6),
  ('Legal & Financial',         'legal-financial',          '⚖️',  'Attorneys, accountants & advisors',         7),
  ('Daycares & Education',      'daycares-education',       '🎒',  'Child care, tutoring & schools',            8),
  ('Real Estate',               'real-estate',              '🏡',  'Agents, rentals & property mgmt',           9),
  ('Pet Services',              'pet-services',             '🐾',  'Vets, groomers & boarding',                 10),
  ('Medical & Dental',          'medical-dental',           '🏥',  'Physicians, dentists & specialists',        11),
  ('Gyms & Fitness',            'gyms-fitness',             '🏋️',  'Gyms, studios & personal trainers',         12),
  ('Entertainment & Events',    'entertainment-events',     '🎉',  'Fun, venues & things to do',                13),
  ('Construction & Contractors','construction-contractors',  '🔨',  'Builders, remodelers & trades',             14),
  ('Cleaning Services',         'cleaning-services',        '🧹',  'House, office & specialty cleaning',        15),
  ('Professional Services',     'professional-services',    '💼',  'Consultants, staffing & business',          16),
  ('Technology & IT',           'technology-it',            '💻',  'Repair, support & tech solutions',          17),
  ('Grocery & Food Stores',     'grocery-food-stores',      '🛒',  'Grocers, specialty & farm markets',         18)
ON CONFLICT (slug) DO UPDATE
  SET
    name          = EXCLUDED.name,
    icon          = EXCLUDED.icon,
    description   = EXCLUDED.description,
    display_order = EXCLUDED.display_order;
