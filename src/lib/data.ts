// ── Mock Data for DIU University Website ──

export const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80",
    badge: "Ranked #1 Private University in Bangladesh",
    title: "Shaping the Future Through Education & Innovation",
    subtitle: "Join 50,000+ students who are changing the world through knowledge, research, and innovation at Daffodil International University.",
    ctaPrimary: "Apply Now",
    ctaSecondary: "Explore Programs",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80",
    badge: "World-Class Research Excellence",
    title: "Discover Cutting-Edge Research That Matters",
    subtitle: "Our 25+ research centers are working on breakthrough solutions in technology, health, environment, and social sciences.",
    ctaPrimary: "Explore Research",
    ctaSecondary: "View Publications",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80",
    badge: "100+ International Partnerships",
    title: "A Global University With a Local Heart",
    subtitle: "Study abroad, exchange programs, and international collaborations with top universities from over 50 countries worldwide.",
    ctaPrimary: "International Programs",
    ctaSecondary: "Partner Universities",
  },
];

export const stats = [
  { id: 1, value: 50000, suffix: "+", label: "Students Enrolled", icon: "Users" },
  { id: 2, value: 1500, suffix: "+", label: "Faculty Members", icon: "GraduationCap" },
  { id: 3, value: 100, suffix: "+", label: "Academic Programs", icon: "BookOpen" },
  { id: 4, value: 25, suffix: "+", label: "Research Centers", icon: "FlaskConical" },
];

export const newsItems = [
  {
    id: 1,
    title: "DIU Ranks Among Top 500 Universities in Asia-Pacific Region",
    excerpt: "Daffodil International University has been recognized in the latest QS Asia Pacific Rankings, marking a significant milestone in our academic journey.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80",
    category: "Achievement",
    date: "June 3, 2026",
    readTime: "3 min read",
    featured: true,
  },
  {
    id: 2,
    title: "New Artificial Intelligence Research Lab Opens at DIU",
    excerpt: "State-of-the-art AI Research Laboratory equipped with the latest GPU clusters and deep learning infrastructure was inaugurated.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    category: "Research",
    date: "May 28, 2026",
    readTime: "4 min read",
    featured: true,
  },
  {
    id: 3,
    title: "Spring Semester Admission 2026 Now Open",
    excerpt: "Applications are now being accepted for Spring 2026 semester. Undergraduate, Graduate, and Diploma programs available.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    category: "Admissions",
    date: "May 25, 2026",
    readTime: "2 min read",
    featured: false,
  },
  {
    id: 4,
    title: "DIU Hosts International Technology Summit 2026",
    excerpt: "Over 2,000 tech professionals and students gathered for the annual technology summit, featuring keynotes from global industry leaders.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    category: "Events",
    date: "May 20, 2026",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 5,
    title: "DIU Signs MOU with University of Manchester",
    excerpt: "A new Memorandum of Understanding has been signed to facilitate student and faculty exchange between the two institutions.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    category: "International",
    date: "May 15, 2026",
    readTime: "3 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Annual Sports Gala 2026 Concludes with Record Participation",
    excerpt: "This year's sports gala saw over 3,000 student participants across 25 different sports categories, breaking all previous records.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
    category: "Campus Life",
    date: "May 10, 2026",
    readTime: "4 min read",
    featured: false,
  },
];

export const events = [
  {
    id: 1,
    title: "Fall 2026 Admission Open Day",
    date: "June 15, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Main Campus, Auditorium",
    type: "Admissions",
  },
  {
    id: 2,
    title: "Research Innovation Symposium",
    date: "June 22, 2026",
    time: "9:00 AM - 6:00 PM",
    location: "DIU Research Block",
    type: "Research",
  },
  {
    id: 3,
    title: "International Alumni Meet 2026",
    date: "July 5, 2026",
    time: "3:00 PM - 8:00 PM",
    location: "Permanent Campus, Birulia",
    type: "Alumni",
  },
  {
    id: 4,
    title: "Convocation Ceremony 2026",
    date: "July 20, 2026",
    time: "9:00 AM - 1:00 PM",
    location: "Bangabandhu International Conference Center",
    type: "Academic",
  },
];

export const programs = [
  // Undergraduate
  { id: 1, name: "Computer Science & Engineering", faculty: "Faculty of Science & IT", level: "Undergraduate", duration: "4 years", credits: 160, color: "primary", icon: "Cpu" },
  { id: 2, name: "Business Administration (BBA)", faculty: "Daffodil Business School", level: "Undergraduate", duration: "4 years", credits: 130, color: "accent", icon: "Briefcase" },
  { id: 3, name: "Electrical & Electronic Engineering", faculty: "Faculty of Engineering", level: "Undergraduate", duration: "4 years", credits: 160, color: "secondary", icon: "Zap" },
  { id: 4, name: "Law & Justice", faculty: "Faculty of Law", level: "Undergraduate", duration: "4 years", credits: 140, color: "primary", icon: "Scale" },
  { id: 5, name: "Pharmacy", faculty: "Faculty of Allied Health Sciences", level: "Undergraduate", duration: "4 years", credits: 160, color: "secondary", icon: "Pill" },
  { id: 6, name: "Architecture", faculty: "Faculty of Engineering", level: "Undergraduate", duration: "5 years", credits: 200, color: "accent", icon: "Building" },
  // Graduate
  { id: 7, name: "Master of Business Administration (MBA)", faculty: "Daffodil Business School", level: "Graduate", duration: "1.5 years", credits: 60, color: "accent", icon: "TrendingUp" },
  { id: 8, name: "Master of Computer Science", faculty: "Faculty of Science & IT", level: "Graduate", duration: "2 years", credits: 72, color: "primary", icon: "Code" },
  { id: 9, name: "Master of Public Health", faculty: "Faculty of Allied Health Sciences", level: "Graduate", duration: "1.5 years", credits: 60, color: "secondary", icon: "Heart" },
  // PhD
  { id: 10, name: "PhD in Computer Science", faculty: "Faculty of Science & IT", level: "PhD", duration: "3-5 years", credits: 60, color: "primary", icon: "FlaskConical" },
  { id: 11, name: "PhD in Business", faculty: "Daffodil Business School", level: "PhD", duration: "3-5 years", credits: 60, color: "accent", icon: "Award" },
  // Short
  { id: 12, name: "Diploma in Web Development", faculty: "Faculty of Science & IT", level: "Short Course", duration: "6 months", credits: 24, color: "primary", icon: "Globe" },
  { id: 13, name: "Certificate in Digital Marketing", faculty: "Daffodil Business School", level: "Short Course", duration: "3 months", credits: 12, color: "accent", icon: "Megaphone" },
];

export const researchProjects = [
  {
    id: 1,
    title: "AI-Powered Early Disease Detection System",
    area: "Artificial Intelligence",
    pi: "Prof. Dr. M. Lutfar Rahman",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80",
    status: "Active",
    funding: "$2.4M",
    year: 2024,
  },
  {
    id: 2,
    title: "Sustainable Smart Cities Framework",
    area: "Smart Technology",
    pi: "Dr. Shafiqul Islam",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80",
    status: "Active",
    funding: "$1.8M",
    year: 2024,
  },
  {
    id: 3,
    title: "Blockchain for Agricultural Supply Chain",
    area: "Blockchain",
    pi: "Dr. Kamruzzaman",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80",
    status: "Active",
    funding: "$1.2M",
    year: 2025,
  },
  {
    id: 4,
    title: "Climate Change Impact on Coastal Bangladesh",
    area: "Environmental Science",
    pi: "Prof. Dr. Fatima Khanam",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    status: "Completed",
    funding: "$900K",
    year: 2023,
  },
];

export const researchAreas = [
  "All", "Artificial Intelligence", "Smart Technology", "Blockchain", "Environmental Science", "Biotechnology", "Cybersecurity", "Data Science"
];

export const publications = [
  "IEEE Transaction: Neural Networks in Medical Imaging (2025) — Rahman et al.",
  "Nature: Sustainable Urban Planning Models (2025) — Islam, Chen, Patel",
  "ACM Computing: Distributed Ledger Applications (2024) — Kamruzzaman et al.",
  "Elsevier: Climate Vulnerability Assessment (2024) — Khanam, Ahmed",
  "Springer: Machine Learning in Financial Systems (2024) — Hossain et al.",
  "Wiley: Biomedical Signal Processing (2025) — Rahman, Lee",
];

export const partnerUniversities = [
  { id: 1, name: "University of Manchester", country: "UK", logo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&q=80" },
  { id: 2, name: "Deakin University", country: "Australia", logo: "https://images.unsplash.com/photo-1542157585-ef20bfcce579?w=80&q=80" },
  { id: 3, name: "Coventry University", country: "UK", logo: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=80&q=80" },
  { id: 4, name: "University of Asia Pacific", country: "Bangladesh", logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=80&q=80" },
  { id: 5, name: "RMIT University", country: "Australia", logo: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=80&q=80" },
  { id: 6, name: "Seoul National University", country: "South Korea", logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&q=80" },
  { id: 7, name: "MIT (Affiliation)", country: "USA", logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=80&q=80" },
  { id: 8, name: "University of Tokyo", country: "Japan", logo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=80&q=80" },
];

export const internationalStats = [
  { value: "50+", label: "Partner Countries" },
  { value: "100+", label: "Partner Universities" },
  { value: "2,000+", label: "Exchange Students" },
  { value: "15+", label: "Active Programs" },
];

export const alumni = [
  {
    id: 1,
    name: "Rafiqul Islam",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    graduationYear: 2015,
    program: "CSE",
    role: "CTO",
    company: "TechVentures BD",
    quote: "DIU gave me not just a degree, but the vision and skills to build something meaningful.",
  },
  {
    id: 2,
    name: "Fatema Akhter",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    graduationYear: 2017,
    program: "BBA",
    role: "Country Director",
    company: "UNICEF Bangladesh",
    quote: "The diverse learning environment at DIU prepared me for real-world challenges.",
  },
  {
    id: 3,
    name: "Kamal Hossain",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    graduationYear: 2013,
    program: "EEE",
    role: "Lead Engineer",
    company: "Samsung R&D",
    quote: "The research exposure I got at DIU set the foundation for my engineering career.",
  },
  {
    id: 4,
    name: "Nadia Rahman",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    graduationYear: 2018,
    program: "Law",
    role: "Senior Advocate",
    company: "Supreme Court of Bangladesh",
    quote: "DIU's law program gave me the analytical rigor needed to excel in legal practice.",
  },
];

export const alumniStats = [
  { value: "45,000+", label: "Alumni Worldwide" },
  { value: "70+", label: "Countries" },
  { value: "92%", label: "Employment Rate" },
  { value: "250+", label: "Alumni Events/Year" },
];

export const galleryItems = [
  { id: 1, image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80", category: "Campus", caption: "Main Campus, Ashulia" },
  { id: 2, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80", category: "Sports", caption: "Annual Sports Gala" },
  { id: 3, image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80", category: "Labs", caption: "AI Research Laboratory" },
  { id: 4, image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&q=80", category: "Events", caption: "Annual Cultural Fest" },
  { id: 5, image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80", category: "Events", caption: "Convocation 2025" },
  { id: 6, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", category: "Students", caption: "Students at Innovation Hub" },
  { id: 7, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", category: "Campus", caption: "Library & Resource Center" },
  { id: 8, image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80", category: "Events", caption: "Tech Summit 2025" },
];

export const studentServices = [
  { id: 1, title: "Student Portal", description: "Access grades, schedules, and all academic records securely online.", icon: "LayoutDashboard", link: "/student-portal" },
  { id: 2, title: "Digital Library", description: "Access 100,000+ e-books, journals, and research papers 24/7.", icon: "Library", link: "/library" },
  { id: 3, title: "Class Routine", description: "View your personalized class schedule and room assignments.", icon: "Calendar", link: "/class-routine" },
  { id: 4, title: "Exam Results", description: "Check semester results and download transcripts instantly.", icon: "FileText", link: "/results" },
  { id: 5, title: "Notice Board", description: "Stay updated with important announcements and circulars.", icon: "Bell", link: "/notices" },
  { id: 6, title: "Career Center", description: "Job listings, resume workshops, and career counseling.", icon: "Briefcase", link: "/careers" },
  { id: 7, title: "Internships", description: "Find industry internships and placement opportunities.", icon: "Building2", link: "/internships" },
  { id: 8, title: "Help Desk", description: "Submit and track support tickets for any academic issue.", icon: "HeadphonesIcon", link: "/help-desk" },
];

export const forumCategories = [
  { id: 1, name: "General Discussion", count: 1243, color: "primary" },
  { id: 2, name: "Academic Help", count: 876, color: "secondary" },
  { id: 3, name: "Campus Life", count: 654, color: "accent" },
  { id: 4, name: "Admissions", count: 432, color: "primary" },
  { id: 5, name: "Research & Projects", count: 321, color: "secondary" },
  { id: 6, name: "Career & Jobs", count: 289, color: "accent" },
  { id: 7, name: "International Students", count: 198, color: "primary" },
  { id: 8, name: "Alumni Network", count: 156, color: "secondary" },
];

export const forumThreads = [
  {
    id: 1,
    title: "How to apply for the Merit Scholarship 2026?",
    category: "Admissions",
    author: "Sadia Islam",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&q=80",
    replies: 24,
    views: 1205,
    lastActivity: "2 hours ago",
    pinned: true,
    tags: ["scholarship", "admission", "2026"],
  },
  {
    id: 2,
    title: "CSE 4th year project ideas — share your recommendations",
    category: "Academic Help",
    author: "Rahim Uddin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80",
    replies: 67,
    views: 3420,
    lastActivity: "4 hours ago",
    pinned: false,
    tags: ["CSE", "project", "ideas"],
  },
  {
    id: 3,
    title: "Transportation from Uttara to Permanent Campus — schedule?",
    category: "Campus Life",
    author: "Mitu Akter",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&q=80",
    replies: 18,
    views: 892,
    lastActivity: "6 hours ago",
    pinned: false,
    tags: ["transport", "campus"],
  },
  {
    id: 4,
    title: "Research paper submission guidelines for DIU Research Journal",
    category: "Research & Projects",
    author: "Dr. Hasan Mahmud",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80",
    replies: 12,
    views: 567,
    lastActivity: "1 day ago",
    pinned: true,
    tags: ["research", "journal", "guidelines"],
  },
  {
    id: 5,
    title: "Job fair companies list — Fall 2026",
    category: "Career & Jobs",
    author: "Karim Ahmed",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&q=80",
    replies: 89,
    views: 4521,
    lastActivity: "1 day ago",
    pinned: false,
    tags: ["jobs", "job-fair", "career"],
  },
  {
    id: 6,
    title: "Best places to eat near DIU Permanent Campus",
    category: "Campus Life",
    author: "Nusrat Jahan",
    avatar: "https://images.unsplash.com/photo-1542206395-9eb3d8b8b4c5?w=40&q=80",
    replies: 45,
    views: 2103,
    lastActivity: "2 days ago",
    pinned: false,
    tags: ["food", "campus-life"],
  },
];

export const faqItems = [
  {
    id: 1,
    category: "Admissions",
    question: "What are the admission requirements for undergraduate programs?",
    answer: "For undergraduate admission, you need SSC/equivalent GCE O-level and HSC/equivalent GCE A-level certificates with minimum GPA requirements. Specific requirements vary by program. Please visit our Admissions page for detailed requirements.",
  },
  {
    id: 2,
    category: "Admissions",
    question: "When is the application deadline for Fall 2026?",
    answer: "The application deadline for Fall 2026 is July 31, 2026. We recommend applying early as seats are limited and competitive.",
  },
  {
    id: 3,
    category: "Financial",
    question: "What scholarships are available for new students?",
    answer: "DIU offers merit-based scholarships ranging from 25% to 100% tuition waiver. Need-based financial assistance is also available. Contact the Financial Aid office for more details.",
  },
  {
    id: 4,
    category: "Academic",
    question: "How do I access my academic records and transcripts?",
    answer: "You can access all academic records through the Student Portal at portal.diu.edu.bd. Transcripts can be downloaded as PDF or requested as official printed copies from the Registrar's office.",
  },
  {
    id: 5,
    category: "IT Support",
    question: "I forgot my student portal password. How do I reset it?",
    answer: "Click 'Forgot Password' on the portal login page and enter your student ID or registered email. A reset link will be sent to your registered email within 5 minutes.",
  },
  {
    id: 6,
    category: "Campus",
    question: "Is there student accommodation available on campus?",
    answer: "Yes, DIU has separate dormitories for male and female students at the Permanent Campus in Birulia, Ashulia. Applications for hostel accommodation can be submitted through the Student Services office.",
  },
];

export const adminStats = [
  { label: "Total Students", value: 52340, trend: "+8.2%", up: true, color: "primary" },
  { label: "Applications (Fall '26)", value: 8921, trend: "+12.5%", up: true, color: "secondary" },
  { label: "Open Tickets", value: 43, trend: "-18%", up: false, color: "destructive" },
  { label: "Revenue (BDT Cr)", value: 142, trend: "+6.8%", up: true, color: "accent" },
];

export const enrollmentData = [
  { month: "Jan", students: 48200 },
  { month: "Feb", students: 48500 },
  { month: "Mar", students: 49100 },
  { month: "Apr", students: 49800 },
  { month: "May", students: 50300 },
  { month: "Jun", students: 52340 },
];

export const applicationFunnelData = [
  { stage: "Inquiries", count: 15420 },
  { stage: "Applications", count: 8921 },
  { stage: "Qualified", count: 6234 },
  { stage: "Admitted", count: 4512 },
  { stage: "Enrolled", count: 3890 },
];

export const recentTickets = [
  { id: "TKT-1042", subject: "Cannot access student portal", status: "Open", date: "Jun 5, 2026", category: "IT Support" },
  { id: "TKT-1041", subject: "Semester fee payment issue", status: "In Progress", date: "Jun 4, 2026", category: "Financial" },
  { id: "TKT-1040", subject: "Transcript request - urgent", status: "Resolved", date: "Jun 3, 2026", category: "Academic" },
  { id: "TKT-1039", subject: "Class schedule conflict", status: "In Progress", date: "Jun 3, 2026", category: "Academic" },
  { id: "TKT-1038", subject: "Hostel room change request", status: "Closed", date: "Jun 2, 2026", category: "Campus" },
];
