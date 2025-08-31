export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  download_url: string;
  is_active: boolean;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'React E-commerce Template',
    description: 'Complete React e-commerce template with Stripe integration, shopping cart, user authentication, and admin dashboard.',
    price: 99.99,
    category: 'Templates',
    image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    download_url: '/downloads/react-ecommerce.zip',
    is_active: true
  },
  {
    id: '2',
    name: 'Vue.js Dashboard',
    description: 'Professional Vue.js admin dashboard with charts, analytics, user management, and responsive design.',
    price: 79.99,
    category: 'Templates',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    download_url: '/downloads/vue-dashboard.zip',
    is_active: true
  },
  {
    id: '3',
    name: 'Node.js API Boilerplate',
    description: 'Complete Node.js REST API with JWT authentication, database integration, and comprehensive documentation.',
    price: 59.99,
    category: 'Backend',
    image_url: 'https://images.unsplash.com/photo-1627398242454-45a1b58e7e9c?w=400&h=300&fit=crop',
    download_url: '/downloads/nodejs-api.zip',
    is_active: true
  },
  {
    id: '4',
    name: 'Mobile App UI Kit',
    description: 'React Native UI components and screens with modern design patterns and animations.',
    price: 89.99,
    category: 'Mobile',
    image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    download_url: '/downloads/mobile-ui-kit.zip',
    is_active: true
  },
  {
    id: '5',
    name: 'WordPress Theme Bundle',
    description: 'Collection of 5 premium WordPress themes for business, portfolio, and e-commerce websites.',
    price: 149.99,
    category: 'WordPress',
    image_url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
    download_url: '/downloads/wp-themes.zip',
    is_active: true
  },
  {
    id: '6',
    name: 'JavaScript Mastery Course',
    description: 'Complete JavaScript course with 50+ projects, ES6+, async programming, and modern frameworks.',
    price: 199.99,
    category: 'Courses',
    image_url: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop',
    download_url: '/downloads/js-course.zip',
    is_active: true
  },
  {
    id: '7',
    name: 'Python Web Scraping Tools',
    description: 'Advanced Python scripts for web scraping with BeautifulSoup, Selenium, and data processing.',
    price: 69.99,
    category: 'Tools',
    image_url: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=300&fit=crop',
    download_url: '/downloads/python-scraping.zip',
    is_active: true
  },
  {
    id: '8',
    name: 'Digital Marketing Bundle',
    description: 'Complete digital marketing toolkit with templates, guides, and automation scripts.',
    price: 129.99,
    category: 'Marketing',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    download_url: '/downloads/marketing-bundle.zip',
    is_active: true
  }
];