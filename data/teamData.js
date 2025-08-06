export const teamMembers = [
  { 
    id: "sarah-chen",
    name: "Sarah Chen", 
    role: "Lead Designer",
    department: "Design",
    location: "Stockholm",
    experience: "8 years",
    specialties: ["UI/UX Design", "Design Systems", "User Research"],
    bio: "Sarah leads our design team with a passion for creating intuitive user experiences. She has worked with startups and enterprise clients across Scandinavia.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face", 
    size: "large",
    featured: true
  },
  { 
    id: "marcus-johnson",
    name: "Marcus Johnson", 
    role: "Senior Developer",
    department: "Development", 
    location: "Oslo",
    experience: "10 years",
    specialties: ["React", "Node.js", "Cloud Architecture"],
    bio: "Marcus is a full-stack developer who loves building scalable applications. He's an expert in modern web technologies and cloud infrastructure.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face", 
    size: "medium",
    featured: true
  },
  { 
    id: "elena-rodriguez",
    name: "Elena Rodriguez", 
    role: "Data Scientist",
    department: "AI & Data",
    location: "Gothenburg", 
    experience: "6 years",
    specialties: ["Machine Learning", "Data Analytics", "Python"],
    bio: "Elena specializes in turning data into actionable insights. She has a PhD in Computer Science and extensive experience in AI solutions.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face", 
    size: "medium",
    featured: true
  },
  { 
    id: "alex-thompson",
    name: "Alex Thompson", 
    role: "Product Manager",
    department: "Strategy",
    location: "Copenhagen",
    experience: "7 years", 
    specialties: ["Product Strategy", "Agile Management", "Market Research"],
    bio: "Alex drives product vision and strategy. He has successfully launched multiple products in the Nordic market and understands what users need.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face", 
    size: "small",
    featured: false
  },
  { 
    id: "zoe-wang",
    name: "Zoe Wang", 
    role: "UX Researcher",
    department: "Design",
    location: "Stockholm", 
    experience: "5 years",
    specialties: ["User Research", "Usability Testing", "Analytics"],
    bio: "Zoe ensures our designs are user-centered through comprehensive research and testing. She brings data-driven insights to every project.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face", 
    size: "small",
    featured: false
  },
  { 
    id: "david-kim",
    name: "David Kim", 
    role: "AI Engineer",
    department: "AI & Data",
    location: "Helsinki",
    experience: "9 years",
    specialties: ["Deep Learning", "Computer Vision", "MLOps"],
    bio: "David builds the AI systems that power our intelligent solutions. He has extensive experience in machine learning and neural networks.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face", 
    size: "small",
    featured: false
  }
];

// Helper functions for better team management
export const getTeamMembersByDepartment = (department) => {
  return teamMembers.filter(member => member.department === department);
};

export const getFeaturedTeamMembers = () => {
  return teamMembers.filter(member => member.featured);
};

export const getTeamMemberById = (id) => {
  return teamMembers.find(member => member.id === id);
};

export const getAllDepartments = () => {
  const departments = [...new Set(teamMembers.map(member => member.department))];
  return departments;
};