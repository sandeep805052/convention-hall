export interface MenuItem {
  name: string;
  description: string;
  dietary: ('veg' | 'non-veg' | 'jain' | 'vegan' | 'gluten-free')[];
}

export interface MenuPackage {
  id: string;
  name: string;
  subtitle: string;
  pricePerPlateInr: number;
  minimumPax: number;
  coursesCount: number;
  highlightStation: string;
  description: string;
  appetizers: MenuItem[];
  mains: MenuItem[];
  liveStations: string[];
  desserts: MenuItem[];
  beverages: string[];
}

export const CATERING_PACKAGES: MenuPackage[] = [
  {
    id: 'royal-indian-heritage',
    name: 'Royal Heritage Banquet',
    subtitle: 'Awadhi, Mughlai, and Coastal Delicacies with Live Tandoor Staging',
    pricePerPlateInr: 2850,
    minimumPax: 150,
    coursesCount: 5,
    highlightStation: 'Live Clay Oven Tandoori & Lucknowi Galouti Kebab Bar',
    description:
      'A majestic culinary journey curated for landmark galas, diplomatic dinners, and high-profile wedding receptions featuring slow-cooked Dum biryanis, artisanal breads, and royal desserts.',
    appetizers: [
      { name: 'Kakori Murgh Seekh Kebab', description: 'Melt-in-mouth chicken infused with saffron, mace, and rose petal ash', dietary: ['non-veg', 'gluten-free'] },
      { name: 'Paneer Firdausi Tikka', description: 'Cottage cheese stuffed with marinated apricots and smoked in earthen tandoor', dietary: ['veg', 'jain'] },
      { name: 'Dahi Ke Kebab', description: 'Hung yogurt patties tempered with green cardamom and pomegranate pearls', dietary: ['veg'] },
      { name: 'Amritsari Machhi Skewers', description: 'Crisp river sole crusted with carom seeds and yellow chili glaze', dietary: ['non-veg'] },
    ],
    mains: [
      { name: 'Dum Nalli Gosht Biryani', description: 'Slow-cooked lamb shank infused with aged Basmati and whole spices in sealed handis', dietary: ['non-veg'] },
      { name: 'Dal L’AURORA 36-Hour', description: 'Black urad lentils simmered overnight over slow charcoal embers with cultured white butter', dietary: ['veg', 'jain'] },
      { name: 'Paneer Lababdar', description: 'Smoked paneer batons in rich tomato cream gravy with fresh kasuri methi', dietary: ['veg', 'jain'] },
      { name: 'Murgh Awadhi Korma', description: 'Tender country chicken simmered in cashew paste and fragrant kewra water', dietary: ['non-veg'] },
      { name: 'Artisan Breads Basket', description: 'Taftan, Sheermal, Garlic Naan, and Missi Roti straight from the tandoor', dietary: ['veg'] },
    ],
    liveStations: [
      'Live Chaat Bazaar: Dahi Puri, Palak Patta Chaat, and Banarasi Tamatar Chaat',
      'Hyderabadi Haleem & Taftan Counter with caramelized shallots and mint',
    ],
    desserts: [
      { name: 'Shahi Tukda Brioche', description: 'Saffron-soaked milk bread topped with thick rabdi and silver vark', dietary: ['veg'] },
      { name: 'Baked Kesari Rasgulla', description: 'Warm caramel glazed cottage cheese dumplings in condensed saffron reduction', dietary: ['veg'] },
      { name: 'Kesar Pista Kulfi Falooda', description: 'Traditional slow-churned malai kulfi with basil seeds and rose syrup', dietary: ['veg', 'gluten-free'] },
    ],
    beverages: ['Royal Thandai with crushed almonds', 'Kashmiri Kahwa with saffron & walnut slivers', 'Fresh tender coconut water'],
  },
  {
    id: 'grand-plenary-continental',
    name: 'Continental Plenary Gala',
    subtitle: 'Modern European Haute Cuisine with Artisan Charcuterie & Carvery',
    pricePerPlateInr: 3400,
    minimumPax: 100,
    coursesCount: 5,
    highlightStation: 'Flamed Wagyu & Rosemary Smoked Chicken Carvery',
    description:
      'Sophisticated European banqueting designed for international summits and corporate awards assemblies, emphasizing sustainable seafood, aged cheeses, and sous-vide techniques.',
    appetizers: [
      { name: 'Pan-Seared Hokkaido Scallops', description: 'Cauliflower mousseline, crispy pancetta, and citrus herb oil', dietary: ['non-veg', 'gluten-free'] },
      { name: 'Wild Forest Truffle Arancini', description: 'Crisp carnaroli rice balls with black winter truffle and aged parmesan emulsion', dietary: ['veg'] },
      { name: 'Heirloom Burrata Crostini', description: 'Creamy Puglia burrata, balsamic caviar, and compressed figs on sourdough', dietary: ['veg'] },
      { name: 'Smoked Salmon Tartare', description: 'Atlantic salmon, shallots, capers, and dill emulsion in savory pastry tuile', dietary: ['non-veg'] },
    ],
    mains: [
      { name: 'Slow-Braised Chilean Sea Bass', description: 'Served over saffron risotto with charred asparagus and shellfish bisque', dietary: ['non-veg', 'gluten-free'] },
      { name: 'Sous-Vide Herb Crusted Lamb Loin', description: 'Potato dauphinoise, glazed heirloom baby carrots, and rosemary jus', dietary: ['non-veg'] },
      { name: 'Wild Morel & Porcini Risotto', description: 'Acquerello rice, mountain butter, aged Reggiano, and white truffle essence', dietary: ['veg', 'gluten-free'] },
      { name: 'Charred Artichoke & Ricotta Cannelloni', description: 'Hand-rolled pasta with lemon-scented ricotta in roasted bell pepper coulis', dietary: ['veg'] },
    ],
    liveStations: [
      'Artisan Pasta Theater: Freshly rolled Tagliolini tossed in 24-month Parmigiano wheel',
      'Imported Fromagerie & Charcuterie Board with honeycomb, walnuts, and grissini',
    ],
    desserts: [
      { name: 'Single-Origin Valrhona Chocolate Dome', description: '70% dark chocolate mousse with hazelnut praline crunch and hot pouring ganache', dietary: ['veg'] },
      { name: 'Madagascan Vanilla Bean Panna Cotta', description: 'Silky panna cotta with passionfruit coulis and edible gold leaf', dietary: ['veg', 'gluten-free'] },
      { name: 'Classic Tiramisu al Mascarpone', description: 'Espresso-soaked savoiardi with whipped mascarpone cream and Valrhona dusting', dietary: ['veg'] },
    ],
    beverages: ['Sparkling San Pellegrino infusions', 'Cold-pressed Valencia orange juice', 'Single-origin Ethiopian pour-over coffee bar'],
  },
  {
    id: 'pan-asian-silk-route',
    name: 'Pan-Asian Silk Route Spread',
    subtitle: 'Contemporary Dim Sum, Wok Specialities, and Robata Grills',
    pricePerPlateInr: 3150,
    minimumPax: 120,
    coursesCount: 4,
    highlightStation: 'Live Steaming Dim Sum Bamboo Tower & Teppanyaki Counter',
    description:
      'Vibrant culinary showcase spanning Cantonese dim sum, Japanese robata skewers, Thai aromatics, and Korean BBQ stations tailored for energetic tech conventions.',
    appetizers: [
      { name: 'Truffle Edamame Dumplings', description: 'Steamed crystal wrappers filled with sweet edamame puree and white truffle oil', dietary: ['veg', 'vegan'] },
      { name: 'Prawn & Chive Har Gau', description: 'Translucent steamed dumplings with juicy tiger prawns and water chestnut crunch', dietary: ['non-veg'] },
      { name: 'Chicken Yakitori Skewers', description: 'Robata grilled chicken thigh with tare glaze and scallion crowns', dietary: ['non-veg'] },
      { name: 'Crispy Lotus Stem in Sweet Chili', description: 'Flash-fried lotus roots tossed in smoked honey chili sauce and toasted sesame', dietary: ['veg', 'vegan'] },
    ],
    mains: [
      { name: 'Crispy Aromatic Duck Rolls', description: 'Handmade Mandarin pancakes, cucumber batons, scallions, and hoisin sauce', dietary: ['non-veg'] },
      { name: 'Silken Tofu in Sichuan Mala Claypot', description: 'Braised soft tofu with shiitake mushrooms, baby bok choy, and peppercorn oil', dietary: ['veg', 'vegan', 'gluten-free'] },
      { name: 'Thai Green Curry with Jasmine Rice', description: 'Aromatic coconut broth with bamboo shoots, baby corn, and kaffir lime leaves', dietary: ['veg', 'jain', 'gluten-free'] },
      { name: 'Wok-Tossed Udon with Black Pepper Tenderloin', description: 'Hand-pulled udon noodles with sliced beef, bell peppers, and scallions', dietary: ['non-veg'] },
    ],
    liveStations: [
      'Live Teppanyaki Hot Plate: Choice of meats, tofu, and fresh exotic greens',
      'Artisan Ramen & Noodle Bar with 18-hour simmered broths and customizable toppings',
    ],
    desserts: [
      { name: 'Matcha Green Tea Crepe Cake', description: 'Mille-crepe layers with ceremonial Uji matcha cream and white chocolate drizzle', dietary: ['veg'] },
      { name: 'Mango Sticky Rice with Coconut Cream', description: 'Warm glutinous rice with sweet Nam Dok Mai mango and toasted mung beans', dietary: ['veg', 'vegan', 'gluten-free'] },
      { name: 'Liquid Nitrogen Artisan Ice Cream', description: 'Instant churned yuzu and black sesame gelato clouds', dietary: ['veg'] },
    ],
    beverages: ['Jasmine Dragon Pearl green tea', 'Lychee lemongrass cooler', 'Yuzu sparkling refresher'],
  },
  {
    id: 'executive-high-tea',
    name: 'Executive High-Tea & Hors d’Oeuvres',
    subtitle: 'Gourmet Canapés, Patisserie & Speciality Brews for Breakouts',
    pricePerPlateInr: 1450,
    minimumPax: 80,
    coursesCount: 3,
    highlightStation: 'Master Barista Handcrafted Espresso & Pour-Over Bar',
    description:
      'Ideal for academic symposium intermissions, press conferences, and corporate AGM networking breaks featuring savory finger bites, fine patisserie, and artisanal beverages.',
    appetizers: [
      { name: 'Smoked Salmon Pinwheels', description: 'Herbed cream cheese, capers, and dill on marble rye', dietary: ['non-veg'] },
      { name: 'English Cucumber & Mint Brioche', description: 'Whipped butter, fresh garden mint, and microgreens on brioche soldiers', dietary: ['veg'] },
      { name: 'Mini Quiche Lorraine', description: 'Caramelized leeks, smoked bacon, and aged Gruyere cheese in flaky crust', dietary: ['non-veg'] },
      { name: 'Sun-dried Tomato & Goat Cheese Tarts', description: 'Kalamata olive tapenade and thyme in savory shortcrust pastry', dietary: ['veg'] },
    ],
    mains: [
      { name: 'Bite-Sized Slider Trio', description: 'Choice of Wagyu beef, grilled Halloumi, and crispy Falafel sliders', dietary: ['veg', 'non-veg'] },
      { name: 'Gourmet Croissants & Danish Platter', description: 'Butter almond croissants, pain au chocolat, and raspberry Danish', dietary: ['veg'] },
    ],
    liveStations: [
      'Nitro Cold Brew & Manual Pourover Coffee Counter featuring single-estate Arabica',
      'Traditional Masala Chai & Scone Station with clotted cream and strawberry preserves',
    ],
    desserts: [
      { name: 'Assorted French Macarons', description: 'Pistachio, salted caramel, raspberry, and dark chocolate ganache', dietary: ['veg', 'gluten-free'] },
      { name: 'Mini Lemon Curd Meringue Tartlets', description: 'Zesty Meyer lemon curd topped with lightly torched Swiss meringue', dietary: ['veg'] },
      { name: 'Artisan Petite Fours Platter', description: 'Opera cake cubes, hazelnut eclairs, and fruit tarts', dietary: ['veg'] },
    ],
    beverages: ['Artisanal Darjeeling first flush tea', 'Earl Grey lavender iced tea', 'Infused cucumber-mint water'],
  },
];
