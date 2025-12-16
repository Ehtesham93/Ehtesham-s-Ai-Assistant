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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getConfirmedReply = (topic: Topic): string => {
    switch (topic) {
      case 'intro':
        return `Thank you for asking! I’m Ehtesham Alam, a Backend-focused Software Engineer at Mahindra Last Mile Mobility 👨‍💻

My journey began in Bihar, where I completed my schooling before moving to NIT Warangal for my B.Tech in Computer Science. During my time at NIT, I explored backend development deeply, working on projects that involved scalable systems and glowing dashboards. I also pursued a research internship at IIT ISM, where I worked on real-time emotion detection using machine learning.

Today, at Mahindra, I blend management responsibilities with hands-on engineering, building platforms that support electric vehicle fleets and driver apps. I enjoy combining technical excellence with joyful user experiences, and I’m proud to be known as a one-man army — independent, resilient, and optimistic.`;

      case 'skills':
        return `Thank you for asking! My skills have grown step by step through education, internships, and professional work.

During my B.Tech at NIT Warangal, I mastered Node.js, Express, and PostgreSQL while building scalable backend systems for hackathons and academic projects. At my research internship at IIT ISM, I focused on Python, Flask, and machine learning, applying them to real-time emotion detection with CNN models. Later, at Mahindra Last Mile Mobility, I polished my expertise in REST APIs, AWS cloud services, and system design, creating production-ready platforms for electric vehicle fleets and driver apps.

Alongside these, I developed frontend skills in React and Vue.js, and I’m passionate about clean architecture, glowing dashboards, and joyful user experiences.`;

      case 'education':
        return `Thank you for asking! My education journey has been a foundation for everything I do today.

I completed my 10th grade in 2019 from the Bihar School Examination Board, Patna, where I ranked first in my class. In 2021, I passed my Intermediate exams from the same board, again securing top grades. These early years gave me discipline and a love for problem-solving.

Later, I pursued my B.Tech in Computer Science at NIT Warangal, graduating in 2025. At NIT, I not only studied core subjects like algorithms, databases, and operating systems, but also applied them in real projects. My research internship at IIT ISM allowed me to explore real-time emotion detection, combining computer vision with backend systems. This mix of theory and practice shaped me into the engineer I am today.`;

      case 'hobbies':
        return `Thank you for asking! My hobbies are a big part of who I am.

I love playing cricket and football, which keep me active and teach me teamwork. Chess sharpens my strategic thinking, while foosball is my go-to for quick fun with friends. These hobbies balance my technical life with joy, energy, and creativity.`;

      case 'experience':
        return `Thank you for asking! My professional experience reflects my growth as an engineer.

At Mahindra Last Mile Mobility, I work as an Assistant Manager and Software Engineer. I’ve built scalable EV fleet and vehicle management platforms, designed high-performance REST APIs with Node.js and Express, optimized PostgreSQL queries for speed, and integrated real-time telemetry with AWS. This role blends leadership with hands-on coding.

Before that, I was a research intern at IIT ISM, where I developed a backend for real-time mining sensor monitoring. This gave me exposure to Python, Flask, and data-driven systems. Together, these experiences shaped me into a versatile engineer.`;

      case 'projects':
        return `Thank you for asking! Here are some of my key projects:

- Fleet Management System (FMS): A backend platform for fleet tracking, trip lifecycle, maintenance, and analytics.
- Vehicle Management Center (VMC): APIs for vehicle health monitoring, alerts, and telemetry integration.
- NEMO Driver App: A driver onboarding and trip management app with authentication and live tracking.
- Real-Time Emotion Detection System: Built with CNN + Flask, achieving 85% accuracy in detecting emotions.
- Spring Spree Fest Website (NIT Warangal): Backend APIs for event registration, authentication, and admin dashboards, used by thousands of students.`;

      case 'leadership':
        return `Thank you for asking! Leadership and activities have been an important part of my journey.

At NIT Warangal, I served as a core backend developer for the Spring Spree Fest Website. I designed backend APIs for registration, authentication, and admin dashboards, delivering a production-ready system used by thousands of students. This experience taught me responsibility, collaboration, and the impact of technology on communities.`;

      case 'contact':
        return `Thank you for asking! Here’s how you can connect with me in a professional way:

📧 **Email**: You can reach me directly at [nitehtesham9393@gmail.com](mailto:nitehtesham9393@gmail.com). I actively check my inbox and respond promptly to meaningful opportunities.

💻 **GitHub**: Explore my projects, code samples, and contributions at [github.com/Ehtesham93](https://github.com/Ehtesham93). This is where I showcase my technical journey, from backend systems to experimental projects.

🔗 **LinkedIn**: Connect with me professionally on [linkedin.com/in/e-alam-29b0231ehtesham-alam-2239b0231](https://www.linkedin.com/in/e-alam-29b0231ehtesham-alam-2239b0231?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app). I use LinkedIn to share insights, network with peers, and highlight milestones in my career.

I believe in transparent communication and I’m always open to collaborations, discussions, and opportunities that align with my passion for building scalable and joyful technology.`;

      case 'personality':
        return `Thank you for asking! Here’s a bit about my nature and personality.

I respect all religions and value harmony 🌍. I love nature and find peace in it 🌱. I’m a happy and optimistic person 😃, and I’m known as a "one-man army" — independent and resilient 💪. I’m also transparent, approachable, and detail-oriented, which helps me connect with people while maintaining technical excellence.`;

      default:
        return '';
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const q = input.toLowerCase();

      // Greeting detection
      if (['hi', 'hello', 'good morning', 'good afternoon', 'good evening', 'good night'].includes(q)) {
        const greeting = q.charAt(0).toUpperCase() + q.slice(1);
        setMessages(prev => [...prev, { role: 'assistant', content: `${greeting}! How can I assist you?` }]);
        return;
      }

      // Confirmation flow
      if (conversationState) {
        if (q === 'yes') {
          const reply = getConfirmedReply(conversationState);
          setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
          setConversationState(null);
        } else {
          setMessages(prev => [...prev, { role: 'assistant', content: "Okay, let me know if you'd like to hear about it later." }]);
          setConversationState(null);
        }
        return;
      }

      // Topic triggers
      const topicMap: { [key: string]: Topic } = {
        intro: 'intro',
        skill: 'skills',
        stack: 'skills',
        tech: 'skills',
                education: 'education',
        school: 'education',
        study: 'education',
        hobby: 'hobbies',
        interest: 'hobbies',
        experience: 'experience',
        career: 'experience',
        role: 'experience',
        project: 'projects',
        leadership: 'leadership',
        activity: 'leadership',
        fest: 'leadership',
        contact: 'contact',
        email: 'contact',
        reach: 'contact',
        personality: 'personality',
        nature: 'personality',
        character: 'personality'
      };

      const matchedTopic = Object.entries(topicMap).find(([key]) => q.includes(key))?.[1];

      if (matchedTopic) {
        setConversationState(matchedTopic);
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: `Do you want to know about Ehtesham’s ${matchedTopic}?` }
        ]);
        return;
      }

      // Default fallback if no topic matched
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I can share details about Ehtesham’s intro, skills, education, hobbies, experience, projects, leadership, contact, or personality. Try asking one of those!"
        }
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Something went wrong. Please try again.');
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Sorry, I'm having trouble right now. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
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

        <ScrollArea className="h-[500px] px-6 py-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                } animate-fade-in`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
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
                    <span
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t border-glass-border bg-muted/30">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              disabled={isLoading}
              className="flex-1 bg-background/50 border-border focus:border-primary transition-colors"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
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
