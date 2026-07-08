const projectsData = [
  {
    id: "p1",
    title: "NoorAndBloom - Coffee Shop Website",
   description:
  "A modern coffee shop website featuring a premium user interface, responsive design, and smooth interactive browsing experience.",

longDescription:
  "Noor & Bloom is a modern coffee shop frontend designed to deliver an elegant and engaging digital experience. The website features a visually appealing hero section, interactive menu showcase, featured products, customer testimonials, and responsive layouts optimized for all devices. Built with clean, reusable code and modern UI principles, the project focuses on intuitive navigation, smooth animations, and creating a welcoming online presence for a coffee brand.",
  image: "./images/noorandbloom.png",
    techStack: ["HTML", "CSS", "Javascript"],
    github: "https://github.com/dikshadhalpe/noorandbloom",
    demo: "https://noorandbloom.netlify.app/",
    status: "Completed",
    category: ["Web", "Frontend"],
    features: [
       "Responsive and mobile-first coffee shop interface",
      "Modern UI with smooth animations and interactive elements",
      "Elegant menu showcase with categorized products",
      "Visually engaging hero section and promotional banners",
      "Customer testimonials and featured product sections",
    ],
    architecture:
  "Built as a responsive frontend using HTML, CSS, and JavaScript, featuring a clean component-based structure, reusable UI sections, and smooth client-side interactions for an engaging user experience.",

challenges:
  "Creating a visually appealing interface while maintaining responsiveness across different devices. Solved by implementing a mobile-first approach, flexible layouts, and optimized animations.",

futureImprovements:
  "Add online ordering, table reservation, personalized recommendations, dark mode, and backend integration for a complete coffee shop experience."
  },
  {
    id: "p2",
    title: "StayEase — Airbnb Clone",

description:
  "A full-stack accommodation booking platform that allows users to discover, list, and manage rental properties with a seamless user experience.",

longDescription:
  "StayEase is a full-stack web application inspired by Airbnb, designed to simplify property discovery and booking. Users can browse listings, view detailed property information, create and manage their own listings, upload property images, and securely authenticate their accounts. The project features a responsive interface, server-side rendering with EJS, image management using Cloudinary, secure authentication with Passport.js, and MongoDB for efficient data storage, delivering a complete and user-friendly rental platform.",

image: "./images/stayease.png",

techStack: [
  "Node.js",
  "Express.js",
  "MongoDB",
  "Mongoose",
  "EJS",
  "Bootstrap",
  "Passport.js",
  "Cloudinary"
],

github: "https://github.com/dikshadhalpe/stayease",

demo: "https://stayease-43hf.onrender.com",

status: "Completed",

category: ["Full Stack", "Web Development", "Node.js"],

features: [
  "User authentication and secure login system",
  "Create, edit, and manage property listings",
  "Cloudinary image upload and management",
  "Search and browse available accommodations",
  "Responsive interface for desktop and mobile devices",
  "Interactive property details with location information",
  "Secure session management and authorization",
  "Clean and intuitive booking platform UI"
],

architecture:
  "Built using the MVC architecture with Express.js handling server-side logic, MongoDB managing application data, Passport.js providing secure authentication, Cloudinary storing property images, and EJS rendering dynamic web pages.",

challenges:
  "Implementing secure authentication, managing image uploads, and maintaining data consistency across property listings. These challenges were addressed using Passport.js for authentication, Cloudinary for image storage, and Mongoose for efficient database modeling.",

futureImprovements:
  "Integrate online booking and payment gateways, property reviews and ratings, advanced search filters, interactive maps, wishlist functionality, and real-time availability management."
  },
  {
    id: "p3",
    title: "SmartNotes AI",
    description:
      "An AI-assisted note-taking app that summarizes lecture notes and auto-generates flashcards for revision.",
    longDescription:
      "SmartNotes AI helps students convert long-form notes into concise summaries and spaced-repetition flashcards using an LLM API. It includes tagging, search, and a clean distraction-free editor.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    techStack: ["React", "Node.js", "Firebase", "OpenAI API"],
    github: "https://github.com/dikshadhalpe/smartnotes-ai",
    demo: "https://smartnotes-ai-demo.vercel.app",
    status: "Completed",
    category: ["AI", "React", "Web"],
    features: [
      "AI-generated summaries and flashcards",
      "Distraction-free markdown editor",
      "Tag-based organization and instant search",
      "Cloud sync via Firebase",
    ],
    architecture: "React front end, Firebase for auth/storage, a serverless function proxies LLM summarization requests.",
    challenges: "Managing API cost and latency for long documents — solved by chunking text before summarization.",
    futureImprovements: "Add collaborative note sharing and a browser extension for web clipping.",
  },
  {
    id: "p4",
    title: "ShopLite — E-commerce REST API",
    description:
      "A scalable e-commerce backend with product catalog, cart, orders, and Razorpay payment integration.",
    longDescription:
      "ShopLite is a backend-only REST API built to demonstrate clean architecture for an e-commerce system — catalog management, cart persistence, order lifecycle, and secure payments.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
    techStack: ["Java", "Spring Boot", "MySQL", "Postman"],
    github: "https://github.com/dikshadhalpe/shoplite-api",
    demo: "",
    status: "Completed",
    category: ["Java", "Backend"],
    features: [
      "JWT-secured REST endpoints",
      "Cart and order lifecycle management",
      "Payment gateway integration",
      "Postman collection for full API testing",
    ],
    architecture: "Layered Spring Boot architecture: Controller → Service → Repository, with DTO validation at the boundary.",
    challenges: "Designing idempotent order creation to safely handle retried payment callbacks.",
    futureImprovements: "Add inventory reservation locks and an admin analytics endpoint.",
  },
];
