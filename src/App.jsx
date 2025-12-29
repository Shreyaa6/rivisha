import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './App.css'

function App() {
  const [showFullMenu, setShowFullMenu] = useState(false)
  const [showBookingPage, setShowBookingPage] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Appetizer')
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null) // 'guests' or 'time' or 'date' or null
  const [selectedGuests, setSelectedGuests] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth())
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear())
  const carouselRef = useRef(null)
  const guestsDropdownRef = useRef(null)
  const timeDropdownRef = useRef(null)
  const dateDropdownRef = useRef(null)

  const testimonials = [
    {
      id: 1,
      quote: "The attention to detail and creative vision transformed our dining experience completely.",
      author: "Sarah Chen",
      role: "Food Critic",
      company: "Culinary Magazine",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    },
    {
      id: 2,
      quote: "Working with Rivisha felt like a true culinary partnership from day one. Every dish tells a story.",
      author: "Marcus Webb",
      role: "Chef",
      company: "Fine Dining Review",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
    {
      id: 3,
      quote: "They understand that great food is invisible yet unforgettable. Rivisha exceeded all expectations.",
      author: "Elena Voss",
      role: "Restaurant Owner",
      company: "Gourmet Guide",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    },
    {
      id: 4,
      quote: "Absolutely amazing! The ambiance, the food, and the service were all top-notch. This is our new favorite restaurant in the city.",
      author: "Michael Thompson",
      role: "Food Blogger",
      company: "Taste & Travel",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    },
    {
      id: 5,
      quote: "Exceptional culinary journey! Every dish told a story and the flavors were perfectly balanced. The wine pairing recommendations were spot on.",
      author: "Sarah Johnson",
      role: "Wine Expert",
      company: "Vino & Dine",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    },
    {
      id: 6,
      quote: "From the moment we walked in, we knew this was going to be special. The chef's tasting menu was a revelation! Highly recommended.",
      author: "David Martinez",
      role: "Restaurant Critic",
      company: "Gourmet World",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    },
  ]

  const handleTestimonialChange = (index) => {
    if (index === activeTestimonial || isTransitioning) return
    if (index < 0 || index >= testimonials.length) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTestimonial(index)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 300)
  }

  const handleTestimonialPrev = () => {
    const newIndex = Math.max(0, activeTestimonial - 3)
    handleTestimonialChange(newIndex)
  }

  const handleTestimonialNext = () => {
    const newIndex = Math.min(testimonials.length - 3, activeTestimonial + 3)
    handleTestimonialChange(newIndex)
  }

  // Get the 3 visible testimonials
  const getVisibleTestimonials = () => {
    const startIndex = Math.min(activeTestimonial, testimonials.length - 3)
    return testimonials.slice(startIndex, startIndex + 3)
  }

  const galleryImages = [
    { url: 'https://i.pinimg.com/1200x/ea/5c/bd/ea5cbd7f4ae019dae97659d489990d80.jpg', size: 'tall' },
    { url: 'https://i.pinimg.com/736x/29/e3/28/29e328c8b48d17bcfb46fd0cdbb67bf5.jpg', size: 'square' },
    { url: 'https://i.pinimg.com/1200x/44/91/f3/4491f38d30d81d22906ecc6b5caaab77.jpg', size: 'wide' },
    { url: 'https://i.pinimg.com/736x/e1/f3/1e/e1f31e40379b8bd06e33aa16d6bc8559.jpg', size: 'square' },
    { url: 'https://i.pinimg.com/1200x/b6/6a/7b/b66a7b1e1da46d01d1481d0cf96f22de.jpg', size: 'tall' },
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', size: 'square' },
    { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', size: 'wide' },
    { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', size: 'square' },
    { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', size: 'tall' },
    { url: 'https://images.unsplash.com/photo-1601050690597-df0568f71147?w=800&q=80', size: 'square' },
    { url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80', size: 'wide' },
    { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', size: 'square' }
  ]

  const menuItems = {
    Appetizer: [
      { name: 'Kurkure paneer tikka', price: '₹2,000', image: 'https://images.unsplash.com/photo-1601050690597-df0568f71147?w=400&q=80' },
      { name: 'Mushroom galouti', price: '₹2,300', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80' },
      { name: 'Jalapeno malai tikka', price: '₹2,500', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' },
      { name: 'Cottage cheese fa-fa', price: '₹9,200', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80' },
      { name: 'Zucchini corn dimsum', price: '₹3,300', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80' },
      { name: 'Prawn tempura sushi', price: '₹2,500', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80' },
      { name: 'Ragi nachos', price: '₹9,200', image: 'https://images.unsplash.com/photo-1616190171441-2c0c5fc1b5a3?w=400&q=80' },
      { name: 'Scrambled mushroom on toasted pita', price: '₹3,300', image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80' }
    ],
    'Main Course': [
      { name: 'Cheese corn kofta', price: '₹3,300', image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&q=80' },
      { name: 'Rivisha dal bukhara', price: '₹4,200', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80' },
      { name: 'Chicken dhaniwal', price: '₹5,800', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=80' },
      { name: 'Cooker rosemary mutton curry', price: '₹9,200', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' },
      { name: 'Stir fry udon noodles', price: '₹3,300', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80' },
      { name: 'Nasi goreng', price: '₹2,500', image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&q=80' },
      { name: 'Alfredo flat bread', price: '₹9,200', image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80' },
      { name: 'Mezze platter', price: '₹3,300', image: 'https://images.unsplash.com/photo-1616190171441-2c0c5fc1b5a3?w=400&q=80' },
      { name: 'Spaghetti in beetroot sauce', price: '₹2,500', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80' }
    ],
    Soups: [
      { name: 'Baked tomato soup', price: '₹3,300', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' },
      { name: 'Four treasure soup', price: '₹4,200', image: 'https://images.unsplash.com/photo-1604909052743-7e8cf6c7e736?w=400&q=80' },
      { name: 'Brocolli and waterchestnut soup', price: '₹9,200', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' },
      { name: 'Roasted pumpkin soup', price: '₹9,200', image: 'https://images.unsplash.com/photo-1604909052743-7e8cf6c7e736?w=400&q=80' }
    ],
    Desserts: [
      { name: 'Rivisha chocolate ball', price: '₹3,300', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80' },
      { name: 'Panacotta', price: '₹9,200', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80' },
      { name: 'Serradura', price: '₹9,200', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80' }
    ],
    Drinks: [
      { name: 'Fresh orange juice', price: '₹1,200', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80' },
      { name: 'Mango lassi', price: '₹1,500', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80' },
      { name: 'Iced coffee', price: '₹1,800', image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&q=80' },
      { name: 'Green tea', price: '₹1,000', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
      { name: 'Fresh lime soda', price: '₹1,300', image: 'https://images.unsplash.com/photo-1523677011783-c91d1bbe2fdc?w=400&q=80' },
      { name: 'Virgin mojito', price: '₹1,600', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80' },
      { name: 'Hot chocolate', price: '₹1,700', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80' },
      { name: 'Cappuccino', price: '₹1,900', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80' }
    ]
  }

  const handleMenuClick = () => {
    setShowFullMenu(true)
    document.body.style.overflow = 'hidden' // Prevent background scrolling
  }

  const handleBookingClick = () => {
    setShowBookingPage(true)
    document.body.style.overflow = 'hidden' // Prevent background scrolling
  }

  const handleCloseBooking = () => {
    setShowBookingPage(false)
    document.body.style.overflow = '' // Restore scrolling
  }

  // Close mobile filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileFilter && !event.target.closest('.menu-mobile-filter-wrapper')) {
        setShowMobileFilter(false)
      }
    }
    if (showMobileFilter) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMobileFilter])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileMenu && !event.target.closest('.navbar')) {
        setShowMobileMenu(false)
      }
    }
    if (showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMobileMenu])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown === 'guests' && guestsDropdownRef.current && !guestsDropdownRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
      if (openDropdown === 'time' && timeDropdownRef.current && !timeDropdownRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
      if (openDropdown === 'date' && dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }
    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openDropdown])

  // Generate date options for next 30 days
  // Calendar functions
  const formatSelectedDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    })
  }

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay()
  }

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(calendarMonth, calendarYear)
    const firstDay = getFirstDayOfMonth(calendarMonth, calendarYear)
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      days.push({
        day,
        dateStr,
        isToday: isToday(calendarYear, calendarMonth, day),
        isPast: isPastDate(calendarYear, calendarMonth, day)
      })
    }
    
    return days
  }

  const isToday = (year, month, day) => {
    const today = new Date()
    return year === today.getFullYear() && 
           month === today.getMonth() && 
           day === today.getDate()
  }

  const isPastDate = (year, month, day) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(year, month, day)
    return checkDate < today
  }

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11)
      setCalendarYear(calendarYear - 1)
    } else {
      setCalendarMonth(calendarMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0)
      setCalendarYear(calendarYear + 1)
    } else {
      setCalendarMonth(calendarMonth + 1)
    }
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Scroll to section handler
  const scrollToSection = (sectionId) => {
    if (sectionId === 'book') {
      handleBookingClick()
      return
    }
    if (sectionId === 'menu') {
      handleMenuClick()
      return
    }
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const guestsOptions = [
    { value: '1', label: '1 Guest' },
    { value: '2', label: '2 Guests' },
    { value: '3', label: '3 Guests' },
    { value: '4', label: '4 Guests' },
    { value: '5', label: '5 Guests' },
    { value: '6', label: '6+ Guests' }
  ]

  const timeOptions = [
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '18:00', label: '6:00 PM' },
    { value: '19:00', label: '7:00 PM' },
    { value: '20:00', label: '8:00 PM' },
    { value: '21:00', label: '9:00 PM' }
  ]

  const handleCloseMenu = () => {
    setShowFullMenu(false)
    document.body.style.overflow = 'auto' // Restore scrolling
  }

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth / 3
      carouselRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    // Auto-scroll
    const autoScroll = setInterval(() => {
      carousel.scrollBy({
        left: 1,
        behavior: 'auto'
      })
      
      // Reset to beginning when reaching end (seamless loop)
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth - 100) {
        carousel.scrollLeft = carousel.offsetWidth
      }
    }, 20)

    // Initialize scroll position to middle set for infinite scroll
    carousel.scrollLeft = carousel.offsetWidth

    return () => clearInterval(autoScroll)
  }, [])

  return (
    <div className="App">
      <section id="home" className="hero-section">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
                <path d="M20 10C15 10 11 14 11 19C11 24 15 28 20 28C25 28 29 24 29 19C29 14 25 10 20 10Z" fill="#D2691E"/>
                <path d="M15 19L18 22L25 15" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="20" cy="19" r="3" fill="#8B4513"/>
              </svg>
            </div>
            <button 
              className="mobile-menu-toggle"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Toggle menu"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                {showMobileMenu ? (
                  <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                ) : (
                  <>
                    <rect x="4" y="8" width="24" height="4" rx="2" fill="white"/>
                    <rect x="4" y="20" width="24" height="4" rx="2" fill="white"/>
                  </>
                )}
              </svg>
            </button>
            <ul className={`nav-links ${showMobileMenu ? 'mobile-open' : ''}`}>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); setShowMobileMenu(false); }}>Home</a></li>
              <li><a href="#menu" onClick={(e) => { e.preventDefault(); scrollToSection('menu'); setShowMobileMenu(false); }}>Our Menu</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); setShowMobileMenu(false); }}>Contact Us</a></li>
              <li><a href="#book" onClick={(e) => { e.preventDefault(); scrollToSection('book'); setShowMobileMenu(false); }}>Book a Table</a></li>
              <li><a href="#reviews" onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); setShowMobileMenu(false); }}>Reviews</a></li>
            </ul>
          </div>
        </nav>
        <div className="hero-background">
          <img 
            src="https://i.pinimg.com/1200x/d6/6a/aa/d66aaafe70e18344b2ccf8850b595865.jpg" 
            alt="Restaurant interior" 
          />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            A magical culinary paradise<br />
            in the heart of Mumbai
          </h1>
          <p className="hero-subtitle">
            Rivisha's experience is a romance between indian food sensibilities<br />
            with modern minimalism. Inspired by the latin word "The One",<br />
            it's truly "the one" for your fine dining desires.
          </p>
          <div className="hero-buttons">
            <button className="btn-menu" onClick={handleMenuClick}>
              <svg className="menu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Our Menu
              <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn-book" onClick={handleBookingClick}>
              <svg className="calendar-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2"/>
                <circle cx="8" cy="15" r="1" fill="currentColor"/>
                <circle cx="12" cy="15" r="1" fill="currentColor"/>
                <circle cx="16" cy="15" r="1" fill="currentColor"/>
              </svg>
              Book a Table
            </button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <h2 className="experience-title">We create experiences that you will cherish for a lifetime</h2>
      </section>

      {/* Menu Preview Section */}
      <section id="menu-preview" className="menu-preview-section">
        <div className="menu-preview-container">
          <div className="menu-preview-images">
            <div className="image-blob-container">
              <div className="blob-shape blob-1"></div>
              <div className="blob-shape blob-2"></div>
              <div className="food-image-main">
                <img src="https://i.pinimg.com/1200x/5d/fe/ff/5dfeff9b558bdfc87cf87247ab3996f3.jpg" alt="Delicious food" />
              </div>
              <div className="food-image-small food-image-1">
                <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80" alt="Food item" />
              </div>
              <div className="food-image-small food-image-2">
                <img src="https://images.unsplash.com/photo-1509722747041-616f39b57569?w=300&q=80" alt="Food item" />
              </div>
            </div>
          </div>
          <div className="menu-preview-content">
            <h2 className="menu-preview-title">Great food that inspires great conversations</h2>
            <p className="menu-preview-text">
              We take great pride in our mood-elevating delicacies that are served with pure culinary passion. 
              So when you eat at Rivisha, you can be sure that it's made of only the freshest local ingredients & intricate craftsmanship!
            </p>
            <button className="btn-menu-preview" onClick={handleMenuClick}>
              Our Menu
              <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Infinite Carousel Section */}
      <section className="gallery-carousel-section">
        <div className="gallery-carousel-container">
          <h2 className="gallery-carousel-title">Amazing food surrounded by warm aesthetic vibes</h2>
          <p className="gallery-carousel-subtitle">Savour our delicious culinary delights 7 days a week. Book a table now.</p>
          
          <div className="infinite-carousel-wrapper">
            <button className="carousel-nav-btn carousel-nav-left" onClick={() => scrollCarousel(-1)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="infinite-carousel" ref={carouselRef}>
              <div className="carousel-track">
                {/* Duplicate images for seamless loop */}
                {[...galleryImages, ...galleryImages, ...galleryImages].map((item, index) => (
                  <div 
                    key={index} 
                    className="carousel-slide-item"
                  >
                    <img src={item.url} alt={`Cafe gallery ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
            
            <button className="carousel-nav-btn carousel-nav-right" onClick={() => scrollCarousel(1)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Food Image Composition Section */}
      <section id="contact" className="editorial-food-section">
        <div className="editorial-food-container">
          {/* Background Organic Blobs */}
          <div className="editorial-organic-blobs">
            <div className="organic-blob blob-1"></div>
            <div className="organic-blob blob-2"></div>
            <div className="organic-blob blob-3"></div>
            <div className="organic-blob blob-4"></div>
            <div className="organic-blob blob-5"></div>
            {/* Outline Blobs */}
            <div className="organic-blob-outline outline-blob-1"></div>
            <div className="organic-blob-outline outline-blob-2"></div>
            <div className="organic-blob-outline outline-blob-3"></div>
            <div className="organic-blob-outline outline-blob-4"></div>
          </div>
          
          {/* Decorative Line Doodles */}
          <svg className="editorial-doodles" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <style>{`.doodle-line { stroke: #AAA297; stroke-width: 1.5; fill: none; opacity: 0.4; }`}</style>
            </defs>
            <path className="doodle-line" d="M 50 80 Q 80 60, 120 80 T 180 80" />
            <path className="doodle-line" d="M 90% 20% Q 85% 25%, 90% 30% T 90% 40%" />
            <path className="doodle-line" d="M 10% 70% Q 15% 75%, 20% 70% T 30% 70%" />
          </svg>

          {/* Rectangle Image (Left) */}
          <div className="editorial-image-wrapper">
            <img 
              src="https://i.pinimg.com/736x/a2/18/0a/a2180a4f1dbe7220ef976e3ee260f7a2.jpg" 
              alt="Editorial food composition" 
              className="editorial-image-rectangle"
            />
            
            {/* Circular Image (Right, Overlapping) */}
            <img 
              src="https://i.pinimg.com/1200x/c5/89/26/c589263c6ca52f724a21181e729ef471.jpg" 
              alt="Editorial food composition" 
              className="editorial-image-circle"
            />
          </div>

          {/* Contact Form (Right Side) */}
          <div className="editorial-contact-form-wrapper">
            <h2 className="editorial-contact-title">Get in touch with us or leave feedback!</h2>
            <p className="editorial-contact-description">Got any questions or some honest feedback? We are all ears! Let us know what's on your mind.</p>
            <form className="editorial-contact-form">
              <input 
                type="text" 
                placeholder="NAME" 
                className="editorial-form-input"
              />
              <input 
                type="tel" 
                placeholder="PHONE" 
                className="editorial-form-input"
              />
              <input 
                type="email" 
                placeholder="EMAIL" 
                className="editorial-form-input"
              />
              <textarea 
                placeholder="MESSAGE" 
                className="editorial-form-input editorial-form-textarea"
                rows="6"
              ></textarea>
              <button type="submit" className="editorial-form-submit">SUBMIT</button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-grid">
            {getVisibleTestimonials().map((testimonial, index) => {
              const actualIndex = Math.min(activeTestimonial, testimonials.length - 3) + index
              const isActive = actualIndex === activeTestimonial
              return (
                <div key={testimonial.id} className={`testimonial-card ${isActive ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}>
                  <blockquote className="testimonial-quote">
                    {testimonial.quote}
                  </blockquote>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                    ))}
                  </div>
                  <div className="testimonial-author">
                    <div className="testimonial-author-image">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                      />
                    </div>
                    <div className="testimonial-author-info">
                      <p className="testimonial-author-name">{testimonial.author}</p>
                      <p className="testimonial-author-role">
                        {testimonial.role}
                        <span className="testimonial-separator">/</span>
                        <span className="testimonial-company">{testimonial.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="testimonials-navigation">
            <div className="testimonials-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleTestimonialChange(index)}
                  className={`testimonials-dot ${index === activeTestimonial ? 'active' : ''}`}
                />
              ))}
              <span className="testimonials-counter">
                {String(Math.min(Math.max(activeTestimonial, 0), testimonials.length - 1) + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>

            <div className="testimonials-arrows">
              <button 
                onClick={handleTestimonialPrev} 
                className="testimonials-arrow"
                disabled={activeTestimonial === 0}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleTestimonialNext} 
                className="testimonials-arrow"
                disabled={activeTestimonial + 3 >= testimonials.length}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-organic-shapes">
          <div className="welcome-shape welcome-shape-left"></div>
          <div className="welcome-shape welcome-shape-right-1"></div>
          <div className="welcome-shape welcome-shape-right-2"></div>
        </div>
        <div className="welcome-container">
          <h2 className="welcome-title">We welcome food lovers of all kinds</h2>
          <p className="welcome-description">
            From seekers of fine dining to folks craving a more relaxed, casual vibe — we've got everyone covered!
          </p>
          <button className="welcome-button" onClick={handleBookingClick}>
            Book a Table <span className="welcome-arrow">&gt;</span>
        </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-container">
          {/* Logo and Branding (Left) */}
          <div className="footer-logo-section">
            <div className="footer-logo-graphic">
              <svg width="40" height="40" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Arched frame */}
                <path d="M15 25 Q15 18, 22 18 L48 18 Q55 18, 55 25" stroke="#60544D" strokeWidth="2.5" fill="none"/>
                <path d="M15 25 Q15 32, 22 32 L48 32 Q55 32, 55 25" stroke="#60544D" strokeWidth="2.5" fill="none"/>
                {/* Palm frond/fern leaf */}
                <path d="M35 25 L35 40" stroke="#60544D" strokeWidth="2" fill="none"/>
                <path d="M28 30 L35 25 L42 30" stroke="#60544D" strokeWidth="1.5" fill="none"/>
                <path d="M26 34 L35 30 L44 34" stroke="#60544D" strokeWidth="1.5" fill="none"/>
                <path d="M25 38 L35 35 L45 38" stroke="#60544D" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <h2 className="footer-brand-name">RIVISHA</h2>
            <p className="footer-tagline">THE ONE</p>
          </div>

          {/* Main Text Content (Center) */}
          <div className="footer-content-section">
            <p className="footer-description">
              We're a contemporary fine dinning restaurant that aspires to blend great food, aesthetics & conversations to become an epicentre of culture. Our joy is to offer a unique experience that fulfils the culinary desires of diverse palettes while being "The One" that leads with excellence.
            </p>
          </div>

          {/* Contact Information (Right) */}
          <div className="footer-contact-section">
            <p className="footer-contact-info">
              ABC Plaza<br />
              Sector 12, Downtown<br />
              Mumbai.<br />
              +91-9876543210
            </p>
          </div>

          {/* Decorative Elements (Bottom Right) */}
          <div className="footer-decorative">
            <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 40 Q20 30, 30 40 T50 40 T70 40 T90 40" stroke="#60544D" strokeWidth="1" fill="none" opacity="0.4"/>
              <path d="M20 50 Q30 45, 40 50 T60 50 T80 50" stroke="#60544D" strokeWidth="1" fill="none" opacity="0.4"/>
              <circle cx="85" cy="35" r="3" fill="#60544D" opacity="0.3"/>
              <circle cx="90" cy="40" r="2.5" fill="#60544D" opacity="0.3"/>
              <circle cx="88" cy="45" r="2" fill="#60544D" opacity="0.3"/>
              <circle cx="92" cy="42" r="1.5" fill="#60544D" opacity="0.3"/>
              <circle cx="95" cy="38" r="2" fill="#60544D" opacity="0.3"/>
            </svg>
          </div>

          {/* Copyright (Bottom Center) */}
          <div className="footer-copyright">
            <p>Copyright © 2025 - RIVISHA. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Full Menu Section - Full Screen Overlay */}
      {showFullMenu && (
        <div className="menu-overlay" onClick={handleCloseMenu}>
          <section id="full-menu" className="full-menu-section" onClick={(e) => e.stopPropagation()}>
            {/* Background Organic Blobs */}
            <div className="menu-organic-blobs">
              <div className="menu-organic-blob menu-blob-1"></div>
              <div className="menu-organic-blob menu-blob-2"></div>
              <div className="menu-organic-blob menu-blob-3"></div>
              {/* Outline Blobs */}
              <div className="menu-organic-blob-outline menu-outline-blob-1"></div>
              <div className="menu-organic-blob-outline menu-outline-blob-2"></div>
            </div>
            <button className="menu-close-btn" onClick={handleCloseMenu}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="full-menu-container">
              {/* Mobile Filter Navbar */}
              <div className="menu-mobile-navbar">
                <div className="menu-mobile-filter-wrapper">
                  <button 
                    className="menu-mobile-filter-btn"
                    onClick={() => setShowMobileFilter(!showMobileFilter)}
                  >
                    <span>{activeCategory}</span>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className={showMobileFilter ? 'rotate' : ''}
                    >
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {showMobileFilter && (
                    <div className="menu-mobile-dropdown">
                      {Object.keys(menuItems).map(category => (
                        <button
                          key={category}
                          className={`menu-mobile-dropdown-item ${activeCategory === category ? 'active' : ''}`}
                          onClick={() => {
                            setActiveCategory(category)
                            setShowMobileFilter(false)
                          }}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop Category Tabs */}
              <div className="menu-categories-tabs">
                {Object.keys(menuItems).map(category => (
                  <button
                    key={category}
                    className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {Object.keys(menuItems).map(category => (
                <div key={category} className={`menu-category-spread ${activeCategory === category ? 'active' : ''}`}>
                  <h3 className="category-header">{category.toUpperCase()}</h3>
                  <p className="category-description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod</p>
                  <div className="menu-divider"></div>
                  <div className="menu-items-header">
                    <span className="menu-items-header-item">ITEM</span>
                    <span className="menu-items-header-price">PRICE</span>
                  </div>
                  <div className="menu-items-list">
                    {menuItems[category].map((item, index) => (
                      <div key={index} className="menu-item-row">
                        <div className="menu-item-details">
                          <h4 className="menu-item-title">{item.name.toUpperCase()}</h4>
                          <p className="menu-item-description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod</p>
                        </div>
                        <span className="menu-item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="menu-divider"></div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Book a Table Page */}
      {showBookingPage && (
        <div className="menu-overlay" onClick={handleCloseBooking}>
          <section id="book-table" className="full-menu-section booking-section" onClick={(e) => e.stopPropagation()}>
            {/* Background Organic Blobs */}
            <div className="menu-organic-blobs">
              <div className="menu-organic-blob menu-blob-1"></div>
              <div className="menu-organic-blob menu-blob-2"></div>
              <div className="menu-organic-blob menu-blob-3"></div>
              {/* Outline Blobs */}
              <div className="menu-organic-blob-outline menu-outline-blob-1"></div>
              <div className="menu-organic-blob-outline menu-outline-blob-2"></div>
            </div>
            <button className="menu-close-btn" onClick={handleCloseBooking}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="full-menu-container booking-container">
              <h2 className="booking-title">BOOK A TABLE</h2>
              <p className="booking-description">Reserve your spot at Rivisha. Fill out the form below and we'll confirm your reservation.</p>
              <div className="menu-divider"></div>
              
              <form className="booking-form">
                <div className="booking-form-row">
                  <div className="booking-form-group">
                    <label className="booking-label">NAME</label>
                    <input 
                      type="text" 
                      className="booking-input" 
                      placeholder="YOUR NAME"
                      required
                    />
                  </div>
                  <div className="booking-form-group">
                    <label className="booking-label">PHONE</label>
                    <input 
                      type="tel" 
                      className="booking-input" 
                      placeholder="YOUR PHONE"
                      required
                    />
                  </div>
                </div>

                <div className="booking-form-row">
                  <div className="booking-form-group">
                    <label className="booking-label">EMAIL</label>
                    <input 
                      type="email" 
                      className="booking-input" 
                      placeholder="YOUR EMAIL"
                      required
                    />
                  </div>
                  <div className="booking-form-group">
                    <label className="booking-label">GUESTS</label>
                    <div className="custom-dropdown-wrapper" ref={guestsDropdownRef}>
                      <button
                        type="button"
                        className={`booking-input booking-select ${openDropdown === 'guests' ? 'dropdown-open' : ''} ${!selectedGuests ? 'placeholder-text' : ''}`}
                        onClick={() => setOpenDropdown(openDropdown === 'guests' ? null : 'guests')}
                      >
                        <span>{selectedGuests ? guestsOptions.find(opt => opt.value === selectedGuests)?.label : 'SELECT GUESTS'}</span>
                        <svg className="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L6 6L11 1" stroke="#5A493B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      {openDropdown === 'guests' && (
                        <div className="custom-dropdown-menu">
                          {guestsOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              className={`custom-dropdown-item ${selectedGuests === option.value ? 'selected' : ''}`}
                              onClick={() => {
                                setSelectedGuests(option.value)
                                setOpenDropdown(null)
                              }}
                            >
                              <span className="dropdown-item-icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M2.66667 13.3333C2.66667 11.0867 4.58667 9.33333 7 9.33333C9.41333 9.33333 11.3333 11.0867 11.3333 13.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </span>
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input type="hidden" name="guests" value={selectedGuests} required />
                  </div>
                </div>

                <div className="booking-form-row">
                  <div className="booking-form-group">
                    <label className="booking-label">DATE</label>
                    <div className="custom-dropdown-wrapper" ref={dateDropdownRef}>
                      <button
                        type="button"
                        className={`booking-input booking-select ${openDropdown === 'date' ? 'dropdown-open' : ''} ${!selectedDate ? 'placeholder-text' : ''}`}
                        onClick={() => setOpenDropdown(openDropdown === 'date' ? null : 'date')}
                      >
                        <span>{selectedDate ? formatSelectedDate(selectedDate) : 'SELECT DATE'}</span>
                        <svg className="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L6 6L11 1" stroke="#5A493B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      {openDropdown === 'date' && (
                        <div className="custom-dropdown-menu calendar-menu">
                          <div className="calendar-header">
                            <button 
                              type="button" 
                              className="calendar-nav-btn"
                              onClick={handlePrevMonth}
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 12L6 8L10 4" stroke="#5A493B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            <div className="calendar-month-year">
                              {monthNames[calendarMonth]} {calendarYear}
                            </div>
                            <button 
                              type="button" 
                              className="calendar-nav-btn"
                              onClick={handleNextMonth}
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12L10 8L6 4" stroke="#5A493B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                          <div className="calendar-weekdays">
                            {dayNames.map(day => (
                              <div key={day} className="calendar-weekday">{day}</div>
                            ))}
                          </div>
                          <div className="calendar-days">
                            {generateCalendarDays().map((dateInfo, index) => {
                              if (!dateInfo) {
                                return <div key={`empty-${index}`} className="calendar-day empty"></div>
                              }
                              return (
                                <button
                                  key={dateInfo.dateStr}
                                  type="button"
                                  className={`calendar-day ${dateInfo.isToday ? 'today' : ''} ${selectedDate === dateInfo.dateStr ? 'selected' : ''} ${dateInfo.isPast ? 'past' : ''}`}
                                  onClick={() => {
                                    if (!dateInfo.isPast) {
                                      setSelectedDate(dateInfo.dateStr)
                                      setOpenDropdown(null)
                                    }
                                  }}
                                  disabled={dateInfo.isPast}
                                >
                                  {dateInfo.day}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    <input type="hidden" name="date" value={selectedDate} required />
                  </div>
                  <div className="booking-form-group">
                    <label className="booking-label">TIME</label>
                    <div className="custom-dropdown-wrapper" ref={timeDropdownRef}>
                      <button
                        type="button"
                        className={`booking-input booking-select ${openDropdown === 'time' ? 'dropdown-open' : ''} ${!selectedTime ? 'placeholder-text' : ''}`}
                        onClick={() => setOpenDropdown(openDropdown === 'time' ? null : 'time')}
                      >
                        <span>{selectedTime ? timeOptions.find(opt => opt.value === selectedTime)?.label : 'SELECT TIME'}</span>
                        <svg className="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L6 6L11 1" stroke="#5A493B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      {openDropdown === 'time' && (
                        <div className="custom-dropdown-menu">
                          {timeOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              className={`custom-dropdown-item ${selectedTime === option.value ? 'selected' : ''}`}
                              onClick={() => {
                                setSelectedTime(option.value)
                                setOpenDropdown(null)
                              }}
                            >
                              <span className="dropdown-item-icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                                  <path d="M8 4V8L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                              </span>
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input type="hidden" name="time" value={selectedTime} required />
                  </div>
                </div>

                <div className="booking-form-group">
                  <label className="booking-label">SPECIAL REQUESTS</label>
                  <textarea 
                    className="booking-input booking-textarea" 
                    placeholder="ANY SPECIAL REQUESTS OR PREFERENCES"
                    rows="4"
                  ></textarea>
                </div>

                <button type="submit" className="booking-submit-btn">
                  SUBMIT RESERVATION
                </button>
              </form>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
