const mockColleges = [
  {
    id: '1',
    name: 'Indian Institute of Technology Bombay',
    location: 'Mumbai, Maharashtra',
    nirf_ranking: 1,
    type: 'Public',
    established: 1958,
    rating: 4.8,
    fees_min: 200000,
    fees_max: 800000,
    placement_rate: 95,
    avg_package: 21,
    highest_package: 82,
    student_count: 12000,
    image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
    description: 'IIT Bombay is a public technical and research university in Powai, Mumbai, Maharashtra. It is the top-ranked engineering institute in India.',
    courses: ['B.Tech Computer Science', 'B.Tech Electrical', 'B.Tech Mechanical', 'M.Tech AI', 'MBA'],
    accepted_exams: ['JEE Advanced', 'GATE', 'CAT'],
    top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Flipkart'],
    reviews: [
      { author: 'Rahul Sharma', date: '2024-01-15', rating: 5, text: 'Excellent faculty and placement opportunities. The campus life is amazing!' },
      { author: 'Priya Patel', date: '2024-02-20', rating: 4.5, text: 'Great academic environment but competitive. Good ROI for engineering.' },
    ],
  },
  {
    id: '2',
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi, Delhi',
    nirf_ranking: 2,
    type: 'Public',
    established: 1961,
    rating: 4.7,
    fees_min: 200000,
    fees_max: 800000,
    placement_rate: 93,
    avg_package: 20,
    highest_package: 75,
    student_count: 11000,
    image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
    description: 'IIT Delhi is a premier engineering institute located in Hauz Khas, New Delhi. Known for its strong research culture and industry connections.',
    courses: ['B.Tech Computer Science', 'B.Tech Chemical', 'B.Tech Civil', 'M.Tech Data Science', 'MBA'],
    accepted_exams: ['JEE Advanced', 'GATE', 'CAT'],
    top_recruiters: ['Google', 'Microsoft', 'Apple', 'McKinsey', 'BCG'],
    reviews: [
      { author: 'Amit Kumar', date: '2024-01-10', rating: 5, text: 'Best campus placement record. Faculty is highly qualified and helpful.' },
    ],
  },
  {
    id: '3',
    name: 'Indian Institute of Technology Madras',
    location: 'Chennai, Tamil Nadu',
    nirf_ranking: 3,
    type: 'Public',
    established: 1959,
    rating: 4.7,
    fees_min: 200000,
    fees_max: 800000,
    placement_rate: 92,
    avg_package: 19,
    highest_package: 70,
    student_count: 10000,
    image_url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
    description: 'IIT Madras is a premier institute for engineering education and research, located in Chennai. Famous for its beautiful campus and strong alumni network.',
    courses: ['B.Tech Computer Science', 'B.Tech Aerospace', 'B.Tech Ocean', 'M.Tech Robotics', 'MBA'],
    accepted_exams: ['JEE Advanced', 'GATE', 'CAT'],
    top_recruiters: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys'],
    reviews: [],
  },
  {
    id: '4',
    name: 'Birla Institute of Technology and Science Pilani',
    location: 'Pilani, Rajasthan',
    nirf_ranking: 4,
    type: 'Private',
    established: 1964,
    rating: 4.5,
    fees_min: 1500000,
    fees_max: 2000000,
    placement_rate: 90,
    avg_package: 18,
    highest_package: 65,
    student_count: 8000,
    image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
    description: 'BITS Pilani is a deemed university known for its flexible curriculum and strong industry interface. It has campuses in Pilani, Goa, Hyderabad, and Dubai.',
    courses: ['B.E. Computer Science', 'B.E. Electronics', 'B.E. Mechanical', 'M.E. Software', 'MBA'],
    accepted_exams: ['BITSAT', 'GATE', 'CAT'],
    top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Uber'],
    reviews: [
      { author: 'Neha Singh', date: '2024-03-01', rating: 4, text: 'Great flexibility in course selection. Good placement support.' },
    ],
  },
  {
    id: '5',
    name: 'National Institute of Technology Trichy',
    location: 'Tiruchirappalli, Tamil Nadu',
    nirf_ranking: 5,
    type: 'Public',
    established: 1964,
    rating: 4.4,
    fees_min: 150000,
    fees_max: 500000,
    placement_rate: 88,
    avg_package: 12,
    highest_package: 45,
    student_count: 6000,
    image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
    description: 'NIT Trichy is one of the top NITs in India, known for its excellent academic programs and vibrant campus life.',
    courses: ['B.Tech Computer Science', 'B.Tech ECE', 'B.Tech Mechanical', 'M.Tech VLSI', 'MBA'],
    accepted_exams: ['JEE Main', 'GATE', 'CAT'],
    top_recruiters: ['Amazon', 'Microsoft', 'Flipkart', 'Paytm', 'Ola'],
    reviews: [],
  },
  {
    id: '6',
    name: 'Delhi Technological University',
    location: 'New Delhi, Delhi',
    nirf_ranking: 12,
    type: 'Public',
    established: 1941,
    rating: 4.3,
    fees_min: 100000,
    fees_max: 400000,
    placement_rate: 85,
    avg_package: 11,
    highest_package: 40,
    student_count: 7000,
    image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
    description: 'DTU (formerly DCE) is a premier state university in Delhi, known for its strong engineering programs and industry partnerships.',
    courses: ['B.Tech Computer Science', 'B.Tech IT', 'B.Tech Mechanical', 'M.Tech AI', 'MBA'],
    accepted_exams: ['JEE Main', 'GATE', 'CAT'],
    top_recruiters: ['Google', 'Amazon', 'Microsoft', 'Samsung', 'Qualcomm'],
    reviews: [],
  },
  {
    id: '7',
    name: 'Vellore Institute of Technology',
    location: 'Vellore, Tamil Nadu',
    nirf_ranking: 15,
    type: 'Private',
    established: 1984,
    rating: 4.2,
    fees_min: 200000,
    fees_max: 800000,
    placement_rate: 82,
    avg_package: 8,
    highest_package: 35,
    student_count: 30000,
    image_url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
    description: 'VIT is a deemed university with multiple campuses, known for its international collaborations and diverse student community.',
    courses: ['B.Tech Computer Science', 'B.Tech AI/ML', 'B.Tech IoT', 'M.Tech Data Science', 'MBA'],
    accepted_exams: ['VITEEE', 'GATE', 'CAT'],
    top_recruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Accenture'],
    reviews: [],
  },
  {
    id: '8',
    name: 'Manipal Institute of Technology',
    location: 'Manipal, Karnataka',
    nirf_ranking: 18,
    type: 'Private',
    established: 1957,
    rating: 4.1,
    fees_min: 300000,
    fees_max: 1000000,
    placement_rate: 80,
    avg_package: 7,
    highest_package: 30,
    student_count: 15000,
    image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
    description: 'MIT Manipal is part of MAHE (Manipal Academy of Higher Education), known for its world-class infrastructure and global exposure.',
    courses: ['B.Tech Computer Science', 'B.Tech AI/ML', 'B.Tech Biomedical', 'M.Tech Robotics', 'MBA'],
    accepted_exams: ['MET', 'GATE', 'CAT'],
    top_recruiters: ['Amazon', 'Microsoft', 'Siemens', 'Philips', 'Mercedes'],
    reviews: [],
  },
]

const mockApplications = []

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const base44 = {
  entities: {
    College: {
      list: async (sort = '-rating', limit = 50) => {
        await delay(300)
        let colleges = [...mockColleges]
        if (sort.startsWith('-')) {
          const field = sort.slice(1)
          colleges.sort((a, b) => b[field] - a[field])
        } else {
          colleges.sort((a, b) => a[sort] - b[sort])
        }
        return colleges.slice(0, limit)
      },
      filter: async (filters) => {
        await delay(200)
        let colleges = [...mockColleges]
        if (filters.id) {
          colleges = colleges.filter(c => c.id === filters.id)
        }
        if (filters.location) {
          colleges = colleges.filter(c => c.location.toLowerCase().includes(filters.location.toLowerCase()))
        }
        if (filters.type) {
          colleges = colleges.filter(c => c.type === filters.type)
        }
        if (filters.min_fees) {
          colleges = colleges.filter(c => c.fees_min >= filters.min_fees)
        }
        if (filters.max_fees) {
          colleges = colleges.filter(c => c.fees_max <= filters.max_fees)
        }
        if (filters.min_rating) {
          colleges = colleges.filter(c => c.rating >= filters.min_rating)
        }
        if (filters.min_placement) {
          colleges = colleges.filter(c => c.placement_rate >= filters.min_placement)
        }
        return colleges
      },
    },
    Application: {
      list: async () => {
        await delay(100)
        return [...mockApplications]
      },
      create: async (data) => {
        await delay(300)
        const newApp = { id: Date.now().toString(), ...data, created_at: new Date().toISOString() }
        mockApplications.push(newApp)
        return newApp
      },
      update: async (id, data) => {
        await delay(200)
        const index = mockApplications.findIndex(a => a.id === id)
        if (index !== -1) {
          mockApplications[index] = { ...mockApplications[index], ...data }
          return mockApplications[index]
        }
        return null
      },
      delete: async (id) => {
        await delay(100)
        const index = mockApplications.findIndex(a => a.id === id)
        if (index !== -1) {
          mockApplications.splice(index, 1)
          return true
        }
        return false
      },
    },
    SavedCollege: {
      list: async () => {
        await delay(100)
        return []
      },
      create: async (data) => {
        await delay(200)
        return { id: Date.now().toString(), ...data }
      },
      delete: async (id) => {
        await delay(100)
        return true
      },
    },
  },
}