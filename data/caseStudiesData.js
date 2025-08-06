// Case Studies Data - Enhanced structure for better content management
export const caseStudies = {
  "data-engineering-ai": [
    {
      id: "cs-001",
      title: "E-commerce Recommendation Engine",
      description: "Built AI-powered recommendation system for Nordic fashion retailer, increasing sales by 34%",
      client: "Nordic Fashion Group",
      industry: "E-commerce",
      location: "Stockholm, Sweden",
      projectDuration: "12 weeks",
      teamSize: "4 developers",
      technologies: ["Python", "TensorFlow", "AWS", "Apache Kafka"],
      challenge: "Low customer engagement and poor product discovery leading to declining sales",
      solution: "Implemented machine learning recommendation engine with real-time personalization",
      results: [
        "34% increase in sales",
        "50% improvement in user engagement", 
        "28% higher conversion rate",
        "65% increase in average order value"
      ],
      testimonial: {
        quote: "Zenit Digital transformed our e-commerce platform. The AI recommendation system has been a game-changer for our business.",
        author: "Anna Lindström",
        position: "CEO, Nordic Fashion Group"
      },
      featured: true,
      imageUrl: "/images/case-studies/ecommerce-ai.jpg"
    },
    {
      id: "cs-002", 
      title: "Financial Fraud Detection",
      description: "Developed real-time fraud detection system for Scandinavian fintech startup",
      client: "Nordic FinTech",
      industry: "Financial Services",
      location: "Oslo, Norway", 
      projectDuration: "16 weeks",
      teamSize: "5 developers",
      technologies: ["Python", "Apache Spark", "Kubernetes", "MLflow"],
      challenge: "High false positive rates and slow fraud detection causing customer frustration",
      solution: "Built real-time machine learning pipeline with advanced anomaly detection",
      results: [
        "99.2% fraud detection accuracy",
        "80% reduction in false positives",
        "Real-time processing capability",
        "60% reduction in financial losses"
      ],
      testimonial: {
        quote: "The fraud detection system has exceeded our expectations. Our customers now have confidence in our security.",
        author: "Erik Hansen",
        position: "CTO, Nordic FinTech"
      },
      featured: false,
      imageUrl: "/images/case-studies/fraud-detection.jpg"
    }
  ],
  "product-design": [
    {
      id: "cs-003",
      title: "SaaS Dashboard Redesign", 
      description: "Complete UX overhaul for Swedish analytics platform, improving user satisfaction by 45%",
      client: "Analytics Pro",
      industry: "SaaS",
      location: "Gothenburg, Sweden",
      projectDuration: "8 weeks",
      teamSize: "3 designers",
      technologies: ["Figma", "Principle", "User Research", "Prototyping"],
      challenge: "Complex interface causing low user adoption and high support ticket volume",
      solution: "Redesigned entire user experience with focus on simplicity and intuitive navigation",
      results: [
        "45% improvement in user satisfaction",
        "30% reduction in support tickets", 
        "25% increase in feature adoption",
        "50% faster user onboarding"
      ],
      testimonial: {
        quote: "The new design is incredible. Our users love the simplified interface and our support team is much happier.",
        author: "Sofia Bergman",
        position: "Product Manager, Analytics Pro"
      },
      featured: true,
      imageUrl: "/images/case-studies/saas-redesign.jpg"
    }
  ],
  "full-stack-development": [
    {
      id: "cs-004",
      title: "Enterprise CRM System",
      description: "Built comprehensive CRM solution for Swedish manufacturing company with 500+ users",
      client: "Nordic Manufacturing", 
      industry: "Manufacturing",
      location: "Malmö, Sweden",
      projectDuration: "20 weeks",
      teamSize: "6 developers",
      technologies: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
      challenge: "Outdated systems causing inefficiencies and poor data visibility across departments",
      solution: "Developed modern, scalable CRM system with real-time analytics and automation",
      results: [
        "30% increase in sales productivity",
        "50% reduction in data entry time",
        "Seamless integration with existing tools",
        "Real-time reporting across all departments"
      ],
      testimonial: {
        quote: "This CRM has revolutionized how we work. The productivity gains have been remarkable.",
        author: "Lars Andersson", 
        position: "Operations Director, Nordic Manufacturing"
      },
      featured: true,
      imageUrl: "/images/case-studies/crm-system.jpg"
    }
  ]
};

// Helper functions for better content management
export const getCaseStudiesByService = (serviceSlug) => {
  return caseStudies[serviceSlug] || [];
};

export const getFeaturedCaseStudies = () => {
  const allCaseStudies = Object.values(caseStudies).flat();
  return allCaseStudies.filter(study => study.featured);
};

export const getCaseStudyById = (id) => {
  const allCaseStudies = Object.values(caseStudies).flat();
  return allCaseStudies.find(study => study.id === id);
};

export const getAllCaseStudies = () => {
  return Object.values(caseStudies).flat();
};