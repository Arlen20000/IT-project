const generateResponse = (message) => {
  // Mock AI logic for IT outsourcing recommendations
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('web') || lowerMessage.includes('website')) {
    return "For web development projects, our Professional Package starting at $5,000/month includes full-stack development with modern frameworks. We can build responsive websites, e-commerce platforms, or custom web applications. Would you like me to provide more details on our web development services?";
  }

  if (lowerMessage.includes('mobile') || lowerMessage.includes('app')) {
    return "Our mobile app development services cover both iOS and Android platforms. The Professional Package at $5,000/month includes cross-platform development using React Native. We handle everything from UI/UX design to app store deployment. What type of mobile app are you looking for?";
  }

  if (lowerMessage.includes('cloud') || lowerMessage.includes('aws') || lowerMessage.includes('azure')) {
    return "Cloud solutions are our specialty! We offer migration, infrastructure setup, and DevOps services. Starting at $3,000 for basic cloud setup, we can help you scale efficiently. Do you need help with a specific cloud provider or service?";
  }

  if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
    return "We provide cutting-edge AI and ML solutions including chatbots, predictive analytics, and automation. Our Enterprise Package includes AI integration starting at $10,000/month. What AI capabilities are you interested in implementing?";
  }

  if (lowerMessage.includes('security') || lowerMessage.includes('cyber')) {
    return "Cybersecurity is crucial for modern businesses. We offer comprehensive security audits, penetration testing, and compliance solutions starting at $4,000. Our security experts can help protect your digital assets. Would you like a security assessment?";
  }

  if (lowerMessage.includes('consulting') || lowerMessage.includes('advice')) {
    return "Our consulting services start at $2,000 and include technical architecture design, IT strategy planning, and process optimization. We help businesses make informed technology decisions. What specific area would you like consultation on?";
  }

  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
    return "Our pricing is flexible and depends on project scope. We offer three main packages: Starter ($2,500/month), Professional ($5,000/month), and Enterprise ($10,000/month). Each package includes different levels of service and support. Would you like me to explain the differences?";
  }

  if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('projects')) {
    return "We've successfully delivered over 200 projects across various industries. Our portfolio includes e-commerce platforms, mobile apps, cloud migrations, and AI implementations. You can view our full portfolio on the Portfolio page. Is there a specific type of project you're interested in?";
  }

  // Default response
  return "I'm here to help you with your IT outsourcing needs! Whether you need web development, mobile apps, cloud solutions, AI integration, cybersecurity, or technical consulting, we have the expertise to deliver. What specific service or project are you working on?";
};

module.exports = { generateResponse };