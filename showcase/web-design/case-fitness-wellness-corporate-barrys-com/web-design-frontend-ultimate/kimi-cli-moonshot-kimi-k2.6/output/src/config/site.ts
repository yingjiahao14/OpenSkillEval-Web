export const siteConfig = {
  name: "RedRoom Fitness",
  tagline: "The Best HIIT Workout in the World",
  description: "High-intensity interval training combining treadmill running and strength training in a signature red-lit studio environment.",

  brand: {
    colors: {
      primary: "#FF0000",
      background: "#141414",
      text: "#FFFFFF",
    },
  },

  nav: {
    primary: [
      { label: "The Workout", href: "the-workout.html" },
      { label: "Instructors", href: "instructors.html" },
      { label: "RedRoom RIDE", href: "ride-faq.html" },
      { label: "RedRoom X", href: "digital-platform.html" },
    ],
    utility: [
      { label: "Book Now", href: "#" },
      { label: "Buy Classes", href: "#" },
    ],
  },

  footer: {
    explore: [
      { label: "The Workout", href: "the-workout.html" },
      { label: "Instructors", href: "instructors.html" },
      { label: "RIDE FAQ", href: "ride-faq.html" },
      { label: "Digital Platform", href: "digital-platform.html" },
      { label: "Community Events", href: "#" },
    ],
    company: [
      { label: "Our Studios", href: "#" },
      { label: "Global Expansion", href: "#" },
      { label: "Fuel Bar", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
    connect: [
      { label: "Shop", href: "#" },
      { label: "My Account", href: "#" },
      { label: "Download the App", href: "#" },
    ],
    countries: ["US", "UK", "Australia", "Canada"],
  },

  home: {
    hero: {
      title: "TRY THE BEST WORKOUT IN THE WORLD™",
      subtitle: "Buy an exclusive first-timer 3-pack and receive a FREE Fuel Shake or Grab + Go item after your third class.",
      ctaPrimary: { text: "BUY NOW", href: "#" },
      ctaSecondary: { text: "BOOK CLASSES", href: "#" },
    },
    topBar: {
      text: "The Best (Digital) Workout in the World",
      cta: { text: "Learn More", href: "digital-platform.html" },
    },
    community: {
      heading: "Join the Hustle",
      body: "Welcome to RedRoom. More than a workout — it's a movement. Our global community of athletes, first-timers, and everyone in between push limits together in the Red Room. Show up. Work hard. Earn your place.",
      cta: { text: "Explore the Community", href: "#" },
    },
    twoWays: {
      heading: "TWO WAYS TO RED ROOM",
      options: [
        {
          title: "In-Studio",
          description: "Get a (Red) Room. Step inside our signature red-lit studios for the full immersive experience. Heart-pounding music, elite instructors, and the energy of the pack.",
        },
        {
          title: "Digital",
          description: "Go Digital. Stream world-class workouts from anywhere. Same intensity, your schedule.",
        },
      ],
    },
    studio: {
      heading: "Meet Us in the Red Room.",
      body: "Red lights. Loud music. Zero distractions. Our studios are purpose-built for performance — every detail from the sound system to the lighting is engineered to push you harder. This isn't a gym. This is the Red Room.",
      cta: "THE BEST WORKOUT IN THE WORLD — Don't Wait. Book Now to Get the Red Room Experience.",
    },
    freeTrial: {
      heading: "JOIN US FOR A FREE 30 DAY TRIAL",
      cta: { text: "Start Your Free Trial", href: "#" },
    },
    carousel: {
      slides: [
        { alt: "Studio action shot" },
        { alt: "Community event" },
        { alt: "Post-workout moment" },
        { alt: "Branded apparel" },
        { alt: "Group class energy" },
      ],
    },
    newsletter: {
      heading: "Newsletter Form Signup",
      body: "Stay in the know. Get workout tips, class updates, and exclusive offers delivered to your inbox.",
      cta: "Subscribe",
    },
  },

  workout: {
    hero: {
      title: "THE REDROOM WAY",
      subtitle: "50 minutes. Full body. Maximum results.",
    },
    method: {
      heading: "THE REDROOM WAY",
      body: "Every class is a 50-minute full-body experience. You'll alternate between the treadmill and the floor, combining high-intensity cardio intervals with focused strength training. Our method is designed to maximize calorie burn, build lean muscle, and keep your metabolism elevated for hours after class. Hustle and heart set us apart.",
    },
    schedule: [
      { day: "Monday", focus: "Chest & Back" },
      { day: "Tuesday", focus: "Full Body (Lower Focus)" },
      { day: "Wednesday", focus: "Arms & Abs" },
      { day: "Thursday", focus: "Arms & Abs" },
      { day: "Friday", focus: "Full Body (Upper Focus)" },
      { day: "Saturday", focus: "Full Body" },
    ],
    toggle: {
      heading: "Start on the Floor or the Treadmill",
      floor: {
        title: "Floor",
        description: "Dumbbells, resistance bands, and bodyweight movements target specific muscle groups each day. Our instructors guide every rep to ensure proper form and maximum results.",
      },
      treadmill: {
        title: "Treadmill",
        description: "From power walks to all-out sprints, the treadmill portion is designed to torch calories and build cardiovascular endurance. Every speed and incline is coach-led — all levels welcome.",
      },
    },
    studio: {
      heading: "Meet Us in the Red Room.",
      body: "Red lights. Loud music. Zero distractions. Our studios are purpose-built for performance — every detail from the sound system to the lighting is engineered to push you harder. This isn't a gym. This is the Red Room.",
    },
    cta: {
      heading: "Ready to Hustle?",
      body: "Book your first class and experience the RedRoom difference.",
      primary: { text: "Book a Class", href: "#" },
      secondary: { text: "View Schedule", href: "#" },
    },
  },

  instructors: {
    hero: {
      title: "MEET YOUR COACHES",
      subtitle: "Elite instructors who push you to your limits and beyond.",
    },
    filters: ["All Locations", "New York", "Los Angeles", "London", "Miami", "San Francisco"],
    list: [
      { name: "Dani Reyes", location: "New York" },
      { name: "Marcus Cole", location: "Los Angeles" },
      { name: "Priya Nair", location: "London" },
      { name: "Jordan Voss", location: "Miami" },
      { name: "Tessa Kim", location: "San Francisco" },
      { name: "Andre Williams", location: "New York" },
      { name: "Sofia Marquez", location: "Los Angeles" },
      { name: "Liam Chen", location: "London" },
    ],
    cta: {
      heading: "Get Started Today",
      primary: { text: "Book a Class", href: "#" },
      secondary: { text: "View All Studios", href: "#" },
    },
  },

  rideFaq: {
    hero: {
      title: "REDROOM RIDE",
      subtitle: "Everything you need to know about our signature cycling experience.",
    },
    faqs: [
      {
        q: "What is RIDE x LIFT?",
        a: "RIDE x LIFT is RedRoom's signature cycling class that combines a high-energy spin session with strength training on the floor. It's 50 minutes of total-body work set to motivating playlists in our red-lit studio.",
      },
      {
        q: "What should I wear?",
        a: "Wear moisture-wicking athletic clothing and supportive sneakers. Cycling shoes are available at the studio but not required.",
      },
      {
        q: "Do I need cycling shoes?",
        a: "No. We provide complimentary cycling shoes at every RIDE x LIFT studio. You're welcome to bring your own SPD-compatible shoes if you prefer.",
      },
      {
        q: "How long is the class?",
        a: "Each RIDE x LIFT class is 50 minutes — approximately 25 minutes on the bike and 25 minutes of strength work on the floor.",
      },
      {
        q: "Is RIDE x LIFT good for beginners?",
        a: "Absolutely. Our instructors coach every level. You control your resistance and speed, so the workout scales to your fitness level.",
      },
      {
        q: "Where is RIDE x LIFT available?",
        a: "RIDE x LIFT is currently available at our Chelsea, NYC studio with plans to expand to additional locations.",
      },
    ],
  },

  digital: {
    hero: {
      title: "THE BEST (DIGITAL) WORKOUT IN THE WORLD",
      subtitle: "Stream RedRoom's signature HIIT classes anytime, anywhere.",
    },
    features: [
      {
        title: "World Class Workouts On Your Time",
        description: "Access RedRoom's signature HIIT classes filmed with top instructors. Treadmill, floor, and full-body formats available on demand.",
      },
      {
        title: "Workouts That Push You to Your Limits",
        description: "Strength, cardio, abs, stretching, and more. New classes added weekly across multiple categories and difficulty levels.",
      },
      {
        title: "Unlimited Access",
        description: "One membership, unlimited streaming. No caps on how many classes you take per week.",
      },
      {
        title: "30 Day Free Trial",
        description: "Try the full digital library free for 30 days. Cancel anytime.",
      },
      {
        title: "Anytime, Anywhere",
        description: "Stream on your phone, tablet, laptop, or TV. Your Red Room, wherever you are.",
      },
    ],
    cta: {
      heading: "Join the Fit Fam Today",
      primary: { text: "Start Your Free Trial", href: "#" },
      secondary: { text: "Explore Workouts", href: "#" },
    },
  },
};
