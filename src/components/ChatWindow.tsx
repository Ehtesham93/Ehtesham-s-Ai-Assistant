import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type Topic =
  | 'intro'
  | 'skills'
  | 'education'
  | 'hobbies'
  | 'experience'
  | 'projects'
  | 'leadership'
  | 'contact'
  | 'personality';

const initialGreeting = "Hi! I'm Ehtesham's AI companion 🤖 — Ask me anything about his journey.";

export const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: initialGreeting }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationState, setConversationState] = useState<Topic | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll helper
  const scrollToBottom = () => {
    if (!scrollRef.current) return;
    const viewport = scrollRef.current.querySelector(
      '[data-radix-scroll-area-viewport]'
    ) as HTMLDivElement | null;
    const el = viewport ?? scrollRef.current;
    el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Typing effect helper
  const typeMessage = (text: string) => {
    let index = 0;
    setIsLoading(true);
    const interval = setInterval(() => {
      index++;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last && last.role === 'assistant') {
          return [
            ...prev.slice(0, -1),
            { role: 'assistant', content: text.slice(0, index) }
          ];
        } else {
          return [...prev, { role: 'assistant', content: text.slice(0, index) }];
        }
      });
      scrollToBottom();
      if (index >= text.length) {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 30); // typing speed
  };

  // Replies for all topics
  const getConfirmedReply = (topic: Topic): string => {
    switch (topic) {
      case 'intro':
        return `Thank you for asking!😊
        I’m Ehtesham Alam, a Backend-focused Software Engineer at Mahindra Last Mile Mobility 👨‍💻

My journey began in Bihar, where I completed my schooling before moving to NIT Warangal for my B.Tech in Computer Science. During my time at NIT, I explored backend development deeply, working on projects that involved scalable systems and glowing dashboards. I also pursued a research internship at IIT ISM, where I worked on real-time emotion detection using machine learning.

Today, at Mahindra, I blend management responsibilities with hands-on engineering, building platforms that support electric vehicle fleets and driver apps. I enjoy combining technical excellence with joyful user experiences, and I’m proud to be known as a one-man army — independent, resilient, and optimistic.`;

      case 'skills':
        return `My skills have grown step by step through education, internships, and professional work.

During my B.Tech at NIT Warangal, I mastered Node.js, Express, and PostgreSQL while building scalable backend systems. At my research internship at IIT ISM, I focused on Python, Flask, and machine learning, applying them to real-time emotion detection with CNN models. Later, at Mahindra Last Mile Mobility, I polished my expertise in REST APIs, AWS cloud services, and system design, creating production-ready platforms for electric vehicle fleets and driver apps.

Alongside these, I developed frontend skills in React and Vue.js, and I’m passionate about clean architecture, glowing dashboards, and joyful user experiences.
Thank you!`;

      case 'education':
        return `My education journey has been a foundation for everything I do today.

I completed my 10th grade in 2019 from the Bihar School Examination Board, Patna, ranking first in my class. In 2021, I passed my Intermediate exams from the same board, again securing top grades. These early years gave me discipline and a love for problem-solving.

Later, I pursued my B.Tech in Computer Science at NIT Warangal, graduating in 2025. At NIT, I studied core subjects like algorithms, databases, and operating systems, and applied them in real projects. My research internship at IIT ISM allowed me to explore real-time emotion detection, combining computer vision with backend systems.
Thank you!`;

      case 'hobbies':
        return `My hobbies are a big part of who I am.

I love playing cricket and football, which keep me active and teach me teamwork. Chess sharpens my strategic thinking, while foosball is my go-to for quick fun with friends. These hobbies balance my technical life with joy, energy, and creativity.
Thank you!`;

      case 'experience':
        return `My professional experience reflects my growth as an engineer.

At Mahindra Last Mile Mobility, I work as Software Engineer. I’ve built scalable EV fleet and vehicle management platforms, designed high-performance REST APIs with Node.js and Express, optimized PostgreSQL queries for speed, and integrated real-time telemetry with AWS.

Before that, I was a research intern at IIT ISM, where I developed a backend for real-time mining sensor monitoring. This gave me exposure to Python, Flask, and data-driven systems. Together, these experiences shaped me into a versatile engineer.
Thank you!`;

      case 'projects':
        return `Here are some of my key projects:

- Fleet Management System (FMS): A backend platform for fleet tracking, trip lifecycle, maintenance, and analytics.
- Vehicle Management Center (VMC): APIs for vehicle health monitoring, alerts, and telemetry integration.
- NEMO Driver App: A driver onboarding and trip management app with authentication and live tracking.
- Real-Time Emotion Detection System: Built with CNN + Flask, achieving 85% accuracy in detecting emotions.
- Spring Spree Fest Website (NIT Warangal): Backend APIs for event registration, authentication, and admin dashboards, used by thousands of students.
Thank you!`;

      case 'leadership':
        return `Leadership and activities have been an important part of my journey.

At NIT Warangal, I served as a core backend developer for the Spring Spree Fest Website. I designed backend APIs for registration, authentication, and admin dashboards, delivering a production-ready system used by thousands of students. This experience taught me responsibility, collaboration, and the impact of technology on communities.
Thank you!`;

      case 'contact':
        return `Here’s how you can connect with me:

📧 **Email**: [nitehtesham9393@gmail.com](mailto:nitehtesham9393@gmail.com)  
💻 **GitHub**: [github.com/Ehtesham93](https://github.com/Ehtesham93)  
🔗 **LinkedIn**: [linkedin.com/in/e-alam-29b0231ehtesham-alam-2239b0231](https://www.linkedin.com/in/e-alam-29b0231ehtesham-alam-2239b0231?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app)

I believe in transparent communication and I’m always open to collaborations, discussions, and opportunities that align with my passion for building scalable and joyful technology.
Thank you!`;

      case 'personality':
        return `Here’s a bit about my nature and personality.

I respect all religions and value harmony 🌍. I love nature and find peace in it 🌱. I’m a happy and optimistic person 😃, and I’m known as a "one-man army" — independent and resilient 💪. I’m also transparent, approachable, and detail-oriented, which helps me connect with people while maintaining technical excellence.
Thank you!`;

    default:
    return `May be you are try to asking about my "intro, myself, skills, technical skills, stack, tech, education, school, college, hobbies, interest, experience, career, role, job, work, projects, leadership, activity, contact, personality, nature, character".`;

    }
  };

 // ✅ Better spelling correction using Levenshtein distance
const levenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = [];

  // initialize
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // fill matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

const correctSpelling = (q: string): string | null => {
  const dictionary: string[] = [
    "intro", "introduction", "yourself", "about", "intr", "interduct",
    "skills", "skill", "skil", "stack", "tech",
    "education", "study", "school", "college", "educatn",
    "hobbies", "hobby", "interest", "hobies",
    "experience", "career", "carrer", "exper", "job", "work", "role",
    "projects", "project", "projct",
    "leadership", "leader", "activity", "fest",
    "contact", "email", "reach", "connect",
    "personality", "nature", "character", "personalty"
  ];

  let bestMatch: string | null = null;
  let bestDistance = Infinity;

  for (const word of dictionary) {
    const distance = levenshteinDistance(q.toLowerCase(), word.toLowerCase());
    if (distance < bestDistance) {
      bestDistance = distance;
      bestMatch = word;
    }
  }

  return bestDistance <= 3 ? bestMatch : null;
};

  const handleSend = async () => {
  if (!input.trim() || isLoading) return;

  const userMessage: Message = { role: 'user', content: input };
  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setIsLoading(true);

  try {
    const q = input.trim();

    // Greeting detection
    const greetingsMap: { [key: string]: string } = {
      "hi": "Hi! How can I assist you?",
      "hii": "Hi! How can I assist you?",
      "hey": "Hi! How can I assist you?",
      "hello": "Hello! How can I assist you?",
      "good morning": "Good morning! How can I assist you?",
      "hii good morning": "Hii Good morning! How can I assist you?",
      "hello good morning": "Hello Good Morning! How can I assist you?",
      "good afternoon": "Good afternoon! How can I assist you?",
      "hii good afternoon": "Hii Good afternoon! How can I assist you?",
      "hello good afternoon": "Hello Good Afternoon! How can I assist you?",
      "good evening": "Good evening! How can I assist you?",
      "hii good evening": "Hii Good Evening! How can I assist you?",
      "hello good evening": "Hello Good Evening! How can I assist you?",
      "good night": "Good night Bye 👋!"
    };

    const normalizedQ = q.toLowerCase();   // normalize only for lookup
    if (greetingsMap[normalizedQ]) {
      setMessages(prev => [...prev, { role: "assistant", content: greetingsMap[normalizedQ] }]);
      setIsLoading(false);
      setTimeout(() => scrollToBottom(), 0);
      return;
    }

    // Confirmation flow
    if (conversationState) {
      if (q === 'yes') {
        const reply = getConfirmedReply(conversationState);
        setConversationState(null);
        typeMessage(reply); // typing effect disables controls via isLoading
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Okay, let me know if you'd like to hear about it later." }]);
        setConversationState(null);
        setIsLoading(false);
        setTimeout(() => scrollToBottom(), 0);
      }
      return;
    }

    // Topic triggers map — declare this first
    const topicMap: { [key: string]: Topic } = {
    // Intro variations
    intro: 'intro',
    yourself: 'intro',
    about: 'intro',
    "about yourself": 'intro',
    "Hi tell me about yourself": 'intro',
    "Hello tell me about yourself": 'intro',
    "tell me about yourself": 'intro',
    "who are you": 'intro',
    "Hi who are you": 'intro',
    "about ehtesham": 'intro',

    // Skills variations
    skill: 'skills',
    skills: 'skills',
    stack: 'skills',
    tech: 'skills',
    "your skills": 'skills',
    "tell me your skills": 'skills',
    "technical skills": 'skills',

    // Education variations
    education: 'education',
    school: 'education',
    study: 'education',
    college: 'education',
    "your education": 'education',
    "tell me about your education": 'education',

    // Hobbies variations
    hobby: 'hobbies',
    hobbies: 'hobbies',
    interest: 'hobbies',
    "your hobbies": 'hobbies',
    "tell me your hobbies": 'hobbies',

    // Experience variations
    experience: 'experience',
    career: 'experience',
    role: 'experience',
    work: 'experience',
    job: 'experience',
    "your experience": 'experience',
    "tell me about your experience": 'experience',

    // Projects variations
    project: 'projects',
    projects: 'projects',
    "your projects": 'projects',
    "tell me about your projects": 'projects',

    // Leadership variations
    leadership: 'leadership',
    activity: 'leadership',
    fest: 'leadership',
    "your leadership": 'leadership',
    "tell me about leadership": 'leadership',

    // Contact variations
    contact: 'contact',
    email: 'contact',
    reach: 'contact',
    connect: 'contact',
    "your contact": 'contact',
    "how to reach you": 'contact',

    // Personality variations
    personality: 'personality',
    nature: 'personality',
    character: 'personality',
    "your personality": 'personality',
    "tell me about your personality": 'personality'
  };


    // ✅ Spelling correction check — now topicMap is in scope
    const corrected = correctSpelling(q.toLowerCase());
    if (corrected && !Object.keys(topicMap).includes(q.toLowerCase())) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Please check your spelling. Did you mean "${corrected}"?` }
      ]);
      setIsLoading(false);
      setTimeout(() => scrollToBottom(), 0);
      return;
    }


    // Matching topic
    const matchedTopic = Object.entries(topicMap)
  .find(([key]) => q.toLowerCase().includes(key.toLowerCase()))?.[1];

    if (matchedTopic) {
      const reply = getConfirmedReply(matchedTopic);   // ✅ get the full reply immediately
      typeMessage(reply);                              // ✅ show typing effect directly
      setConversationState(null);                      // ✅ no need to wait for "yes"
      return;
    }


    // Default fallback
    setMessages(prev => [
      ...prev,
      {
        role: 'assistant',
        content:
          'May be you are try to asking about my "intro, myself, skills, technical skills, stack, tech, education, school, college, hobbies, interest, experience, career, role, job, work, projects, leadership, activity, contact, personality, nature, character".'
      }
    ]);

    setIsLoading(false);
    setTimeout(() => scrollToBottom(), 0);
  } catch (error) {
    console.error('Chat error:', error);
    toast.error('Something went wrong. Please try again.');
    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: "Sorry, I'm having trouble right now. Please try again later." }
    ]);
    setIsLoading(false);
    setTimeout(() => scrollToBottom(), 0);
  }
};

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-slide-up">
      <div className="backdrop-blur-xl bg-glass border border-glass-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 px-6 py-4 border-b border-glass-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Ask Me Anything
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Chat with my AI assistant to learn about my experience
          </p>
        </div>

        <ScrollArea className="h-[500px] px-6 py-4" ref={scrollRef} aria-busy={isLoading}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-muted">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className={`px-6 py-4 border-t border-glass-border bg-muted/30 ${isLoading ? 'pointer-events-none opacity-60' : ''}`}>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isLoading ? 'Assistant is typing…' : 'Type your question...'}
              disabled={isLoading} // fully disables typing
              className="flex-1 bg-background/50 border-border focus:border-primary transition-colors"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()} // disables clicks while typing
              size="icon"
              className="bg-primary hover:bg-primary/90 transition-all hover:scale-105"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
